"use client"

import { useState } from "react"
import { NoteCard } from "@/components/note-card"
import { NoteEditor } from "@/components/note-editor"
import { Plus } from "lucide-react"
import type { Note, Category } from "@/types/note"
import Image from "next/image"

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
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
      title: "Vacation Ideas",
      content:
        "• Visit Bali for beaches and culture\n• Explore the historic sites in Rome\n• Go hiking in the Swiss Alps\n• Relax in the hot springs of Iceland",
      category: "Random Thoughts",
      lastEdited: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
    },
    {
      id: "3",
      title: "A Deep and Contemplative Personal Reflection on the Multifaceted and Ever-Evolving Journey of Life",
      content:
        "Life has been a whirlwind of events and emotions lately. I've been juggling work, personal projects, and relationships, often finding myself at crossroads of important decisions.",
      category: "Random Thoughts",
      lastEdited: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    },
  ])
  const [activeNote, setActiveNote] = useState<Note | null>(null)

  // Convert URL-friendly category name back to proper format
  const categoryName = params.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") as Category

  const filteredNotes = notes.filter((note) => note.category === categoryName)

  const createNewNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: "Note Title",
      content: "",
      category: categoryName,
      lastEdited: new Date(),
    }
    setNotes((prev) => [newNote, ...prev])
    setActiveNote(newNote)
  }

  const updateNote = (updatedNote: Note) => {
    setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-end mb-6">
        <button
          onClick={createNewNote}
          className="flex items-center px-4 py-2 rounded-full border border-memoink-button text-memoink-button hover:bg-memoink-button/5 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Note
        </button>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center space-y-6 mt-20">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-scWu2iKPAFmMUcSmDKHD8efop1ofsA.png"
            alt="Cute bubble tea illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <p className="text-xl text-memoink-text">No notes in this category yet...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onClick={() => setActiveNote(note)} />
          ))}
        </div>
      )}

      {activeNote && <NoteEditor note={activeNote} onClose={() => setActiveNote(null)} onUpdate={updateNote} />}
    </div>
  )
}

