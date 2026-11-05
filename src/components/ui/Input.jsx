import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({ label, error, hint, className = '', ...props }, ref) {
  const id = useId()
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block font-mono text-xs font-bold uppercase tracking-wider">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={`w-full rounded-slip border-2 bg-paper/60 px-3 py-2.5 font-sans text-base placeholder:text-muted/70 focus:bg-card ${
          error ? 'border-loss' : 'border-ink'
        }`}
        {...props}
      />
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-1 font-marker text-sm text-loss">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  )
})

export default Input
