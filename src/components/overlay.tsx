"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [0, 1, 1, 0]);

  const y1 = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

  return (
    <div className="h-full w-full pointer-events-none relative">
      <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-auto">
        <h1 className="text-4xl md:text-7xl font-bold text-white text-center drop-shadow-2xl">
          Subham Tomar. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Software Engineer | AI/ML Enthusiast.
          </span>
        </h1>
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "Subham_Tomar_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-purple-500/30 hover:border-purple-500/60 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-sm font-semibold shadow-lg shadow-purple-500/10 transition-all duration-300 cursor-pointer"
        >
          Download Resume
        </button>
      </motion.div>

      <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-0 flex items-center justify-start px-8 md:px-32 pointer-events-auto">
        <h2 className="text-3xl md:text-6xl font-semibold text-white max-w-2xl drop-shadow-xl">
          I build dynamic digital experiences.
        </h2>
      </motion.div>

      <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute inset-0 flex items-center justify-end px-8 md:px-32 pointer-events-auto">
        <h2 className="text-3xl md:text-6xl font-semibold text-white text-right max-w-2xl drop-shadow-xl">
          Bridging the gap between <span className="text-blue-400">design</span> and <span className="text-emerald-400">engineering</span>.
        </h2>
      </motion.div>
    </div>
  );
}
