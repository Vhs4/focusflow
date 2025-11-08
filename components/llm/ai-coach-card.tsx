"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2 } from "lucide-react"
import { llmAPI } from "@/lib/api"

export function AICoachCard() {
  const [analysis, setAnalysis] = useState<string>("")
  const [insights, setInsights] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const loadAnalysis = async () => {
    setLoading(true)
    try {
      const data = await llmAPI.getConsumptionAnalysis()
      setAnalysis(data.analysis)
      setInsights(data.insights)
    } catch (error) {
      console.error("Failed to load analysis:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Coach de IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysis && !loading && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Obtenha insights personalizados sobre seu comportamento de foco
            </p>
            <Button onClick={loadAnalysis} className="bg-gradient-flow">
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Análise
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        )}

        {analysis && !loading && (
          <div className="space-y-4">
            <div className="p-3 bg-white rounded-lg border border-indigo-200">
              <p className="text-sm text-foreground">{analysis}</p>
            </div>

            {insights.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Recomendações:</p>
                <ul className="space-y-2">
                  {insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-indigo-600 mt-0.5">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button variant="outline" size="sm" onClick={loadAnalysis} className="w-full bg-transparent">
              Atualizar Análise
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
