import { motion } from 'framer-motion'
import { skillGroups } from '../data'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const tag = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export default function SkillGroups() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {skillGroups.map((group, i) => (
        <div key={i}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            {group.label}
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
          >
            {group.skills.map(skill => (
              <motion.span
                key={skill}
                variants={tag}
                whileHover={{ borderColor: 'var(--color-accent-dark)', color: 'var(--color-text)' }}
                transition={{ duration: 0.15 }}
                style={{
                  fontSize: '0.8125rem',
                  padding: '0.3rem 0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '100px',
                  color: 'var(--color-text-muted)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  fontWeight: 500,
                  cursor: 'default',
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
