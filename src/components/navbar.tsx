"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FileText } from "lucide-react";
import { Magnetic } from "./cursor";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Scroll state change for background blur
    setScrolled(latest > 50);

    // Hide/Show navbar on scroll down/up
    if (latest > lastY && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastY(latest);
  });

  const handleResumeDownload = (e: React.MouseEvent) => {
    // Automatically trigger PDF download
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Subham_Tomar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
          ? "py-4 bg-black/60 border-b border-white/5 backdrop-blur-md shadow-xl"
          : "py-6 bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-extrabold text-lg tracking-wider text-white select-none">
          SUBHAM<span className="text-purple-500"> TOMAR</span>
        </a>

        {/* Navigation Anchors */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Resume Action */}
        <Magnetic>
          <button
            onClick={handleResumeDownload}
            className="flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-purple-500/30 hover:border-purple-500/60 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-semibold shadow-lg shadow-purple-500/5 hover:shadow-purple-500/15 transition-all duration-300"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </button>
        </Magnetic>
      </div>
    </motion.nav>
  );
}
