// Single source of truth for section ids — Nav.tsx's scroll targets and App.tsx's
// <Section id=...> props both read from here so they can't drift out of sync.
export const SECTION_HERO = 'hero'
export const SECTION_EXPERIENCE = 'experience'
export const SECTION_ABOUT = 'about'
export const SECTION_CONTACT = 'contact'

export const navLinks = [
  { id: SECTION_EXPERIENCE, label: 'Experience' },
  { id: SECTION_ABOUT, label: 'About' },
  { id: SECTION_CONTACT, label: 'Contact' },
]
