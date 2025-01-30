"use client"

import type React from "react"
import { CategorySidebar } from "@/components/category-sidebar"
import { useState } from "react"
import type { Note } from "@/types/note"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "Grocery List",
      content: "• Milk\n• Eggs\n• Bread\n• Bananas\n• Spinach",
      category: "Random Thoughts",
      lastEdited: new Date(),
    },
    {
      id: "2",
      title: "Meeting with Team",
      content:
        "Discuss project timeline and milestones.\nReview budget and resource allocation.\nAddress any blockers and plan next steps.",
      category: "School",
      lastEdited: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "Project X Updates",
      content:
        "Finalized design mockups and received approval from stakeholders. Began development on the front-end. Backend integration is scheduled for next week. Team is on track to meet the deadline.",
      category: "School",
      lastEdited: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
  ])

  return (
    <div className="min-h-screen bg-memoink-background flex">
      <CategorySidebar notes={notes} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}

