export type Category = "Random Thoughts" | "School" | "Personal" | "Drama"

export interface Note {
  id: string
  title: string
  content: string
  category: Category
  lastEdited: Date
}

