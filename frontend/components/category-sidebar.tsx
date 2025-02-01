"use client"

import { useEffect, useState } from "react"
import { CATEGORIES, CATEGORY_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getCategorySummary } from "@/services/notes"
import { getCategoryName } from "@/lib/utils"

export function CategorySidebar() {
  const searchParams = useSearchParams()
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})

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
    <div className="w-64 p-6">
      <nav className="space-y-2">
        <Link
          href="/notes"
          className={cn("block px-4 py-2 rounded-lg text-memoink-button", !searchParams.get("category") && "font-medium")}
        >
          All Categories
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`/notes/category/${category}`}
            className={cn(
              "flex items-center justify-between px-4 py-2 rounded-lg text-memoink-button",
              searchParams.get("category") === category && "font-medium"
            )}
          >
            <div className="flex items-center">
              <span className={cn("w-2 h-2 rounded-full mr-2", CATEGORY_COLORS[category])} />
              {getCategoryName(category)}
            </div>
            <span className="text-sm text-memoink-button/70">{categoryCounts[category] || 0}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

