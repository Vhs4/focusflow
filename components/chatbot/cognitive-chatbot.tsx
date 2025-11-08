"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Loader2, X } from "lucide-react"
import { chatbotAPI } from "@/lib/api"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function CognitiveChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou seu assistente de foco. Como posso ajudá-lo hoje?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showQuickActions, setShowQuickActions] = useState(true)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleQuickAction = async (action: string) => {
    let message = ""
    switch (action) {
      case "breathing":
        message = "Me ensine uma técnica de respiração para acalmar"
        break
      case "mindfulness":
        message = "Como praticar mindfulness agora?"
        break
      case "focus":
        message = "Preciso de ajuda para focar"
        break
      case "break":
        message = "Como fazer uma pausa efetiva?"
        break
    }

    setInput(message)
    setShowQuickActions(false)
    await handleSendMessage(message)
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input
    if (!textToSend.trim() || loading) return

    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const { response } = await chatbotAPI.sendMessage(textToSend)
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Failed to send message:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Desculpe, não consegui processar sua mensagem. Tente novamente.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleSend = () => handleSendMessage()

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-gradient-flow shadow-lg hover:opacity-90 z-50"
      >
        <Bot className="w-6 h-6 text-white" />
      </Button>
    )
  }

  return (
    <Card
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-[calc(100vw-2rem)] md:w-96 h-[80vh] md:h-[500px] shadow-2xl z-50 flex flex-col"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-flow flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-lg">Assistente de Foco</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Scroll principal */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                  }`}
              >
                <p className="text-sm break-words">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          {showQuickActions && messages.length === 1 && (
            <div className="space-y-2 pt-2">
              <p className="text-xs text-muted-foreground text-center">Ações rápidas:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction("breathing")}
                  className="text-xs h-auto py-2"
                >
                  💨 Respiração
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction("mindfulness")}
                  className="text-xs h-auto py-2"
                >
                  🧘 Mindfulness
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction("focus")}
                  className="text-xs h-auto py-2"
                >
                  🎯 Foco
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction("break")}
                  className="text-xs h-auto py-2"
                >
                  ☕ Pausa
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Input fixo no rodapé */}
        <div className="p-4 border-t sticky bottom-0 bg-background">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Digite sua mensagem..."
              disabled={loading}
            />
            <Button onClick={handleSend} disabled={loading || !input.trim()} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
