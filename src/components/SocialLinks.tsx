import { socials } from '../data'
import SocialIcon from './SocialIcon'

export default function SocialLinks() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {socials.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
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
            e.currentTarget.style.borderColor = 'var(--color-accent-dark)'
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
  )
}
