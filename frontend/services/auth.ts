import { apiFetch } from '@/services/api'

type SignupPayload = { email: string; username: string; password: string }
type LoginPayload = { email: string; password: string }
type AuthResponse = { access: string; refresh: string }

export const signup = (data: SignupPayload) =>
  apiFetch<AuthResponse>('/users/signup/', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const login = (data: LoginPayload) =>
  apiFetch<AuthResponse>('/users/login/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
