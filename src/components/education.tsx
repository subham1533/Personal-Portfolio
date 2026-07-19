"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, MapPin } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-8 md:px-24 bg-black text-white relative z-20">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-900/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight flex items-center gap-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Education
          </span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </h2>

        {/* Timeline container */}
        <div className="relative border-l border-white/10 pl-6 ml-2 sm:pl-8 sm:ml-4 md:ml-12 space-y-12">
          {/* Vertical line fill animation */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent origin-top"
          />

          {/* Timeline Item 1 */}
          <div className="relative">
            {/* Timeline Dot Indicator */}
            <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black border border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
            </span>

            {/* Academic Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-blue-500/30 transition-all duration-300 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-blue-500/10 pointer-events-none">
                <GraduationCap className="w-24 h-24" />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    Bachelor of Technology
                  </h3>
                  <p className="text-blue-400 font-semibold mt-1">Information Technology</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs font-mono text-blue-300 w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  Expected Graduation: 2027
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-200">Pranveer Singh Institute of Technology (PSIT)</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      Kanpur, Uttar Pradesh
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-gray-400">Academic Score: </span>
                    <span className="font-bold text-emerald-400 font-mono">7.5 CGPA</span>
                  </div>
                </div>
              </div>

              {/* Decorative side color strip */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
