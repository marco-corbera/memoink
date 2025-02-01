import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { NoteEditor } from '@/components/NoteEditor'
import type { Note } from '@/types/note'
import { CATEGORIES } from '@/lib/constants'

const mockNote: Note = {
  id: '1',
  title: 'Sample Note',
  content: 'This is a sample note content.',
  category: 'PSL',
  lastEdited: new Date(),
}

describe('NoteEditor', () => {
  const mockOnClose = jest.fn()
  const mockOnUpdate = jest.fn()

  it('matches snapshot', () => {
    const { asFragment } = render(
      <NoteEditor
        note={mockNote}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders note title', () => {
    render(
      <NoteEditor
        note={mockNote}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    )
    expect(screen.getByPlaceholderText('Note Title')).toHaveValue(
      mockNote.title
    )
  })

  it('renders note content', () => {
    render(
      <NoteEditor
        note={mockNote}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    )
    expect(screen.getByPlaceholderText('Pour your heart out...')).toHaveValue(
      mockNote.content
    )
  })

  it('renders category name', () => {
    render(
      <NoteEditor
        note={mockNote}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    )
    expect(screen.getByText('Personal')).toBeInTheDocument()
  })

  it('renders formatted last edited date', () => {
    render(
      <NoteEditor
        note={mockNote}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    )
    expect(screen.getByText(/Last Edited:/)).toBeInTheDocument()
  })

  it('updates note title', () => {
    render(
      <NoteEditor
        note={mockNote}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    )
    const titleInput = screen.getByPlaceholderText('Note Title')
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } })
    expect(titleInput).toHaveValue('Updated Title')
  })

  it('updates note content', () => {
    render(
      <NoteEditor
        note={mockNote}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    )
    const contentTextarea = screen.getByPlaceholderText(
      'Pour your heart out...'
    )
    fireEvent.change(contentTextarea, { target: { value: 'Updated Content' } })
    expect(contentTextarea).toHaveValue('Updated Content')
  })

  it('calls onClose when close button is clicked', () => {
    render(
      <NoteEditor
        note={mockNote}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    )
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalled()
  })
})
