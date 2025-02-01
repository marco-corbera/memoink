import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryName(category: string) {
  switch (category) {
    case 'RDM':
      return 'Random Thought'
    case 'PSL':
      return 'Personal'
    case 'SCL':
      return 'School'
    case 'DRM':
      return 'Drama'
    default:
      return category
  }
}
