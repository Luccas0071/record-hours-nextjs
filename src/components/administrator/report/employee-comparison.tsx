"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

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

interface EmployeeComparisonProps {
  entries: TimeEntry[]
  employees: Profile[]
}

export function EmployeeComparison({ entries, employees }: EmployeeComparisonProps) {
  // Calculate statistics per employee
  const employeeStats = employees.map((employee) => {
    const employeeEntries = entries.filter((entry) => entry.user_id === employee.id)
    const totalHours = employeeEntries.reduce((sum, entry) => sum + Number(entry.hours), 0)
    const totalDays = employeeEntries.length
    const averageHours = totalDays > 0 ? totalHours / totalDays : 0

    // Calculate consistency (standard deviation)
    const hoursArray = employeeEntries.map((e) => Number(e.hours))
    const mean = averageHours
    const variance = hoursArray.reduce((sum, h) => sum + Math.pow(h - mean, 2), 0) / (hoursArray.length || 1)
    const stdDev = Math.sqrt(variance)
    const consistency = stdDev < 2 ? "Alta" : stdDev < 4 ? "Média" : "Baixa"

    return {
      id: employee.id,
      name: employee.full_name || employee.email,
      totalHours: Number(totalHours.toFixed(1)),
      totalDays,
      averageHours: Number(averageHours.toFixed(1)),
      consistency,
    }
  })

  // Sort by total hours
  const rankedEmployees = employeeStats.sort((a, b) => b.totalHours - a.totalHours)

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />
    return null
  }

  const getConsistencyColor = (consistency: string) => {
    if (consistency === "Alta") return "bg-green-100 text-green-800"
    if (consistency === "Média") return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking e Comparação de Funcionários</CardTitle>
        <CardDescription>Análise comparativa de desempenho e consistência</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Rank</TableHead>
                <TableHead>Funcionário</TableHead>
                <TableHead className="text-right">Total de Horas</TableHead>
                <TableHead className="text-right">Dias Trabalhados</TableHead>
                <TableHead className="text-right">Média/Dia</TableHead>
                <TableHead className="text-center">Consistência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankedEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum dado disponível
                  </TableCell>
                </TableRow>
              ) : (
                rankedEmployees.map((employee, index) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center justify-center">{getRankIcon(index) || index + 1}</div>
                    </TableCell>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">{employee.totalHours}h</TableCell>
                    <TableCell className="text-right">{employee.totalDays}</TableCell>
                    <TableCell className="text-right">{employee.averageHours}h</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className={getConsistencyColor(employee.consistency)}>
                        {employee.consistency}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">Sobre as Métricas</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>
              <strong>Consistência:</strong> Mede a regularidade das horas trabalhadas. Alta = variação baixa, Baixa =
              variação alta.
            </li>
            <li>
              <strong>Média/Dia:</strong> Número médio de horas trabalhadas por dia registrado.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
