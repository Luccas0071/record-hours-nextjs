import CollaboratorPage from "@/components/collaborator/CollaboratorPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard Colaborador",
  description: "Painel de controle administrador.",
}

export default function Page() {
  return (
    <CollaboratorPage />
  )
}
