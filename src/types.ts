export interface Meta {
  name: string
  title: string
  tagline: string
  description: string
  location: string
  email: string
  resumeFile: string
}

export interface Social {
  label: string
  href: string
  icon: 'email' | 'linkedin' | 'github'
}

export interface ExperienceBullet {
  text: string
}

export interface Experience {
  title: string
  company: string
  period: string
  location: string
  project: string
  bullets: string[]
  recognition: string[]
}

export interface SkillGroup {
  label: string
  skills: string[]
}

export interface Certification {
  name: string
  url: string
  brand: 'adobe' | 'microsoft' | 'github'
  type: 'certification' | 'course'
}

export interface CurrentItem {
  label: string
  value: string
}
