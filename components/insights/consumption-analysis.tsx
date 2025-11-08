"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Zap, RefreshCw } from "lucide-react"
import { llmAPI } from "@/lib/api"
import type { ConsumptionInsight } from "@/lib/types"

export function ConsumptionAnalysis() {
  const [insight, setInsight] = useState<ConsumptionInsight>({
    velocity: "moderate",
    recommendation: "Seu ritmo de consumo está equilibrado. Continue assim!",
    weeklyTrend: 5,
    riskLevel: "low",
  })
  const [loading, setLoading] = useState(false)

  const loadAnalysis = async () => {
    setLoading(true)
    try {
      const { analysis, insights } = await llmAPI.getConsumptionAnalysis()
      // Parse analysis into structured data
      setInsight({
        velocity: "moderate",
        recommendation: analysis,
        weeklyTrend: 5,
        riskLevel: "low",
      })
    } catch (error) {
      console.error("Failed to load consumption analysis:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAnalysis()
  }, [])

  const getVelocityColor = (velocity: string) => {
    switch (velocity) {
      case "slow":
        return "text-green-600 bg-green-50"
      case "moderate":
        return "text-blue-600 bg-blue-50"
      case "fast":
        return "text-amber-600 bg-amber-50"
      case "very_fast":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <CheckCircle className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Análise de Ritmo de Consumo
            </CardTitle>
            <CardDescription>Insights sobre o comportamento digital do seu filho</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={loadAnalysis} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Velocidade Atual</p>
            <Badge className={getVelocityColor(insight.velocity)}>
              {insight.velocity === "slow" && "Lento"}
              {insight.velocity === "moderate" && "Moderado"}
              {insight.velocity === "fast" && "Rápido"}
              {insight.velocity === "very_fast" && "Muito Rápido"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {getRiskIcon(insight.riskLevel)}
            {insight.weeklyTrend > 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recomendação Personalizada</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{insight.recommendation}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Tendência Semanal</p>
            <p className="text-2xl font-bold text-primary">+{insight.weeklyTrend}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Nível de Risco</p>
            <p className="text-2xl font-bold capitalize">
              {insight.riskLevel === "low" && "Baixo"}
              {insight.riskLevel === "medium" && "Médio"}
              {insight.riskLevel === "high" && "Alto"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
