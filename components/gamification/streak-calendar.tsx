"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface StreakCalendarProps {
  streak: number
  sessionsLast7Days: boolean[]
}

export function StreakCalendar({ streak, sessionsLast7Days }: StreakCalendarProps) {
  const days = ["D", "S", "T", "Q", "Q", "S", "S"]

  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-600" />
          Sequência de Foco
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Streak Counter */}
        <div className="text-center p-4 bg-gradient-warm rounded-lg">
          <p className="text-4xl font-bold text-white">{streak}</p>
          <p className="text-sm text-white/90 mt-1">dias consecutivos</p>
        </div>

        {/* Last 7 Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div key={index} className="text-center space-y-2">
              <p className="text-xs text-muted-foreground font-medium">{day}</p>
              <div
                className={cn(
                  "w-full aspect-square rounded-lg border-2 transition-all",
                  sessionsLast7Days[index] ? "bg-emerald-500 border-emerald-600" : "bg-muted border-muted",
                )}
              />
            </div>
          ))}
        </div>

        {/* Motivation */}
        <div className="text-center text-sm text-muted-foreground">
          {streak >= 7 ? (
            <p>Incrível! Você está em chamas! 🔥</p>
          ) : streak >= 3 ? (
            <p>Continue assim! Você está construindo um hábito forte.</p>
          ) : (
            <p>Comece sua sequência hoje!</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
