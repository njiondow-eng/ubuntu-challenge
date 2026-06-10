'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ full_name: '', email: '', subject: 'General Inquiry', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const { createClient } = await import('@/lib/supabase')
      const supabase = createClient()
      const { error } = await supabase.from('contact_inquiries').insert([form])
      setStatus(error ? 'error' : 'success')
      if (!error) setForm({ full_name: '', email: '', subject: 'General Inquiry', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <p className="section-label">Get In Touch</p>
        <h1 className="section-title">Contact <span>Us</span></h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10 max-w-xl">
          <div>
            <label className="block text-gold text-xs font-semibold uppercase tracking-widest mb-2">Full Name</label>
            <input required value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})} className="w-full bg-[#141929] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-gold" placeholder="Your full name" />
          </div>
          <div>
            <label className="block text-gold text-xs font-semibold uppercase tracking-widest mb-2">Email</label>
            <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-[#141929] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-gold" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-gold text-xs font-semibold uppercase tracking-widest mb-2">Subject</label>
            <select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} className="w-full bg-[#141929] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-gold">
              {['General Inquiry','Sponsorship','Player Registration','Media & Press','Partnership'].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gold text-xs font-semibold uppercase tracking-widest mb-2">Message</label>
            <textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="w-full bg-[#141929] border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-gold resize-none" placeholder="Tell us how you'd like to get involved..." />
          </div>
          <button type="submit" disabled={status==='sending'} className="btn-gold w-full py-4 disabled:opacity-50">
            {status==='sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status==='success' && <p className="text-green-400 text-sm text-center">Message sent! We'll get back to you soon.</p>}
          {status==='error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  )
}
