import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { getSession } from "next-auth/react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      const session = await getSession()
      setIsLoggedIn(!!session)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      redirect("/notes")
    } else {
      redirect("/signup")
    }
  }, [isLoggedIn])

  return null
}

