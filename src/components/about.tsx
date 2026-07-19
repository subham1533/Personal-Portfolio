"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: 35 },
        {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  const exploringSkills = [
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "Next.js",
    "Python",
    "React",
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4 sm:px-8 md:px-24 bg-black text-white relative z-20 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-900/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight flex items-center gap-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            About Me
          </span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text/Glass Card Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <h3 className="text-2xl font-semibold mb-4 text-purple-300">
                Hi, I'm Subham Tomar
              </h3>
              
              <p className="text-gray-300 leading-relaxed text-lg mb-4">
                A Software Engineer and AI/ML enthusiast pursuing my B.Tech in Information Technology (Expected 2027).
              </p>
              
              <p className="text-gray-400 leading-relaxed">
                I specialize in building AI-powered applications, Machine Learning models, Full Stack web applications, and modern user experiences. I thrive on translating complex technical concepts into clean, performant, and premium digital products.
              </p>
            </div>

            {/* Currently Exploring Grid */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <h4 className="text-lg font-semibold text-pink-300 mb-4">Currently Exploring:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {exploringSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-center text-gray-300 text-sm font-medium hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Image Column */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              ref={imageRef}
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden group cursor-pointer border border-white/10"
            >
              {/* Outer Glow Effect on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-2xl transition-all duration-500 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              <Image
                src="/avatar.png"
                alt="Subham Tomar Profile Image"
                fill
                sizes="(max-width: 768px) 288px, 320px"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0 duration-500"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
