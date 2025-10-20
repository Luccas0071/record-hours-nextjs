"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Trash2, Calendar, Clock } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { updateTimeEntry, deleteTimeEntry, type TimeEntry } from "@/lib/mock-data"

interface TimeEntryListProps {
  entries: TimeEntry[]
}

export function TimeEntryList({ entries }: TimeEntryListProps) {
  const router = useRouter()
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null)
  const [editHours, setEditHours] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = (entry: TimeEntry) => {
    setEditingEntry(entry)
    setEditHours(entry.hours.toString())
    setEditDescription(entry.description)
    setIsDialogOpen(true)
  }

  const handleUpdate = async () => {
    if (!editingEntry) return
    setIsLoading(true)

    try {
      updateTimeEntry(editingEntry.id, {
        hours: Number.parseFloat(editHours),
        description: editDescription,
      })

      setIsDialogOpen(false)
      router.refresh()
    } catch (err) {
      console.error("[v0] Error updating entry:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      deleteTimeEntry(id)
      router.refresh()
    } catch (err) {
      console.error("[v0] Error deleting entry:", err)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00")
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Seus Registros</CardTitle>
          <CardDescription>Nenhum registro encontrado para este mês</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Comece adicionando seu primeiro registro de horas acima
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seus Registros</CardTitle>
        <CardDescription>Histórico de horas trabalhadas neste mês</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start justify-between p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(entry.date)}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-primary">
                    <Clock className="h-4 w-4" />
                    <span>{entry.hours}h</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{entry.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Dialog open={isDialogOpen && editingEntry?.id === entry.id} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(entry)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Registro</DialogTitle>
                      <DialogDescription>Atualize as informações do seu registro de horas</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-hours">Horas Trabalhadas</Label>
                        <Input
                          id="edit-hours"
                          type="number"
                          step="0.5"
                          min="0.5"
                          max="24"
                          value={editHours}
                          onChange={(e) => setEditHours(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-description">Descrição</Label>
                        <Textarea
                          id="edit-description"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleUpdate} disabled={isLoading}>
                        {isLoading ? "Salvando..." : "Salvar"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(entry.id)} className="bg-red-600 hover:bg-red-700">
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
