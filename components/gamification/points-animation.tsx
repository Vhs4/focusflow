"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

interface PointsAnimationProps {
  points: number
  show: boolean
  onComplete: () => void
}

export function PointsAnimation({ points, show, onComplete }: PointsAnimationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -50, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div className="bg-gradient-flow text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <Plus className="w-6 h-6" />
            <span className="text-2xl font-bold">{points}</span>
            <span className="text-lg">Pontos de Fluxo!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
