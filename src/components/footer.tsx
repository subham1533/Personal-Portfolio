"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin, Twitter } from "./socialicons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/subham1533", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/subham-tomar-b03b66363/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Subham1533", label: "Twitter" },
    { icon: Mail, href: "mailto:subham15331@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-black text-gray-400 py-16 px-4 sm:px-8 md:px-24 border-t border-white/5 overflow-hidden z-20">
      {/* Animated glowing strip at the top of the footer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />

      {/* Decorative moving bg elements */}
      <div className="absolute -bottom-10 left-1/3 w-[300px] h-[300px] rounded-full bg-purple-900/5 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
        {/* Logo and Intro */}
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-xl font-bold text-white tracking-wider">
            SUBHAM<span className="text-purple-500"> TOMAR</span>
          </h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Designing and developing modern AI-driven solutions and web applications.
          </p>
        </div>

        {/* Quick Links Navigation */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-purple-400 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-lg border border-white/5 hover:border-purple-500/20 bg-white/5 hover:bg-purple-500/10 text-gray-400 hover:text-white transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          &copy; {currentYear} Subham Tomar. All rights reserved.
        </div>
        <div className="flex items-center gap-1.5 text-gray-500">
          Made with <span className="text-red-500">❤️</span> by Subham Tomar
        </div>

        {/* Back to Top Button */}
        <motion.button
          whileHover={{ y: -3 }}
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-purple-500/30 bg-white/5 hover:bg-purple-500/10 text-xs font-semibold text-gray-300 hover:text-white transition-all duration-300"
        >
          Back to Top
          <ArrowUp className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </footer>
  );
}
