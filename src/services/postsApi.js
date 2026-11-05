// DUMMY posts API: in-memory data seeded with campus content, persisted to localStorage.
// Signatures are REST-shaped so the backend only has to replace this file.
// IMPORTANT: confessions never carry author data - it is stripped here, not in the UI.

const POSTS_KEY = 'yap-posts'
const REACT_KEY = 'yap-reactions'
const H = 3600 * 1000

export const CATEGORIES = ['Food', 'Academics', 'Hostel', 'Sports', 'Societies', 'Love']
export const TAGS = ['cafeteria', 'finals', 'attendance', 'wifi', 'cricket', 'library', 'situationship', 'quiz', 'chai', 'parking']

const delay = (ms = 250) =>
  import.meta.env.MODE === 'test' ? Promise.resolve() : new Promise((r) => setTimeout(r, ms))

const seed = () => {
  const t = Date.now()
  return [
    { id: 'p1', type: 'take', title: 'The cafeteria samosa is a personality test', body: 'If you say it is overrated you are lying, or you have never had it at 1pm on a Friday.', category: 'Food', tags: ['cafeteria', 'chai'], author: { id: 'u1', name: 'Hira Khan' }, createdAt: t - 2 * H, votes: { w: 142, l: 31, n: 12 }, hearts: 88, commentCount: 24 },
    { id: 'p2', type: 'take', title: 'Attendance should not be marked for 8am classes', body: 'Showing up in body at 8am and showing up in mind are two different things. Mark me present at 9.', category: 'Academics', tags: ['attendance'], author: { id: 'u2', name: 'Zain Ali' }, createdAt: t - 5 * H, votes: { w: 201, l: 18, n: 9 }, hearts: 120, commentCount: 41 },
    { id: 'p3', type: 'confession', title: '', body: 'I have been "studying in the library" for 3 weeks. I just nap there. Fourth floor, the beanbag corner.', category: 'Academics', tags: ['library'], createdAt: t - 1 * H, votes: { w: 64, l: 5, n: 20 }, hearts: 97, commentCount: 17 },
    { id: 'p4', type: 'take', title: 'Hostel wifi is a lifestyle subscription we did not sign up for', body: 'Pay full fees, get loading circles. At least make the circles faster.', category: 'Hostel', tags: ['wifi'], author: { id: 'u3', name: 'Ayesha Noor' }, createdAt: t - 9 * H, votes: { w: 175, l: 7, n: 3 }, hearts: 66, commentCount: 33 },
    { id: 'p5', type: 'confession', title: '', body: 'I told my crush I was "busy with finals prep" for a month so I did not have to reply. I did not open a single book.', category: 'Love', tags: ['finals', 'situationship'], createdAt: t - 3 * H, votes: { w: 30, l: 44, n: 16 }, hearts: 53, commentCount: 29 },
    { id: 'p6', type: 'take', title: 'Cricket ground chai beats any cafe in the city', body: 'No reservation, no latte art, no problem. Cutting chai at the boundary line hits different.', category: 'Sports', tags: ['cricket', 'chai'], author: { id: 'u4', name: 'Bilal Raza' }, createdAt: t - 26 * H, votes: { w: 88, l: 22, n: 15 }, hearts: 41, commentCount: 12 },
    { id: 'p7', type: 'confession', title: '', body: 'I parked in the faculty spot for two semesters. They put a note on my car yesterday saying "we know". I am scared.', category: 'Academics', tags: ['parking'], createdAt: t - 12 * H, votes: { w: 22, l: 61, n: 10 }, hearts: 70, commentCount: 38 },
    { id: 'p8', type: 'take', title: 'Surprise quizzes are just trust issues with a grading scheme', body: 'If you want to know whether I read the chapter, ask me politely. I will lie to your face, but politely.', category: 'Academics', tags: ['quiz', 'finals'], author: { id: 'u5', name: 'Maryam Tariq' }, createdAt: t - 30 * H, votes: { w: 120, l: 40, n: 22 }, hearts: 59, commentCount: 20 },
    { id: 'p9', type: 'take', title: 'The debating society only exists to argue about who is president', body: 'Respectfully, the best debate of the year was about the AC remote.', category: 'Societies', tags: [], author: { id: 'u6', name: 'Usman Sheikh' }, createdAt: t - 50 * H, votes: { w: 55, l: 49, n: 30 }, hearts: 18, commentCount: 9 },
    { id: 'p10', type: 'confession', title: '', body: 'I pretend to be on calls while walking past the cafeteria so nobody asks me to sit with them. Sorry. I love you all from a distance.', category: 'Food', tags: ['cafeteria'], createdAt: t - 70 * H, votes: { w: 90, l: 3, n: 14 }, hearts: 130, commentCount: 22 },
  ]
}

