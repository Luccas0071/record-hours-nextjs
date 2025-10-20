import ReportPage from "@/components/administrator/report/ReportPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard Administrador",
  description: "Painel de controle usuário.",
}

export default function Page() {
  return (
    <ReportPage />
  )
}