import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { meta, socials } from '../data'
import SocialIcon from './SocialIcon'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('sent')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '0 1.5rem var(--section-padding)',
      }}
    >
      <hr className="divider" style={{ marginTop: 0, marginBottom: '3rem' }} />
      <p className="section-label">Contact</p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Have something in mind?
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: '420px', lineHeight: 1.75 }}>
          Open to interesting conversations, collaborations, or just a hello.
          Fill in the form or reach out directly.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem', maxWidth: '480px', marginBottom: '3rem' }}>
          {[
            { name: 'from_name', placeholder: 'Your name', type: 'text' },
            { name: 'from_email', placeholder: 'Your email', type: 'email' },
          ].map(field => (
            <input
              key={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '0.9375rem',
                color: 'var(--color-text)',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--color-accent-dark)')}
              onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
            />
          ))}
          <textarea
            name="message"
            placeholder="Your message"
            required
            rows={5}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '0.9375rem',
              color: 'var(--color-text)',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--color-accent-dark)')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
          />

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            style={{
              alignSelf: 'flex-start',
              padding: '0.75rem 1.75rem',
              backgroundColor: status === 'sent' ? 'var(--color-bg-subtle)' : 'var(--color-accent)',
              color: 'var(--color-text)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              border: 'none',
              borderRadius: '6px',
              cursor: status === 'sending' || status === 'sent' ? 'default' : 'pointer',
              opacity: status === 'sending' ? 0.7 : 1,
              transition: 'background-color 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => {
              if (status === 'idle') e.currentTarget.style.backgroundColor = 'var(--color-accent-dark)'
            }}
            onMouseLeave={e => {
              if (status === 'idle') e.currentTarget.style.backgroundColor = 'var(--color-accent)'
            }}
          >
            {status === 'idle' && 'Send message →'}
            {status === 'sending' && 'Sending…'}
            {status === 'sent' && '✓ Message sent'}
            {status === 'error' && 'Try again'}
          </button>

          {status === 'error' && (
            <p style={{ fontSize: '0.875rem', color: '#c0392b' }}>
              Something went wrong. Please email me directly at {meta.email}
            </p>
          )}
        </form>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.875rem',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--color-text)'
                e.currentTarget.style.borderColor = 'var(--color-text-muted)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--color-text-muted)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
              }}
            >
              <SocialIcon icon={icon} />
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
