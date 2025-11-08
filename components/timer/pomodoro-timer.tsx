"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { DEFAULT_TIMER_CONFIG, type TimerConfig } from "@/lib/types"

interface PomodoroTimerProps {
  onSessionComplete: (durationMinutes: number) => void
  reflectionPrompt?: string
}

export function PomodoroTimer({ onSessionComplete, reflectionPrompt }: PomodoroTimerProps) {
  const [config] = useState<TimerConfig>(DEFAULT_TIMER_CONFIG)
  const [timeLeft, setTimeLeft] = useState(config.focusDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<Date | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const handleTimerComplete = () => {
    setIsRunning(false)

    if (!isBreak) {
      // Focus session completed
      const duration = config.focusDuration
      onSessionComplete(duration)
      setSessionsCompleted((prev) => prev + 1)

      // Play completion sound (optional)
      if (typeof window !== "undefined" && "Notification" in window) {
        new Notification("FocusFlow", {
          body: "Sessão de foco concluída! Hora de uma pausa.",
          icon: "/icon-192.png",
        })
      }

      // Start break
      const isLongBreak = (sessionsCompleted + 1) % config.sessionsUntilLongBreak === 0
      setTimeLeft(isLongBreak ? config.longBreakDuration * 60 : config.breakDuration * 60)
      setIsBreak(true)
    } else {
      // Break completed
      if (typeof window !== "undefined" && "Notification" in window) {
        new Notification("FocusFlow", {
          body: "Pausa concluída! Pronto para focar novamente?",
          icon: "/icon-192.png",
        })
      }

      setTimeLeft(config.focusDuration * 60)
      setIsBreak(false)
    }
  }

  const handleStart = () => {
    if (!startTimeRef.current) {
      startTimeRef.current = new Date()
    }
    setIsRunning(true)

    // Request notification permission
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(config.focusDuration * 60)
    setIsBreak(false)
    startTimeRef.current = null
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = isBreak
    ? ((config.breakDuration * 60 - timeLeft) / (config.breakDuration * 60)) * 100
    : ((config.focusDuration * 60 - timeLeft) / (config.focusDuration * 60)) * 100

  return (
    <Card className="p-6 space-y-6">
      {/* Timer Display */}
      <div className="relative">
        <div className="flex items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Progress Circle */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className={cn("transition-all duration-1000", isBreak ? "text-emerald-500" : "text-indigo-500")}
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold font-mono">{formatTime(timeLeft)}</span>
              <span className="text-sm text-muted-foreground mt-2">{isBreak ? "Pausa" : "Foco"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <Button
          size="lg"
          onClick={isRunning ? handlePause : handleStart}
          className={cn("w-32", isBreak ? "bg-gradient-success" : "bg-gradient-flow")}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Pausar
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Iniciar
            </>
          )}
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={handleReset}
          disabled={!isRunning && timeLeft === config.focusDuration * 60}
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Session Counter */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: config.sessionsUntilLongBreak }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              i < sessionsCompleted % config.sessionsUntilLongBreak ? "bg-indigo-500" : "bg-muted",
            )}
          />
        ))}
      </div>

      {/* Reflection Prompt */}
      {reflectionPrompt && !isRunning && !isBreak && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg space-y-2 animate-slide-up">
          <p className="text-sm font-medium text-indigo-900">Reflexão antes de começar:</p>
          <p className="text-sm text-indigo-700 italic">{reflectionPrompt}</p>
        </div>
      )}
    </Card>
  )
}
