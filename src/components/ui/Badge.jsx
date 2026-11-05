const tones = {
  default: 'border-ink text-ink bg-transparent',
  hl: 'border-ink bg-hl text-[#14120f]',
  pink: 'border-ink bg-pink text-[#14120f]',
  // Yap AI: black label with yellow type, like a press-pass
  ai: 'border-ink bg-ink text-hl',
}

export default function Badge({ tone = 'default', tilt = false, className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border-2 px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider ${tones[tone]} ${tilt ? '-rotate-3' : ''} ${className}`}
    >
      {children}
    </span>
  )
}
