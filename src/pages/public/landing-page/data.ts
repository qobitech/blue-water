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
export interface IFeedBack {
  subject: string
  requester: string
  title: string
  createdAt: string
  company: string
  totalFeedback: number
  feedbacklink?: string
  onFeedback?: () => void
  onCompany?: () => void
}

export const content: IFeedBack[] = [
  {
    subject: `Which do you prefer to reply with? a voice note or a text message?`,
    requester: 'Franklyn Edekobi',
    title: 'Content Creator',
    company: 'Tevotea',
    createdAt: '1 day ago',
    feedbacklink: '',
    totalFeedback: 3465
  },
  {
    subject:
      'What topics would you love to hear me cover in my next podcast episode?',
    requester: 'Alex Morgan',
    title: 'Content Creator',
    company: 'Creative Pulse Media',
    createdAt: '2 days ago',
    feedbacklink: '',
    totalFeedback: 3465
  },
  {
    subject: 'How can we improve our virtual classroom experience?',
    requester: 'Dr. Sarah Bennett',
    title: 'Educator',
    company: 'Bright Minds Academy',
    createdAt: '1 week ago',
    feedbacklink: '',
    totalFeedback: 30465
  },
  {
    subject: 'What are your thoughts on our latest product launch?',
    requester: 'Lisa Rodriguez',
    title: 'Market Research Analyst',
    company: 'Insightful Analytics',
    createdAt: '2 days ago',
    feedbacklink: '',
    totalFeedback: 1465
  },
  {
    subject: 'How can we make our workplace a better environment for you?',
    requester: 'James Turner',
    title: 'HR Manager',
    company: 'Horizon Tech',
    createdAt: '1 week ago',
    feedbacklink: '',
    totalFeedback: 10465
  },
  {
    subject: 'Have you recently interacted with our customer service team?',
    requester: 'Emily Johnson',
    title: 'Customer Service Lead',
    company: 'Stellar Support',
    createdAt: '1 week ago',
    feedbacklink: '',
    totalFeedback: 3215
  },
  {
    subject: 'What did you think of our latest event?',
    requester: 'Michael Chang',
    title: 'Event Organizer',
    company: 'Elite Events Co.',
    createdAt: '1 week ago',
    feedbacklink: '',
    totalFeedback: 109465
  },
  {
    subject: 'Which features would you like to see in our next app update?',
    requester: 'Rachel Williams',
    title: 'Product Manager',
    company: 'Innovate Apps',
    createdAt: '1 week ago',
    feedbacklink: '',
    totalFeedback: 22265
  },
  {
    subject:
      'What can we do to make your fitness journey more effective and enjoyable?',
    requester: 'David Kim',
    title: 'Fitness Coach',
    company: 'Peak Performance Gym',
    createdAt: '1 week ago',
    feedbacklink: '',
    totalFeedback: 65
  },
  {
    subject: 'How satisfied are you with the consulting services you received?',
    requester: 'Sophia Patel',
    title: 'Consultant',
    company: 'Strategy Solutions Inc.',
    createdAt: '1 week ago',
    feedbacklink: '',
    totalFeedback: 5
  },
  {
    subject: 'What are your thoughts on our recent training session?',
    requester: 'Mark Thompson',
    title: 'Corporate Trainer',
    company: 'GrowthPath Learning',
    createdAt: '1 week ago',
    feedbacklink: '',
    totalFeedback: 105
  }
]

export const faqdata = [
  {
    id: 1,
    header: 'What is Tevotea?',
    answer: `Tevotea is a feedback platform designed for brands to collect voice feedback from their audience. It allows listeners and viewers to easily share their thoughts and opinions through voice recordings, enhancing engagement without the need for live calls.`
  },
  // {
  //   id: 2,
  //   header: 'How does Tevotea work?',
  //   answer: `Sign up, generate unique voice recording links, and share them with their audience. Viewers and listeners can click on the link, record their feedback, and submit it directly to you.`
  // },
  {
    id: 3,
    header: 'Who can use Tevotea?',
    answer: `Tevotea is ideal for media professionals, radio and TV hosts, content creators, journalists, and any organization that values audience feedback. It allows for seamless interaction with your audience, regardless of their location or time constraints.`
  },
  // {
  //   id: 4,
  //   header: 'How is audience privacy handled on Tevotea?',
  //   answer: `Tevotea takes privacy seriously. All recordings are stored securely and are only accessible to the intended media house. We comply with all relevant data protection regulations to ensure the confidentiality of your audience’s feedback.`
  // },
  {
    id: 6,
    header: 'Can feedback be given anonymously?',
    answer: `Yes, Tevotea allows users to submit feedback anonymously. This encourages more honest and open communication from your audience, ensuring you get genuine insights and opinions.`
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
    answer: `You can share the Tevotea feedback links via your website, social media, email newsletters, or directly during your broadcasts. The links are easy to use and provide a simple way for your audience to participate.`
  }
  // {
  //   id: 10,
  //   header: 'What kind of support does Tevotea offer?',
  //   answer: `Tevotea offers comprehensive support, including a help center, email support, and live chat options. We’re committed to helping you get the most out of the platform and ensuring a smooth experience for both you and your audience.`
  // }
]
