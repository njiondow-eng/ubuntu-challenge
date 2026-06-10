'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-server'

export default function ContactPage() {
  const [form, setForm] = useState({ full_name: '', email: '', subject: 'General Inquiry', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    const supabase = createClient()
    const { error } = await supabase.from('contact_inquiries').insert([form])
    setStatus(error ? 'error' : 'success')
    if (!error) setForm({ full_name: '', email: '', subject: 'General Inquiry', message: '' })
  }

  return (
    <section className="py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <p className="section-label">Get In Touch</p>
        <h1 className="section-title">Contact <span>Us</span></h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10">

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-gold text-[11px] font-semibold uppercase tracking-widest mb-2">Full Name</label>
              <input
                required
                value={form.full_name}
                onChange={e => setForm({ ...form, full_name: e.target.value })}
                className="w-full bg-[#141929] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-gold text-[11px] font-semibold uppercase tracking-widest mb-2">Email Address</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#141929] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-gold text-[11px] font-semibold uppercase tracking-widest mb-2">Subject</label>
              <select
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-[#141929] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              >
                {['General Inquiry','Sponsorship','Player Registration','Media & Press','Partnership','Volunteer','Donation'].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gold text-[11px] font-semibold uppercase tracking-widest mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#141929] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors resize-none"
                placeholder="Tell us about yourself and how you'd like to get involved..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-gold w-full py-4 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-sm text-center">Message sent! We'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </form>

          {/* CONTACT INFO */}
          <div className="flex flex-col gap-7">
            {[
              { icon: '✉️', label: 'Email',     val: 'info@ubuntuchallenge.org' },
              { icon: '💬', label: 'WhatsApp',  val: '+63 XXX XXX XXXX' },
              { icon: '📍', label: 'Based In',  val: 'Metro Manila, Philippines' },
              { icon: '📸', label: 'Instagram', val: '@ubuntuchallenge' },
            ].map(({ icon, label, val }) => (
              <div key={label} className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-gold/10 border border-gold/30 flex items-center justify-center text-lg flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <div className="text-gold text-[11px] font-semibold uppercase tracking-widest mb-1">{label}</div>
                  <div className="text-gray-400 text-sm">{val}</div>
                </div>
              </div>
            ))}

            <div className="bg-[#141929] border border-gold/20 p-6 mt-2">
              <div className="font-oswald font-bold text-gold uppercase text-lg mb-2">Sponsor Inquiry</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Interested in partnering with Ubuntu Challenge? Download our sponsorship proposal or book a call with Pipo directly.
              </p>
              <button className="btn-outline-gold w-full py-3 text-xs">
                Download Sponsorship Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
