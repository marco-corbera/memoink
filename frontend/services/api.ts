const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

type FetchOptions = RequestInit & { auth?: boolean }

export const apiFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (options.auth) {
    const token = localStorage.getItem('access_token')
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return response.json()
}
