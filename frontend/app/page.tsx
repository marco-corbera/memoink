import { redirect } from "next/navigation"

export default function Home() {
  // TODO: Implement actual authentication check
  const isLoggedIn = false // This should be replaced with actual auth check

  if (isLoggedIn) {
    redirect("/notes")
  } else {
    redirect("/signup")
  }
}

