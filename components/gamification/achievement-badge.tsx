import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AchievementBadgeProps {
  title: string
  description: string
  icon: LucideIcon
  unlocked: boolean
  progress?: number
  color?: string
}

export function AchievementBadge({
  title,
  description,
  icon: Icon,
  unlocked,
  progress = 0,
  color = "indigo",
}: AchievementBadgeProps) {
  return (
    <Card className={cn("border-2 transition-all", unlocked ? "border-primary shadow-md" : "border-muted opacity-60")}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("p-3 rounded-lg", unlocked ? `bg-${color}-100` : "bg-muted")}>
            <Icon className={cn("w-6 h-6", unlocked ? `text-${color}-600` : "text-muted-foreground")} />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
            {!unlocked && progress > 0 && (
              <div className="mt-2">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{progress}% completo</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
