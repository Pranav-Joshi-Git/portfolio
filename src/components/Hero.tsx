import { motion, type Variants } from 'framer-motion'
import { meta } from '../data'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '0 1.5rem',
      }}
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.h1
          variants={item}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 3.75rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
            marginBottom: '1.25rem',
          }}
        >
          {meta.name}.
        </motion.h1>

        <motion.h2
          variants={item}
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 500,
            color: 'var(--color-text-muted)',
            lineHeight: 1.35,
            marginBottom: '1.5rem',
            maxWidth: '520px',
          }}
        >
          {meta.tagline}
        </motion.h2>

        <motion.p
          variants={item}
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            maxWidth: '460px',
            marginBottom: '2.5rem',
            lineHeight: 1.75,
          }}
        >
          {meta.description}
        </motion.p>

        <motion.div variants={item} className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => scrollTo('contact')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-on-accent)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-dark)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Let's talk →
          </button>
          <button
            onClick={() => scrollTo('experience')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: 'var(--color-text)',
              fontWeight: 500,
              fontSize: '0.9375rem',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'border-color 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-accent-dark)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            View experience
          </button>
        </motion.div>
      </motion.div>

    </section>
  )
}
