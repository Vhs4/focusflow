"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface WeeklyChartProps {
  data: Array<{
    day: string
    sessions: number
    minutes: number
  }>
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">Atividade Semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#737373" />
            <YAxis tick={{ fontSize: 12 }} stroke="#737373" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="sessions" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
