"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SleepingCat from "@/public/sleeping-cat.svg"
import { signup } from "@/services/auth"
import { login } from "@/services/auth"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      await signup({ email, password, username: email })
      setSuccess("Account created successfully! Redirecting...")

      setTimeout(async () => {
        await login({ email, password })
        router.push("/notes")
      }, 1500)
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-memoink-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <Image src={SleepingCat} alt="Cute sleeping cat" width={188} height={134} className="mx-auto" />
          <h1 className="text-4xl font-serif text-memoink-text">Yay, New Friend!</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-12 px-4 rounded border border-memoink-text/20 bg-transparent placeholder:text-memoink-text/60 text-memoink-text focus:outline-none focus:ring-1 focus:ring-memoink-text/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-12 px-4 rounded border border-memoink-text/20 bg-transparent placeholder:text-memoink-text/60 text-memoink-text focus:outline-none focus:ring-1 focus:ring-memoink-text/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Image src="/opened-eye.svg" alt="Opened eye" width={24} height={24} />
              ) : (
                <Image src="/closed-eye.svg" alt="Closed eye" width={24} height={24} />
              )}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full border border-memoink-text text-memoink-text hover:bg-memoink-text hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center">
          <Link href="/login" className="text-memoink-text hover:opacity-80 transition-opacity">
            We&apos;re already friends!
          </Link>
        </p>
      </div>
    </main>
  )
}
