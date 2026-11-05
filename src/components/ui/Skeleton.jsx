export default function Skeleton({ className = '' }) {
  return <div aria-hidden="true" className={`skeleton ${className}`} />
}

export function PostSkeleton() {
  return (
    <div className="rounded-slip border-2 border-dashed border-ink/50 bg-card p-5" role="status" aria-label="Loading">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="mt-4 h-5 w-3/4" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
      <p className="mt-3 font-marker text-sm text-muted">printing your yaps...</p>
    </div>
  )
}
