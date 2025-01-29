"use client"

import { useState } from "react"
import { NoteCard } from "@/components/note-card"
import { NoteEditor } from "@/components/note-editor"
import { Plus } from "lucide-react"
import type { Note } from "@/types/note"
import Image from "next/image"

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
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
      lastEdited: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
    },
    {
      id: "3",
      title: "Project X Updates",
      content:
        "Finalized design mockups and received approval from stakeholders. Began development on the front-end. Backend integration is scheduled for next week. Team is on track to meet the deadline.",
      category: "School",
      lastEdited: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    },
  ])
  const [activeNote, setActiveNote] = useState<Note | null>(null)

  const createNewNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: "Note Title",
      content: "",
      category: "Random Thoughts",
      lastEdited: new Date(),
    }
    setNotes((prev) => [newNote, ...prev])
    setActiveNote(newNote)
  }

  const updateNote = (updatedNote: Note) => {
    setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-end mb-6">
        <button
          onClick={createNewNote}
          className="flex items-center px-4 py-2 rounded-full border border-memoink-text text-memoink-text hover:bg-memoink-text hover:text-white transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Note
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center space-y-6 mt-20">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-scWu2iKPAFmMUcSmDKHD8efop1ofsA.png"
            alt="Cute bubble tea illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <p className="text-xl text-memoink-text">I'm just here waiting for your charming notes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onClick={() => setActiveNote(note)} />
          ))}
        </div>
      )}

      {activeNote && <NoteEditor note={activeNote} onClose={() => setActiveNote(null)} onUpdate={updateNote} />}
    </div>
  )
}

