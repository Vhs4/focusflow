import type { User, FocusSession, LoginCredentials, RegisterData, AuthResponse } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

// Helper function to make authenticated requests
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken()

  // Mock API responses ONLY for auth/sessions (NOT for LLM)
  if (url === "/auth/login") {
    const body = JSON.parse(options.body as string)
    if (body.email === "contatovhs4@gmail.com") {
      return {
        access_token: "demo-token-12345",
        user: MOCK_USER,
      }
    }
  }

  if (url === "/users/me") {
    return MOCK_USER
  }

  if (url === "/sessions/stats") {
    return {
      totalSessions: 18,
      totalMinutes: 450,
      completionRate: 89,
      streak: 5,
    }
  }

  if (url.startsWith("/sessions") && !url.includes("llm")) {
    return MOCK_SESSIONS
  }

  // For ALL other routes (including LLM), make real API calls
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}/api${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || "Request failed")
  }

  return response.json()
}

// Auth API
export const authAPI = {
  async register(data: RegisterData): Promise<AuthResponse> {
    return fetchWithAuth("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  async getProfile(): Promise<User> {
    return fetchWithAuth("/users/me")
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    return fetchWithAuth("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },
}

// Sessions API
export const sessionsAPI = {
  async createSession(session: Omit<FocusSession, "_id">): Promise<FocusSession> {
    return fetchWithAuth("/sessions", {
      method: "POST",
      body: JSON.stringify(session),
    })
  },

  async getSessions(limit?: number): Promise<FocusSession[]> {
    const query = limit ? `?limit=${limit}` : ""
    return fetchWithAuth(`/sessions${query}`)
  },

  async getSessionStats(): Promise<{
    totalSessions: number
    totalMinutes: number
    completionRate: number
    streak: number
  }> {
    return fetchWithAuth("/sessions/stats")
  },
}

// LLM API - REAL CALLS TO NEXT.JS API ROUTES (NO MOCKS)
export const llmAPI = {
  async getReflectionPrompt(context?: Record<string, any>): Promise<{ prompt: string }> {
    return fetchWithAuth("/llm/prompt", {
      method: "POST",
      body: JSON.stringify({ context }),
    })
  },

  async getSleepRoutine(data: {
    sleepQuality?: string
    screenTimeHours?: number
    wakeUpFeeling?: string
  }): Promise<{ routine: string }> {
    return fetchWithAuth("/llm/sleep-routine", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async getConsumptionAnalysis(data?: {
    sessions?: FocusSession[]
    stats?: {
      totalSessions: number
      totalMinutes: number
      completionRate: number
      streak: number
    }
    behaviorData?: {
      videoSpeed?: string
      contentSkipping?: string
      multitasking?: string
      notes?: string
    }
  }): Promise<{ analysis: string; insights: string[] }> {
    return fetchWithAuth("/llm/consumption-analysis", {
      method: "POST",
      body: JSON.stringify(data || {}),
    })
  },
}

// Mock data for demo user Victor Hugo
const MOCK_USER = {
  _id: "demo-user-001",
  fullName: "Victor Hugo",
  email: "contatovhs4@gmail.com",
  phoneNumber: "22999999999",
  flowPoints: 450,
  currentLevel: "Focado",
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date(),
}

const MOCK_SESSIONS: FocusSession[] = [
  {
    _id: "session-001",
    userId: "demo-user-001",
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    durationMinutes: 25,
    status: "completed",
    pointsEarned: 25,
    promptUsed: "Qual é o seu objetivo principal para esta sessão?",
  },
  {
    _id: "session-002",
    userId: "demo-user-001",
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 23.5 * 60 * 60 * 1000),
    durationMinutes: 25,
    status: "completed",
    pointsEarned: 25,
  },
  {
    _id: "session-003",
    userId: "demo-user-001",
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 47.5 * 60 * 60 * 1000),
    durationMinutes: 25,
    status: "completed",
    pointsEarned: 25,
  },
]

// Challenges API
export const challengesAPI = {
  async getChallenges(): Promise<any[]> {
    return fetchWithAuth("/challenges")
  },

  async joinChallenge(challengeId: string): Promise<any> {
    return fetchWithAuth(`/challenges/${challengeId}/join`, {
      method: "POST",
    })
  },
}

// Chatbot API
export const chatbotAPI = {
  async sendMessage(message: string): Promise<{ response: string }> {
    return fetchWithAuth("/chatbot/message", {
      method: "POST",
      body: JSON.stringify({ message }),
    })
  },
}

// Notifications API
export const notificationsAPI = {
  async getNotifications(): Promise<any[]> {
    return fetchWithAuth("/notifications")
  },

  async markAsRead(notificationId: string): Promise<void> {
    return fetchWithAuth(`/notifications/${notificationId}/read`, {
      method: "PUT",
    })
  },
}