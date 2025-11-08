import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface InsightsCardProps {
  insights: Array<{
    type: "positive" | "negative" | "neutral"
    message: string
  }>
}

export function InsightsCard({ insights }: InsightsCardProps) {
  const iconConfig = {
    positive: { icon: TrendingUp, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    negative: { icon: TrendingDown, color: "text-red-600", bgColor: "bg-red-50" },
    neutral: { icon: Minus, color: "text-blue-600", bgColor: "bg-blue-50" },
  }

  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          Insights de Comportamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => {
          const config = iconConfig[insight.type]
          const Icon = config.icon

          return (
            <div key={index} className="flex items-start gap-3">
              <div className={cn("p-2 rounded-lg", config.bgColor)}>
                <Icon className={cn("w-4 h-4", config.color)} />
              </div>
              <p className="text-sm text-muted-foreground flex-1">{insight.message}</p>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
