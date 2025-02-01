import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { NoteCard } from '@/components/NoteCard'
import type { Note } from '@/types/note'
import { formatDate } from '@/utils/date'
import { getCategoryName } from '@/lib/utils'

const mockNote: Note = {
  id: '1',
  title: 'Sample Note',
  content: 'This is a sample note content.',
  category: 'PSL',
  lastEdited: new Date(),
}

describe('NoteCard', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<NoteCard note={mockNote} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders note title', () => {
    render(<NoteCard note={mockNote} />)
    expect(screen.queryByText(mockNote.title)).toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(<NoteCard note={mockNote} />)
    expect(
      screen.queryByText(formatDate(mockNote.lastEdited))
    ).toBeInTheDocument()
  })

  it('renders category name', () => {
    render(<NoteCard note={mockNote} />)
    expect(
      screen.queryByText(getCategoryName(mockNote.category))
    ).toBeInTheDocument()
  })

  it('renders note content', () => {
    render(<NoteCard note={mockNote} />)
    expect(
      screen.queryByText(mockNote.content.slice(0, 300))
    ).toBeInTheDocument()
  })
})
