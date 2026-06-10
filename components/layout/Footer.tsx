import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About Us' },
  { href: '/players',  label: 'Players Spotlight' },
  { href: '/news',     label: 'News & Updates' },
  { href: '/events',   label: 'Events' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact',  label: 'Contact' },
]

const involvedLinks = [
  { href: '/sponsors', label: 'Become a Sponsor' },
  { href: '/players',  label: 'Player Registration' },
  { href: '/contact',  label: 'Volunteer' },
  { href: '/contact',  label: 'Donate' },
]

export default function Footer() {
  return (
    <>
      <div className="kente-strip" />
      <footer className="bg-[#060810] border-t border-gold/15 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo.png" alt="Ubuntu Challenge" width={50} height={50} className="object-contain" />
                <span className="font-oswald font-bold text-gold text-xl tracking-widest">
                  UBUNTU CHALLENGE
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                "I Am Because We Are" — Uniting Africa and Asia through basketball,
                culture, and community since 2021.
              </p>
              <div className="flex gap-3 mt-5">
                {['instagram', 'facebook', 'twitter', 'youtube', 'whatsapp'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-400 hover:border-gold hover:text-gold transition-colors text-xs uppercase"
                  >
                    {s[0].toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div>
              <div className="font-oswald font-semibold text-white text-sm uppercase tracking-widest mb-4">
                Navigate
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map(({ href, label }) => (
                  <Link key={href + label} href={href} className="text-sm text-gray-400 hover:text-gold transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Get involved */}
            <div>
              <div className="font-oswald font-semibold text-white text-sm uppercase tracking-widest mb-4">
                Get Involved
              </div>
              <div className="flex flex-col gap-2">
                {involvedLinks.map(({ href, label }) => (
                  <Link key={label} href={href} className="text-sm text-gray-400 hover:text-gold transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Ubuntu Challenge. "I Am Because We Are." — Est. 2021, Philippines.
            </p>
            <p className="text-xs text-gray-600">Founded by Pipo Noundou</p>
          </div>
        </div>
      </footer>
    </>
  )
}
