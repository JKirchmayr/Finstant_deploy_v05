"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface StageProgressProps {
  steps: string[];
  currentStep: number;
  isAnimating?: boolean;
}

export default function StageProgress({
  steps,
  currentStep,
  isAnimating,
}: StageProgressProps) {
  return (
    <div className="relative">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <motion.div
            className={cn("flex items-start gap-4 pb-6 last:pb-0", {
              "-ml-1": index === steps.length - 1,
            })}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: currentStep > index ? 1 : 0.4,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
          >
            <div className="flex-shrink-0 relative">
              <motion.div
                className={`rounded-full border-2 flex items-center justify-center ${
                  index === steps.length - 1 ? "w-8 h-8" : "w-6 h-6"
                }`}
                initial={{
                  backgroundColor: "#f3f4f6",
                  borderColor: "#d1d5db",
                }}
                animate={{
                  backgroundColor: currentStep > index ? "#000000" : "#f3f4f6",
                  borderColor: currentStep > index ? "#000000" : "#d1d5db",
                  scale:
                    currentStep === index + 1 && isAnimating ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  scale: { duration: 0.6 },
                }}
              >
                <AnimatePresence>
                  {currentStep > index && (
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <motion.p
                className="text-sm font-medium leading-relaxed break-words -mt-1"
                animate={{
                  color: currentStep > index ? "#000000" : "#6b7280",
                }}
                transition={{ duration: 0.3 }}
              >
                {step}
              </motion.p>
            </div>
          </motion.div>

          {index < steps.length - 1 && (
            <div className="absolute left-3 top-6 w-px h-6 overflow-hidden">
              <motion.div
                className="w-full h-full bg-gray-300"
                initial={{ scaleY: 0, transformOrigin: "top" }}
                animate={{
                  scaleY: currentStep > index ? 1 : 0,
                  backgroundColor: currentStep > index ? "#000000" : "#d1d5db",
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
