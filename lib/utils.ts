import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { LEVELS, type Level } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get user level based on points
export function getUserLevel(points: number): Level {
  return LEVELS.find((level) => points >= level.minPoints && points <= level.maxPoints) || LEVELS[0]
}

// Calculate progress to next level
export function getLevelProgress(points: number): {
  currentLevel: Level
  nextLevel: Level | null
  progress: number
} {
  const currentLevel = getUserLevel(points)
  const currentIndex = LEVELS.indexOf(currentLevel)
  const nextLevel = currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null

  if (!nextLevel) {
    return { currentLevel, nextLevel: null, progress: 100 }
  }

  const pointsInCurrentLevel = points - currentLevel.minPoints
  const pointsNeededForNextLevel = nextLevel.minPoints - currentLevel.minPoints
  const progress = (pointsInCurrentLevel / pointsNeededForNextLevel) * 100

  return { currentLevel, nextLevel, progress }
}

// Format duration
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) return `${mins}min`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}min`
}

// Format date
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d)
}

// Format time
export function formatTime(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d)
}

// Calculate points earned based on session duration
export function calculatePoints(durationMinutes: number, status: string): number {
  if (status !== "completed") return 0

  // Base points: 1 point per minute
  let points = durationMinutes

  // Bonus for longer sessions
  if (durationMinutes >= 25) points += 5
  if (durationMinutes >= 50) points += 10

  return points
}

// Get greeting based on time of day
export function getGreeting(): string {
  const hour = new Date().getHours()

  if (hour < 12) return "Bom dia"
  if (hour < 18) return "Boa tarde"
  return "Boa noite"
}

// Get motivational message based on level
export function getMotivationalMessage(level: string): string {
  const messages: Record<string, string> = {
    Iniciante: "Cada jornada começa com um único passo. Continue focado!",
    Focado: "Você está no caminho certo! Mantenha o ritmo.",
    Disciplinado: "Sua disciplina está impressionante! Continue assim.",
    "Mestre do Fluxo": "Você dominou a arte do foco. Inspire outros!",
    "Zen Master": "Você alcançou o equilíbrio perfeito. Namastê.",
  }

  return messages[level] || messages["Iniciante"]
}
