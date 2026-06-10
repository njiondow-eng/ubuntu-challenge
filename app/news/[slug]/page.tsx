import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()
  const { data: post } = await supabase
    .from('news')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  return (
    <section className="py-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {post.cover_image_url && (
          <div className="w-full h-72 overflow-hidden mb-8">
            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-gold text-xs font-semibold uppercase tracking-widest">{post.category}</span>
          <span className="text-gray-600 text-xs">
            {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </span>
        </div>
        <h1 className="font-oswald font-bold text-white uppercase text-4xl leading-tight mb-8">{post.title}</h1>
        <div className="kente-strip mb-8" />
        <div className="text-gray-300 text-base leading-relaxed whitespace-pre-line">{post.content}</div>
        <div className="mt-12 pt-8 border-t border-white/10">
          <a href="/news" className="btn-outline-gold text-xs py-2 px-6">← Back to News</a>
        </div>
      </div>
    </section>
  )
}