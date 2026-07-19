"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState("Initializing layers...");

  const statusLogs = [
    "Initializing neural layers...",
    "Loading weights & biases...",
    "Connecting synapse nodes...",
    "Optimizing loss function...",
    "Compiling matrix tensors...",
    "Establishing secure socket...",
    "Synthesizing dynamic viewport...",
    "Ready.",
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds total duration
    const intervalTime = 25;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Cycle status logs
  useEffect(() => {
    const logIndex = Math.min(
      statusLogs.length - 1,
      Math.floor((progress / 100) * statusLogs.length)
    );
    setStatusLog(statusLogs[logIndex]);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center select-none overflow-hidden p-8">
      {/* Background subtle neon glows */}
      <div className="absolute w-[450px] h-[450px] bg-blue-900/5 rounded-full blur-[130px] animate-pulse" />
      <div className="absolute w-[350px] h-[350px] bg-purple-900/5 rounded-full blur-[130px] animate-pulse delay-500" />

      <div className="relative z-10 flex flex-col items-center space-y-8 max-w-sm w-full">
        {/* Loading details & console-style logging */}
        <div className="text-center space-y-4 w-full">
          <div className="space-y-1.5">
            <h2 className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase">
              AI MODEL COMPILER
            </h2>
            <div className="h-5 flex items-center justify-center">
              <span className="text-[10px] font-mono text-purple-400">
                &gt; {statusLog}
              </span>
            </div>
          </div>

          {/* Animated counter percent */}
          <div className="text-5xl font-extrabold font-mono text-white tracking-tight">
            {Math.floor(progress)}<span className="text-blue-500">%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
