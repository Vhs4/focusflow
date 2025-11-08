"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Moon, Sparkles, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { llmAPI } from "@/lib/api"

export function SleepRoutineGenerator() {
  const [loading, setLoading] = useState(false)
  const [routine, setRoutine] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    sleepQuality: "fair",
    screenTimeBeforeBed: 2,
    wakeUpFeeling: "tired",
  })

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    setRoutine(null)

    try {
      const { routine: generatedRoutine } = await llmAPI.getSleepRoutine({
        sleepQuality: formData.sleepQuality,
        screenTimeHours: formData.screenTimeBeforeBed,
        wakeUpFeeling: formData.wakeUpFeeling,
      })

      if (!generatedRoutine) {
        throw new Error("Nenhuma rotina foi gerada")
      }

      setRoutine(generatedRoutine)
    } catch (err) {
      console.error("Failed to generate routine:", err)
      setError("Não foi possível gerar a rotina. Tente novamente.")

      // Set fallback routine
      setRoutine(`Rotina de Desligamento Personalizada:

1. **2 horas antes de dormir**: Reduza o brilho das telas ao mínimo
2. **1.5 horas antes**: Ative o modo noturno em todos os dispositivos
3. **1 hora antes**: Última checagem de mensagens importantes
4. **45 minutos antes**: Desligue todas as telas
5. **30 minutos antes**: Leitura leve ou meditação guiada
6. **15 minutos antes**: Exercícios de respiração (4-7-8)
7. **Na cama**: Diário de gratidão (3 coisas boas do dia)

💡 Dica: Seu uso de ${formData.screenTimeBeforeBed}h de tela antes de dormir pode estar impactando sua qualidade de sono. Tente reduzir gradualmente.`)
    } finally {
      setLoading(false)
    }
  }

  const getScreenTimeWarning = () => {
    if (formData.screenTimeBeforeBed >= 3) {
      return "⚠️ Alto uso de telas antes de dormir"
    }
    if (formData.screenTimeBeforeBed >= 1.5) {
      return "⚡ Uso moderado de telas"
    }
    return "✅ Baixo uso de telas"
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-blue-500" />
          <div>
            <CardTitle>Rotina de Desligamento Dinâmica</CardTitle>
            <CardDescription>Gere uma rotina noturna personalizada com IA</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label>Como você avalia sua qualidade de sono?</Label>
            <RadioGroup
              value={formData.sleepQuality}
              onValueChange={(value) => setFormData({ ...formData, sleepQuality: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poor" id="sleep-poor" />
                <Label htmlFor="sleep-poor" className="font-normal cursor-pointer">
                  Ruim (acordo cansado)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fair" id="sleep-fair" />
                <Label htmlFor="sleep-fair" className="font-normal cursor-pointer">
                  Regular
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="sleep-good" />
                <Label htmlFor="sleep-good" className="font-normal cursor-pointer">
                  Boa
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excellent" id="sleep-excellent" />
                <Label htmlFor="sleep-excellent" className="font-normal cursor-pointer">
                  Excelente
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Horas de tela antes de dormir</Label>
              <span className="text-xs text-muted-foreground">{getScreenTimeWarning()}</span>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={[formData.screenTimeBeforeBed]}
                onValueChange={(value) => setFormData({ ...formData, screenTimeBeforeBed: value[0] })}
                max={6}
                min={0}
                step={0.5}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-primary w-16 text-right">
                {formData.screenTimeBeforeBed}h
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Tempo médio usando telas nas 3 horas antes de dormir
            </p>
          </div>

          <div className="space-y-3">
            <Label>Como você acorda?</Label>
            <RadioGroup
              value={formData.wakeUpFeeling}
              onValueChange={(value) => setFormData({ ...formData, wakeUpFeeling: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exhausted" id="wake-exhausted" />
                <Label htmlFor="wake-exhausted" className="font-normal cursor-pointer">
                  Exausto
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tired" id="wake-tired" />
                <Label htmlFor="wake-tired" className="font-normal cursor-pointer">
                  Cansado
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="refreshed" id="wake-refreshed" />
                <Label htmlFor="wake-refreshed" className="font-normal cursor-pointer">
                  Descansado
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button onClick={handleGenerate} disabled={loading} className="w-full" size="lg">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Gerando Rotina Personalizada...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Rotina Personalizada
            </>
          )}
        </Button>

        {error && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800">{error}</p>
          </div>
        )}

        {routine && (
          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg space-y-3 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <h4 className="font-semibold text-blue-900">Sua Rotina Personalizada</h4>
                <div className="text-sm text-blue-800 leading-relaxed whitespace-pre-line">
                  {routine}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}