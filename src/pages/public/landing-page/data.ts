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
}

export const content: IFeedBack[] = [
  {
    subject: `Can you tell me about a recent challenge you faced while using our mobile app? Maybe something that made your day a bit more complicated or didn't work as you expected. How did it affect your routine?`,
    purpose: `We really want to understand the little bumps in your experience so we can smooth them out and make the app work better for you.`,
    requester: 'Maria Santos',
    title: 'Product Manager',
    company: 'TechNest',
    location: 'São Paulo, Brazil',
    createdAt: '1 day ago',
    slug: 'wsng',
    totalFeedback: 3465,
    category: 'Product Improvement'
  },
  {
    subject: `What's happening at the market strike in central Nairobi? Paint us a picture of the scene—what's the mood, what are people saying, and what's the main issue on everyone’s mind?`,
    requester: 'Ahmed Malik',
    purpose: `We can’t be there ourselves, so we’re relying on your firsthand perspective to bring the real story to life.`,
    title: 'Journalist',
    company: 'Al Jazeera',
    location: 'Doha, Qatar',
    createdAt: '2 days ago',
    category: 'Real-Time Event Reporting',
    slug: 'wtwyl',
    totalFeedback: 3465
  },
  {
    subject: `What’s your favorite part about our new chai blend? Is it the taste, the aroma, or something else? And how does it stack up against the other chai brands you've tried?`,
    requester: 'Priya Patel',
    purpose: `We’re curious about what you truly enjoy—and what you don’t—so we can make a chai that feels just right for you.`,
    title: 'Brand Manager',
    company: 'ChaiCo',
    location: 'Mumbai, India',
    createdAt: '1 week ago',
    slug: 'hcwiov',
    totalFeedback: 30465,
    category: 'Product Feedback'
  },
  {
    subject: `How's our navigation app working for you in those super crowded places? Does it guide you well, or are there moments where it feels off? Your insights can help us refine the experience.`,
    requester: 'Jun Li',
    purpose: `We’re looking to make those busy, stressful moments a little easier with better navigation—your feedback shows us where we can do better.`,
    title: 'UX Researcher',
    company: 'UrbanSpaces',
    location: 'Shanghai, China',
    createdAt: '2 days ago',
    slug: 'waytool',
    totalFeedback: 1465,
    category: 'Product Feedback'
  },
  {
    subject: `How have our eco-friendly home products fit into your lifestyle? Have you noticed any small changes in your daily routines or overall comfort at home?`,
    requester: 'Aisha El-Sayed',
    purpose: `We’re interested in how our products are making a difference, even in the small moments of your day.`,
    title: 'Customer Insights Lead',
    company: 'EcoHome Solutions',
    location: 'Cairo, Egypt',
    createdAt: '1 week ago',
    slug: 'hcwmow',
    totalFeedback: 10465,
    category: 'Product Feedback'
  },
  {
    subject: `What pushed you to switch to our renewable energy services? Was it a specific feature, a value, or something else? And now that you’ve made the switch, what benefits have you noticed?`,
    requester: 'Jacques Dubois',
    purpose: `We’re curious about your journey to green energy—understanding what drew you in helps us connect with more people like you.`,
    title: 'Marketing Director',
    company: 'GreenEnergy Corp',
    location: 'Paris, France',
    createdAt: '1 week ago',
    slug: 'hyriwoc',
    totalFeedback: 3215,
    category: 'Customer Journey'
  },
  {
    subject: `What’s been the toughest part of your fitness journey recently? How have our products or tips helped, or where do you feel we could support you better?`,
    requester: 'Ayumi Tanaka',
    purpose: `We want to hear your real fitness stories—the ups, the downs, and everything in between—to better support you in reaching your goals.`,
    title: 'Social Media Strategist',
    company: 'FitLife',
    location: 'Tokyo, Japan',
    createdAt: '1 week ago',
    slug: 'wdytool',
    totalFeedback: 109465,
    category: 'Customer Support & Engagement'
  },
  {
    subject: `What’s the vibe at the protest against the new policies in downtown today? Are people hopeful, angry, or something else? What are they talking about the most?`,
    requester: 'Carlos Ortega',
    purpose: `We’re after the pulse of the protest—the emotions, the conversations, the energy. Your words help capture what it’s truly like.`,
    title: 'Reporter',
    company: 'La Nación',
    location: 'Buenos Aires, Argentina',
    createdAt: '1 week ago',
    slug: 'wfwylts',
    totalFeedback: 22265,
    category: 'Public Sentiment Analysis'
  },
  {
    subject: `How was your first ride with EasyDrive? What stood out—good or bad? And if there’s anything you’d change, what would it be?`,
    requester: 'Grace Wangari',
    purpose: `We’re keen to hear about your first impressions—whether they were smooth or bumpy—so we can make every ride feel just right.`,
    title: 'Customer Experience Manager',
    company: 'EasyDrive',
    location: 'Nairobi, Kenya',
    createdAt: '1 week ago',
    slug: 'wcwdtmyfj',
    totalFeedback: 65,
    category: 'Product Feedback'
  },
  {
    subject: `How has our food distribution service impacted you and your community? Have there been moments that stood out to you—good or bad?`,
    requester: 'Michael Anya',
    purpose: `We want to know if we’re really making a difference on the ground. Your personal stories help us see where we’re getting it right and where we can do more.`,
    title: 'Community Engagement Coordinator',
    company: 'Food4All',
    location: 'Lagos, Nigeria',
    createdAt: '1 week ago',
    slug: 'hsaywtcs',
    totalFeedback: 5,
    category: 'Community Impact'
  },
  {
    subject: `What do you think about our latest youth empowerment program? Has it affected how you feel about getting involved, or made a difference in your community?`,
    requester: 'Chipo Ndlovu',
    purpose: `We’re eager to hear if our efforts are resonating with you—how are we inspiring action, and what can we do better?`,
    title: 'Program Director',
    company: 'YouthFirst Initiative',
    location: 'Harare, Zimbabwe',
    createdAt: '1 week ago',
    slug: 'waytoorts',
    totalFeedback: 105,
    category: 'Program Feedback'
  },
  {
    subject: `How’s the smart lighting system working out for you at home? Is it easy to use, and are there features you find particularly handy or frustrating?`,
    requester: 'Marta Nowak',
    purpose: `We’re looking to see how our lighting system fits into your everyday life. Your feedback helps us refine the features that matter most.`,
    title: 'Product Designer',
    company: 'SmartHome Innovations',
    location: 'Warsaw, Poland',
    createdAt: '1 week ago',
    slug: 'waytoorts',
    totalFeedback: 105,
    category: 'Product Usability'
  },
  {
    subject: `What’s the energy like at AfroFest today? Are people having a blast, or is there something missing that could make it even better?`,
    requester: 'Ayodeji Adebayo',
    purpose: `We’re all about capturing the spirit of the festival. Your insights help us understand what makes the event truly special.`,
    title: 'Event Coordinator',
    company: 'AfroFest',
    location: 'Lagos, Nigeria',
    createdAt: '1 week ago',
    slug: 'waytoorts',
    totalFeedback: 105,
    category: 'Event Experience'
  },
  {
    subject: `What’s your honest take on our new organic snack line? Is it hitting the spot, or do you find it lacking compared to what’s already out there?`,
    requester: 'Sofia García',
    purpose: `We’re hungry for your thoughts on our snacks. Whether it’s love or lukewarm, your feedback is what guides our next moves.`,
    title: 'Feedback Coordinator',
    company: 'Natural Delights',
    location: 'Madrid, Spain',
    createdAt: '1 week ago',
    slug: 'waytoorts',
    totalFeedback: 105,
    category: 'Product Feedback'
  },
  {
    subject: `How was the switch to our latest software update? Was it smooth sailing, or did you hit some bumps? Any feedback you have can help us make the process easier for everyone.`,
    requester: 'Anna Ivanova',
    purpose: `We’re trying to get a sense of your experience with the update—what worked, what didn’t, and how we can make it better for you.`,
    title: 'Customer Support Lead',
    company: 'CloudSoft Solutions',
    location: 'Moscow, Russia',
    createdAt: '1 week ago',
    slug: 'waytoorts',
    totalFeedback: 105,
    category: 'Product Feedback'
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
