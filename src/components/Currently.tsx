import { motion } from 'framer-motion'
import { currentItems } from '../data'

export default function Currently() {
  return (
    <section
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '0 1.5rem var(--section-padding)',
      }}
    >
      <hr className="divider" style={{ marginTop: 0, marginBottom: '3rem' }} />
      <p className="section-label">Currently</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {currentItems.map(({ label, value }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            style={{ display: 'flex', gap: '1.5rem', alignItems: 'baseline' }}
          >
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.75rem',
                color: 'var(--color-text-faint)',
                minWidth: '80px',
                flexShrink: 0,
              }}
            >
              {label}
            </span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
              <span style={{ color: 'var(--color-accent-dark)', marginRight: '0.5rem' }}>→</span>
              {value}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
