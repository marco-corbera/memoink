export function formatDate(date: Date): string {
  const inputDate = new Date(date)
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  if (isSameDay(inputDate, now)) {
    return 'today'
  }

  if (isSameDay(inputDate, yesterday)) {
    return 'yesterday'
  }

  return inputDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}
