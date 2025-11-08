// User Types
export interface User {
  _id: string
  fullName: string
  email: string
  phoneNumber: string
  flowPoints: number
  currentLevel: string
  createdAt: Date
  updatedAt: Date
}

// Session Types
export interface FocusSession {
  _id: string
  userId: string
  startTime: Date
  endTime: Date
  durationMinutes: number
  status: "completed" | "interrupted" | "skipped"
  pointsEarned: number
  promptUsed?: string
}

// LLM Interaction Types
export interface LLMInteraction {
  _id: string
  userId: string
  type: "ReflectionPrompt" | "SleepRoutine" | "ConsumptionAnalysis"
  inputContext: Record<string, any>
  llmResponse: string
  timestamp: Date
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  fullName: string
  email: string
  phoneNumber: string
  password: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

// Gamification Types
export interface Level {
  name: string
  minPoints: number
  maxPoints: number
  icon: string
  color: string
}

export const LEVELS: Level[] = [
  { name: "Iniciante", minPoints: 0, maxPoints: 99, icon: "🌱", color: "#a3a3a3" },
  { name: "Focado", minPoints: 100, maxPoints: 299, icon: "🎯", color: "#3b82f6" },
  { name: "Disciplinado", minPoints: 300, maxPoints: 599, icon: "⚡", color: "#8b5cf6" },
  { name: "Mestre do Fluxo", minPoints: 600, maxPoints: 999, icon: "🔥", color: "#f59e0b" },
  { name: "Zen Master", minPoints: 1000, maxPoints: Number.POSITIVE_INFINITY, icon: "🧘", color: "#10b981" },
]

// Timer Types
export interface TimerConfig {
  focusDuration: number // minutes
  breakDuration: number // minutes
  longBreakDuration: number // minutes
  sessionsUntilLongBreak: number
}

export const DEFAULT_TIMER_CONFIG: TimerConfig = {
  focusDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
}

// Ecosystem Features Types
export interface Challenge {
  _id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly"
  goal: number
  reward: number
  participants: number
  endsAt: Date
  isActive: boolean
}

export interface ChatMessage {
  _id: string
  userId: string
  message: string
  response: string
  timestamp: Date
}

export interface Notification {
  _id: string
  userId: string
  type: "achievement" | "reminder" | "challenge" | "insight"
  title: string
  message: string
  isRead: boolean
  createdAt: Date
}

export interface ConsumptionInsight {
  velocity: "slow" | "moderate" | "fast" | "very_fast"
  recommendation: string
  weeklyTrend: number
  riskLevel: "low" | "medium" | "high"
}

export interface Achievement {
  _id: string
  title: string
  description: string
  icon: string
  unlockedAt?: Date
  progress: number
  target: number
}
