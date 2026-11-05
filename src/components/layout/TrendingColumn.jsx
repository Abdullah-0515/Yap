import { useEffect } from 'react'
import { Badge } from '../ui'
import { usePostsStore } from '../../store/postsStore'

export default function TrendingColumn() {
  const trending = usePostsStore((s) => s.trending)
  const fetchTrending = usePostsStore((s) => s.fetchTrending)
  const setTag = usePostsStore((s) => s.setTag)

  useEffect(() => { fetchTrending() }, [fetchTrending])

  return (
    <div className="space-y-8">
      <section aria-labelledby="hot-tags">
        <h2 id="hot-tags" className="mb-3 text-lg"><span className="hl">Hot tags</span></h2>
        <ul className="flex flex-wrap gap-1.5">
          {trending.tags.map((t) => (
            <li key={t}>
              <button type="button" onClick={() => setTag(t)} aria-label={`Filter by tag ${t}`}>
                <Badge tone="hl" tilt className="hover:bg-pink">#{t}</Badge>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="hot-takes">
        <h2 id="hot-takes" className="mb-3 text-lg">Trending takes</h2>
        <ol className="space-y-3">
          {trending.takes.map((p, i) => (
            <li key={p.id} className="flex gap-3">
              <span className="font-display text-3xl leading-none text-pink" aria-hidden="true">{i + 1}</span>
              <div>
                <p className="font-extrabold leading-snug">{p.title}</p>
                <p className="font-mono text-xs text-muted">{p.votes.w} W · {p.hearts} ♥</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <p className="-rotate-1 font-marker text-sm text-muted">no one is above a hot take.</p>
    </div>
  )
}
