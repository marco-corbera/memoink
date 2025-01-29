import Image from "next/image"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-memoink-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <Image src="/placeholder.svg" alt="Cute sleeping cat" width={120} height={120} className="mx-auto" />
          <h1 className="text-4xl font-serif text-memoink-text">Yay, New Friend!</h1>
        </div>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-12 px-4 rounded border border-memoink-text/20 bg-transparent placeholder:text-memoink-text/60 text-memoink-text focus:outline-none focus:ring-1 focus:ring-memoink-text/20"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full h-12 px-4 rounded border border-memoink-text/20 bg-transparent placeholder:text-memoink-text/60 text-memoink-text focus:outline-none focus:ring-1 focus:ring-memoink-text/20"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 rounded-full border border-memoink-text text-memoink-text hover:bg-memoink-text hover:text-white transition-colors duration-200"
          >
            Sign Up
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

