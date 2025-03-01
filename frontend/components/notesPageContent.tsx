'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { NoteCard } from '@/components/noteCard'
import { CategorySidebar } from '@/components/categorySidebar'
import { Plus } from 'lucide-react'
import type { Note } from '@/types/note'
import Image from 'next/image'
import { getNotes, createNote } from '@/services/notes'
import EmptyCup from '@/public/empty-cup.svg'

interface NotesPageContentProps {
  category?: string
}

export function NotesPageContent({ category }: NotesPageContentProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = (await getNotes({ category })) as Note[]
        setNotes(fetchedNotes)
      } catch (error) {
        console.error('Failed to fetch notes', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [category])

  useEffect(() => {
    if (activeNote) {
      router.push(`/notes/${activeNote.id}`)
    }
  }, [activeNote, router])

  const handleCreateNote = async () => {
    try {
      const newNote = (await createNote({
        title: 'New Note',
        content: '',
        category: category?.toUpperCase() || 'RDM',
      })) as Note
      setNotes((prev) => [newNote, ...prev])
      setActiveNote(newNote)
    } catch (error) {
      console.error('Failed to create note', error)
    }
  }

  return (
    <div className="flex w-full max-w-8xl mx-auto">
      <CategorySidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleCreateNote}
            className="flex items-center px-4 py-2 rounded-full border border-memoink-text text-memoink-text hover:bg-memoink-text hover:text-white transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Note
          </button>
        </div>

        {loading ? (
          <div className="text-center mt-20 text-memoink-text">
            Loading notes...
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center space-y-6 mt-20">
            <Image
              src={EmptyCup}
              alt="Cute bubble tea illustration"
              width={300}
              height={300}
              className="mx-auto"
            />
            <p className="text-xl text-memoink-text">
              No notes in this category yet...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => setActiveNote(note)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
