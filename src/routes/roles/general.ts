import { lazy } from 'react'
import { IPageRoutes } from './buyers-sellers'
import { pageurl } from '../../constants/pageurl'

const ActivateEmail = lazy(
  async () => await import('../../pages/auth/activate')
)

const PaymentStatus = lazy(
  async () =>
    await import('../../components/page-components/payment/payment-status')
)

export const generalPage: IPageRoutes[] = [
  {
    page: ActivateEmail,
    url: pageurl.ACTIVATEACCOUNT
  },
  {
    page: PaymentStatus,
    url: pageurl.PAYMENTSTATUS,
    noWrapper: true
  }
]
