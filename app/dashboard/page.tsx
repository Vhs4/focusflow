"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { PomodoroTimer } from "@/components/timer/pomodoro-timer"
import { StatsCard } from "@/components/dashboard/stats-card"
import { LevelProgress } from "@/components/dashboard/level-progress"
import { AICoachCard } from "@/components/llm/ai-coach-card"
import { CognitiveChatbot } from "@/components/chatbot/cognitive-chatbot"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Clock, TrendingUp, Sparkles, RefreshCw, Trophy } from "lucide-react"
import { authAPI, sessionsAPI, llmAPI } from "@/lib/api"
import { getGreeting, getMotivationalMessage, calculatePoints } from "@/lib/utils"
import type { User } from "@/lib/types"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [reflectionPrompt, setReflectionPrompt] = useState<string>("")
  const [loadingPrompt, setLoadingPrompt] = useState(false)
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    completionRate: 0,
    streak: 0,
  })

  useEffect(() => {
    loadUserData()
    loadStats()
    loadReflectionPrompt()
  }, [])

  const loadUserData = async () => {
    try {
      const userData = await authAPI.getProfile()
      setUser(userData)
    } catch (error) {
      console.error("Failed to load user data:", error)
      router.push("/login")
    }
  }

  const loadStats = async () => {
    try {
      const statsData = await sessionsAPI.getSessionStats()
      setStats(statsData)
    } catch (error) {
      console.error("Failed to load stats:", error)
    }
  }

  const loadReflectionPrompt = async () => {
    setLoadingPrompt(true)
    try {
      const { prompt } = await llmAPI.getReflectionPrompt({
        timeOfDay: new Date().getHours(),
        userLevel: user?.currentLevel,
      })
      setReflectionPrompt(prompt)
    } catch (error) {
      console.error("Failed to load reflection prompt:", error)
      setReflectionPrompt("Qual é o seu objetivo principal para esta sessão de foco?")
    } finally {
      setLoadingPrompt(false)
    }
  }

  const handleSessionComplete = async (durationMinutes: number) => {
    try {
      const points = calculatePoints(durationMinutes, "completed")
      const session = {
        userId: user!._id,
        startTime: new Date(Date.now() - durationMinutes * 60 * 1000),
        endTime: new Date(),
        durationMinutes,
        status: "completed" as const,
        pointsEarned: points,
        promptUsed: reflectionPrompt,
      }

      await sessionsAPI.createSession(session)

      // Update user points
      const updatedUser = await authAPI.getProfile()
      setUser(updatedUser)

      // Reload stats
      loadStats()

      // Load new prompt for next session
      loadReflectionPrompt()
    } catch (error) {
      console.error("Failed to save session:", error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Sidebar />

      <div className="flex-1 md:ml-64 pb-20 md:pb-8">
        <Header />

        <main className="container px-4 py-6 space-y-6 max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="space-y-2 animate-slide-up">
            <h1 className="text-3xl font-display font-bold">
              {getGreeting()}, {user.fullName.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground">{getMotivationalMessage(user.currentLevel)}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
            <StatsCard
              title="Dia da semana com mais foco"
              value="Quarta-feira"
              icon={Target}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard title="Minutos" value={stats.totalMinutes} icon={Clock} trend={{ value: 8, isPositive: true }} />
            <StatsCard title="Taxa" value={`${stats.completionRate}%`} icon={TrendingUp} />
            <StatsCard title="Sequência de avanços diários" value={`${stats.streak}d`} icon={Sparkles} />
          </div>

          {/* Level Progress */}
          <div className="animate-slide-up">
            <LevelProgress flowPoints={user.flowPoints} />
          </div>

          {/* AI Coach Card */}
          <div className="animate-slide-up">
            <AICoachCard />
          </div>

          {/* Pomodoro Timer */}
          {/* <div className="animate-slide-up">
            <PomodoroTimer onSessionComplete={handleSessionComplete} reflectionPrompt={reflectionPrompt} />
          </div> */}

          {/* Quick Actions */}
          <Card className="border-2 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={loadReflectionPrompt}
                disabled={loadingPrompt}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loadingPrompt ? "animate-spin" : ""}`} />
                Gerar Nova Reflexão
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => router.push("/challenges")}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Ver Desafios Ativos
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => router.push("/history")}
              >
                <Clock className="w-4 h-4 mr-2" />
                Ver Histórico Completo
              </Button>
            </CardContent>
          </Card>
        </main>

        <CognitiveChatbot />

        <Navigation />
      </div>
    </div>
  )
}
