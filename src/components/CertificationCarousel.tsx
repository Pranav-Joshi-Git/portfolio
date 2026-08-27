import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { certifications } from '../data'
import type { Certification } from '../types'

const AdobeLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.108 0h-8.884L24 22.624z" />
  </svg>
)

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const MicrosoftLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.628h11.377V24H0zm12.623 0H24V24H12.623z" />
  </svg>
)

const brandConfig: Record<Certification['brand'], { logo: React.ElementType; color: string; label: string }> = {
  adobe: { logo: AdobeLogo, color: '#FF0000', label: 'Adobe' },
  github: { logo: GitHubLogo, color: '#24292e', label: 'GitHub' },
  microsoft: { logo: MicrosoftLogo, color: '#0078D4', label: 'Microsoft' },
}

const variants = {
  enter: (d: number) => ({ x: d * 50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -50, opacity: 0 }),
}

export default function CertificationCarousel() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setDirection(1)
      setActive(prev => (prev + 1) % certifications.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [paused])

  const goTo = (index: number) => {
    setDirection(index > active ? 1 : -1)
    setActive(index)
  }

  const cert = certifications[active]
  const { logo: Logo, color, label } = brandConfig[cert.brand]

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ position: 'relative', minHeight: '140px', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.a
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '1.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              backgroundColor: 'var(--color-bg-subtle)',
              textDecoration: 'none',
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent-dark)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          >
            {/* Brand logo watermark */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              right: '12px',
              width: '72px',
              height: '72px',
              color: color,
              opacity: 0.1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}>
              <Logo />
            </div>

            <p style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-text-faint)',
              marginBottom: '0.625rem',
            }}>
              {label} · Certification
            </p>

            <p style={{
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              lineHeight: 1.45,
              marginBottom: '1rem',
              maxWidth: '85%',
            }}>
              {cert.name}
            </p>

            <span style={{
              fontSize: '0.8rem',
              color: 'var(--color-accent-dark)',
              fontWeight: 500,
            }}>
              View credential ↗
            </span>
          </motion.a>
        </AnimatePresence>
      </div>

      {/* Dot navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.125rem', alignItems: 'center' }}>
        {certifications.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? '20px' : '6px',
              height: '6px',
              borderRadius: '100px',
              border: 'none',
              backgroundColor: i === active ? 'var(--color-accent-dark)' : 'var(--color-border)',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s, background-color 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
