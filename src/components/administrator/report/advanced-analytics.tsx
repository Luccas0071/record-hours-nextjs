"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface TimeEntry {
  id: string
  user_id: string
  date: string
  hours: number
  description: string
  profiles?: {
    full_name: string | null
    email: string
  }
}

interface Profile {
  id: string
  full_name: string | null
  email: string
}

interface AdvancedAnalyticsProps {
  entries: TimeEntry[]
  employees: Profile[]
}

export function AdvancedAnalytics({ entries, employees }: AdvancedAnalyticsProps) {
  // Calculate weekly trend
  const last12Weeks = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (11 - i) * 7)
    return date
  })

  const weeklyData = last12Weeks.map((weekStart) => {
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    const weekEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entryDate >= weekStart && entryDate <= weekEnd
    })

    const totalHours = weekEntries.reduce((sum, entry) => sum + Number(entry.hours), 0)

    return {
      week: `Sem ${12 - last12Weeks.indexOf(weekStart)}`,
      hours: Number(totalHours.toFixed(1)),
    }
  })

  // Calculate hours distribution by employee
  const hoursByEmployee = entries.reduce(
    (acc, entry) => {
      const name = entry.profiles?.full_name || entry.profiles?.email || "Desconhecido"
      if (!acc[name]) {
        acc[name] = 0
      }
      acc[name] += Number(entry.hours)
      return acc
    },
    {} as Record<string, number>,
  )

  const distributionData = Object.entries(hoursByEmployee)
    .map(([name, hours]) => ({
      name: name.split(" ")[0],
      value: Number(hours.toFixed(1)),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)

  const COLORS = ["hsl(var(--primary))", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"]

  // Calculate trend
  const recentWeeks = weeklyData.slice(-4)
  const olderWeeks = weeklyData.slice(-8, -4)
  const recentAvg = recentWeeks.reduce((sum, w) => sum + w.hours, 0) / recentWeeks.length
  const olderAvg = olderWeeks.reduce((sum, w) => sum + w.hours, 0) / olderWeeks.length
  const trend = recentAvg - olderAvg
  const trendPercent = olderAvg > 0 ? ((trend / olderAvg) * 100).toFixed(1) : "0"

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
          <CardTitle>Tendência Semanal</CardTitle>
          <CardDescription>Evolução das horas trabalhadas nas últimas 12 semanas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            {trend > 0 ? (
              <>
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">+{trendPercent}% vs 4 semanas anteriores</span>
              </>
            ) : trend < 0 ? (
              <>
                <TrendingDown className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-600">{trendPercent}% vs 4 semanas anteriores</span>
              </>
            ) : (
              <>
                <Minus className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Sem mudança</span>
              </>
            )}
          </div>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-hours)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-hours)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="var(--color-hours)"
                  fillOpacity={1}
                  fill="url(#colorHours)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Horas</CardTitle>
          <CardDescription>Proporção de horas por funcionário (Top 8)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
