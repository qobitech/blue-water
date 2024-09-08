import { lazy } from 'react'
import { IPageRoutes } from './buyers-sellers'
import { pageurl } from '../../constants/pageurl'
// import LandingPage from '../../pages/public/l'

const TermsAndCondition = lazy(
  async () => await import('../../pages/public/terms-and-condition')
)
const PrivacyPolicy = lazy(
  async () => await import('../../pages/public/privacy-policy')
)
const FAQPage = lazy(async () => await import('../../pages/public/faq'))
const VendorPage = lazy(async () => await import('../../pages/public/vendor'))
const AnalyticsPage = lazy(
  async () => await import('../../pages/public/analytics')
)

const BuyerPage = lazy(async () => await import('../../pages/public/buyer'))
const LandingPage = lazy(
  async () => await import('../../pages/public/landing-page')
)

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
    page: FAQPage,
    url: pageurl.FAQ
  },
  {
    page: VendorPage,
    url: pageurl.VENDOR
  },
  {
    page: AnalyticsPage,
    url: pageurl.ANALYTICS
  },
  {
    page: BuyerPage,
    url: pageurl.BUYER
  },
  {
    page: LandingPage,
    url: pageurl.HOME
  }
]
