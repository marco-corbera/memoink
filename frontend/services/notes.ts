import { apiFetch } from "./api"

export const getNotes = () => apiFetch("/notes/", { auth: true })

export const createNote = (data: { title: string; content: string; category: string }) =>
  apiFetch("/notes/", { method: "POST", body: JSON.stringify(data), auth: true })
