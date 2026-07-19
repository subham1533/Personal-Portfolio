"use client";

import { useEffect, useRef } from "react";

interface MouseState {
  x: number;
  y: number;
  radius: number;
}

class Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  speedX: number;
  speedY: number;
  opacity: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 1.5 + 0.5;
    this.baseX = this.x;
    this.baseY = this.y;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.speedY = Math.random() * 0.3 - 0.5; // Drift upwards
    this.opacity = Math.random() * 0.3 + 0.1;
  }

  update(w: number, h: number, mouse: MouseState) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Reset if off screen
    if (this.y < 0) {
      this.y = h;
      this.x = Math.random() * w;
    }
    if (this.x < 0 || this.x > w) {
      this.x = Math.random() * w;
    }

    // Mouse push interaction
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance < mouse.radius) {
      const force = (mouse.radius - distance) / mouse.radius;
      const angle = Math.atan2(dy, dx);
      this.x -= Math.cos(angle) * force * 0.8;
      this.y -= Math.sin(angle) * force * 0.8;
    }
  }

  draw(c: CanvasRenderingContext2D) {
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    c.fillStyle = `rgba(245, 158, 11, ${this.opacity})`; // Gold/Amber tint
    c.fill();
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 45; // Low count for high performance, even lower on mobile
    const mouse: MouseState = { x: -1000, y: -1000, radius: 100 };

    const init = () => {
      particles = [];
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      particles.forEach((p) => {
        p.update(w, h, mouse);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10 bg-transparent"
    />
  );
}
