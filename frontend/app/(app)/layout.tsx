"use client"

import { CategorySidebar } from "@/components/category-sidebar"
import { NotesProvider } from "@/context/NotesContext" // Importa el contexto

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotesProvider>
      <div className="min-h-screen bg-memoink-background flex">
        <CategorySidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </NotesProvider>
  )
}
