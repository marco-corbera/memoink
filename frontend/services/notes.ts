import { apiFetch } from "@/services/api"

const toCamelCase = (note: any) => ({
  id: note.id,
  title: note.title,
  content: note.content,
  category: note.category,
  lastEdited: note.last_edited,
  isArchived: note.is_archived,
})

export const getNotes = async () => {
  type NoteResponse = { id: string; title: string; content: string; category: string; last_edited: string; is_archived: boolean }
  const response: NoteResponse[] = await apiFetch("/notes/", { auth: true })
  return response.map(toCamelCase)
}

export const createNote = async (data: { title: string; content: string; category: string }) => {
  const response = await apiFetch("/notes/", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  })
  return toCamelCase(response)
}

export const getNote = async (id: string) => {
  const response = await apiFetch(`/notes/${id}/`, { auth: true })
  return toCamelCase(response)
}

export const updateNote = async (id: string, data: Partial<{ title: string; content: string; category: string }>) => {
  const response = await apiFetch(`/notes/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
    auth: true,
  })
  return toCamelCase(response)
}