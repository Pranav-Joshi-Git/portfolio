import type { Meta, Social } from '../types'

const careerStart = new Date(2022, 7, 1) // August 2022
const now = new Date()
const totalMonths =
  (now.getFullYear() - careerStart.getFullYear()) * 12 + (now.getMonth() - careerStart.getMonth())
const fullYears = Math.floor(totalMonths / 12)
const remainingMonths = totalMonths % 12
const yearsOfExperience = parseFloat(
  (fullYears + Math.round((remainingMonths / 12) * 10) / 10).toFixed(1)
)

export const meta: Meta = {
  name: 'Pranav Joshi',
  title: 'AEM & Edge Delivery Services Developer',
  tagline: 'Building scalable digital experiences — from AEM Sites and Adaptive Forms to Edge Delivery Services.',
  description: `Associate Consultant at Infosys. ${yearsOfExperience}+ years working across AEM Sites, Adaptive Forms, Assets(DAM), and Edge Delivery Services. Based in Pune, India.`,
  location: 'Pune, India',
  email: 'pranav.joshi.edu@gmail.com',
}

export const socials: Social[] = [
  { label: 'Email', href: 'mailto:pranav.joshi.edu@gmail.com', icon: 'email' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pranav-joshi-8598b0205/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/Pranav-Joshi-Git', icon: 'github' },
]
