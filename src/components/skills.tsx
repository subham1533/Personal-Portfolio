"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const skillCategories = [
  {
    id: "programming",
    title: "Programming",
    glowColor: "group-hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    titleColor: "text-blue-400",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 70 },
      { name: "SQL", level: 90 },
      { name: "JavaScript", level: 70 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    glowColor: "group-hover:border-indigo-500/30 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    titleColor: "text-indigo-400",
    skills: [
      { name: "React", level: 65 },
      { name: "Next.js", level: 65 },
      { name: "HTML", level: 90 },
      { name: "CSS", level: 80 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    glowColor: "group-hover:border-emerald-500/30 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    titleColor: "text-emerald-400",
    skills: [
      { name: "Node.js", level: 70 },
      { name: "Express", level: 70 },
      { name: "MongoDB", level: 75 },
      { name: "REST API", level: 85 },
    ],
  },
  {
    id: "aiml",
    title: "AI & ML",
    glowColor: "group-hover:border-pink-500/30 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
    titleColor: "text-pink-400",
    skills: [
      { name: "Scikit Learn", level: 85 },
      { name: "Pandas", level: 88 },
      { name: "NumPy", level: 85 },
      { name: "Matplotlib", level: 80 },
      { name: "NLP", level: 80 },
      { name: "Deep Learning", level: 80 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    glowColor: "group-hover:border-amber-500/30 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    titleColor: "text-amber-400",
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 88 },
      { name: "VS Code", level: 90 },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories =
    activeCategory === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="py-24 px-8 md:px-24 bg-black text-white relative z-20">
      {/* Background neon glows */}
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-emerald-900/10 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight flex items-center gap-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Technical Skills
          </span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </h2>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                : "bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            All Fields
          </button>
          {skillCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
                activeCategory === c.id
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-pink-500/30 text-white shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                  : "bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Categories Grid (Interactive Cards Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIdx * 0.05 }}
              className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 shadow-xl group flex flex-col justify-between ${cat.glowColor}`}
            >
              <div>
                <h3 className={`text-xl font-bold mb-6 tracking-wide pb-2 border-b border-white/5 flex items-center justify-between ${cat.titleColor}`}>
                  <span>{cat.title}</span>
                  <span className="text-xs font-mono opacity-40">0{catIdx + 1}</span>
                </h3>

                {/* Grid of skill pills */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300 cursor-default"
                    >
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-[10px] font-mono bg-white/10 text-gray-400 px-2 py-0.5 rounded-md">
                        {skill.level}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
