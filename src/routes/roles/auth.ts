import { lazy } from 'react'
import { IPageRoutes } from './buyers-sellers'
import { pageurl } from '../../constants/pageurl'

const ForgotPasswordPage = lazy(
  async () => await import('../../pages/auth/forgot-password')
)
const ResetPasswordPage = lazy(
  async () => await import('../../pages/auth/reset-password')
)
const LoginPage = lazy(async () => await import('../../pages/auth/login'))

const SubscriptionPage = lazy(
  async () => await import('../../pages/auth/register')
)

export const authPage: IPageRoutes[] = [
  {
    page: ForgotPasswordPage,
    url: pageurl.FORGOTPASSWORD
  },
  {
    page: ResetPasswordPage,
    url: pageurl.RESETPASSWORD
  },
  {
    page: LoginPage,
    url: pageurl.LOGIN
  },
  {
    page: SubscriptionPage,
    url: `${pageurl.REGISTER}/:role?`
  }
]
