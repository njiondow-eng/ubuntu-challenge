import Image from 'next/image'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase'
import type { Player, Event } from '@/types'

export default async function HomePage() {
  const supabase = createServerSupabaseClient()

  const { data: players } = await supabase
    .from('players')
    .select('*')
    .eq('is_featured', true)
    .limit(4)

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .limit(3)

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-navy">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-gold opacity-[0.05] -top-40 -right-24" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-green opacity-[0.06] -bottom-24 -left-20" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-red opacity-[0.05] top-1/2 left-2/3" />
        </div>

        <div className="relative z-10">
          <p className="text-gold text-xs font-semibold uppercase tracking-[4px] mb-4">
            Est. 2021 · Philippines · Africa · The World
          </p>
          <Image
            src="/logo.png"
            alt="Ubuntu Challenge"
            width={160}
            height={160}
            className="mx-auto mb-6 drop-shadow-[0_4px_24px_rgba(212,160,23,0.3)]"
          />
          <h1 className="font-oswald font-bold uppercase leading-none mb-3 text-white"
              style={{ fontSize: 'clamp(48px, 8vw, 90px)' }}>
            Ubuntu<br /><span className="text-gold">Challenge</span>
          </h1>
          <p className="font-oswald text-gray-400 uppercase tracking-[4px] italic mb-6"
             style={{ fontSize: 'clamp(14px, 2.5vw, 20px)' }}>
            "I Am Because We Are"
          </p>
          <p className="max-w-xl mx-auto text-gray-400 text-sm leading-relaxed mb-10">
            A basketball and cultural movement uniting Africa, Asia, and the world —
            celebrating excellence, community, and the Ubuntu spirit through sport.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">Join the Movement</Link>
            <Link href="/sponsors" className="btn-outline-gold">Become a Sponsor</Link>
            <Link href="/contact" className="btn-ghost">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* COUNTRIES STRIP */}
      <div className="bg-[#141929] border-y border-white/5 py-4 px-6">
        <div className="flex flex-wrap gap-6 items-center justify-center">
          {['🇨🇲 Cameroon','🇳🇬 Nigeria','🇱🇷 Liberia','🇷🇼 Rwanda','🇺🇸 United States','🇵🇭 Philippines','🇰🇷 South Korea'].map((c) => (
            <span key={c} className="text-gold text-xs font-semibold uppercase tracking-widest">{c}</span>
          ))}
          <span className="text-gray-500 text-xs uppercase tracking-widest">+ More Nations</span>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-gold py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['4','Seasons'],['8+','Nations'],['15+','Years Experience'],['100+','Athletes Reached']].map(([num, label]) => (
            <div key={label}>
              <div className="font-oswald font-bold text-5xl text-navy leading-none">{num}</div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-amber-900 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION / VALUES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label">Our Mission</p>
          <h2 className="section-title">More Than a <span>Game</span></h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mb-10">
            Ubuntu Challenge bridges continents through basketball — giving African
            student-athletes a platform to compete in top Philippine university leagues
            while sharing their culture, stories, and humanity with the world.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Ubuntu',           color: 'border-gold',  text: "Rooted in the African philosophy that our humanity is shared — we rise together or not at all." },
              { title: 'Excellence',        color: 'border-gold',  text: "Pushing athletes to reach their highest potential on the court and in the classroom." },
              { title: 'Cultural Exchange', color: 'border-gold',  text: "Creating meaningful connections between African and Philippine communities." },
              { title: 'Community',         color: 'border-green', text: "Building lasting bonds between athletes, coaches, universities, and sponsors." },
            ].map(({ title, color, text }) => (
              <div key={title} className={`card-dark p-6 border-l-4 ${color}`}>
                <h3 className="font-oswald font-bold text-white uppercase text-base mb-2">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAYERS PREVIEW */}
      <section className="py-20 px-6 bg-[#0F1320]">
        <div className="max-w-6xl mx-auto">
          <p className="section-label">Players Spotlight</p>
          <h2 className="section-title">African <span>Stars</span> in the Philippines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(players as Player[] | null)?.map((p) => (
              <div key={p.id} className="card-dark hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-[#1B5E20] to-navy flex items-center justify-center relative">
                  {p.photo_url
                    ? <Image src={p.photo_url} alt={p.name} fill className="object-cover" />
                    : <span className="text-5xl">🏀</span>
                  }
                  <span className="absolute top-2 right-2 bg-gold/90 text-navy text-[10px] font-bold uppercase tracking-wide px-2 py-0.5">
                    {p.country_code}
                  </span>
                </div>
                <div className="p-4 border-t border-white/5">
                  <div className="font-oswald font-bold text-white uppercase text-base mb-1">{p.name}</div>
                  <div className="text-gold text-[11px] uppercase tracking-widest font-semibold mb-1">{p.university}</div>
                  <div className="text-gray-400 text-xs mb-3">{p.position} · {p.height}</div>
                  <div className="flex gap-4">
                    {[['PPG', p.ppg],['RPG', p.rpg],[p.apg > 0 ? 'APG' : 'BPG', p.apg > 0 ? p.apg : p.bpg]].map(([l, v]) => (
                      <div key={String(l)} className="text-center">
                        <div className="font-oswald font-bold text-gold text-lg">{v}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/players" className="btn-outline-gold">View All Players</Link>
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label">Upcoming</p>
          <h2 className="section-title">Events & <span>Tournaments</span></h2>
          <div className="flex flex-col gap-4">
            {(events as Event[] | null)?.map((e) => {
              const d = new Date(e.event_date)
              const month = d.toLocaleString('en', { month: 'short' }).toUpperCase()
              const day = d.getDate()
              return (
                <div key={e.id} className="card-dark flex gap-6 p-6 border-l-4 border-green">
                  <div className="min-w-[56px] text-center">
                    <div className="text-gold text-[10px] font-bold uppercase tracking-widest">{month}</div>
                    <div className="font-oswald font-bold text-white text-4xl leading-none">{day}</div>
                  </div>
                  <div>
                    <div className="font-oswald font-bold text-white uppercase text-lg mb-1">{e.title}</div>
                    <div className="text-gray-400 text-xs mb-2">📍 {e.location} · {e.event_time}</div>
                    <span className="inline-block text-[10px] uppercase tracking-wide bg-green/20 text-green-400 border border-green/40 px-2 py-0.5">
                      {e.category}
                    </span>
                    {e.registration_open && (
                      <span className="inline-block ml-2 text-[10px] uppercase tracking-wide bg-gold/10 text-gold border border-gold/30 px-2 py-0.5">
                        Registration Open
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/events" className="btn-outline-gold">View All Events</Link>
          </div>
        </div>
      </section>
    </>
  )
}
