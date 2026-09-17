import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { certifications } from '../data'

// Add a new brand: add a new `brand` value to Certification['brand'] in types.ts,
// then drop a same-named file (any image format) in src/assets/brands/ — no code changes needed here.
const brandLogos = import.meta.glob('../assets/brands/*', { eager: true, import: 'default' }) as Record<string, string>
const logoByBrand: Record<string, string> = {}
for (const path in brandLogos) {
  const brand = path.split('/').pop()!.replace(/\.[^.]+$/, '')
  logoByBrand[brand] = brandLogos[path]
}

// Display casing only — a brand missing here just falls back to a capitalized name, it never breaks the build.
const brandLabels: Partial<Record<string, string>> = {
  github: 'GitHub',
  google: 'Google Cloud',
}
const getBrandLabel = (brand: string) => brandLabels[brand] ?? brand.charAt(0).toUpperCase() + brand.slice(1)

// GitHub's mark is a single flat color that needs to flip between light/dark themes.
const invertInDarkMode = new Set(['github'])

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
  const label = getBrandLabel(cert.brand)

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="cert-carousel-track">
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
            {/* Brand logo watermark — fits by height so wordmarks and icon marks both read clearly */}
            <div
              aria-hidden="true"
              className="cert-logo"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                height: '32px',
                maxWidth: '96px',
                display: 'flex',
                justifyContent: 'flex-end',
                opacity: 0.75,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              <img
                src={logoByBrand[cert.brand]}
                alt=""
                className={invertInDarkMode.has(cert.brand) ? 'cert-logo-invert-dark' : undefined}
                style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Text content — padded right to clear the logo on all screen sizes */}
            <div style={{ paddingRight: '112px' }}>
              <p style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-text-faint)',
                marginBottom: '0.625rem',
              }}>
                {label} · {cert.type === 'course' ? 'Course' : 'Certification'}
              </p>

              <p style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                lineHeight: 1.45,
                marginBottom: '1rem',
              }}>
                {cert.name}
              </p>

              <span style={{
                fontSize: '0.8rem',
                color: 'var(--color-accent-text)',
                fontWeight: 500,
              }}>
                View credential ↗
              </span>
            </div>
          </motion.a>
        </AnimatePresence>
      </div>

      {/* Dot navigation */}
      <div style={{ display: 'flex', gap: 0, marginTop: '1.125rem', alignItems: 'center', justifyContent: 'center' }}>
        {certifications.map((cert, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${cert.name}`}
            aria-current={i === active ? true : undefined}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '9px 4px',
              minWidth: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{
              display: 'block',
              width: i === active ? '20px' : '6px',
              height: '6px',
              borderRadius: '100px',
              backgroundColor: i === active ? 'var(--color-accent-dark)' : 'var(--color-border)',
              transition: 'width 0.3s, background-color 0.3s',
            }} />
          </button>
        ))}
      </div>
    </div>
  )
}
