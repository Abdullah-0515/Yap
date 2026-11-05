import { motion } from 'framer-motion'

export default function HeartButton({ count, active, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? `Remove heart, ${count} hearts` : `Heart this, ${count} hearts`}
      className="flex items-center gap-1.5 rounded-slip px-2 py-1 font-mono text-sm font-bold hover:bg-line/60"
    >
      <motion.svg
        key={active ? 'on' : 'off'}
        viewBox="0 0 24 24"
        width="22"
        height="22"
        initial={active ? { scale: 0.3, rotate: -20 } : false}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 700, damping: 10 }}
        fill={active ? 'rgb(var(--pink))' : 'none'}
        stroke="rgb(var(--ink))"
        strokeWidth="2.2"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 5 6.4 5c2 0 3.6 1.1 4.6 2.7h2C14 6.1 15.600 5 17.600 5 21 5 23.100 8.400 21.600 11.800 19.500 16.400 12 21 12 21z" />
      </motion.svg>
      {count}
    </button>
  )
}
