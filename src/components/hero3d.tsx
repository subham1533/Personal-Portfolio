"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowDown, FileText } from "lucide-react";
import { Magnetic } from "./cursor";

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // Create glowing gold/amber particle texture programmatically
    const createParticleTexture = () => {
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 32;
      pCanvas.height = 32;
      const ctx = pCanvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.2, "rgba(245, 158, 11, 0.8)"); // Gold/Amber core
        grad.addColorStop(0.5, "rgba(217, 119, 6, 0.3)");  // Darker Amber glow
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      const texture = new THREE.CanvasTexture(pCanvas);
      return texture;
    };

    // Golden Particles Sphere Setup
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 1200 : 3000;
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const randomFactors = new Float32Array(count);

    const radius = 2.0;

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere (Fibonacci lattice)
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      randomFactors[i] = Math.random() * 2.0 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.08 : 0.06,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: createParticleTexture(),
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle golden outer ring for premium orbital aesthetic
    const ringCount = isMobile ? 200 : 500;
    const ringPositions = new Float32Array(ringCount * 3);
    const ringRadius = 2.4;
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      ringPositions[i * 3] = Math.cos(angle) * ringRadius + (Math.random() - 0.5) * 0.15;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      ringPositions[i * 3 + 2] = Math.sin(angle) * ringRadius + (Math.random() - 0.5) * 0.15;
    }
    const ringGeometry = new THREE.BufferGeometry();
    ringGeometry.setAttribute("position", new THREE.BufferAttribute(ringPositions, 3));
    const ringMaterial = new THREE.PointsMaterial({
      size: 0.04,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: createParticleTexture(),
    });
    const ringParticles = new THREE.Points(ringGeometry, ringMaterial);
    ringParticles.rotation.x = Math.PI / 6; // Tilt the ring
    scene.add(ringParticles);

    // Track mouse input target values for interpolation
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -1 and 1
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation variables
    let animId: number;
    const clock = new THREE.Clock();

    // Lerp/damping variables for smooth interactive transition
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation (damping)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Particle morphing wave logic: oscillate the sphere coordinates slightly over time
      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const ix = initialPositions[i3];
        const iy = initialPositions[i3 + 1];
        const iz = initialPositions[i3 + 2];

        // Apply a wave disturbance using sine and cosine based on position and time
        const offset = Math.sin(time * 0.8 + ix * 2 + iy * 2) * 0.15 * randomFactors[i];
        
        posArray[i3] = ix + (ix / radius) * offset;
        posArray[i3 + 1] = iy + (iy / radius) * offset;
        posArray[i3 + 2] = iz + (iz / radius) * offset;
      }
      posAttr.needsUpdate = true;

      // Rotate sphere continuously
      particles.rotation.y = time * 0.05 + currentX * 0.3;
      particles.rotation.x = time * 0.02 + currentY * 0.3;

      // Spin ring in different direction
      ringParticles.rotation.y = -time * 0.08 + currentX * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas || !renderer || !camera) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      material.dispose();
      ringMaterial.dispose();
      geometry.dispose();
      ringGeometry.dispose();
    };
  }, []);

  const handleResumeDownload = () => {
    // Trigger tracking in background
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "resume", label: "Hero Resume Button" }),
    }).catch((err) =>
      console.error("Failed to track resume download:", err)
    );

    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Subham_Tomar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center px-6 sm:px-12 md:px-24 py-20"
    >
      {/* 3D WebGL Background Canvas */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-full max-h-full block opacity-70 md:opacity-85"
        />
      </div>

      {/* Foreground copy content */}
      <div className="relative z-20 w-full max-w-6xl flex flex-col md:grid md:grid-cols-12 gap-8 items-center justify-center">
        <div className="md:col-span-8 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-mono font-semibold tracking-wider"
          >
            <span>AVAILABLE FOR HIRE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight leading-none text-white uppercase"
            >
              SUBHAM{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500">
                TOMAR
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-3xl font-medium text-gray-300 font-sans tracking-wide"
            >
              Software Engineer | AI/ML Specialist
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl leading-relaxed"
          >
            I design and build dynamic digital experiences, translating complex AI and machine learning architectures into clean, performant, and premium products.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all duration-300 cursor-pointer"
              >
                Explore My Work
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>
            </Magnetic>

            <Magnetic>
              <button
                onClick={handleResumeDownload}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 hover:border-amber-500/40 bg-white/5 hover:bg-amber-500/10 text-white hover:text-amber-300 font-bold text-sm transition-all duration-300 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Empty space for Three.js sphere to shine on desktop */}
        <div className="md:col-span-4 hidden md:block" />
      </div>

      {/* Dynamic bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            Scroll to discover
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-amber-500 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
