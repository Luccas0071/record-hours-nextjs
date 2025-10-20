"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar, TrendingUp } from "lucide-react"

interface TimeEntry {
  id: string
  date: string
  hours: number
  description: string
}

interface MonthSummaryProps {
  entries: TimeEntry[]
}

export function MonthSummary({ entries }: MonthSummaryProps) {
  const totalHours = entries.reduce((sum, entry) => sum + Number(entry.hours), 0)
  const daysWorked = entries.length
  const averageHours = daysWorked > 0 ? totalHours / daysWorked : 0

  const now = new Date()
  const monthName = now.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Resumo do Mês</CardTitle>
        <CardDescription className="capitalize">{monthName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Horas</p>
                <p className="text-2xl font-bold">{totalHours.toFixed(1)}h</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dias Trabalhados</p>
                <p className="text-2xl font-bold">{daysWorked}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Média por Dia</p>
                <p className="text-2xl font-bold">{averageHours.toFixed(1)}h</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="text-sm font-semibold mb-2">Informações</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Registre suas horas diariamente</li>
            <li>• Máximo de 24 horas por dia</li>
            <li>• Você pode editar registros anteriores</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
