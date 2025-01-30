"use client"

import { NotesProvider } from "@/context/NotesContext" // Importa el contexto

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotesProvider>
      <div className="min-h-screen bg-memoink-background flex">
        <main className="flex-1 p-16">{children}</main>
      </div>
    </NotesProvider>
  )
}
