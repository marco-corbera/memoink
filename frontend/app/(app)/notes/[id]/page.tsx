"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useNotes } from "@/context/NotesContext"
import { NoteCard } from "@/components/note-card"
import { NoteEditor } from "@/components/note-editor"
import { Plus } from "lucide-react"
import type { Note } from "@/types/note"
import Image from "next/image"
import { getNotes, createNote, getNote } from "@/services/notes"
import EmptyCup from "@/public/empty-cup.svg"

export default function NoteDetailPage() {
  const { notes, setNotes } = useNotes() as { notes: Note[], setNotes: React.Dispatch<React.SetStateAction<Note[]>> }
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    const fetchActiveNote = async () => {
      if (id) {
        try {
          const fetchedNote = await getNote(id as string) as Note
          setActiveNote(fetchedNote)
        } catch (error) {
          console.error("Failed to fetch note", error)
        }
      }
    }
    fetchActiveNote()
  }, [id])

  const handleCreateNote = async () => {
    try {
      const newNote = await createNote({ title: "New Note", content: "", category: "RDM" }) as Note
      setNotes([...notes, newNote])
      setActiveNote(newNote)
      router.push(`/notes/${newNote.id}`)
    } catch (error) {
      console.error("Failed to create note", error)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreateNote}
          className="flex items-center px-4 py-2 rounded-full border border-memoink-text text-memoink-text hover:bg-memoink-text hover:text-white transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Note
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center space-y-6 mt-20">
          <Image
            src={EmptyCup}
            alt="Cute bubble tea illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <p className="text-xl text-memoink-text">I'm just here waiting for your charming notes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(notes) && notes.map((note) => (
            <NoteCard key={note.id} note={note} onClick={() => setActiveNote(note)} />
          ))}
        </div>
      )}

      {activeNote && <NoteEditor note={activeNote} onClose={() => router.push("/notes")} onUpdate={(updatedNote) => setNotes((prev: Note[]) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)))} />}
    </div>
  )
}
