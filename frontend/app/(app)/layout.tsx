'use client'

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-memoink-background flex">
      <main className="flex-1 p-16">{children}</main>
    </div>
  )
}
