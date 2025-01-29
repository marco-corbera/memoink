import Link from "next/link"
import Image from "next/image"

export default function Signup() {
  return (
    <main className="min-h-screen bg-memoink-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <Image src="/placeholder.svg" alt="Cute sleeping cat" width={120} height={120} className="mx-auto" />
          <h1 className="text-4xl font-serif text-memoink-text">Yay, New Friend!</h1>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-12 px-3 rounded-md bg-white/80 border border-memoink-text border-opacity-20 focus:outline-none focus:ring-2 focus:ring-memoink-button"
            />
          </div>
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-12 px-3 rounded-md bg-white/80 border border-memoink-text border-opacity-20 focus:outline-none focus:ring-2 focus:ring-memoink-button"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-memoink-button hover:bg-memoink-button-hover text-white rounded-full transition duration-200 ease-in-out"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-memoink-text">
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-memoink-button transition duration-200 ease-in-out"
          >
            We&apos;re already friends!
          </Link>
        </p>
      </div>
    </main>
  )
}