function readPosts() {
  try {
    const raw = localStorage.getItem(POSTS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  const s = seed()
  writePosts(s)
  return s
}
function writePosts(p) {
  try { localStorage.setItem(POSTS_KEY, JSON.stringify(p)) } catch { /* ignore */ }
}
function readReactions() {
  try { return JSON.parse(localStorage.getItem(REACT_KEY)) || {} } catch { return {} }
}
function writeReactions(r) {
  try { localStorage.setItem(REACT_KEY, JSON.stringify(r)) } catch { /* ignore */ }
}

// Merge the current viewer's reactions in, and make sure confessions leak nothing.
function toClient(post, reactions) {
  const mine = reactions[post.id] || {}
  const out = { ...post, myVote: mine.vote || null, hearted: Boolean(mine.heart) }
  if (post.type === 'confession') {
    delete out.author
    delete out.authorId
  }
  return out
}

export function hotScore(p, now = Date.now()) {
  const engagement = p.votes.w + p.votes.l + p.votes.n + p.hearts * 2 + p.commentCount * 3
  const ageH = Math.max(0, (now - p.createdAt) / H)
  return engagement / Math.pow(ageH + 2, 1.3)
}

const SORTS = {
  hot: (a, b) => hotScore(b) - hotScore(a),
  new: (a, b) => b.createdAt - a.createdAt,
  top: (a, b) => b.votes.w - b.votes.l - (a.votes.w - a.votes.l),
}

// TODO(backend): replace with real endpoint  GET /posts?type=&category=&tag=&sort=
export async function listPosts({ type = 'take', category = null, tag = null, sort = 'hot' } = {}) {
  await delay()
  const reactions = readReactions()
  const posts = readPosts()
    .filter((p) => p.type === type)
    .filter((p) => !category || p.category === category)
    .filter((p) => !tag || p.tags.includes(tag))
    .sort(SORTS[sort] || SORTS.hot)
    .map((p) => toClient(p, reactions))
  return { posts }
}

// TODO(backend): replace with real endpoint  GET /posts/:id
export async function getPost(id) {
  await delay(150)
  const p = readPosts().find((x) => x.id === id)
  if (!p) return Promise.reject({ code: 'NOT_FOUND', message: 'That yap is gone.' })
  return { post: toClient(p, readReactions()) }
}

// TODO(backend): replace with real endpoint  GET /posts/trending
export async function getTrending() {
  await delay(150)
  const posts = readPosts()
  const counts = {}
  posts.forEach((p) => p.tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1 + p.hearts / 50 }))
  const tags = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([tag]) => tag)
  const reactions = readReactions()
  const takes = posts.filter((p) => p.type === 'take').sort(SORTS.hot).slice(0, 3).map((p) => toClient(p, reactions))
  return { tags, takes }
}

// TODO(backend): replace with real endpoint  POST /posts/:id/vote   body {vote:'w'|'l'|'n'}
export async function votePost({ postId, vote }) {
  await delay(120)
  const posts = readPosts()
  const reactions = readReactions()
  const post = posts.find((p) => p.id === postId)
  const prev = reactions[postId]?.vote
  if (prev) post.votes[prev] -= 1
  if (prev === vote) {
    reactions[postId] = { ...reactions[postId], vote: null } // same vote again = undo
  } else {
    post.votes[vote] += 1
    reactions[postId] = { ...reactions[postId], vote }
  }
  writePosts(posts)
  writeReactions(reactions)
  return { post: toClient(post, reactions) }
}

// TODO(backend): replace with real endpoint  POST /posts/:id/heart  (toggles)
export async function heartPost({ postId }) {
  await delay(100)
  const posts = readPosts()
  const reactions = readReactions()
  const post = posts.find((p) => p.id === postId)
  const was = Boolean(reactions[postId]?.heart)
  post.hearts += was ? -1 : 1
  reactions[postId] = { ...reactions[postId], heart: !was }
  writePosts(posts)
  writeReactions(reactions)
  return { post: toClient(post, reactions) }
}

// TODO(backend): replace with real endpoint  POST /posts   body {type,title,body,category,tags}
// The server derives the author from the access token; confessions store NO author.
export async function createPost({ type, title, body, category, tags }, user) {
  await delay(300)
  const posts = readPosts()
  const post = {
    id: `p_${Date.now().toString(36)}`,
    type,
    title: type === 'take' ? title.trim() : '',
    body: body.trim(),
    category,
    tags,
    createdAt: Date.now(),
    votes: { w: 0, l: 0, n: 0 },
    hearts: 0,
    commentCount: 0,
  }
  if (type === 'take') post.author = { id: user?.id || 'u_dummy', name: user?.name || 'Student' }
  writePosts([post, ...posts])
  return { post: toClient(post, readReactions()) }
}
