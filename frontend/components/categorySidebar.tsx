"use client"

import { useEffect, useState } from "react"
import { CATEGORIES, CATEGORY_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getCategorySummary } from "@/services/notes"
import { getCategoryName } from "@/lib/utils"
import { Menu, X } from "lucide-react"

export function CategorySidebar() {
  const pathname = usePathname()
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [isOpen, setIsOpen] = useState(false) // Estado para abrir/cerrar en mobile

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const summary = await getCategorySummary()
        const counts = summary.reduce((acc, { category, count }) => {
          acc[category] = count
          return acc
        }, {} as Record<string, number>)
        setCategoryCounts(counts)
      } catch (error) {
        console.error("Failed to fetch category counts", error)
      }
    }

    fetchCategoryCounts()
  }, [])

  return (
    <>
      {/* Botón para abrir sidebar en mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-memoink-background p-2 rounded-md"
      >
        <Menu className="w-6 h-6 text-memoink" />
      </button>

      {/* Overlay en mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "w-80 p-6 bg-memoink-background fixed md:static top-0 left-0 h-full md:h-auto z-50 transition-transform md:translate-x-0",
          isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Botón para cerrar en mobile */}
        <div className="flex justify-end md:hidden">
          <button onClick={() => setIsOpen(false)} className="p-2">
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <nav className="space-y-2">
          <Link
            href="/notes"
            className={cn("block px-4 py-2 rounded-lg text-black", pathname === "/notes" && "font-bold")}
          >
            All Categories
          </Link>
          {CATEGORIES.map((category) => {
            const categoryPath = `/notes/category/${category}`
            return (
              <Link
                key={category}
                href={categoryPath}
                className={cn(
                  "flex items-center justify-between px-4 py-2 rounded-lg text-black",
                  pathname === categoryPath && "font-bold"
                )}
                onClick={() => setIsOpen(false)} // Cierra el sidebar en mobile
              >
                <div className="flex items-center">
                  <span className={cn("w-2 h-2 rounded-full mr-2", CATEGORY_COLORS[category])} />
                  {getCategoryName(category)}
                </div>
                <span className="text-sm text-black/70">{categoryCounts[category] || 0}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
