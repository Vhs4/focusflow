"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { ConsumptionReport } from "@/components/health/consumption-report"
import { SleepRoutineGenerator } from "@/components/health/sleep-routine-generator"
import { PredictiveAlerts } from "@/components/health/predictive-alerts"
import { CognitiveChatbot } from "@/components/chatbot/cognitive-chatbot"
import { Heart } from "lucide-react"

export default function WellnessPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Sidebar />

      <div className="flex-1 md:ml-64 pb-20 md:pb-8">
        <Header />

        <main className="container px-4 py-6 space-y-6 max-w-4xl mx-auto">
          <div className="space-y-2 animate-slide-up">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-red-500" />
              <h1 className="text-3xl font-display font-bold">Saúde Integrativa</h1>
            </div>
            <p className="text-muted-foreground">Ferramentas baseadas em IA para melhorar seu bem-estar digital</p>
          </div>

          <div className="space-y-6">
            <div className="animate-slide-up">
              <PredictiveAlerts />
            </div>

            <div className="animate-slide-up">
              <ConsumptionReport />
            </div>

            <div className="animate-slide-up">
              <SleepRoutineGenerator />
            </div>
          </div>
        </main>

        <CognitiveChatbot />
        <Navigation />
      </div>
    </div>
  )
}
