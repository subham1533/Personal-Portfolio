"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { ExternalLink, Heart } from "lucide-react";
import { Github } from "./socialicons";

interface Project {
  id: number;
  slug: string;
  title: string;
  desc: string;
  tech: string[];
  features: string[];
  demoUrl: string;
  githubUrl: string;
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    slug: "aegiscrm",
    title: "AegisCRM AI",
    desc: "AI-first Healthcare Professional (HCP) CRM module designed to streamline clinical conversation logs and interactions using AI analytics.",
    tech: ["Python", "FastAPI", "NLP", "Machine Learning"],
    features: ["Clinical log analysis", "AI conversation insights", "HCP interaction tracker", "REST API integration"],
    demoUrl: "https://github.com/subham1533/AegisCRM-AI-First-HCP-Interaction-Management",
    githubUrl: "https://github.com/subham1533/AegisCRM-AI-First-HCP-Interaction-Management",
    gradient: "from-pink-600 via-rose-600 to-red-600",
  },
  {
    id: 2,
    slug: "goaltrack-os",
    title: "GoalTrack OS",
    desc: "Enterprise-grade OKR & goal tracking portal featuring role-based access control (RBAC), weight-balanced goal validations, and AI-driven performance forecasting.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    features: ["Role-based access (RBAC)", "Performance forecasting", "Weight-balanced validations", "Real-time audit logging"],
    demoUrl: "https://github.com/subham1533/goaltrack-os",
    githubUrl: "https://github.com/subham1533/goaltrack-os",
    gradient: "from-amber-600 via-orange-600 to-yellow-600",
  },
  {
    id: 3,
    slug: "netscope",
    title: "NetScope AI",
    desc: "AI-powered Deep Packet Inspection engine designed for real-time traffic classification and machine learning network anomaly detection.",
    tech: ["Python", "FastAPI", "Scikit Learn", "Flow Tracking"],
    features: ["Packet analysis", "Flow tracking", "ML anomaly detection", "Real-time dashboard"],
    demoUrl: "https://github.com/subham1533/NetScope",
    githubUrl: "https://github.com/subham1533/NetScope",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
  },
  {
    id: 4,
    slug: "sigmagpt",
    title: "SigmaGPT",
    desc: "Full-stack AI Chat assistant platform featuring optimistic UI state reflow, markdown formatting, syntax highlighting, and secure proxy routing.",
    tech: ["React 19", "Express", "MongoDB", "Mistral AI"],
    features: ["Optimistic UI states", "Syntax highlighting", "Mistral AI integration", "Secure API proxy routing"],
    demoUrl: "https://github.com/subham1533/SigmaGpt",
    githubUrl: "https://github.com/subham1533/SigmaGpt",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
  },
];

export default function Projects() {
  const [likes, setLikes] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchLikes() {
      try {
        const res = await fetch("/api/projects/likes");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setLikes(data.likes || {});
          }
        }
      } catch (err) {
        console.error("Failed to load project likes:", err);
      }
    }
    fetchLikes();
  }, []);

  const handleLike = async (slug: string) => {
    try {
      const res = await fetch(`/api/projects/${slug}/like`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setLikes((prev) => ({ ...prev, [slug]: data.likes }));
        }
      }
    } catch (err) {
      console.error("Failed to update like count:", err);
    }
  };

  return (
    <section id="projects" className="py-24 px-8 md:px-24 bg-black text-white relative z-20">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full bg-violet-900/10 blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight flex items-center gap-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
            Selected Projects
          </span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              likesCount={likes[project.slug] || 0}
              onLike={() => handleLike(project.slug)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ProjectCard({
  project,
  likesCount,
  onLike,
}: {
  project: Project;
  likesCount: number;
  onLike: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState(false);

  // Mouse positions inside the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center, normalized between -0.5 and 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleDemoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert(`Demo environment for ${project.title} is spinning up. Redirecting to repository details!`);
    window.open(project.githubUrl, "_blank");
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike();
    setLiked(true);
    setTimeout(() => setLiked(false), 800);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-colors duration-500 shadow-2xl flex flex-col justify-between min-h-[380px] p-8"
    >
      {/* 3D Content Container */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 space-y-4">
        {/* Border Glow Gradient */}
        <div className={`absolute -inset-[1px] bg-gradient-to-r ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500 -z-10`} />

        {/* Card Header (Project Title & Tags) */}
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            0{project.id}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {project.desc}
        </p>

        {/* Features Bullet List */}
        <div className="space-y-1.5 pt-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Key Features</span>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
            {project.features.map((feature, i) => (
              <li key={i} className="text-xs text-gray-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer / Tech Tags & Buttons */}
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 pt-6 mt-6 border-t border-white/5 flex flex-col gap-4">
        {/* Technologies used */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Project Links / Action Buttons */}
        <div className="flex gap-3 justify-between items-center mt-2">
          {/* Database backed interactive Like Button */}
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 cursor-pointer ${
              likesCount > 0
                ? "border-pink-500/30 bg-pink-500/5 text-pink-400 hover:bg-pink-500/10"
                : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <motion.div
              animate={liked ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className={`w-4 h-4 ${likesCount > 0 ? "fill-pink-500 text-pink-500" : ""}`} />
            </motion.div>
            <span>{likesCount} Likes</span>
          </button>

          <div className="flex gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={project.demoUrl}
              onClick={handleDemoClick}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 transition-all duration-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
