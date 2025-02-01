"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { NoteEditor } from "@/components/NoteEditor"
import type { Note } from "@/types/note"
import { getNote } from "@/services/notes"

export default function NoteDetailPage() {
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    const fetchActiveNote = async () => {
      if (id) {
        try {
          const fetchedNote = (await getNote(id as string)) as Note
          setActiveNote(fetchedNote)
        } catch (error) {
          console.error("Failed to fetch note", error)
          router.push("/notes")
        }
      }
    }
    fetchActiveNote()
  }, [id, router])

  if (!activeNote) {
    return null
  }

  return (
    <NoteEditor
      note={activeNote}
      onClose={() => router.push("/notes")}
      onUpdate={(updatedNote) => setActiveNote(updatedNote)}
    />
  )
}
