export type UserRole = "admin" | "employee"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface TimeEntry {
  id: string
  userId: string
  userName: string
  date: string
  hours: number
  description: string
  createdAt: string
}

// Usuário atual simulado (pode ser alterado para testar diferentes roles)
export const currentUser: User = {
  id: "1",
  name: "Admin User",
  email: "admin@empresa.com",
  role: "admin", // Mude para 'employee' para testar a visão de funcionário
}

// Dados mockados de funcionários
export const mockUsers: User[] = [
  { id: "1", name: "Admin User", email: "admin@empresa.com", role: "admin" },
  { id: "2", name: "João Silva", email: "joao@empresa.com", role: "employee" },
  { id: "3", name: "Maria Santos", email: "maria@empresa.com", role: "employee" },
  { id: "4", name: "Pedro Costa", email: "pedro@empresa.com", role: "employee" },
  { id: "5", name: "Ana Oliveira", email: "ana@empresa.com", role: "employee" },
]

// Gerar dados mockados de registros de tempo
export const generateMockTimeEntries = (): TimeEntry[] => {
  const entries: TimeEntry[] = []
  const today = new Date()

  mockUsers
    .filter((u) => u.role === "employee")
    .forEach((user, userIndex) => {
      // Gerar entradas para os últimos 30 dias
      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        // Nem todos os dias têm registros
        if (Math.random() > 0.3) {
          const hours = 6 + Math.random() * 4 // Entre 6 e 10 horas
          entries.push({
            id: `${user.id}-${i}`,
            userId: user.id,
            userName: user.name,
            date: date.toISOString().split("T")[0],
            hours: Math.round(hours * 10) / 10,
            description: getRandomDescription(),
            createdAt: date.toISOString(),
          })
        }
      }
    })

  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const descriptions = [
  "Desenvolvimento de novas funcionalidades",
  "Correção de bugs e melhorias",
  "Reuniões com equipe e planejamento",
  "Revisão de código e documentação",
  "Testes e validação de features",
  "Atendimento a clientes",
  "Análise de requisitos",
  "Implementação de APIs",
  "Refatoração de código legado",
  "Treinamento e capacitação",
]

function getRandomDescription(): string {
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

// Funções para gerenciar dados no localStorage
const STORAGE_KEY = "time_entries"

export function getStoredTimeEntries(): TimeEntry[] {
  if (typeof window === "undefined") return generateMockTimeEntries()

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }

  const mockData = generateMockTimeEntries()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData))
  return mockData
}

export function saveTimeEntry(entry: Omit<TimeEntry, "id" | "createdAt">): TimeEntry {
  const entries = getStoredTimeEntries()
  const newEntry: TimeEntry = {
    ...entry,
    id: `${entry.userId}-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }

  entries.unshift(newEntry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  return newEntry
}

export function updateTimeEntry(id: string, updates: Partial<TimeEntry>): void {
  const entries = getStoredTimeEntries()
  const index = entries.findIndex((e) => e.id === id)

  if (index !== -1) {
    entries[index] = { ...entries[index], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }
}

export function deleteTimeEntry(id: string): void {
  const entries = getStoredTimeEntries()
  const filtered = entries.filter((e) => e.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}
