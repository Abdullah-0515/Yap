// A pinned paper slip. `tilt` is in degrees; `tape` adds a strip of masking tape.
export default function Card({ as: Tag = 'div', tilt = 0, tape = false, className = '', style, children, ...props }) {
  return (
    <Tag
      className={`relative rounded-slip border-2 border-ink bg-card shadow-hard ${className}`}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, '--tape-rot': `${-tilt * 3 - 3}deg`, ...style }}
      {...props}
    >
      {tape && <span className="tape" aria-hidden="true" />}
      {children}
    </Tag>
  )
}
