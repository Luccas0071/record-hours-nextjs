"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { currentUser, saveTimeEntry } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

export function TimeEntryForm() {
  const router = useRouter()
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [hours, setHours] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const hoursNum = Number.parseFloat(hours)
      if (isNaN(hoursNum) || hoursNum <= 0 || hoursNum > 24) {
        throw new Error("Horas devem ser entre 0 e 24")
      }

      saveTimeEntry({
        userId: currentUser.id,
        userName: currentUser.name,
        date,
        hours: hoursNum,
        description,
      })

      // Reset form
      setHours("")
      setDescription("")
      setDate(new Date().toISOString().split("T")[0])

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar registro")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Registro</CardTitle>
        <CardDescription>Adicione ou atualize suas horas trabalhadas</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hours">Horas Trabalhadas</Label>
            <Input
              id="hours"
              type="number"
              step="0.5"
              min="0.5"
              max="24"
              placeholder="8.0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Máximo de 24 horas por dia</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição das Atividades</Label>
            <Textarea
              id="description"
              placeholder="Descreva brevemente as atividades realizadas..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            <Plus className="h-4 w-4 mr-2" />
            {isLoading ? "Salvando..." : "Salvar Registro"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
