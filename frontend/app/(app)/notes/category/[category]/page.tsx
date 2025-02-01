"use client"

import { usePathname } from "next/navigation"
import { NotesPageContent } from "@/components/notesPageContent"

export default function CategoryPage() {
  const pathname = usePathname()
  const category = pathname.split("/").pop() || ""
  return <NotesPageContent category={category} />
}
