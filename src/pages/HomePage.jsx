import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AppShell from '../components/layout/AppShell'
import Composer from '../components/feed/Composer'
import FeedControls from '../components/feed/FeedControls'
import PostCard from '../components/feed/PostCard'
import { PostSkeleton } from '../components/ui'
import { usePostsStore } from '../store/postsStore'

export default function HomePage() {
  const { posts, loading, tab, fetch } = usePostsStore()

  useEffect(() => { fetch() }, [fetch])

  return (
    <AppShell>
      <h1 className="mb-1 text-4xl sm:text-5xl">{tab === 'take' ? 'Hot Takes' : 'Confessions'}</h1>
      <p className="mb-5 -rotate-1 font-marker text-lg text-muted">
        {tab === 'take' ? 'say it with your chest' : 'nobody knows it was you'}
      </p>
      <FeedControls />

      <div className="mt-6 space-y-7">
        {loading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : posts.length === 0 ? (
          <p className="rounded-slip border-2 border-dashed border-ink/50 p-8 text-center font-marker text-xl text-muted">
            nothing here yet. be the first to yap.
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {posts.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <PostCard post={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      <Composer />
    </AppShell>
  )
}
