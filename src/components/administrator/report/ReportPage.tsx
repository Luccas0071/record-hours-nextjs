"use client"

import { Button } from "@/components/ui/button"
import { Clock, LayoutDashboard, Home } from "lucide-react"
import Link from "next/link"

import { getStoredTimeEntries, mockUsers } from "@/lib/mock-data"
import { ExportReport } from "./export-report"
import { ReportsFilters } from "./reports-filters"
import { AdvancedAnalytics } from "./advanced-analytics"
import { EmployeeComparison } from "./employee-comparison"

export default function ReportPage() {
  const timeEntries = getStoredTimeEntries()
  const employees = mockUsers

  return (
    <div className="min-h-svh bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Relatórios e Análises</h1>
            <p className="text-muted-foreground">Análises detalhadas e comparativas da equipe</p>
          </div>
          <ExportReport entries={timeEntries} employees={employees} />
        </div>

        <div className="space-y-6">
          <ReportsFilters />
          <AdvancedAnalytics entries={timeEntries} employees={employees} />
          <EmployeeComparison entries={timeEntries} employees={employees} />
        </div>
      </main>
    </div>
  )
}
