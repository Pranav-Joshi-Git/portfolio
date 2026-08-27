export default function Footer() {
  return (
    <footer
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '2rem 1.5rem 3rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-faint)' }}>
        © {new Date().getFullYear()} Pranav Joshi
      </span>
      <a
        href="https://ipranavjoshi.com"
        style={{ fontSize: '0.8125rem', color: 'var(--color-text-faint)', textDecoration: 'none' }}
      >
        ipranavjoshi.com
      </a>
    </footer>
  )
}
