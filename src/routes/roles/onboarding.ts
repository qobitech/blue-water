import { lazy } from 'react'
import { IPageRoutes } from './buyers-sellers'
import { pageurl } from '../../constants/pageurl'

const UserOnboarding = lazy(async () => await import('../../pages/onboarding'))

export const onboardingPage: IPageRoutes[] = [
  {
    page: UserOnboarding,
    url: `${pageurl.ONBOARDING}/:role?`
  }
]
