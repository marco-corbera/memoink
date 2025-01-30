import type { Category } from "@/types/note"

export const CATEGORIES: Category[] = ["RDM", "SCL", "PSL", "DRM"]

export const CATEGORY_COLORS = {
  RDM: "bg-category-randomThoughts",
  SCL: "bg-category-school",
  PSL: "bg-category-personal",
  DRM: "bg-category-drama",
} as const

export const CATEGORY_COLORS_BORDER = {
  "RDM": "border-category-randomThoughts",
  "SCL": "border-category-school",
  "PSL": "border-category-personal",
  "DRM": "border-category-drama",
} as const

