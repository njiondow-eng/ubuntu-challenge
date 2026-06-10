import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })

export const metadata: Metadata = {
  title: 'Ubuntu Challenge — I Am Because We Are',
  description:
    'A basketball and cultural movement uniting Africa, Asia, and the world through sport, community, and the Ubuntu philosophy.',
  keywords: ['basketball', 'ubuntu', 'africa', 'philippines', 'sports', 'cultural exchange'],
  openGraph: {
    title: 'Ubuntu Challenge',
    description: 'I Am Because We Are — Basketball uniting Africa and Asia',
    url: 'https://ubuntuchallenge.org',
    siteName: 'Ubuntu Challenge',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="bg-navy text-white font-inter antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
