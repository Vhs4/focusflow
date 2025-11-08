"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { SessionCard } from "@/components/history/session-card"
import { WeeklyChart } from "@/components/history/weekly-chart"
import { InsightsCard } from "@/components/history/insights-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Clock, TrendingUp, Award } from "lucide-react"
import { sessionsAPI } from "@/lib/api"
import type { FocusSession } from "@/lib/types"

export default function HistoryPage() {
  const [sessions, setSessions] = useState<FocusSession[]>([])
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    completionRate: 0,
    streak: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [sessionsData, statsData] = await Promise.all([sessionsAPI.getSessions(30), sessionsAPI.getSessionStats()])
      setSessions(sessionsData)
      setStats(statsData)
    } catch (error) {
      console.error("Failed to load history:", error)
    } finally {
      setLoading(false)
    }
  }

  // Generate weekly chart data
  const weeklyData = [
    { day: "Dom", sessions: 2, minutes: 50 },
    { day: "Seg", sessions: 3, minutes: 75 },
    { day: "Ter", sessions: 1, minutes: 25 },
    { day: "Qua", sessions: 4, minutes: 100 },
    { day: "Qui", sessions: 3, minutes: 75 },
    { day: "Sex", sessions: 2, minutes: 50 },
    { day: "Sáb", sessions: 1, minutes: 25 },
  ]

  // Generate insights
  const insights = [
    {
      type: "positive" as const,
      message: "Seu filho completou 5 sessões seguidas esta semana! Continue assim.",
    },
    {
      type: "neutral" as const,
      message: "O melhor horário de foco do seu filho é entre 9h e 11h da manhã.",
    },
    {
      type: "positive" as const,
      message: "A taxa de conclusão do seu filho aumentou 15% em relação à semana passada.",
    },
  ]

  if (loading) {
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
        <Header title="Histórico" />

        <main className="container px-4 py-6 space-y-6 max-w-4xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard title="Total de sessões de foco" value={stats.totalSessions} icon={Target} />
            <StatsCard title="Minutos de foco" value={stats.totalMinutes} icon={Clock} />
            <StatsCard title="Taxa de evolução" value={`${stats.completionRate}%`} icon={TrendingUp} />
            <StatsCard title="Pontos" value={stats.totalSessions * 30} icon={Award} />
          </div>

          {/* Weekly Chart */}
          <WeeklyChart data={weeklyData} />

          {/* Insights */}
          <InsightsCard insights={insights} />

          {/* Sessions List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="completed">Concluídas</TabsTrigger>
              <TabsTrigger value="interrupted">Interrompidas</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-6">
              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhuma sessão registrada ainda.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete sua primeira sessão de foco para ver seu histórico aqui!
                  </p>
                </div>
              ) : (
                sessions.map((session) => <SessionCard key={session._id} session={session} />)
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3 mt-6">
              {sessions
                .filter((s) => s.status === "completed")
                .map((session) => (
                  <SessionCard key={session._id} session={session} />
                ))}
            </TabsContent>

            <TabsContent value="interrupted" className="space-y-3 mt-6">
              {sessions
                .filter((s) => s.status === "interrupted")
                .map((session) => (
                  <SessionCard key={session._id} session={session} />
                ))}
            </TabsContent>
          </Tabs>
        </main>

        <Navigation />
      </div>
    </div>
  )
}
