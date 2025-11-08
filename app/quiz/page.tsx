"use client"

import { useState } from "react"
import Image from "next/image"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, XCircle, Brain, BarChart3, Zap, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Sidebar } from "@/components/layout/sidebar"

interface Quiz {
    id: number
    question: string
    imageQuestion: string
    options: { id: string; image: string }[]
    correct: string
}

const quizzes: Quiz[] = [
    {
        id: 1,
        question: "O que faz mais sentido para o ponto de interrogação?",
        imageQuestion: "/quiz1-pergunta.png",
        options: [
            { id: "A", image: "/quiz1-A.png" },
            { id: "B", image: "/quiz1-B.png" },
            { id: "C", image: "/quiz1-C.png" },
            { id: "D", image: "/quiz1-D.png" },
            { id: "E", image: "/quiz1-E.png" },
            { id: "F", image: "/quiz1-F.png" },
        ],
        correct: "B",
    },
    {
        id: 2,
        question: "Qual figura completa a sequência lógica?",
        imageQuestion: "/quiz2-pergunta.png",
        options: [
            { id: "A", image: "/quiz2-A.png" },
            { id: "B", image: "/quiz2-B.png" },
            { id: "C", image: "/quiz2-C.png" },
            { id: "D", image: "/quiz2-D.png" },
        ],
        correct: "D",
    },
]

export default function VisualQuizPage() {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({})
    const [showResults, setShowResults] = useState(false)

    const handleSelect = (quizId: number, optionId: string) => {
        if (!showResults) {
            setAnswers({ ...answers, [quizId]: optionId })
        }
    }

    const handleFinish = () => {
        if (Object.keys(answers).length === quizzes.length) setShowResults(true)
        else alert("Responda todas as perguntas antes de finalizar.")
    }

    const total = quizzes.length
    const correctAnswers = Object.entries(answers).filter(([id, value]) => {
        const quiz = quizzes.find((q) => q.id === Number(id))
        return quiz && quiz.correct === value
    }).length

    const focusPercentage = Math.round((correctAnswers / total) * 100)

    const getFocusFeedback = () => {
        if (focusPercentage === 100)
            return "Excelente! Seu foco está em nível máximo — atenção total aos detalhes!"
        if (focusPercentage >= 70)
            return "Muito bom! Você demonstra ótima percepção visual e consistência cognitiva."
        if (focusPercentage >= 40)
            return "Bom esforço! Seu foco é mediano, mas pode melhorar com pausas e prática de atenção plena."
        return "Seu foco parece disperso. Experimente técnicas de respiração e tente novamente com calma."
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Menu lateral */}
            <Sidebar />
            {/* Conteúdo principal */}
            <main className="flex-1 flex flex-col items-center py-10 px-4 md:px-10">
                <div className="w-full max-w-3xl space-y-10">
                    {/* Card principal do quiz */}
                    <Card className="border-2 shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Brain className="w-5 h-5 text-blue-600" />
                                <div>
                                    <CardTitle>Teste de Raciocínio Visual</CardTitle>
                                    <CardDescription>
                                        Escolha a figura que melhor completa cada padrão
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-10">
                            {quizzes.map((quiz) => {
                                const selected = answers[quiz.id]
                                const isCorrect = selected === quiz.correct

                                return (
                                    <div key={quiz.id} className="space-y-4">
                                        <p className="text-lg font-medium text-gray-800">
                                            {quiz.question}
                                        </p>

                                        <div className="flex justify-center">
                                            <Image
                                                src={quiz.imageQuestion}
                                                alt={`Pergunta ${quiz.id}`}
                                                width={400}
                                                height={200}
                                                className="rounded-lg border"
                                            />
                                        </div>

                                        {/* Opções */}
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 justify-items-center">
                                            {quiz.options.map((option) => {
                                                const isSelected = selected === option.id
                                                const isRightAnswer = quiz.correct === option.id

                                                // após finalizar, destaca as corretas e erradas
                                                const borderStyle = showResults
                                                    ? isRightAnswer
                                                        ? "border-green-500 bg-green-50"
                                                        : isSelected
                                                            ? "border-red-400 bg-red-50"
                                                            : "border-transparent"
                                                    : isSelected
                                                        ? "border-blue-500 bg-blue-50"
                                                        : "border-transparent"

                                                return (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => handleSelect(quiz.id, option.id)}
                                                        disabled={showResults}
                                                        className={`rounded-xl border-2 p-1 hover:opacity-90 transition ${borderStyle}`}
                                                    >
                                                        <Image
                                                            src={option.image}
                                                            alt={`Opção ${option.id}`}
                                                            width={70}
                                                            height={70}
                                                            className="rounded-md"
                                                        />
                                                        <p className="text-xs text-gray-600 text-center mt-1">
                                                            {option.id}
                                                        </p>
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        {/* Resultado individual */}
                                        {showResults && (
                                            <div
                                                className={`mt-3 flex items-center gap-2 text-sm font-medium ${isCorrect ? "text-green-600" : "text-red-600"
                                                    }`}
                                            >
                                                {isCorrect ? (
                                                    <>
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        <span>Correto!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="w-4 h-4" />
                                                        <span>
                                                            Errado — Resposta correta:{" "}
                                                            <strong>{quiz.correct}</strong>
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                        <Separator className="my-6" />
                                    </div>
                                )
                            })}

                            {!showResults && (
                                <div className="flex justify-center">
                                    <Button
                                        onClick={handleFinish}
                                        className="px-8 py-5 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Finalizar Quiz
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Card de resultado cognitivo */}
                    {showResults && (
                        <Card className="border-2 shadow-md animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-amber-500" />
                                    <div>
                                        <CardTitle>Resultado Cognitivo</CardTitle>
                                        <CardDescription>
                                            Análise personalizada do seu desempenho e foco visual
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Zap className="w-5 h-5 text-amber-600" />
                                        <h4 className="font-semibold text-amber-900">
                                            Nível de Foco
                                        </h4>
                                    </div>
                                    <Progress value={focusPercentage} className="h-3 mb-2" />
                                    <p className="text-sm text-amber-800 font-medium">
                                        {focusPercentage}% de foco alcançado
                                    </p>
                                </div>

                                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Eye className="w-4 h-4 text-blue-600" />
                                        <h4 className="font-semibold text-blue-900">
                                            Feedback Cognitivo
                                        </h4>
                                    </div>
                                    <p className="text-sm text-blue-800 leading-relaxed">
                                        {getFocusFeedback()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    )
}
