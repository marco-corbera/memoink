'use client'

import type { Note, Category } from '@/types/note'
import {
  CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_COLORS_BORDER,
} from '@/lib/constants'
import { cn, getCategoryName } from '@/lib/utils'
import { X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import { updateNote } from '@/services/notes'

interface NoteEditorProps {
  note: Note
  onClose: () => void
  onUpdate: (note: Note) => void
}

export function NoteEditor({
  note: initialNote,
  onClose,
  onUpdate,
}: NoteEditorProps) {
  const [note, setNote] = useState(initialNote)
  const [hasChanges, setHasChanges] = useState(false)

  const debouncedUpdate = useCallback(
    debounce(async (updatedNote: Note) => {
      try {
        const savedNote = await updateNote(updatedNote.id, {
          title: updatedNote.title,
          content: updatedNote.content,
          category: updatedNote.category,
        })
        onUpdate(savedNote)
        setHasChanges(false)
      } catch (error) {
        console.error('Error updating note:', error)
      }
    }, 500),
    [onUpdate]
  )

  useEffect(() => {
    if (hasChanges) {
      debouncedUpdate(note)
    }
    return () => debouncedUpdate.cancel()
  }, [note, hasChanges, debouncedUpdate])

  const handleChange = (changes: Partial<Note>) => {
    setNote((prev) => ({ ...prev, ...changes, lastEdited: new Date() }))
    setHasChanges(true)
  }

  const formatLastEdited = (date: Date) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <div className="w-full h-full bg-memoink-background">
      <div className="flex w-full justify-between">
        <Select
          value={note.category}
          onValueChange={(value: Category) => handleChange({ category: value })}
        >
          <SelectTrigger className="border border-memoink-text bg-memoink-background text-sm rounded-[6px] py-2 w-[225px]">
            <div className="flex items-center gap-2">
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'w-3 h-3 rounded-full',
                      CATEGORY_COLORS[category]
                    )}
                  />
                  {getCategoryName(category)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          onClick={onClose}
          className="text-memoink-button hover:bg-memoink-button/10 p-2 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div
        className={cn(
          'w-full h-auto bg-white rounded-[11px] shadow-md bg-opacity-50 p-8',
          `border-[3px] ${CATEGORY_COLORS_BORDER[note.category]}`,
          CATEGORY_COLORS[note.category]
        )}
      >
        <div className="flex flex-col h-full">
          <div className="mt-4 text-xs text-black self-end">
            Last Edited: {formatLastEdited(note.lastEdited)}
          </div>
          <input
            type="text"
            value={note.title}
            onChange={(e) => handleChange({ title: e.target.value })}
            placeholder="Note Title"
            className="w-full text-4xl font-serif text-black bg-transparent border-none outline-none placeholder:text-memoink-text/40"
          />
          <textarea
            value={note.content}
            onChange={(e) => handleChange({ content: e.target.value })}
            placeholder="Pour your heart out..."
            className="flex-1 bg-transparent text-black/80 placeholder:text-black/40 border-none outline-none resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  )
}
