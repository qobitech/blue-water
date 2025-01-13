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
}

export const content: IFeedBack[] = [
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
    color: cardColorGradient[0]
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
    color: cardColorGradient[1]
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
    color: cardColorGradient[2]
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
    color: cardColorGradient[3]
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
    color: cardColorGradient[4]
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
    color: cardColorGradient[5]
  }
]

export const faqdata = [
  {
    id: 1,
    header: 'What is Tevotea?',
    answer: `Tevotea is a voice feedback platform tailored for professionals and organizations that prioritize authentic audience engagement. It simplifies the process of collecting detailed, voice-recorded feedback, enabling brands to deepen connections and make informed decisions without the constraints of live calls or traditional surveys.`
  },
  // {
  //   id: 2,
  //   header: 'How does Tevotea work?',
  //   answer: `Sign up, generate unique voice recording links, and share them with their audience. Viewers and listeners can click on the link, record their feedback, and submit it directly to you.`
  // },
  {
    id: 3,
    header: 'Who can use Tevotea?',
    answer: `Tevotea is perfect for brand managers, community advocates, customer experience teams, marketers, and businesses seeking actionable insights from their audience. It empowers organizations to gather honest, thoughtful feedback from diverse audiences, regardless of their location or schedules.
`
  },
  // {
  //   id: 4,
  //   header: 'How is audience privacy handled on Tevotea?',
  //   answer: `Tevotea takes privacy seriously. All recordings are stored securely and are only accessible to the intended media house. We comply with all relevant data protection regulations to ensure the confidentiality of your audience’s feedback.`
  // },
  {
    id: 6,
    header: 'Can feedback be given anonymously?',
    answer: `Yes, Tevotea supports anonymous feedback submissions. This ensures a safe and open channel for your audience to share genuine thoughts, fostering trust and transparency in your interactions.`
  },
  // {
  //   id: 7,
  //   header: 'How can Tevotea benefit my brand?',
  //   answer: `Tevotea streamlines the process of gathering audience feedback, reduces the need for live call-ins, and provides a more inclusive way for people to share their views. This leads to better engagement, actionable insights, and a deeper connection with your audience.`
  // },
  // {
  //   id: 8,
  //   header: 'Is there a limit to the number of recordings we can receive?',
  //   answer: `Each subscription plan comes with a set limit on the number of voice recordings. Higher-tier plans offer increased limits to accommodate larger audiences. You can upgrade your plan at any time to meet your growing needs.`
  // },
  {
    id: 9,
    header: 'How do I share feedback links with my audience?',
    answer: `You can distribute Tevotea feedback links across various channels, including your website, social media platforms, email campaigns, and during virtual or in-person events. These links are designed to be user-friendly, making it easy for your audience to engage and share their voice.`
  }
  // {
  //   id: 10,
  //   header: 'What kind of support does Tevotea offer?',
  //   answer: `Tevotea offers comprehensive support, including a help center, email support, and live chat options. We’re committed to helping you get the most out of the platform and ensuring a smooth experience for both you and your audience.`
  // }
]
