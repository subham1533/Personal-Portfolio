"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { Magnetic } from "./cursor";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Scroll state change for background blur
    setScrolled(latest > 50);

    // Hide/Show navbar on scroll down/up (only when mobile menu is closed)
    if (!isOpen) {
      if (latest > lastY && latest > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
    setLastY(latest);
  });

  const handleResumeDownload = () => {
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
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled || isOpen
            ? "py-4 bg-black/80 border-b border-white/5 backdrop-blur-md shadow-xl"
            : "py-6 bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-extrabold text-lg tracking-wider text-white select-none">
            SUBHAM<span className="text-amber-500"> TOMAR</span>
          </a>

          {/* Navigation Anchors (Desktop) */}
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

          {/* Right Action & Hamburger */}
          <div className="flex items-center gap-4">
            {/* Resume Action */}
            <Magnetic>
              <button
                onClick={handleResumeDownload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-amber-500/30 hover:border-amber-500/60 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold shadow-lg shadow-amber-500/5 hover:shadow-amber-500/15 transition-all duration-300 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                Resume
              </button>
            </Magnetic>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden w-full bg-black/95 backdrop-blur-lg border-b border-white/5 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4 text-base font-semibold">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors py-2 border-b border-white/5 last:border-0"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
