import { beforeEach, describe, expect, it } from 'vitest'
import { votePercents } from '../lib/votes'
import { createPost, heartPost, listPosts, votePost } from '../services/postsApi'

beforeEach(() => localStorage.clear())

describe('votePercents', () => {
  it('sums to 100 and handles no votes', () => {
    const p = votePercents({ w: 1, l: 1, n: 1 })
    expect(p.w + p.l + p.n).toBe(100)
    expect(votePercents({ w: 0, l: 0, n: 0 }).total).toBe(0)
  })
})

describe('postsApi (dummy)', () => {
  it('never returns author data for confessions', async () => {
    const { posts } = await listPosts({ type: 'confession' })
    expect(posts.length).toBeGreaterThan(0)
    posts.forEach((p) => {
      expect(p).not.toHaveProperty('author')
      expect(p).not.toHaveProperty('authorId')
    })
  })

  it('does not attach the user to a new anonymous confession', async () => {
    const { post } = await createPost(
      { type: 'confession', title: 'ignored', body: 'I nap in the library', category: 'Academics', tags: [] },
      { id: 'u_dummy', name: 'Secret Person' },
    )
    expect(JSON.stringify(post)).not.toContain('Secret Person')
    expect(post.title).toBe('')
  })

  it('moves a vote, and voting the same option again undoes it', async () => {
    const before = (await listPosts({ type: 'take' })).posts.find((p) => p.id === 'p1')
    const a = (await votePost({ postId: 'p1', vote: 'w' })).post
    expect(a.votes.w).toBe(before.votes.w + 1)
    const b = (await votePost({ postId: 'p1', vote: 'l' })).post
    expect(b.votes.w).toBe(before.votes.w)
    expect(b.votes.l).toBe(before.votes.l + 1)
    const c = (await votePost({ postId: 'p1', vote: 'l' })).post
    expect(c.votes.l).toBe(before.votes.l)
    expect(c.myVote).toBeNull()
  })

  it('toggles a heart', async () => {
    const a = (await heartPost({ postId: 'p2' })).post
    expect(a.hearted).toBe(true)
    const b = (await heartPost({ postId: 'p2' })).post
    expect(b.hearted).toBe(false)
  })
})
