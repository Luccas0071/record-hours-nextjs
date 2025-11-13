import UsersPage from "@/components/administrator/user/ListUsers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Usuários",
  description: "Lista de usuários.",
}

export default function Page() {
  return (
    <UsersPage />
  )
}