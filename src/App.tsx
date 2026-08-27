import Nav from './components/Nav'
import Hero from './components/Hero'
import Section from './components/Section'
import StatsGrid from './components/StatsGrid'
import SkillGroups from './components/SkillGroups'
import CertificationCarousel from './components/CertificationCarousel'
import ExperienceList from './components/ExperienceList'
import Biography from './components/Biography'
import ContactForm from './components/ContactForm'
import SocialLinks from './components/SocialLinks'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '56px' }}>

        <Hero />

        <Section divider={false}>
          <StatsGrid />
        </Section>

        <Section label="Skills">
          <SkillGroups />
        </Section>

        <Section label="Courses & Certifications">
          <CertificationCarousel />
        </Section>

        <Section id="experience" label="Experience">
          <ExperienceList />
        </Section>

        <Section id="about" label="About">
          <Biography />
        </Section>

        <Section id="contact" label="Contact">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Have something in mind?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: '420px', lineHeight: 1.75 }}>
            Open to interesting conversations, collaborations, or just a hello.
          </p>
          <div style={{ maxWidth: '480px', marginBottom: '2rem' }}>
            <ContactForm />
          </div>
          <SocialLinks />
        </Section>

      </main>
      <Footer />
    </>
  )
}
