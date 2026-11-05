import { create } from 'zustand'
import * as postsApi from '../services/postsApi'

export const usePostsStore = create((set, get) => ({
  tab: 'take', // 'take' | 'confession'
  category: null,
  tag: null,
  sort: 'hot',
  posts: [],
  trending: { tags: [], takes: [] },
  loading: true,

  async fetch() {
    const { tab, category, tag, sort } = get()
    set({ loading: true })
    const { posts } = await postsApi.listPosts({ type: tab, category, tag, sort })
    set({ posts, loading: false })
  },
  async fetchTrending() {
    set({ trending: await postsApi.getTrending() })
  },
  setTab(tab) { set({ tab, category: null, tag: null }); return get().fetch() },
  setCategory(category) { set({ category }); return get().fetch() },
  setTag(tag) { set({ tag }); return get().fetch() },
  setSort(sort) { set({ sort }); return get().fetch() },

  _replace(post) {
    set((s) => ({ posts: s.posts.map((p) => (p.id === post.id ? post : p)) }))
  },
  async vote(postId, vote) {
    const { post } = await postsApi.votePost({ postId, vote })
    get()._replace(post)
  },
  async heart(postId) {
    const { post } = await postsApi.heartPost({ postId })
    get()._replace(post)
  },
  async create(payload, user) {
    const { post } = await postsApi.createPost(payload, user)
    // Show it right away on the matching tab.
    if (get().tab !== post.type) set({ tab: post.type, category: null, tag: null })
    await get().fetch()
    get().fetchTrending()
    return post
  },
}))
