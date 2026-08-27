import type { Experience } from '../types'

export const experiences: Experience[] = [
  {
    title: 'Associate Consultant',
    company: 'Infosys',
    period: 'Feb 2025 – Present',
    location: 'Pune, India',
    project: 'Project: eDAM · Client: T-Mobile, USA',
    bullets: [
      'Built reusable AEM Sites components and DAM functionalities using HTL, Sling Models, OSGi Services and Workflows.',
      'Implemented Adobe Analytics data layer and event tracking for user interaction analysis.',
      'Customized Asset Share Commons to support enterprise-wide digital asset management at scale.',
      'Automated metadata report generation using AEM Schedulers and custom Workflow processes.',
    ],
    recognition: ['Awarded "Digital Marketing Professional – Adobe Solutions" Skill tag.'],
  },
  {
    title: 'Software Engineer',
    company: 'LTIMindtree',
    period: 'Aug 2022 – Jan 2025',
    location: 'Pune, India',
    project: 'Project: MCA V3 Website · Client: Ministry of Corporate Affairs, Govt. of India',
    bullets: [
      'Developed AEM Sites and Adaptive Forms for a government digital services platform serving millions of users.',
      'Built custom Adaptive Form components using Rule Editor, GuideBridge, and Pre-fill Services.',
      'Resolved production issues within SLA, contributing to a 90% reduction in support tickets.',
    ],
    recognition: [
      'Recipient of "Shooting Star – Q3FY25" for exceptional individual performance.',
      'Contributed to the team\'s "Star Crew Award" — 90% reduction in production tickets through proactive issue resolution.',
    ],
  },
]
