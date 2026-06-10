'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Image from 'next/image'

export default function AdminLoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-navy">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Ubuntu Challenge" width={80} height={80} className="mx-auto mb-4 object-contain" />
          <h1 className="font-oswald font-bold text-gold text-2xl uppercase tracking-widest">Admin Panel</h1>
          <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Ubuntu Challenge</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-gold text-[11px] font-semibold uppercase tracking-widest mb-2">Email</label>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#141929] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              placeholder="admin@ubuntuchallenge.org"
            />
          </div>
          <div>
            <label className="block text-gold text-[11px] font-semibold uppercase tracking-widest mb-2">Password</label>
            <input
              type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#141929] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <button type="submit" disabled={loading} className="btn-gold w-full py-4 mt-2 disabled:opacity-50">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
