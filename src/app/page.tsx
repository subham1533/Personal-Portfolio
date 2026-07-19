"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/Loader";
import Navbar from "@/components/navbar";
import ParticlesBackground from "@/components/particlesbackground";
import Hero3D from "@/components/hero3d";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import GithubDashboard from "@/components/githubdashboard";
import Certifications from "@/components/certifications";
import Achievements from "@/components/achievements";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import FloatingResumeButton from "@/components/floatingresumebutton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="global-loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-black min-h-screen select-none relative"
        >
          {/* Canvas particle dust field (glowing tech theme) */}
          <ParticlesBackground />

          {/* Core Sticky Nav Bar */}
          <Navbar />

          {/* Hero Canvas 3D Particle Constellation */}
          <Hero3D />

          {/* Portfolio content sections */}
          <About />
          <Skills />
          <Projects />
          <GithubDashboard />
          <Certifications />
          <Achievements />
          <Education />
          <Contact />

          {/* Footer Section */}
          <Footer />

          {/* Sticky Left Corner Resume Button */}
          <FloatingResumeButton />
        </motion.main>
      )}
    </>
  );
}
