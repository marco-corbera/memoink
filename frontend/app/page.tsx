import { redirect } from 'next/navigation'

export default function Home() {
  // TODO: Implement actual authentication check
  const isLoggedIn = false

  if (isLoggedIn) {
    redirect('/notes')
  } else {
    redirect('/signup')
  }
}
