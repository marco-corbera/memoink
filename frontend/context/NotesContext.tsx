"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getNotes } from "@/services/notes"
import type { Note } from "@/types/note"

interface NotesContextValue {
  notes: Note[]
  setNotes: (notes: Note[]) => void
  refreshNotes: () => Promise<void>
}

const NotesContext = createContext<NotesContextValue | undefined>(undefined)

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([])

  const refreshNotes = async () => {
    try {
      const fetchedNotes = await getNotes()
      setNotes(fetchedNotes)
    } catch (error) {
      console.error("Failed to fetch notes", error)
    }
  }

  return (
    <NotesContext.Provider value={{ notes, setNotes, refreshNotes }}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNotes = () => {
  const context = useContext(NotesContext)
  if (!context) throw new Error("useNotes must be used within a NotesProvider")
  return context
}
