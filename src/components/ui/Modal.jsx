import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea,select,[tabindex]:not([tabindex="-1"])'

export default function Modal({ open, onClose, title, children, dismissible = true }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const prev = document.activeElement
    const node = ref.current
    node?.querySelector(FOCUSABLE)?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape' && dismissible) return onClose?.()
      if (e.key !== 'Tab' || !node) return
      const items = [...node.querySelectorAll(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus?.()
    }
  }, [open, onClose, dismissible])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#14120f]/55 p-4 sm:items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && dismissible && onClose?.()}
        >
          <motion.div
            ref={ref} role="dialog" aria-modal="true" aria-label={title}
            className="relative w-full max-w-md rounded-slip border-2 border-ink bg-card p-6 shadow-hard-lg"
            initial={{ y: 40, rotate: -3, opacity: 0 }} animate={{ y: 0, rotate: -0.8, opacity: 1 }}
            exit={{ y: 20, rotate: 2, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          >
            <span className="tape" aria-hidden="true" />
            {title && <h2 className="mb-3 text-2xl">{title}</h2>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
