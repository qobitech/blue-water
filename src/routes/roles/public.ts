import { lazy } from 'react'
import { pageurl } from '../../constants/pageurl'

const TermsAndCondition = lazy(
  async () => await import('../../pages/public/terms-and-condition')
)
const PrivacyPolicy = lazy(
  async () => await import('../../pages/public/privacy-policy')
)
const LandingPage = lazy(
  async () => await import('../../pages/public/landing-page')
)
const AboutPage = lazy(
  async () => await import('../../pages/public/about-page')
)

interface IPageRoutes {
  page: React.ElementType<any>
  url: string
  noWrapper?: boolean
}

export const publicPage: IPageRoutes[] = [
  {
    page: TermsAndCondition,
    url: pageurl.TC
  },
  {
    page: PrivacyPolicy,
    url: pageurl.PP
  },
  {
    page: LandingPage,
    url: pageurl.HOME
  },
  {
    page: AboutPage,
    url: pageurl.ABOUT
  }
]
