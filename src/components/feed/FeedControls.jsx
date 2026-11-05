import { motion } from 'framer-motion'
import { CATEGORIES } from '../../services/postsApi'
import { usePostsStore } from '../../store/postsStore'

const TABS = [
  { key: 'take', label: 'Hot Takes' },
  { key: 'confession', label: 'Anonymous Confessions' },
]
const SORTS = [
  { key: 'hot', label: 'Hot' },
  { key: 'new', label: 'New' },
  { key: 'top', label: 'Top' },
]

export default function FeedControls() {
  const { tab, category, tag, sort, setTab, setCategory, setTag, setSort } = usePostsStore()

  return (
    <div className="space-y-3">
      <div role="tablist" aria-label="Feed" className="flex gap-1 border-b-2 border-ink">
        {TABS.map((t) => (
          <button
            key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}
            className={`relative -mb-[2px] rounded-t-slip border-2 border-b-0 px-4 py-2 font-display text-sm uppercase ${
              tab === t.key ? 'border-ink bg-hl text-[#14120f]' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Sort" className="flex overflow-hidden rounded-slip border-2 border-ink">
          {SORTS.map((s) => (
            <button key={s.key} aria-pressed={sort === s.key} onClick={() => setSort(s.key)}
              className={`px-3 py-1 font-mono text-xs font-bold uppercase ${sort === s.key ? 'bg-ink text-paper' : 'bg-card'}`}>
              {s.label}
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="cat-filter">Category</label>
        <select id="cat-filter" value={category || ''} onChange={(e) => setCategory(e.target.value || null)}
          className="rounded-slip border-2 border-ink bg-card px-2 py-1 font-mono text-xs font-bold uppercase">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        {tag && (
          <motion.button initial={{ scale: 0.7 }} animate={{ scale: 1 }} type="button" onClick={() => setTag(null)}
            aria-label={`Clear tag filter ${tag}`}
            className="rounded-sm border-2 border-ink bg-pink px-2 py-0.5 font-mono text-xs font-bold text-[#14120f]">
            #{tag} ✕
          </motion.button>
        )}
      </div>
    </div>
  )
}
