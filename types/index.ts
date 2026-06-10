// types/index.ts — Types TypeScript pour toutes les tables Supabase

export type Player = {
  id: string
  created_at: string
  name: string
  country: string
  country_code: string
  university: string
  position: string
  height: string
  ppg: number
  rpg: number
  apg: number
  bpg: number
  spg: number
  photo_url: string | null
  bio: string | null
  is_featured: boolean
}

export type NewsPost = {
  id: string
  created_at: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: 'Season Update' | 'Achievement' | 'Community' | 'Partnership' | 'Education' | 'Announcement' | 'Media'
  cover_image_url: string | null
  published: boolean
  published_at: string | null
}

export type Event = {
  id: string
  created_at: string
  title: string
  description: string
  location: string
  event_date: string
  event_time: string
  category: 'Tournament' | 'Community' | 'VIP' | 'Championship' | 'Clinic'
  registration_open: boolean
  registration_url: string | null
}

export type Sponsor = {
  id: string
  created_at: string
  name: string
  tier: 'bronze' | 'silver' | 'gold' | 'custom'
  logo_url: string | null
  website_url: string | null
  description: string | null
  is_active: boolean
}

export type ContactInquiry = {
  id: string
  created_at: string
  full_name: string
  email: string
  subject: string
  message: string
  read: boolean
}
