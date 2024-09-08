import { lazy } from 'react'
import { IPageRoutes } from './buyers-sellers'
import { pageurl } from '../../constants/pageurl'
import { GETISUSERLOGGED } from '../../constants/global'

const ActivateEmail = lazy(
  async () => await import('../../pages/auth/activate')
)

const PaymentStatus = lazy(
  async () =>
    await import('../../components/page-components/payment/payment-status')
)

const AllBetChannels = lazy(
  async () => await import('../../pages/dashboard/bet-channel/all')
)

const ChannelPage = lazy(async () => await import('../../pages/public/channel'))

const AllBetTips = lazy(
  async () => await import('../../pages/dashboard/bet-codes/page')
)

const BetTipsPage = lazy(
  async () => await import('../../pages/public/customized-search')
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
  },
  {
    page: GETISUSERLOGGED() ? AllBetChannels : ChannelPage,
    url: `${pageurl.BETCHANNEL}/:${
      GETISUSERLOGGED() ? 'tab' : 'slug'
    }?/:prediction?`
  },
  {
    page: GETISUSERLOGGED() ? AllBetTips : BetTipsPage,
    url: GETISUSERLOGGED()
      ? `${pageurl.BETTICKETS}/:tab?`
      : `${pageurl.BETTICKETS}`
  }
]
