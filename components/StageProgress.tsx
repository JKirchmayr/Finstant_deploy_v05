"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"

interface StageProgressProps {
  steps: string[]
  currentStep: number
  isAnimating?: boolean
}

export default function StageProgress({ steps, currentStep, isAnimating }: StageProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="relative"
    >
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <motion.div
            className={cn("flex items-start gap-3 pb-5 ", {})}
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
                className={`rounded-full border-2 flex items-center justify-center w-6 h-6`}
                initial={{
                  backgroundColor: "#f3f4f6",
                  borderColor: "#d1d5db",
                }}
                animate={{
                  backgroundColor: currentStep > index ? "#000000" : "#e7e7e7",
                  borderColor: currentStep > index ? "#000000" : "#d1d5db",
                  scale: currentStep === index + 1 && isAnimating ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  scale: { duration: 0.6 },
                }}
              >
                <AnimatePresence>
                  {currentStep > index ? (
                    <motion.div
                      className="w-2 h-2 bg-background rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="animate-spin"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.25"
                        />
                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <motion.p
                className={cn("text-sm leading-relaxed break-words -mt-1", {
                  "animate-pulse": currentStep <= index,
                })}
                transition={{ duration: 0.3 }}
              >
                {step}
              </motion.p>
            </div>
          </motion.div>

          {index < steps.length - 1 && (
            <div className="absolute left-3 top-6 w-[1.5px] h-5 overflow-hidden">
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
    </motion.div>
  )
}
