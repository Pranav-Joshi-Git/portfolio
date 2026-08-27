import { motion } from 'framer-motion'

export default function Biography() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <p style={{ fontSize: '1.125rem', color: 'var(--color-text)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
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
  )
}
