"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { AchievementBadge } from "@/components/gamification/achievement-badge"
import { LevelShowcase } from "@/components/gamification/level-showcase"
import { StreakCalendar } from "@/components/gamification/streak-calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Flame, Trophy, Zap, Clock, Star } from "lucide-react"
import { authAPI, sessionsAPI } from "@/lib/api"
import type { User } from "@/lib/types"

export default function AchievementsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    completionRate: 0,
    streak: 0,
  })
  const [sessionsLast7Days, setSessionsLast7Days] = useState<boolean[]>(Array(7).fill(false))

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [userData, statsData] = await Promise.all([authAPI.getProfile(), sessionsAPI.getSessionStats()])
      setUser(userData)
      setStats(statsData)

      // Mock sessions for last 7 days (replace with real data)
      setSessionsLast7Days([true, true, false, true, true, true, true])
    } catch (error) {
      console.error("Failed to load data:", error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    )
  }

  const achievements = [
    {
      title: "Primeira Sessão",
      description: "Complete sua primeira sessão de foco",
      icon: Target,
      unlocked: stats.totalSessions >= 1,
      progress: stats.totalSessions >= 1 ? 100 : 0,
      color: "indigo",
    },
    {
      title: "Maratonista",
      description: "Complete 10 sessões de foco",
      icon: Flame,
      unlocked: stats.totalSessions >= 10,
      progress: Math.min((stats.totalSessions / 10) * 100, 100),
      color: "orange",
    },
    {
      title: "Mestre do Tempo",
      description: "Acumule 500 minutos de foco",
      icon: Clock,
      unlocked: stats.totalMinutes >= 500,
      progress: Math.min((stats.totalMinutes / 500) * 100, 100),
      color: "blue",
    },
    {
      title: "Sequência de Fogo",
      description: "Mantenha uma sequência de 7 dias",
      icon: Zap,
      unlocked: stats.streak >= 7,
      progress: Math.min((stats.streak / 7) * 100, 100),
      color: "yellow",
    },
    {
      title: "Perfeccionista",
      description: "Alcance 90% de taxa de conclusão",
      icon: Star,
      unlocked: stats.completionRate >= 90,
      progress: Math.min((stats.completionRate / 90) * 100, 100),
      color: "purple",
    },
    {
      title: "Lenda do Fluxo",
      description: "Alcance 1000 Pontos de Fluxo",
      icon: Trophy,
      unlocked: user.flowPoints >= 1000,
      progress: Math.min((user.flowPoints / 1000) * 100, 100),
      color: "amber",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 pb-20 md:pb-8">
      <Header title="Conquistas" />

      <main className="container px-4 py-6 space-y-6 max-w-4xl mx-auto">
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
            <TabsTrigger value="levels">Níveis</TabsTrigger>
            <TabsTrigger value="streak">Sequência</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {achievements.map((achievement) => (
                <AchievementBadge key={achievement.title} {...achievement} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="levels" className="space-y-4 mt-6">
            <LevelShowcase currentPoints={user.flowPoints} />
          </TabsContent>

          <TabsContent value="streak" className="space-y-4 mt-6">
            <StreakCalendar streak={stats.streak} sessionsLast7Days={sessionsLast7Days} />
          </TabsContent>
        </Tabs>
      </main>

      <Navigation />
    </div>
  )
}
