"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { TimeEntry } from "@/lib/mock-data"

interface AdminChartsProps {
  entries: TimeEntry[]
}

export function AdminCharts({ entries }: AdminChartsProps) {
  // Prepare data for hours by employee chart
  const hoursByEmployee = entries.reduce(
    (acc, entry) => {
      const name = entry.userName || "Desconhecido"
      if (!acc[name]) {
        acc[name] = 0
      }
      acc[name] += Number(entry.hours)
      return acc
    },
    {} as Record<string, number>,
  )

  const employeeData = Object.entries(hoursByEmployee)
    .map(([name, hours]) => ({
      name: name.split(" ")[0], // First name only for better display
      hours: Number(hours.toFixed(1)),
    }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 10) // Top 10 employees

  // Prepare data for daily hours trend (last 30 days)
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return date.toISOString().split("T")[0]
  })

  const dailyHours = last30Days.map((date) => {
    const dayEntries = entries.filter((entry) => entry.date === date)
    const totalHours = dayEntries.reduce((sum, entry) => sum + Number(entry.hours), 0)
    return {
      date: new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      hours: Number(totalHours.toFixed(1)),
    }
  })

  const chartConfig = {
    hours: {
      label: "Horas",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Horas por Funcionário</CardTitle>
          <CardDescription>Top 10 funcionários com mais horas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tendência Diária</CardTitle>
          <CardDescription>Total de horas registradas nos últimos 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyHours}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="hours" stroke="var(--color-hours)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
