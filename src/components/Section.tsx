interface SectionProps {
  id?: string
  label?: string
  divider?: boolean
  children: React.ReactNode
}

export default function Section({ id, label, divider = true, children }: SectionProps) {
  return (
    <section
      id={id}
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '0 1.5rem var(--section-padding)',
      }}
    >
      {divider && <hr className="divider" style={{ marginTop: 0, marginBottom: '3rem' }} />}
      {label && <p className="section-label">{label}</p>}
      {children}
    </section>
  )
}
