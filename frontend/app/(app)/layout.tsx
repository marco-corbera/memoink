import { CategorySidebar } from "@/components/category-sidebar"
import type { ReactNode } from "react"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-memoink-background flex">
      <CategorySidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}

