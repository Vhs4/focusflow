"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authAPI } from "@/lib/api"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "contatovhs4@gmail.com",
    password: "focusflow2025",
  })

  useEffect(() => {
    const autoLogin = async () => {
      setLoading(true)
      try {
        const response = await authAPI.login(formData)
        localStorage.setItem("auth_token", response.access_token)
        localStorage.setItem("user", JSON.stringify(response.user))
        router.push("/dashboard")
      } catch (err: any) {
        // If auto-login fails, just show the form
        setLoading(false)
      }
    }
    autoLogin()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await authAPI.login(formData)
      localStorage.setItem("auth_token", response.access_token)
      localStorage.setItem("user", JSON.stringify(response.user))
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login. Verifique suas credenciais.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-md space-y-8 animate-slide-up">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-flow shadow-lg">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground">FocusFlow</h1>
          <p className="text-muted-foreground">Seu treinador de foco digital</p>
        </div>

        {/* Login Card */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-display">Bem-vindo de volta!</CardTitle>
            <CardDescription>Entre com suas credenciais para continuar sua jornada</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">{error}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    disabled={loading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-flow hover:opacity-90 transition-opacity text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Não tem uma conta? </span>
                <Link href="/register" className="text-primary font-medium hover:underline">
                  Criar conta
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">10k+</p>
            <p className="text-xs text-muted-foreground">Usuários</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-emerald-600">95%</p>
            <p className="text-xs text-muted-foreground">Satisfação</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-amber-600">2M+</p>
            <p className="text-xs text-muted-foreground">Sessões</p>
          </div>
        </div>
      </div>
    </div>
  )
}
