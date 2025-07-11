"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"

interface StageProgressProps {
  steps: string[]
  currentStep: number
  isAnimating?: boolean
}

const Spinner = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{ animation: "spin 0.5s linear infinite" }} // 0.5s = fast spin
    className="text-muted-foreground"
  >
    <g transform="translate(12,12)">
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x="-1"
          y="-10"
          width="2"
          height="4"
          rx="1"
          ry="1"
          fill="currentColor"
          opacity={(i + 1) / 12}
          transform={`rotate(${i * 30})`}
        />
      ))}
    </g>
  </svg>
)

export default function StageProgress({
  steps,
  currentStep,
  isAnimating,
}: StageProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="relative"
    >
      {steps.map((step, index) => {
        const isCompleted = currentStep > index
        const isActive = currentStep === index
        const isPending = currentStep < index

        return (
          <div key={index} className="relative">
            <motion.div
              className="flex items-start gap-3 pb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isCompleted || isActive ? 1 : 0.4,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              {/* Step indicator circle */}
              <div className="flex-shrink-0 relative">
                <motion.div
                  className="rounded-full border-2 flex items-center justify-center w-6 h-6"
                  initial={{
                    backgroundColor: "#f3f4f6",
                    borderColor: "#d1d5db",
                  }}
                  animate={{
                    backgroundColor: isCompleted ? "#000000" : "#e7e7e7",
                    borderColor: isCompleted ? "#000000" : "#d1d5db",
                    scale: isActive && isAnimating ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    scale: { duration: 0.6 },
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="dot"
                        className="w-2 h-2 bg-background rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    ) : isActive ? (
                      <motion.div
                        key="spinner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                      >
                        <Spinner />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Step label */}
              <div className="flex-1 min-w-0 pt-1">
                <motion.p
                  className={cn("text-sm leading-relaxed break-words -mt-1", {
                    "animate-pulse": isActive,
                    "text-muted-foreground": isPending,
                  })}
                  transition={{ duration: 0.3 }}
                >
                  {step}
                </motion.p>
              </div>
            </motion.div>

            {/* Vertical connector */}
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
        )
      })}
    </motion.div>
  )
}
