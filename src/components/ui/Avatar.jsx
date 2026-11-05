const hues = ['#FFE135', '#FF3D81', '#16A35A', '#7DD3FC', '#FB923C', '#E5E7EB']

// Anonymous students get a blank "redacted" face: no initials, no colour, no identity.
export function AnonAvatar({ size = 40 }) {
  return (
    <span
      role="img"
      aria-label="Anonymous student"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      className="inline-flex shrink-0 items-center justify-center rounded-slip border-2 border-ink bg-ink font-marker text-paper"
    >
      ?
    </span>
  )
}

export default function Avatar({ name = '?', size = 40 }) {
  const i = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % hues.length
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.45, background: hues[i] }}
      className="inline-flex shrink-0 items-center justify-center rounded-slip border-2 border-ink font-display text-[#14120f]"
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  )
}
