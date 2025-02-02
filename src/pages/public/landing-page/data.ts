// interface IFeedBackResponse {
//   subject: string
//   requester: string
//   title: string
//   createdAt: string
//   company: {
//     title: string
//     description: string
//     url: string
//   }
// }

import { cardColorGradient, IColorGradient } from '../../../constants/global'

// It&apos;s about giving people a voice and
//             creating authentic connections, so you can truly understand what
//             matters to them.
export interface IFeedBack {
  subject: string
  requester: string
  title: string
  createdAt: string
  company: string
  totalFeedback: number
  slug?: string
  onFeedback?: () => void
  onCompany?: () => void
  location: string
  purpose: string
  category: string
  color: IColorGradient
  demo?: string
  onWatchDemo?: () => void
  companyWebsite?: string
  supportEmail?: string
}

export const content: IFeedBack[] = [
  {
    subject:
      'bluewater transforms customer feedback into actionable insights, how will it benefit your business?',
    purpose: 'To establish product market-fit',
    requester: 'Franklyn Edekobi',
    title: 'CEO',
    company: 'Qobi Solutions',
    location: 'GLobal',
    createdAt: '1 day ago',
    slug: 'qobi',
    totalFeedback: 23465,
    category: 'Product Improvement',
    color: cardColorGradient[0],
    demo: 'youtube.com',
    companyWebsite: 'https://edekobi.com',
    supportEmail: 'contact@edekobi.com'
  },
  {
    subject:
      'What’s one challenge you’ve faced while using our app recently? What would have made it better?',
    purpose:
      'Your insights help us prioritize improvements and make the app easier and more enjoyable for you and your team.',
    requester: 'Maria Santos',
    title: 'Product Manager',
    company: 'TechNest',
    location: 'São Paulo, Brazil',
    createdAt: '1 day ago',
    slug: 'wsng',
    totalFeedback: 3465,
    category: 'Product Improvement',
    color: cardColorGradient[1],
    supportEmail: 'info@technest.com'
  },
  {
    subject:
      'How’s our navigation app working for you in busy environments? Are there specific areas where it falls short?',
    purpose:
      "We’re refining our navigation system to better meet your users' needs in high-pressure scenarios, and your input is key.",
    requester: 'Jun Li',
    title: 'UX Researcher',
    company: 'UrbanSpaces',
    location: 'Shanghai, China',
    createdAt: '2 days ago',
    slug: 'waytool',
    totalFeedback: 1465,
    category: 'User Experience',
    color: cardColorGradient[2],
    supportEmail: 'info@urbanspaces.com'
  },
  {
    subject:
      'What’s been the most valuable feature of our recent update? And what do you think is missing?',
    purpose:
      'Understanding what works (and what doesn’t) ensures we focus on the features that bring the most value to your workflows.',
    requester: 'Anna Ivanova',
    title: 'Customer Support Lead',
    company: 'CloudSoft Solutions',
    location: 'Moscow, Russia',
    createdAt: '1 week ago',
    slug: 'waytoorts',
    totalFeedback: 105,
    category: 'Feature Feedback',
    color: cardColorGradient[3],
    supportEmail: 'info@cloudsoftsolutions.com'
  },
  {
    subject:
      'How does our product stack up in solving repetitive tasks? Are there areas where it could save you even more time?',
    purpose:
      'We’re committed to making your daily workflows more efficient—your feedback ensures we target the right areas for improvement.',
    requester: 'Jacques Dubois',
    title: 'Marketing Director',
    company: 'GreenEnergy Corp',
    location: 'Paris, France',
    createdAt: '1 week ago',
    slug: 'hyriwoc',
    totalFeedback: 3215,
    category: 'Workflow Optimization',
    color: cardColorGradient[4],
    supportEmail: 'info@greenenergy.com'
  },
  {
    subject:
      'How have your users reacted to our integration features? Are there obstacles they’ve encountered while using them?',
    purpose:
      "We want to simplify your team's adoption process and create a seamless experience for you and your customers.",
    requester: 'Aisha El-Sayed',
    title: 'Customer Insights Lead',
    company: 'EcoHome Solutions',
    location: 'Cairo, Egypt',
    createdAt: '1 week ago',
    slug: 'hcwmow',
    totalFeedback: 10465,
    category: 'Integration Feedback',
    color: cardColorGradient[5],
    supportEmail: 'info@ecohome.com'
  },
  {
    subject:
      'What was your first impression of our latest feature? Did it meet your expectations or leave room for improvement?',
    purpose:
      'Your first impressions guide us in refining the user journey to create a more intuitive and satisfying experience.',
    requester: 'Grace Wangari',
    title: 'Customer Experience Manager',
    company: 'EasyDrive',
    location: 'Nairobi, Kenya',
    createdAt: '1 week ago',
    slug: 'wcwdtmyfj',
    totalFeedback: 65,
    category: 'Feature Feedback',
    color: cardColorGradient[6],
    supportEmail: 'info@easydrive.com'
  }
]

export const faqdata = [
  {
    id: 1,
    header: 'What kind of partnerships are you looking for?',
    answer: `We’re seeking developers interested in creating high-value, sustainable projects like luxury homes, resorts, or marinas.`
  },
  {
    id: 2,
    header: 'Can the land be divided for multiple projects?',
    answer: `Yes, the land offers flexibility for single or mixed-use developments.
`
  },
  {
    id: 3,
    header: 'Is the property development-ready?',
    answer: `Yes, the land is accessible by road and has utilities like water and power connections.`
  },
  {
    id: 4,
    header: 'Can I schedule a visit to view the property?',
    answer: `Absolutely. Contact us, and we’ll arrange a site visit.`
  },
  {
    id: 5,
    header: 'Are there zoning or environmental restrictions?',
    answer: `There are minor environmental guidelines to ensure sustainable development, which we’ll guide you through.`
  },
  {
    id: 6,
    header: 'How do I start a partnership?',
    answer: `Simply reach out to us through the Contact Us page, and we’ll walk you through the next steps.`
  }
]
