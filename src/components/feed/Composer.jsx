import { useState } from 'react'
import { Button, Input, Modal } from '../ui'
import { CATEGORIES, TAGS } from '../../services/postsApi'
import { usePostsStore } from '../../store/postsStore'
import { useAuthStore } from '../../store/authStore'

const EMPTY = { anonymous: false, title: '', body: '', category: CATEGORIES[0], tags: [] }

// Floating bar at the bottom of the feed + the modal it opens.
export default function Composer() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const create = usePostsStore((s) => s.create)
  const user = useAuthStore((s) => s.user)

  const close = () => { setOpen(false); setErrors({}) }
  const toggleTag = (t) =>
    setForm((f) => ({ ...f, tags: f.tags.includes(t) ? f.tags.filter((x) => x !== t) : f.tags.length < 3 ? [...f.tags, t] : f.tags }))

  async function submit(e) {
    e.preventDefault()
    const next = {}
    if (!form.anonymous && form.title.trim().length < 5) next.title = 'Give your take a title (5+ characters).'
    if (form.body.trim().length < 10) next.body = 'Say a bit more (10+ characters).'
    setErrors(next)
    if (Object.keys(next).length) return
    setSaving(true)
    await create(
      { type: form.anonymous ? 'confession' : 'take', title: form.title, body: form.body, category: form.category, tags: form.tags },
      user,
    )
    setSaving(false)
    setForm(EMPTY)
    close()
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-30 flex justify-center px-4 md:bottom-6 md:pl-60 lg:pr-72">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="glass pointer-events-auto flex w-full max-w-xl items-center justify-between gap-3 rounded-slip border-2 border-ink px-4 py-3 text-left shadow-hard transition-transform hover:-translate-y-0.5"
        >
          <span className="text-muted">What is your hot take?</span>
          <span className="rounded-slip border-2 border-ink bg-hl px-3 py-1 text-sm font-extrabold uppercase text-[#14120f]">Yap</span>
        </button>
      </div>

      <Modal open={open} onClose={close} title={form.anonymous ? 'Confess it' : 'Drop a hot take'}>
        <form onSubmit={submit} noValidate className="space-y-4">
          <label className="flex cursor-pointer items-center gap-3 rounded-slip border-2 border-ink bg-paper/60 p-3">
            <input
              type="checkbox"
              checked={form.anonymous}
              onChange={(e) => setForm((f) => ({ ...f, anonymous: e.target.checked }))}
              className="h-5 w-5 accent-[rgb(var(--pink))]"
            />
            <span>
              <span className="block font-extrabold">Post anonymously</span>
              <span className="block text-xs text-muted">Goes to Confessions. No name, no avatar, nothing.</span>
            </span>
          </label>

          {!form.anonymous && (
            <Input label="Title" value={form.title} maxLength={90} placeholder="Say it in one line"
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} error={errors.title} />
          )}

          <div>
            <label htmlFor="yap-body" className="mb-1 block font-mono text-xs font-bold uppercase tracking-wider">
              {form.anonymous ? 'Your confession' : 'The details'}
            </label>
            <textarea
              id="yap-body" rows={4} maxLength={500} value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              aria-invalid={errors.body ? 'true' : undefined}
              className={`w-full rounded-slip border-2 bg-paper/60 px-3 py-2.5 focus:bg-card ${errors.body ? 'border-loss' : 'border-ink'}`}
            />
            {errors.body && <p role="alert" className="mt-1 font-marker text-sm text-loss">{errors.body}</p>}
          </div>

          <div>
            <label htmlFor="yap-cat" className="mb-1 block font-mono text-xs font-bold uppercase tracking-wider">Category</label>
            <select id="yap-cat" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full rounded-slip border-2 border-ink bg-paper/60 px-3 py-2.5">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <fieldset>
            <legend className="mb-1 font-mono text-xs font-bold uppercase tracking-wider">Tags (up to 3)</legend>
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((t) => {
                const on = form.tags.includes(t)
                return (
                  <button key={t} type="button" aria-pressed={on} onClick={() => toggleTag(t)}
                    className={`rounded-sm border-2 border-ink px-2 py-0.5 font-mono text-xs font-bold ${on ? 'bg-hl text-[#14120f]' : ''}`}>
                    #{t}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={close}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Posting...' : 'Post it'}</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
