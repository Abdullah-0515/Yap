import { Card } from '../ui'

export default function AuthShell({ title, tagline, children, footer }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10">
      <div className="mb-8">
        <p className="font-display text-5xl uppercase leading-none">Yap<span className="text-pink">!</span></p>
        <p className="-rotate-2 font-marker text-lg text-muted">the campus wall nobody signed</p>
      </div>
      <Card tilt={-0.6} tape className="p-6 pt-7">
        <h1 className="mb-1 text-3xl">{title}</h1>
        {tagline && <p className="mb-5 text-muted">{tagline}</p>}
        {children}
      </Card>
      {footer && <p className="mt-6 text-center text-sm">{footer}</p>}
    </main>
  )
}
