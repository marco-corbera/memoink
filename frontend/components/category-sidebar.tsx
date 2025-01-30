"use client"

import { CATEGORIES, CATEGORY_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Note } from "@/types/note"

interface CategorySidebarProps {
  notes?: Note[]
}

export function CategorySidebar({ notes = [] }: CategorySidebarProps) {
  const pathname = usePathname()

  const getCategoryCount = (category: string) => {
    return notes.filter((note) => note.category === category).length
  }

  return (
    <div className="w-64 p-6">
      <nav className="space-y-2">
        <Link
          href="/notes"
          className={cn("block px-4 py-2 rounded-lg text-memoink-button", pathname === "/notes" && "font-medium")}
        >
          All Categories
        </Link>
        {CATEGORIES.map((category) => (
            <Link
            key={category}
            href={`/notes/${category.toLowerCase().replace(" ", "-")}`}
            className={cn(
              "flex items-center justify-between px-4 py-2 rounded-lg text-memoink-button",
              pathname === `/notes/${category.toLowerCase().replace(" ", "-")}` && "font-medium",
            )}
            >
            <div className="flex items-center">
              <span className={cn("w-2 h-2 rounded-full mr-2", CATEGORY_COLORS[category])} />
              {category === "RDM" && "Random Thought"}
              {category === "PSL" && "Personal"}
              {category === "SCL" && "School"}
              {category === "DRM" && "Drama"}
            </div>
            {notes.length > 0 && <span className="text-sm text-memoink-button/70">{getCategoryCount(category)}</span>}
            </Link>
        ))}
      </nav>
    </div>
  )
}

