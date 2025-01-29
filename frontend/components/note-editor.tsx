"use client"

import type { Note, Category } from "@/types/note"
import { CATEGORIES, CATEGORY_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"

interface NoteEditorProps {
  note: Note
  onClose: () => void
  onUpdate: (note: Note) => void
}

export function NoteEditor({ note: initialNote, onClose, onUpdate }: NoteEditorProps) {
  const [note, setNote] = useState(initialNote)

  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate(note)
    }, 500)

    return () => clearTimeout(timer)
  }, [note, onUpdate])

  const formatLastEdited = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="fixed inset-0 z-50 p-8 bg-black/20 backdrop-blur-sm">
      <div
        className={cn(
          "w-full max-w-5xl mx-auto h-[calc(100vh-4rem)] rounded-3xl overflow-hidden",
          CATEGORY_COLORS[note.category],
        )}
      >
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <Select
              value={note.category}
              onValueChange={(value: Category) => {
                setNote((prev) => ({
                  ...prev,
                  category: value,
                  lastEdited: new Date(),
                }))
              }}
            >
              <SelectTrigger className="w-48 border-memoink-button">
                <div className="flex items-center gap-2">
                  <span className={cn("w-2 h-2 rounded-full", CATEGORY_COLORS[note.category])} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    <div className="flex items-center gap-2">
                      <span className={cn("w-2 h-2 rounded-full", CATEGORY_COLORS[category])} />
                      {category}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4">
              <span className="text-sm text-memoink-text/70">Last Edited: {formatLastEdited(note.lastEdited)}</span>
              <button
                onClick={onClose}
                className="text-memoink-button hover:bg-memoink-button/5 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={note.title}
              onChange={(e) => {
                setNote((prev) => ({
                  ...prev,
                  title: e.target.value,
                  lastEdited: new Date(),
                }))
              }}
              placeholder="Note Title"
              className="w-full text-4xl font-serif text-[#1A1A1A] bg-transparent border-none outline-none placeholder:text-[#1A1A1A]/40"
            />
            <textarea
              value={note.content}
              onChange={(e) => {
                setNote((prev) => ({
                  ...prev,
                  content: e.target.value,
                  lastEdited: new Date(),
                }))
              }}
              placeholder="Pour your heart out..."
              className="w-full h-[calc(100vh-280px)] bg-transparent border-none outline-none resize-none text-[#1A1A1A]/80 placeholder:text-[#1A1A1A]/40"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

