import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, XCircle, Minus } from "lucide-react"
import { formatDate, formatTime, formatDuration } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { FocusSession } from "@/lib/types"

interface SessionCardProps {
  session: FocusSession
}

export function SessionCard({ session }: SessionCardProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      label: "Concluída",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    interrupted: {
      icon: XCircle,
      label: "Interrompida",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    skipped: {
      icon: Minus,
      label: "Pulada",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
  }

  const config = statusConfig[session.status]
  const Icon = config.icon

  return (
    <Card className={cn("border-2", config.borderColor)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            {/* Header */}
            <div className="flex items-center gap-2">
              <Icon className={cn("w-5 h-5", config.color)} />
              <Badge variant="secondary" className={cn(config.bgColor, config.color)}>
                {config.label}
              </Badge>
              {session.pointsEarned > 0 && (
                <Badge variant="secondary" className="bg-indigo-50 text-indigo-600">
                  +{session.pointsEarned} pts
                </Badge>
              )}
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(session.durationMinutes)}</span>
            </div>

            {/* Prompt */}
            {session.promptUsed && (
              <p className="text-sm text-muted-foreground italic line-clamp-2">"{session.promptUsed}"</p>
            )}
          </div>

          {/* Date/Time */}
          <div className="text-right text-sm">
            <p className="font-medium">{formatDate(session.startTime)}</p>
            <p className="text-muted-foreground">{formatTime(session.startTime)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
