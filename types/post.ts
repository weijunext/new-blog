
export type BlogPost = {
  id?: string
  title: string
  description: string
  slug: string
  slugId?: string
  category?: string
  tags: string
  date: Date
  visible?: boolean
  pin?: boolean
  content: string
  metadata: {
    [key: string]: any
  },
}
