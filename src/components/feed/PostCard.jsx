import { Avatar, AnonAvatar, Badge, Card } from '../ui'
import { timeAgo } from '../../lib/time'
import { usePostsStore } from '../../store/postsStore'
import HeartButton from './HeartButton'
import VoteBar from './VoteBar'

const tiltFor = (id) => {
  const h = [...id].reduce((a, c) => a + c.charCodeAt(0), 0)
  return ((h % 5) - 2) * 0.25
}

export default function PostCard({ post }) {
  const vote = usePostsStore((s) => s.vote)
  const heart = usePostsStore((s) => s.heart)
  const setTag = usePostsStore((s) => s.setTag)
  const isConfession = post.type === 'confession'

  return (
    <Card as="article" tilt={tiltFor(post.id)} tape={post.id.charCodeAt(1) % 2 === 0} className="p-5 pt-6" aria-label={post.title || 'Anonymous confession'}>
      <header className="flex items-center gap-3">
        {isConfession ? <AnonAvatar /> : <Avatar name={post.author?.name} />}
        <div className="min-w-0">
          <p className="truncate font-extrabold">{isConfession ? 'Anonymous Student' : post.author?.name}</p>
          <p className="font-mono text-xs text-muted">{timeAgo(post.createdAt)} · {post.category}</p>
        </div>
        {isConfession && <span className="stamp ml-auto text-pink">confession</span>}
      </header>

      {post.title && <h2 className="mt-4 text-xl sm:text-2xl">{post.title}</h2>}
      <p className={`${post.title ? 'mt-2' : 'mt-4 text-lg'} whitespace-pre-wrap leading-relaxed`}>{post.body}</p>

      {post.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <li key={t}>
              <button type="button" onClick={() => setTag(t)} aria-label={`Filter by tag ${t}`}>
                <Badge className="hover:bg-hl hover:text-[#14120f]">#{t}</Badge>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <VoteBar votes={post.votes} myVote={post.myVote} onVote={(v) => vote(post.id, v)} />
      </div>

      <footer className="mt-3 flex items-center gap-3 border-t-2 border-dashed border-line pt-3">
        <HeartButton count={post.hearts} active={post.hearted} onToggle={() => heart(post.id)} />
        <span className="font-mono text-sm font-bold" aria-label={`${post.commentCount} comments`}>
          💬 {post.commentCount}
        </span>
      </footer>
    </Card>
  )
}
