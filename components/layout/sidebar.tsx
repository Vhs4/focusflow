"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  History,
  User,
  Trophy,
  Heart,
  Palette,
  Menu,
  X,
  BrainCircuit,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/wellness", icon: Heart, label: "Saúde Integrativa" },
    { href: "/challenges", icon: Trophy, label: "Desafios" },
    { href: "/history", icon: History, label: "Histórico" },
    { href: "/profile", icon: User, label: "Perfil" },
    { href: "/design-system", icon: Palette, label: "Design System" },
  ]

  return (
    <>
      {/* Botão Mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-background/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-5 h-5 transition-transform rotate-90" />
        ) : (
          <Menu className="w-5 h-5 transition-transform" />
        )}
      </Button>

      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-background border-r border-border transition-transform duration-300 ease-in-out shadow-xl md:shadow-none",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-border">
            <div className="w-10 h-10 rounded-lg bg-gradient-flow flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl">FocusFlow</h1>
              <p className="text-xs text-muted-foreground">Treinador de Foco</p>
            </div>
          </div>

          {/* 🔥 Destaque do Quiz */}
          <Link
            href="/quiz"
            onClick={() => setIsOpen(false)}
            className="m-4 flex items-center gap-3 rounded-lg border-2 border-amber-300 bg-amber-50 p-3 shadow-sm hover:shadow-md transition-all hover:bg-amber-100 animate-pulse-slow"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 flex items-center justify-center shadow">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-900 leading-tight">
                O teste de progresso semanal está disponível!
              </p>
              <p className="text-xs text-amber-700">Toque para iniciar agora 🎯</p>
            </div>
          </Link>

          {/* Navegação padrão */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground hover:scale-102",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Perfil */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-flow flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-semibold">VH</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Victor Hugo</p>
                <p className="text-xs text-muted-foreground truncate">Nível 3 - Focado</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
