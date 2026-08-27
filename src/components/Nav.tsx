import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import avatar from '../assets/logo.png'
import { meta } from '../data'

const links = [
  { label: 'Experience', id: 'experience' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="7.05" y2="7.05" />
      <line x1="16.95" y1="16.95" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="7.05" y2="16.95" />
      <line x1="16.95" y1="7.05" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.5
      let current = ''
      for (const { id } of links) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= mid) current = id
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => {
    const root = document.documentElement
    root.classList.add('theme-transitioning')
    setIsDark(d => !d)
    setTimeout(() => root.classList.remove('theme-transitioning'), 500)
  }

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const themeToggle = (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: 'none',
        border: '1px solid var(--color-border)',
        borderRadius: '6px',
        cursor: 'pointer',
        color: 'var(--color-text-muted)',
        padding: '0.3rem 0.4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.15s, border-color 0.15s',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--color-text)'
        e.currentTarget.style.borderColor = 'var(--color-accent-dark)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--color-text-muted)'
        e.currentTarget.style.borderColor = 'var(--color-border)'
      }}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-nav-bg)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{
          maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 1.25rem',
          height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
          >
            <img src={avatar} alt="Pranav Joshi" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
              Pranav Joshi
            </span>
          </button>

          {/* Desktop links — hidden on mobile via CSS */}
          <div className="nav-links">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.875rem', transition: 'color 0.15s, border-color 0.2s',
                  color: activeId === id ? 'var(--color-text)' : 'var(--color-text-muted)',
                  borderBottom: `2px solid ${activeId === id ? 'var(--color-accent-dark)' : 'transparent'}`,
                  paddingBottom: '2px',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = activeId === id ? 'var(--color-text)' : 'var(--color-text-muted)')}
              >
                {label}
              </button>
            ))}
            {themeToggle}
            <a
              href="/resume.pdf" download={`${meta.resumeFile}.pdf`}
              style={{ fontSize: '0.8125rem', fontWeight: 500, padding: '0.375rem 0.875rem', backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)', borderRadius: '4px', textDecoration: 'none', transition: 'background-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-accent-dark)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
            >
              Resume ↓
            </a>
          </div>

          {/* Mobile: theme toggle + resume + hamburger — hidden on desktop via CSS */}
          <div className="nav-hamburger">
            {themeToggle}
            <a
              href="/resume.pdf" download={`${meta.resumeFile}.pdf`}
              style={{ fontSize: '0.75rem', fontWeight: 500, padding: '0.3rem 0.7rem', backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)', borderRadius: '4px', textDecoration: 'none' }}
            >
              Resume ↓
            </a>
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
              aria-label="Toggle menu"
            >
              <span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: 'var(--color-text)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
              <span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: 'var(--color-text)', transition: 'opacity 0.2s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: 'var(--color-text)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 49,
              backgroundColor: 'var(--color-bg)',
              borderBottom: '1px solid var(--color-border)',
              padding: '0.75rem 1.25rem 1rem',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '1rem', color: 'var(--color-text)', textAlign: 'left',
                  padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)', fontWeight: 500,
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
