"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FolderGit, BrainCircuit, Code2, Cpu } from "lucide-react";

interface AchievementItem {
  id: number;
  label: string;
  targetValue: number;
  suffix: string;
  icon: any;
  color: string;
}

const achievements: AchievementItem[] = [
  {
    id: 1,
    label: "Projects Completed",
    targetValue: 10,
    suffix: "+",
    icon: FolderGit,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    label: "LeetCode Problems",
    targetValue: 300,
    suffix: "+",
    icon: Code2,
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: 3,
    label: "GitHub Commits",
    targetValue: 1000,
    suffix: "+",
    icon: BrainCircuit,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    label: "AI/ML Enthusiast",
    targetValue: 1, // Will represent active status
    suffix: "",
    icon: Cpu,
    color: "from-emerald-500 to-teal-500",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-8 md:px-24 bg-black text-white relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight flex items-center gap-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
            Achievements
          </span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <CounterCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CounterCard({ item, index }: { item: AchievementItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (item.label === "AI/ML Enthusiast") {
      setCount(1);
      return;
    }

    let start = 0;
    const duration = 1.5; // seconds
    const end = item.targetValue;
    const incrementTime = Math.max(10, Math.floor((duration * 1000) / end));

    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // Fast increments
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, item.targetValue, item.label]);

  const IconComponent = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-pink-500/20 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden"
    >
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${item.color} rounded-2xl opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none -z-10`} />

      <div className={`p-4 rounded-full bg-gradient-to-br ${item.color} bg-opacity-20 text-white mb-4 shadow-lg shadow-pink-500/5`}>
        <IconComponent className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-3xl md:text-4xl font-extrabold font-mono text-white tracking-tight flex items-center justify-center">
          {item.label === "AI/ML Enthusiast" ? (
            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Active
            </span>
          ) : (
            <>
              {count}
              <span className="text-pink-500">{item.suffix}</span>
            </>
          )}
        </h3>
        <p className="text-xs md:text-sm text-gray-400 font-medium mt-1">
          {item.label}
        </p>
      </div>
    </motion.div>
  );
}
