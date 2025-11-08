"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Bell, BellOff, Clock, TrendingUp, X } from "lucide-react"

interface PredictiveAlert {
  id: string
  type: "distraction_peak" | "fatigue" | "break_reminder"
  message: string
  severity: "low" | "medium" | "high"
  predictedTime: Date
  dismissed: boolean
}

export function PredictiveAlerts() {
  const [alerts, setAlerts] = useState<PredictiveAlert[]>([])
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (enabled) {
      loadPredictiveAlerts()
      const interval = setInterval(loadPredictiveAlerts, 300000) // Check every 5 minutes
      return () => clearInterval(interval)
    }
  }, [enabled])

  const loadPredictiveAlerts = async () => {
    const mockAlerts: PredictiveAlert[] = [
      {
        id: "1",
        type: "distraction_peak",
        message: "Detectamos que seu filho costuma se distrair entre 14h-15h. Que tal fazer uma pausa preventiva agora?",
        severity: "medium",
        predictedTime: new Date(Date.now() + 30 * 60 * 1000),
        dismissed: false,
      },
      {
        id: "2",
        type: "break_reminder",
        message: "Seu filho está focado há 90 minutos. O cérebro dele precisa de uma pausa para consolidar o aprendizado.",
        severity: "low",
        predictedTime: new Date(),
        dismissed: false,
      },
    ]

    setAlerts(mockAlerts.filter((a) => !a.dismissed))
  }

  const dismissAlert = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, dismissed: true } : a)).filter((a) => !a.dismissed))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <div>
              <CardTitle>Alertas Preditivos</CardTitle>
              <CardDescription>Prevenção inteligente de distrações</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setEnabled(!enabled)}>
            {enabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {!enabled && (
          <div className="text-center py-8 text-muted-foreground">
            <BellOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Alertas preditivos desativados</p>
          </div>
        )}

        {enabled && alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum alerta no momento</p>
            <p className="text-xs mt-1">Estamos analisando seus padrões...</p>
          </div>
        )}

        {enabled &&
          alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-2 ${getSeverityColor(alert.severity)} space-y-2`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {alert.type === "distraction_peak" && "Pico de Distração"}
                      {alert.type === "fatigue" && "Fadiga"}
                      {alert.type === "break_reminder" && "Lembrete de Pausa"}
                    </Badge>
                    <span className="text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.predictedTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">{alert.message}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 flex-shrink-0"
                  onClick={() => dismissAlert(alert.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}

        {enabled && (
          <div className="pt-2 text-xs text-muted-foreground text-center">
            Os alertas são gerados com base nos seus padrões de uso
          </div>
        )}
      </CardContent>
    </Card>
  )
}
