export function formatDate(date: Date): string {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  if (isSameDay(date, now)) {
    return "today"
  }

  if (isSameDay(date, yesterday)) {
    return "yesterday"
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

