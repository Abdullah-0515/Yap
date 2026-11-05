import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-hl text-[#14120f] border-2 border-ink shadow-hard',
  pink: 'bg-pink text-[#14120f] border-2 border-ink shadow-hard',
  soft: 'bg-card text-ink border-2 border-ink shadow-hard',
  ghost: 'bg-transparent text-ink hover:bg-line/60',
}

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  const solid = variant !== 'ghost'
  return (
    <motion.button
      whileHover={solid ? { x: -1, y: -1 } : undefined}
      whileTap={solid ? { x: 4, y: 4, boxShadow: '0px 0px 0 0 rgb(var(--ink))' } : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 600, damping: 24 }}
      className={`inline-flex items-center justify-center gap-2 rounded-slip px-4 py-2 font-sans text-sm font-extrabold uppercase tracking-wide disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
