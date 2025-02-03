import type { Note } from '@/types/note'
import { formatDate } from '@/utils/date'
import { CATEGORY_COLORS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { getCategoryName } from '@/lib/utils'

interface NoteCardProps {
  note: Note
  onClick?: () => void
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-6 rounded-2xl cursor-pointer h-96 w-full overflow-hidden',
        CATEGORY_COLORS[note.category]
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{formatDate(note.lastEdited)}</span>
          <span className="text-memoink-text/60">·</span>
          <span>{getCategoryName(note.category)}</span>
        </div>
        <h3 className="text-2xl font-serif text-[#1A1A1A] leading-tight">
          {note.title}
        </h3>
        <div className="text-[#1A1A1A]/80 overflow-hidden">
          {note.content.includes('•') ? (
            <p className="whitespace-pre-line">
              {note.content}
            </p>
          ) : (
            <p className="line-clamp-3 overflow-hidden">
              {note.content.slice(0, 1000)}
              {note.content.length > 500 && '...'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
