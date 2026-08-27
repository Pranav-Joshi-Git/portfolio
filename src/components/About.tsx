import { motion } from 'framer-motion'

const stats = [
  { value: '4+', label: 'Years experience' },
  { value: '2', label: 'Companies' },
  { value: '3', label: 'Certifications' },
  { value: '404', label: 'AEM errors resolved' },
]

export default function About() {
  return (
    <section
      id="about"
      style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 1.5rem var(--section-padding)' }}
    >
      <hr className="divider" style={{ marginTop: 0, marginBottom: '3rem' }} />
      <p className="section-label">About</p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <p style={{ fontSize: '1.125rem', color: 'var(--color-text)', lineHeight: 1.8, marginBottom: '1.25rem', fontWeight: 400 }}>
          I'm a developer based in Pune who specialises in the Adobe Experience Manager ecosystem.
          Over the past four years I've worked across AEM Sites, Adaptive Forms, and DAM —
          building components, automating workflows, and helping teams ship faster.
        </p>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
          Right now I'm an Associate Consultant at Infosys, working with the T-Mobile team on a
          large-scale digital asset management platform. Before that, I spent two and a half years
          at LTIMindtree building the Government of India's MCA V3 platform — a project that
          touched millions of users.
        </p>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
          Outside work I'm into cricket, video games, and thinking about personal finance.
        </p>
      </motion.div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px',
        backgroundColor: 'var(--color-border)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        overflow: 'hidden',
        marginTop: '2.5rem',
      }}>
        {stats.map(({ value, label }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ backgroundColor: 'rgba(245, 197, 24, 0.1)', scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              backgroundColor: 'var(--color-bg)',
              padding: '1.25rem 1rem',
              textAlign: 'center',
              cursor: 'default',
            }}
          >
            <motion.p
              whileHover={{ color: 'var(--color-accent-dark)' }}
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '0.375rem',
              }}
            >
              {value}
            </motion.p>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-faint)',
              fontWeight: 500,
              lineHeight: 1.3,
            }}>
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
