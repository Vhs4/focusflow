import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LEVELS } from "@/lib/types"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface LevelShowcaseProps {
  currentPoints: number
}

export function LevelShowcase({ currentPoints }: LevelShowcaseProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">Jornada de Níveis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {LEVELS.map((level, index) => {
          const isUnlocked = currentPoints >= level.minPoints
          const isCurrent = currentPoints >= level.minPoints && currentPoints <= level.maxPoints

          return (
            <div
              key={level.name}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg border-2 transition-all",
                isCurrent && "border-primary bg-indigo-50",
                isUnlocked && !isCurrent && "border-emerald-200 bg-emerald-50",
                !isUnlocked && "border-muted bg-muted/30 opacity-60",
              )}
            >
              <div className="text-3xl">{level.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold" style={{ color: isUnlocked ? level.color : undefined }}>
                    {level.name}
                  </h3>
                  {isUnlocked && <Check className="w-4 h-4 text-emerald-600" />}
                  {isCurrent && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Atual</span>}
                </div>
                <p className="text-xs text-muted-foreground">
                  {level.minPoints} - {level.maxPoints === Number.POSITIVE_INFINITY ? "∞" : level.maxPoints} pontos
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
