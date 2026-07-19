import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    title: "Oracle Cloud Infrastructure Generative AI Certified Professional",
    issuer: "Oracle",
    date: "January 2026",
    image: "/cert_oracle.png",
    credentialUrl: "https://catalog-education.oracle.com/apex/f?p=1010:2:102580356743624::::P2_AUTHCODE,P2_AUTH_KEY,P2_ARG_INVALID_CNT:%20Kv276666Di30h,QygGN276594Mkhz8293gijr,1",
  },
  {
    id: 2,
    title: "Google Prompting Essentials",
    issuer: "Google",
    date: "February 2026",
    image: "/cert_google_prompt.png",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/O44GJHI3B1LW",
  },
  {
    id: 3,
    title: "Google AI Essentials",
    issuer: "Google",
    date: "March 2026",
    image: "/cert_google_ai.png",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/C66GCCRRL4AL",
  },
];

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && activeIndex < certifications.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (info.offset.x > swipeThreshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <section id="certifications" className="py-24 px-8 md:px-24 bg-black text-white relative z-20 overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-900/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight flex items-center gap-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Certifications
          </span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </h2>

        {/* Certifications Grid (Desktop) */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              {/* Card visual effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="space-y-4">
                {/* Certificate Image Container */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Metadata */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    {cert.issuer}
                  </div>
                  <h3 className="font-bold text-lg text-gray-200 leading-snug group-hover:text-amber-300 transition-colors duration-300">
                    {cert.title}
                  </h3>
                </div>
              </div>

              {/* Date & Button */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {cert.date}
                </div>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 hover:bg-amber-500/10 hover:border-amber-500/20 text-gray-400 hover:text-white transition-all duration-300"
                >
                  Verify
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Carousel (Mobile/Tablet) */}
        <div className="md:hidden relative w-full flex flex-col items-center">
          <div className="w-full overflow-hidden relative min-h-[380px]">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex w-full cursor-grab active:cursor-grabbing"
            >
              {certifications.map((cert) => (
                <div key={cert.id} className="w-full shrink-0 px-2 select-none">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between min-h-[360px] shadow-xl relative overflow-hidden">
                    <div className="space-y-4">
                      {/* Certificate Image Container - width 100%, height auto-adapting */}
                      <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Metadata */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                          <Award className="w-3.5 h-3.5" />
                          {cert.issuer}
                        </div>
                        <h3 className="font-bold text-base text-gray-200 leading-snug">
                          {cert.title}
                        </h3>
                      </div>
                    </div>

                    {/* Date & Button */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {cert.date}
                      </div>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-all duration-300"
                      >
                        Verify
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls & Pagination Dots */}
          <div className="flex items-center justify-between w-full mt-6 px-4">
            <button
              onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {certifications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-amber-500 w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => activeIndex < certifications.length - 1 && setActiveIndex(activeIndex + 1)}
              disabled={activeIndex === certifications.length - 1}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
