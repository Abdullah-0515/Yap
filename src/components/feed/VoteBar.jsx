import { motion } from 'framer-motion'
import { votePercents } from '../../lib/votes'

const OPTIONS = [
  { key: 'w', label: 'W', color: 'bg-win', title: 'Win - I agree' },
  { key: 'l', label: 'L', color: 'bg-loss', title: 'Loss - bad take' },
  { key: 'n', label: 'Meh', color: 'bg-meh', title: 'Neutral' },
]

// Bouncy counter: re-mounts (and springs) whenever the number changes.
function Bounce({ value }) {
  return (
    <motion.span
      key={value}
      initial={{ y: -10, scale: 1.4, opacity: 0.4 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 14 }}
      className="inline-block tabular-nums"
    >
      {value}
    </motion.span>
  )
}

export default function VoteBar({ votes, myVote, onVote }) {
  const pct = votePercents(votes)
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Vote on this take">
        {OPTIONS.map((o) => {
          const active = myVote === o.key
          return (
            <motion.button
              key={o.key}
              type="button"
              title={o.title}
              aria-pressed={active}
              aria-label={`${o.title}, ${pct[o.key]} percent`}
              onClick={() => onVote(o.key)}
              whileTap={{ scale: 0.9, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 600, damping: 16 }}
              className={`flex items-center gap-1.5 rounded-slip border-2 border-ink px-3 py-1.5 text-sm font-extrabold ${
                active ? `${o.color} text-[#14120f] shadow-none translate-x-[2px] translate-y-[2px]` : 'bg-card shadow-hard-sm'
              }`}
            >
              <span className="font-display">{o.label}</span>
              <span className="font-mono text-xs"><Bounce value={pct[o.key]} />%</span>
            </motion.button>
          )
        })}
        <span className="ml-auto self-center font-mono text-xs text-muted">{pct.total} votes</span>
      </div>
      <div className="mt-3 flex h-2.5 overflow-hidden rounded-sm border-2 border-ink" aria-hidden="true">
        {pct.total === 0 ? (
          <div className="w-full bg-line" />
        ) : (
          <>
            <motion.div className="bg-win" animate={{ width: `${pct.w}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} />
            <motion.div className="bg-loss" animate={{ width: `${pct.l}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} />
            <motion.div className="bg-meh" animate={{ width: `${pct.n}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} />
          </>
        )}
      </div>
    </div>
  )
}
