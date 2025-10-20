import { Button } from "@/components/ui/button"
import { Clock, BarChart3, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Gerenciador de Horas</span>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/collaborator/dashboard">Área do Funcionário</Link>
            </Button>
            <Button asChild>
              <Link href="/administrator/dashboard">Área Administrativa</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-balance mb-6">
            Gerencie as horas trabalhadas da sua equipe
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Sistema completo para registro e análise de horas trabalhadas com métricas detalhadas de produtividade
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/collaborator/dashboard">Acessar Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/administrator/dashboard">Área Admin</Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Registro Simples</h3>
              <p className="text-muted-foreground">
                Funcionários registram suas horas diárias de forma rápida e intuitiva
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Métricas Detalhadas</h3>
              <p className="text-muted-foreground">
                Visualize produtividade, médias e tendências com gráficos interativos
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gestão Completa</h3>
              <p className="text-muted-foreground">
                Administradores têm acesso total a relatórios e análises da equipe
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white/80 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 TimeTracker. Sistema de gerenciamento de horas trabalhadas.
        </div>
      </footer>
    </div>
  )
}
