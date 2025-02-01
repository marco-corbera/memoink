export type Category = 'RDM' | 'SCL' | 'PSL' | 'DRM'

export interface Note {
  id: string
  title: string
  content: string
  category: Category
  lastEdited: Date
}
