"use client"

import { NotificationCenter } from "@/components/notifications/notification-center"

interface HeaderProps {
  title?: string
  showNotifications?: boolean
}

export function Header({ title, showNotifications = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-flow flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-display font-bold text-xl">FocusFlow</span>
          </div>
        </div>

        {title && <h1 className="absolute left-1/2 -translate-x-1/2 font-display font-semibold text-lg">{title}</h1>}

        <div className="flex items-center gap-2">{showNotifications && <NotificationCenter />}</div>
      </div>
    </header>
  )
}
