import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/admin/login')

  const [{ count: players }, { count: news }, { count: events }, { count: messages }] = await Promise.all([
    supabase.from('players').select('*', { count: 'exact', head: true }),
    supabase.from('news').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }).eq('read', false),
  ])

  const sections = [
    { label: 'Players',      count: players,  href: '/admin/dashboard/players',  emoji: '🏀', color: 'border-gold' },
    { label: 'News',         count: news,     href: '/admin/dashboard/news',     emoji: '📰', color: 'border-blue-500' },
    { label: 'Events',       count: events,   href: '/admin/dashboard/events',   emoji: '📅', color: 'border-green' },
    { label: 'New Messages', count: messages, href: '/admin/dashboard/messages', emoji: '✉️', color: 'border-red' },
  ]

  return (
    <section className="py-16 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <p className="section-label">Admin Panel</p>
        <h1 className="section-title">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {sections.map(({ label, count, href, emoji, color }) => (
            <Link key={label} href={href}
              className={`card-dark p-6 border-l-4 ${color} hover:-translate-y-1 transition-transform`}>
              <div className="text-3xl mb-2">{emoji}</div>
              <div className="font-oswald font-bold text-white text-4xl leading-none">{count ?? 0}</div>
              <div className="text-gray-400 text-xs uppercase tracking-widest mt-1">{label}</div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="card-dark p-6 mb-6">
          <h2 className="font-oswald font-bold text-white uppercase text-lg mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Add Player',   href: '/admin/dashboard/players/new' },
              { label: 'Write News',   href: '/admin/dashboard/news/new' },
              { label: 'Add Event',    href: '/admin/dashboard/events/new' },
              { label: 'View Messages', href: '/admin/dashboard/messages' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="btn-outline-gold text-xs py-2 px-4">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Logout */}
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="text-xs text-gray-500 hover:text-red-400 uppercase tracking-widest transition-colors">
            Se déconnecter
          </button>
        </form>
      </div>
    </section>
  )
}
