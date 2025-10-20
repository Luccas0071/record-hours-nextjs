"use client"

import { Button } from "@/components/ui/button"
import { Clock, FileText, Home } from "lucide-react"
// import { AdminMetrics } from "@/components/admin-metrics"
// import { AdminCharts } from "@/components/admin-charts"
// import { AdminTimeEntryTable } from "@/components/admin-time-entry-table"
import Link from "next/link"
import { getStoredTimeEntries, mockUsers } from "@/lib/mock-data"
import { AdminMetrics } from "./admin-metrics"
import { AdminCharts } from "./admin-charts"
import { AdminTimeEntryTable } from "./admin-time-entry-table"

export default function AdministratorPage() {
  const timeEntries = getStoredTimeEntries()
  const employees = mockUsers

  return (
    <div className="min-h-svh bg-gradient-to-br from-slate-50 to-slate-100">

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Visão completa de horas trabalhadas e métricas da equipe</p>
        </div>

        <div className="space-y-6">
          <AdminMetrics entries={timeEntries} employees={employees} />
          <AdminCharts entries={timeEntries} />
          <AdminTimeEntryTable entries={timeEntries} employees={employees} />
        </div>
      </main>
    </div>
  )
}
