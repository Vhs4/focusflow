"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Calendar, Target } from "lucide-react"
import { challengesAPI } from "@/lib/api"
import type { Challenge } from "@/lib/types"

export function ChallengesSection() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      _id: "challenge-001",
      title: "Maratona de Foco",
      description: "Complete 10 sessões de 25 minutos esta semana",
      type: "weekly",
      goal: 10,
      reward: 100,
      participants: 234,
      endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
    {
      _id: "challenge-002",
      title: "Sequência Perfeita",
      description: "Mantenha uma sequência de 7 dias consecutivos",
      type: "weekly",
      goal: 7,
      reward: 150,
      participants: 156,
      endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      isActive: false,
    },
    {
      _id: "challenge-003",
      title: "Mestre do Mês",
      description: "Acumule 1000 minutos de foco este mês",
      type: "monthly",
      goal: 1000,
      reward: 500,
      participants: 89,
      endsAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      isActive: false,
    },
  ])

  const handleJoinChallenge = async (challengeId: string) => {
    try {
      await challengesAPI.joinChallenge(challengeId)
      setChallenges((prev) =>
        prev.map((c) => (c._id === challengeId ? { ...c, isActive: true, participants: c.participants + 1 } : c)),
      )
    } catch (error) {
      console.error("Failed to join challenge:", error)
    }
  }

  const getDaysRemaining = (endsAt: Date) => {
    const days = Math.ceil((endsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold">Desafios Ativos</h2>
          <p className="text-muted-foreground text-sm">Participe e ganhe pontos extras</p>
        </div>
        <Trophy className="w-8 h-8 text-amber-500" />
      </div>

      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <Card key={challenge._id} className={`border-2 ${challenge.isActive ? "border-primary" : ""}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </div>
                {challenge.isActive && <Badge className="bg-primary text-primary-foreground">Ativo</Badge>}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenge.isActive && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">3 / {challenge.goal}</span>
                  </div>
                  <Progress value={(3 / challenge.goal) * 100} className="h-2" />
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{challenge.participants}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{getDaysRemaining(challenge.endsAt)}d restantes</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-600 font-medium">
                  <Trophy className="w-4 h-4" />
                  <span>+{challenge.reward} pts</span>
                </div>
              </div>

              {!challenge.isActive && (
                <Button
                  onClick={() => handleJoinChallenge(challenge._id)}
                  className="w-full bg-gradient-flow text-white"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Participar do Desafio
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
