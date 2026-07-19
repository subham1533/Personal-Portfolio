"use client";

import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

export default function FloatingResumeButton() {
  const triggerDownload = () => {
    // Trigger tracking in background
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "resume", label: "Floating Resume Button" }),
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
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3.5, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-8 left-8 z-40 hidden md:block"
    >
      <button
        onClick={triggerDownload}
        className="group relative flex items-center gap-2 px-4 py-4 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white backdrop-blur-md shadow-2xl hover:border-amber-500/40 hover:bg-amber-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <FileDown className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-sm font-semibold tracking-wide block whitespace-nowrap">
          Resume
        </span>
      </button>
    </motion.div>
  );
}
