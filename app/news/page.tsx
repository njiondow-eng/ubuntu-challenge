import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { NewsPost } from '@/types'

export default async function NewsPage() {
  const supabase = createServerSupabaseClient()
  const { data: news } = await supabase
    .from('news')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  return (
    <section className="py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <p className="section-label">Latest</p>
        <h1 className="section-title">News & <span>Updates</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {(news as NewsPost[])?.map((post) => (
            <div key={post.id} className="card-dark overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="h-48 bg-gradient-to-br from-[#1B5E20] to-navy flex items-center justify-center relative overflow-hidden">
                {post.cover_image_url
                  ? <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
                  : <span className="text-5xl">📰</span>
                }
              </div>
              <div className="p-5 border-t border-white/5">
                <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">{post.category}</div>
                <h2 className="font-oswald font-bold text-white uppercase text-lg leading-tight mb-3">{post.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{post.excerpt}</p>
                <div className="text-gray-600 text-xs">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
