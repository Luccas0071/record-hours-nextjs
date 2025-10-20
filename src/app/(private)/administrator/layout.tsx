

import { MonthSummary } from "@/components/collaborator/month-summary";
import { TimeEntryForm } from "@/components/collaborator/time-entry-form";
import { TimeEntryList } from "@/components/collaborator/time-entry-list";
import { Button } from "@/components/ui/button"
import { getStoredTimeEntries } from "@/lib/mock-data";
import { Clock, FileText, Home, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Gerenciador de Horas</span>
            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/administrator/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/administrator/report">
                <FileText className="h-4 w-4 mr-2" />
                Relatórios
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Início
              </Link>
            </Button>
          </div>
        </div>
      </header>

    {children}
  </div>
  );
}