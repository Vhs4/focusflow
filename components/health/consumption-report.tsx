"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, AlertTriangle, Loader2 } from "lucide-react"
import { llmAPI, sessionsAPI } from "@/lib/api"

export function ConsumptionReport() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ analysis: string; insights: string[] } | null>(null)
  const [formData, setFormData] = useState({
    videoSpeed: "normal",
    contentSkipping: "sometimes",
    multitasking: "rarely",
    additionalNotes: "",
  })

  const handleSubmit = async () => {
    setLoading(true)
    setResult(null)

    try {
      // Buscar dados reais de sessões e stats
      const sessions = await sessionsAPI.getSessions(10)
      const stats = await sessionsAPI.getSessionStats()

      // Chamar a API com os dados completos
      const response = await llmAPI.getConsumptionAnalysis({
        sessions,
        stats,
        behaviorData: {
          videoSpeed: formData.videoSpeed,
          contentSkipping: formData.contentSkipping,
          multitasking: formData.multitasking,
          notes: formData.additionalNotes,
        }
      })

      setResult(response)
    } catch (error) {
      console.error("Failed to analyze consumption:", error)

      // Fallback em caso de erro
      setResult({
        analysis: "Não foi possível gerar a análise. Tente novamente.",
        insights: [
          "Verifique sua conexão com a internet",
          "Certifique-se de que a chave da OpenAI está configurada",
          "Tente novamente em alguns instantes"
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <div>
            <CardTitle>Análise de Ritmo de Consumo</CardTitle>
            <CardDescription>Reporte seu comportamento de consumo de mídia</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label>Você costuma acelerar vídeos?</Label>
            <RadioGroup
              value={formData.videoSpeed}
              onValueChange={(value) => setFormData({ ...formData, videoSpeed: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="always" id="speed-always" />
                <Label htmlFor="speed-always" className="font-normal cursor-pointer">
                  Sempre (1.5x ou mais)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sometimes" id="speed-sometimes" />
                <Label htmlFor="speed-sometimes" className="font-normal cursor-pointer">
                  Às vezes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="speed-normal" />
                <Label htmlFor="speed-normal" className="font-normal cursor-pointer">
                  Raramente/Nunca
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Com que frequência você pula partes do conteúdo?</Label>
            <RadioGroup
              value={formData.contentSkipping}
              onValueChange={(value) => setFormData({ ...formData, contentSkipping: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="always" id="skip-always" />
                <Label htmlFor="skip-always" className="font-normal cursor-pointer">
                  Sempre
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sometimes" id="skip-sometimes" />
                <Label htmlFor="skip-sometimes" className="font-normal cursor-pointer">
                  Às vezes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rarely" id="skip-rarely" />
                <Label htmlFor="skip-rarely" className="font-normal cursor-pointer">
                  Raramente
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Você faz multitarefa enquanto consome conteúdo?</Label>
            <RadioGroup
              value={formData.multitasking}
              onValueChange={(value) => setFormData({ ...formData, multitasking: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="always" id="multi-always" />
                <Label htmlFor="multi-always" className="font-normal cursor-pointer">
                  Sempre
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sometimes" id="multi-sometimes" />
                <Label htmlFor="multi-sometimes" className="font-normal cursor-pointer">
                  Às vezes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rarely" id="multi-rarely" />
                <Label htmlFor="multi-rarely" className="font-normal cursor-pointer">
                  Raramente
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações adicionais (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Ex: Sinto que preciso consumir tudo rapidamente..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              rows={3}
            />
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full" size="lg">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analisando seu comportamento...
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4 mr-2" />
              Gerar Análise Personalizada
            </>
          )}
        </Button>

        {result && (
          <div className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            {/* Análise Principal */}
            <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
              <div className="flex items-start gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">Análise do Ritmo de Consumo</h4>
                  <p className="text-sm text-amber-800 leading-relaxed">{result.analysis}</p>
                </div>
              </div>
              <Badge className="bg-amber-600 text-white">Detox de Velocidade Recomendado</Badge>
            </div>

            {/* Insights */}
            {result.insights && result.insights.length > 0 && (
              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Insights Personalizados
                </h4>
                <ul className="space-y-2">
                  {result.insights.map((insight, index) => (
                    <li key={index} className="flex gap-2 text-sm text-blue-800">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}