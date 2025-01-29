import type { Category } from "@/types/note"

export const CATEGORIES: Category[] = ["Random Thoughts", "School", "Personal", "Drama"]

export const CATEGORY_COLORS = {
  "Random Thoughts": "bg-category-random-thoughts",
  School: "bg-category-school",
  Personal: "bg-category-personal",
  Drama: "bg-category-drama",
} as const

export const CATEGORY_COLORS_BORDER = {
  "Random Thoughts": "border-category-random-thoughts",
  School: "border-category-school",
  Personal: "border-category-personal",
  Drama: "border-category-drama",
} as const

