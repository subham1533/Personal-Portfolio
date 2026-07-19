"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

export default function PageTransitionLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const targetUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Intercept clicks on links globally
    const handleLinkClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Only transition internal route pages or section anchors
      if (href.startsWith("#") || href.startsWith("/") || href.includes(window.location.host)) {
        e.preventDefault();
        targetUrlRef.current = href;
        setIsVisible(true);
        setProgress(0);
        progressRef.current = 0;
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  // Handle Loading simulation once loader is active
  useEffect(() => {
    if (!isVisible) return;

    // Simulate progress speed
    const duration = 1200; // 1.2s transition loading
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      progressRef.current += increment;
      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        clearInterval(timer);

        // Perform the actual scroll or navigation behind the loader
        setTimeout(() => {
          const target = targetUrlRef.current;
          if (target) {
            if (target.startsWith("#")) {
              const elementId = target.substring(1);
              const element = document.getElementById(elementId);
              if (element) {
                element.scrollIntoView({ behavior: "auto" });
              } else if (target === "#") {
                window.scrollTo({ top: 0, behavior: "auto" });
              }
            } else {
              window.location.href = target;
            }
          }

          // Fade out the overlay
          setTimeout(() => {
            setIsVisible(false);
          }, 300);
        }, 150);
      } else {
        setProgress(Math.floor(progressRef.current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Three.js Animated 3D Background Particle Vortex (60FPS GPU Optimized)
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    // Create glowing radial particle texture programmatically in canvas
    const createParticleTexture = () => {
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 16;
      pCanvas.height = 16;
      const ctx = pCanvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(139, 92, 246, 0.8)"); // Purple hue
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      const texture = new THREE.CanvasTexture(pCanvas);
      return texture;
    };

    // Particles Geometry Setup
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const scaleFactors = new Float32Array(particlesCount);
    const speedFactors = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Helix/vortex formation geometry
      const angle = (i / particlesCount) * Math.PI * 60;
      const radius = (i / particlesCount) * 4.5 + 0.5;
      const x = Math.cos(angle) * radius;
      const y = (i / particlesCount - 0.5) * 6;
      const z = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      scaleFactors[i] = Math.random();
      speedFactors[i] = 0.5 + Math.random() * 1.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Shader-like material
    const material = new THREE.PointsMaterial({
      size: 0.18,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: createParticleTexture(),
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Vortex speed changes according to loading progress
      const acceleration = 1 + (progressRef.current / 100) * 3;

      // Update particle positions dynamically to simulate vortex suction
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const currentY = pos[i3 + 1];
        
        // Helix drift movement
        pos[i3 + 1] -= 0.015 * speedFactors[i] * acceleration;

        // Reset particles that move off-screen
        if (pos[i3 + 1] < -3) {
          pos[i3 + 1] = 3;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Spin the entire vortex system
      particleSystem.rotation.y = elapsedTime * 0.15 * acceleration;
      particleSystem.rotation.z = elapsedTime * 0.05;

      // Camera micro-movements
      camera.position.x = Math.sin(elapsedTime * 0.5) * 0.4;
      camera.position.y = Math.cos(elapsedTime * 0.5) * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center pointer-events-auto select-none"
        >
          {/* Real 3D Particles Background Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

          {/* Frosted glass cinematic filter */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />

          {/* Floating glowing loading bar in the center */}
          <div className="relative z-10 flex flex-col items-center space-y-6 w-72">
            <div className="space-y-1 text-center">
              <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
                Synthesizing Viewport
              </h3>
              <div className="text-2xl font-black font-mono text-white tracking-wider">
                {progress}%
              </div>
            </div>

            {/* Futuristic loading line with glow */}
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(255,255,255,0.05)] border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
