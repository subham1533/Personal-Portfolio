"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, FileText, Send, CheckCircle2 } from "lucide-react";
import { Github, Linkedin, Twitter } from "./socialicons";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset back to form after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    } catch (error) {
      console.error("Failed to submit contact message:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResumeDownload = () => {
    // Trigger tracking in background
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "resume", label: "Contact Section Resume Button" }),
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

  const handleContactLinkClick = (id: string, label: string) => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: id === "email" ? "email_link" : "social_link",
        label: `${label} Click`,
      }),
    }).catch((err) =>
      console.error("Failed to track contact link click:", err)
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contacts = [
    {
      id: "email",
      label: "Email",
      value: "subham15331@gmail.com",
      href: "mailto:subham15331@gmail.com",
      icon: Mail,
      color: "hover:text-amber-400 hover:border-amber-500/30",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/subham-tomar-b03b66363",
      href: "https://www.linkedin.com/in/subham-tomar-b03b66363/",
      icon: Linkedin,
      color: "hover:text-amber-400 hover:border-amber-500/30",
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/subham1533",
      href: "https://github.com/subham1533",
      icon: Github,
      color: "hover:text-orange-400 hover:border-orange-500/30",
    },
    {
      id: "twitter",
      label: "Twitter",
      value: "twitter.com/Subham1533",
      href: "https://x.com/Subham1533",
      icon: Twitter,
      color: "hover:text-amber-300 hover:border-amber-400/30",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 md:px-24 bg-black text-white relative z-20">
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-amber-900/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight flex items-center gap-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Get In Touch
          </span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Card (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 text-amber-300">Connect With Me</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Have a project idea, question, or just want to connect? Reach out via social media or submit the form.
              </p>

              <div className="space-y-4">
                {contacts.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.id}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleContactLinkClick(c.id, c.label)}
                      className={`flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 text-gray-300 transition-all duration-300 ${c.color}`}
                    >
                      <div className="p-2.5 rounded-lg bg-black/40 text-inherit">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="block text-xs text-gray-500 uppercase font-mono tracking-wider">
                          {c.label}
                        </span>
                        <span className="block text-sm font-semibold truncate">{c.value}</span>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Resume download button */}
              <div className="mt-8">
                <button
                  onClick={handleResumeDownload}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-extrabold shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 transition-all duration-300 cursor-pointer"
                >
                  <FileText className="w-5 h-5" />
                  Download Resume
                </button>
              </div>
            </div>
          </div>

          {/* Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative min-h-[480px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/50 text-white placeholder-gray-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/50 text-white placeholder-gray-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/50 text-white placeholder-gray-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                      className="text-emerald-400"
                    >
                      <CheckCircle2 className="w-20 h-20" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                    <p className="text-gray-400 text-sm max-w-sm">
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
