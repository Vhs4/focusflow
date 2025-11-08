"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getLevelProgress } from "@/lib/utils"
import { Trophy } from "lucide-react"

interface LevelProgressProps {
  flowPoints: number
}

export function LevelProgress({ flowPoints }: LevelProgressProps) {
  const { currentLevel, nextLevel, progress } = getLevelProgress(flowPoints)

  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-600" />
          Seu Nível
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{currentLevel.icon}</div>
            <div>
              <p className="font-bold text-lg" style={{ color: currentLevel.color }}>
                {currentLevel.name}
              </p>
              <p className="text-sm text-muted-foreground">{flowPoints} Pontos de Fluxo</p>
            </div>
          </div>
        </div>

        {/* Progress to Next Level */}
        {nextLevel && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Próximo nível</span>
              <span className="font-medium">
                {nextLevel.name} {nextLevel.icon}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              {nextLevel.minPoints - flowPoints} pontos restantes
            </p>
          </div>
        )}

        {/* Max Level Reached */}
        {!nextLevel && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
            <p className="text-sm font-medium text-emerald-900">Você alcançou o nível máximo!</p>
            <p className="text-xs text-emerald-700 mt-1">Continue mantendo seu foco e inspire outros</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
