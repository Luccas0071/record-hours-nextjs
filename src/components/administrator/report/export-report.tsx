"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

interface ExportReportProps {
  entries: TimeEntry[]
  employees: Profile[]
}

export function ExportReport({ entries, employees }: ExportReportProps) {
  const exportToCSV = () => {
    const headers = ["Data", "Funcionário", "Email", "Horas", "Descrição"]
    const rows = entries.map((entry) => [
      entry.date,
      entry.profiles?.full_name || "",
      entry.profiles?.email || "",
      entry.hours.toString(),
      entry.description.replace(/,/g, ";"), // Replace commas to avoid CSV issues
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", `relatorio-horas-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportSummaryToCSV = () => {
    const employeeStats = employees.map((employee) => {
      const employeeEntries = entries.filter((entry) => entry.user_id === employee.id)
      const totalHours = employeeEntries.reduce((sum, entry) => sum + Number(entry.hours), 0)
      const totalDays = employeeEntries.length
      const averageHours = totalDays > 0 ? totalHours / totalDays : 0

      return {
        name: employee.full_name || employee.email,
        email: employee.email,
        totalHours: totalHours.toFixed(1),
        totalDays,
        averageHours: averageHours.toFixed(1),
      }
    })

    const headers = ["Funcionário", "Email", "Total de Horas", "Dias Trabalhados", "Média por Dia"]
    const rows = employeeStats.map((stat) => [
      stat.name,
      stat.email,
      stat.totalHours,
      stat.totalDays,
      stat.averageHours,
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", `resumo-funcionarios-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV}>
          <Download className="h-4 w-4 mr-2" />
          Exportar Registros Completos (CSV)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportSummaryToCSV}>
          <Download className="h-4 w-4 mr-2" />
          Exportar Resumo por Funcionário (CSV)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
