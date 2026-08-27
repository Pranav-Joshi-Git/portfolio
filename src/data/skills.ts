import type { SkillGroup, Certification } from '../types'

export const skillGroups: SkillGroup[] = [
  {
    label: 'Adobe Ecosystem',
    skills: ['AEM Sites', 'Adaptive Forms', 'DAM / Assets', 'Edge Delivery Services', 'Document Authoring', 'Universal Editor', 'AEMaaCS', 'Asset Share Commons'],
  },
  {
    label: 'AEM Development',
    skills: ['HTL', 'Sling Models', 'Sling Servlets', 'OSGi Services', 'Client Libraries', 'Editable Templates', 'Custom Components', 'Content Fragment', 'Experience Fragment', 'Workflows', 'Oak Indexing'],
  },
  {
    label: 'Web & Tools',
    skills: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Git', 'Maven', 'Jira', 'Confluence'],
  }
]

export const certifications: Certification[] = [
  {
    name: 'Adobe Certified Professional - AEM Sites Developer',
    url: 'https://certification.adobe.com/credential/verify/3c341e99-46df-11f1-be16-42010a400fe2',
    brand: 'adobe',
    type: 'certification',
  },
  {
    name: 'Microsoft Certified Professional - GitHub Copilot',
    url: 'https://learn.microsoft.com/en-us/users/pranavjoshi-3517/credentials/51f370877da573a1',
    brand: 'github',
    type: 'certification',
  },
  {
    name: 'AEM Edge Delivery Services - Developer Professional',
    url: 'https://certification.adobe.com/completion/verify/fc385f52-ad4a-45cb-b021-3d556ba8bd9f',
    brand: 'adobe',
    type: 'course',
  },
]
