'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/players',  label: 'Players' },
  { href: '/news',     label: 'News' },
  { href: '/events',   label: 'Events' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="kente-strip" />
      <nav className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Ubuntu Challenge"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <div className="font-oswald font-bold text-gold text-lg leading-tight tracking-wide">
                Ubuntu Challenge
              </div>
              <div className="text-[9px] text-gray-400 tracking-[3px] uppercase">
                I Am Because We Are
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                  pathname === href ? 'text-gold' : 'text-gray-400 hover:text-gold'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/sponsors" className="btn-gold text-xs py-2 px-5">
              Become a Sponsor
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0F1320] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-semibold uppercase tracking-widest ${
                  pathname === href ? 'text-gold' : 'text-gray-400'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link href="/sponsors" className="btn-gold text-xs py-3 text-center mt-2">
              Become a Sponsor
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
