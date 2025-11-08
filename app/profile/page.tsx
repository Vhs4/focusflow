"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { UserIcon, Mail, Phone, LogOut, Moon, Bell, Sparkles, Loader2, Save, RefreshCw } from "lucide-react"
import { authAPI, llmAPI } from "@/lib/api"
import { getUserLevel } from "@/lib/utils"
import type { User } from "@/lib/types"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [sleepRoutine, setSleepRoutine] = useState<string>("")
  const [loadingRoutine, setLoadingRoutine] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  })
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEffects: true,
  })

  useEffect(() => {
    loadUserData()
    loadSleepRoutine()
  }, [])

  const loadUserData = async () => {
    try {
      const userData = await authAPI.getProfile()
      setUser(userData)
      setFormData({
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      })
    } catch (error) {
      console.error("Failed to load user data:", error)
      router.push("/login")
    }
  }

  const loadSleepRoutine = async () => {
    setLoadingRoutine(true)
    try {
      const { routine } = await llmAPI.getSleepRoutine()
      setSleepRoutine(routine)
    } catch (error) {
      console.error("Failed to load sleep routine:", error)
      setSleepRoutine(
        "Estabeleça uma rotina de desligamento 30 minutos antes de dormir. Desligue todas as telas e pratique uma atividade relaxante como leitura ou meditação.",
      )
    } finally {
      setLoadingRoutine(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updatedUser = await authAPI.updateProfile(formData)
      setUser(updatedUser)
      alert("Perfil atualizado com sucesso!")
    } catch (error: any) {
      alert(error.message || "Erro ao atualizar perfil")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  const currentLevel = getUserLevel(user.flowPoints)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Sidebar />

      <div className="flex-1 md:ml-64 pb-20 md:pb-8">
        <Header title="Perfil" />

        <main className="container px-4 py-6 space-y-6 max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-flow flex items-center justify-center text-white text-3xl font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-bold">{user.fullName}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl">{currentLevel.icon}</span>
                    <span className="font-semibold" style={{ color: currentLevel.color }}>
                      {currentLevel.name}
                    </span>
                    <span className="text-sm text-muted-foreground">• {user.flowPoints} pontos</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="routine">Rotina</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4 mt-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                  <CardDescription>Atualize suas informações de perfil</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="pl-10"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className="pl-10"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-flow text-white" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Routine Tab */}
            <TabsContent value="routine" className="space-y-4 mt-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-primary" />
                    Rotina de Desligamento
                  </CardTitle>
                  <CardDescription>Rotina personalizada gerada por IA para melhorar seu sono</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loadingRoutine ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900 leading-relaxed whitespace-pre-line">{sleepRoutine}</p>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={loadSleepRoutine}
                    disabled={loadingRoutine}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loadingRoutine ? "animate-spin" : ""}`} />
                    Gerar Nova Rotina
                  </Button>

                  <div className="space-y-3 pt-4">
                    <h4 className="font-semibold text-sm">Dicas para uma boa rotina:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-0.5">✓</span>
                        <span>Desligue todas as telas 30-60 minutos antes de dormir</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-0.5">✓</span>
                        <span>Mantenha o quarto escuro e fresco</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-0.5">✓</span>
                        <span>Pratique técnicas de relaxamento como respiração profunda</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-0.5">✓</span>
                        <span>Evite cafeína e refeições pesadas à noite</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 mt-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Preferências</CardTitle>
                  <CardDescription>Personalize sua experiência no FocusFlow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-muted-foreground" />
                        <Label htmlFor="notifications">Notificações</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Receba lembretes e alertas de sessões</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={settings.notifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-muted-foreground" />
                        <Label htmlFor="darkMode">Modo Escuro</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Ative o tema escuro para reduzir o cansaço visual</p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-muted-foreground" />
                        <Label htmlFor="soundEffects">Efeitos Sonoros</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Sons de conclusão e alertas</p>
                    </div>
                    <Switch
                      id="soundEffects"
                      checked={settings.soundEffects}
                      onCheckedChange={(checked) => setSettings({ ...settings, soundEffects: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
                  <CardDescription>Ações irreversíveis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair da Conta
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <Navigation />
      </div>
    </div>
  )
}
