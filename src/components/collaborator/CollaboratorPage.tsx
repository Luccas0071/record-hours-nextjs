"use client"

import { MonthSummary } from "@/components/collaborator/month-summary";
import { TimeEntryForm } from "@/components/collaborator/time-entry-form";
import { TimeEntryList } from "@/components/collaborator/time-entry-list";
import { Button } from "@/components/ui/button"
import { currentUser, getStoredTimeEntries } from "@/lib/mock-data";
import { Clock, Home } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react";

export default function CollaboratorPage() {
  const user = currentUser

  const timeEntries = useMemo(() => {
    const allEntries = getStoredTimeEntries()
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    return allEntries.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entry.userId === user.id && entryDate >= firstDay && entryDate <= lastDay
    })
  }, [user.id])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Registro de Horas</h1>
        <p className="text-muted-foreground">Registre suas horas trabalhadas diariamente</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TimeEntryForm />
          <TimeEntryList entries={timeEntries} />
        </div>
        <div>
          <MonthSummary entries={timeEntries} />
        </div>
      </div>
    </main>
  );
}