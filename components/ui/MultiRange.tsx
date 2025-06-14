import React, { useCallback, useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface MultiRangeSliderProps {
  min?: number
  max?: number
  step?: number
  colorClass?: string
  widthClass?: string
  onChange?: (values: [number, number]) => void
}

export function MultiRangeSlider({
  min = 0,
  max = 100,
  step = 1,
  colorClass = "bg-cyan-500",
  widthClass = "w-64",
  onChange,
}: MultiRangeSliderProps) {
  const [minVal, setMinVal] = useState<number>(min)
  const [maxVal, setMaxVal] = useState<number>(max)
  const minValRef = useRef<number>(min)
  const maxValRef = useRef<number>(max)
  const range = useRef<HTMLDivElement | null>(null)

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxValRef.current)
    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent])

  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)
    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent])

  useEffect(() => {
    onChange?.([minVal, maxVal])
  }, [minVal, maxVal, onChange])

  return (
    <div className={cn("relative", widthClass)}>
      {/* Slider track */}
      <div className="absolute w-full h-1.5 rounded-full bg-gray-300" />
      {/* Slider range filled */}
      <div
        ref={range}
        className={cn("absolute h-1.5 rounded-full", colorClass)}
        style={{ left: "0%", width: "100%" }}
      />

      {/* Left thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={e => {
          const value = Math.min(Number(e.target.value), maxVal - 1)
          setMinVal(value)
          minValRef.current = value
        }}
        aria-label="Min range"
        className={cn("absolute w-full appearance-none pointer-events-none z-20 bottom-0")}
        style={{ background: "none" }}
      />

      {/* Right thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={e => {
          const value = Math.max(Number(e.target.value), minVal + 1)
          setMaxVal(value)
          maxValRef.current = value
        }}
        aria-label="Max range"
        className={cn("absolute w-full appearance-none pointer-events-none z-10 bottom-0")}
        style={{ background: "none" }}
      />

      {/* Styling for thumbs */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          background: #ffffff;
          border: 2px solid ${colorClass.startsWith("bg-") ? "" : ""} #666;
          border-radius: 50%;
          height: 18px;
          width: 18px;
          pointer-events: all;
          cursor: pointer;
          margin-top: -6px;
        }
        input[type='range']::-moz-range-thumb {
          background: #ffffff;
          border: 2px solid #666;
          border-radius: 50%;
          height: 18px;
          width: 18px;
          pointer-events: all;
          cursor: pointer;
        }
      `}</style>

      {/* Display Values */}
      <div className="flex justify-between mt-2">
        <span>{minVal}</span>
        <span>{maxVal}</span>
      </div>
    </div>
  )
}
