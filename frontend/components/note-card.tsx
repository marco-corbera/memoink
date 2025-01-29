import type { Note } from "@/types/note"
import { formatDate } from "@/utils/date"
import { CATEGORY_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface NoteCardProps {
  note: Note
  onClick?: () => void
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <div onClick={onClick} className={cn("p-6 rounded-2xl cursor-pointer", CATEGORY_COLORS[note.category])}>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{formatDate(note.lastEdited)}</span>
          <span className="text-memoink-text/60">·</span>
          <span>{note.category}</span>
        </div>
        <h3 className="text-2xl font-serif text-[#1A1A1A] leading-tight">{note.title}</h3>
        <div className="text-[#1A1A1A]/80">
          {note.content.includes("•") ? (
            <ul className="list-none space-y-1">
              {note.content.split("\n").map(
                (line, index) =>
                  line.trim() && (
                    <li key={index} className="line-clamp-1">
                      {line.trim()}
                    </li>
                  ),
              )}
            </ul>
          ) : (
            <p className="line-clamp-3">{note.content}</p>
          )}
        </div>
      </div>
    </div>
  )
}

