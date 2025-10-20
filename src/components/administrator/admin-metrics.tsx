"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users, TrendingUp, Calendar } from "lucide-react"
import type { TimeEntry, User } from "@/lib/mock-data"

interface AdminMetricsProps {
  entries: TimeEntry[]
  employees: User[]
}

export function AdminMetrics({ entries, employees }: AdminMetricsProps) {
  // Calculate metrics
  const totalHours = entries.reduce((sum, entry) => sum + Number(entry.hours), 0)
  const totalEmployees = employees.length
  const averageHoursPerEmployee = totalEmployees > 0 ? totalHours / totalEmployees : 0

  // Get current month entries
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  const currentMonthEntries = entries.filter((entry) => new Date(entry.date) >= firstDay)
  const currentMonthHours = currentMonthEntries.reduce((sum, entry) => sum + Number(entry.hours), 0)

  // Calculate unique working days
  const uniqueDates = new Set(entries.map((entry) => entry.date))
  const totalWorkingDays = uniqueDates.size

  // Calculate productivity (hours per working day)
  const productivity = totalWorkingDays > 0 ? totalHours / totalWorkingDays : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Horas</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
          <p className="text-xs text-muted-foreground">Todas as horas registradas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Funcionários</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEmployees}</div>
          <p className="text-xs text-muted-foreground">Média: {averageHoursPerEmployee.toFixed(1)}h por pessoa</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mês Atual</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentMonthHours.toFixed(1)}h</div>
          <p className="text-xs text-muted-foreground">{currentMonthEntries.length} registros</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Produtividade</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{productivity.toFixed(1)}h</div>
          <p className="text-xs text-muted-foreground">Média por dia trabalhado</p>
        </CardContent>
      </Card>
    </div>
  )
}
