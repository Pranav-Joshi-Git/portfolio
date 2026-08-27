import { motion, type Variants } from 'framer-motion'
import { experiences } from '../data'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function ExperienceList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {experiences.map((exp, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.25rem' }}>
            <div>
              <span style={{ fontWeight: 600, fontSize: '1.0625rem', color: 'var(--color-text)' }}>{exp.title}</span>
              <span style={{ color: 'var(--color-text-muted)', margin: '0 0.5rem' }}>·</span>
              <span style={{ fontWeight: 500, color: 'var(--color-text-muted)' }}>{exp.company}</span>
            </div>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-faint)', fontFamily: '"JetBrains Mono", monospace', whiteSpace: 'nowrap' }}>
              {exp.period}
            </span>
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--color-accent-dark)', marginBottom: '1rem', fontWeight: 500 }}>
            {exp.project}
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {exp.bullets.map((bullet, j) => (
              <li key={j} style={{ display: 'flex', gap: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                <span style={{ color: 'var(--color-accent-dark)', flexShrink: 0, marginTop: '0.1em' }}>—</span>
                {bullet}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {exp.recognition.map((award, k) => (
              <div key={k} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
                padding: '0.5rem 0.875rem',
                backgroundColor: 'rgba(245, 197, 24, 0.12)',
                border: '1px solid rgba(245, 197, 24, 0.35)',
                borderLeft: '3px solid var(--color-accent-dark)',
                borderRadius: '6px',
              }}>
                <span style={{ fontSize: '0.875rem', flexShrink: 0, marginTop: '0.05em' }}>★</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text)', lineHeight: 1.5 }}>{award}</span>
              </div>
            ))}
          </div>

          {i < experiences.length - 1 && <hr className="divider-sm" />}
        </motion.div>
      ))}
    </div>
  )
}
