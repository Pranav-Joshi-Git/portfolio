import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { meta } from '../data'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  backgroundColor: 'var(--color-bg-subtle)',
  border: '1px solid var(--color-border)',
  borderRadius: '6px',
  fontSize: '0.9375rem',
  color: 'var(--color-text)',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.15s',
  width: '100%',
  boxSizing: 'border-box',
}

export default function ContactForm() {
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
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
      <input
        name="from_name" type="text" placeholder="Your name" required
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = 'var(--color-accent-dark)')}
        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
      />
      <input
        name="from_email" type="email" placeholder="Your email" required
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = 'var(--color-accent-dark)')}
        onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
      />
      <textarea
        name="message" placeholder="Your message" required rows={5}
        style={{ ...inputStyle, resize: 'vertical' }}
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
          color: status === 'sent' ? 'var(--color-text-muted)' : 'var(--color-on-accent)',
          fontWeight: 600,
          fontSize: '0.9375rem',
          border: 'none',
          borderRadius: '6px',
          cursor: status === 'sending' || status === 'sent' ? 'default' : 'pointer',
          opacity: status === 'sending' ? 0.7 : 1,
          transition: 'background-color 0.15s, transform 0.15s',
        }}
        onMouseEnter={e => { if (status === 'idle') e.currentTarget.style.backgroundColor = 'var(--color-accent-dark)' }}
        onMouseLeave={e => { if (status === 'idle') e.currentTarget.style.backgroundColor = 'var(--color-accent)' }}
      >
        {status === 'idle' && 'Send message →'}
        {status === 'sending' && 'Sending…'}
        {status === 'sent' && '✓ Message sent'}
        {status === 'error' && 'Try again'}
      </button>

      {status === 'error' && (
        <p style={{ fontSize: '0.875rem', color: '#c0392b' }}>
          Something went wrong. Email me directly at {meta.email}
        </p>
      )}
    </form>
  )
}
