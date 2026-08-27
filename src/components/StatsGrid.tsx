import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: '4+', label: 'Years experience' },
  { value: '2', label: 'Companies' },
  { value: '3', label: 'Certifications' },
  { value: '404', label: 'AEM errors resolved' },
]

export default function StatsGrid() {
  const [spotlight, setSpotlight] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSpotlight(prev => (prev + 1) % stats.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="stats-grid" style={{
      display: 'grid',
      gap: '1px',
      backgroundColor: 'var(--color-border)',
      border: '1px solid var(--color-border)',
      borderRadius: '10px',
      overflow: 'hidden',
    }}>
      {stats.map(({ value, label }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ backgroundColor: 'rgba(245, 197, 24, 0.12)', scale: 1.02 }}
          animate={{
            backgroundColor: spotlight === i
              ? 'rgba(245, 197, 24, 0.1)'
              : 'var(--color-bg)',
            scale: spotlight === i ? 1.02 : 1,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeInOut', delay: i * 0.08 }}
          style={{ padding: '1.25rem 1rem', textAlign: 'center', cursor: 'default' }}
        >
          <motion.p
            animate={{ color: spotlight === i ? 'var(--color-accent-dark)' : 'var(--color-text)' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '0.375rem' }}
          >
            {value}
          </motion.p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-faint)', fontWeight: 500, lineHeight: 1.3 }}>
            {label}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
