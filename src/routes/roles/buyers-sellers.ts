import { lazy } from 'react'
import { pageurl } from '../../constants/pageurl'

const Overview = lazy(
  async () => await import('../../pages/dashboard/overview')
)
const MyAccountPage = lazy(
  async () => await import('../../pages/dashboard/my-account')
)
const NotificationPage = lazy(
  async () => await import('../../pages/dashboard/notification')
)

export interface IPageRoutes {
  page: React.ElementType<any>
  url: string
  noWrapper?: boolean
}

export const buyersSellersPages: IPageRoutes[] = [
  {
    page: Overview,
    url: `${pageurl.DASHBOARD}/:section?/:game?/:gametab?`
  },
  {
    page: MyAccountPage,
    url: `${pageurl.MYACCOUNT}/:page?/:section?`
  },
  {
    page: NotificationPage,
    url: `${pageurl.NOTIFICATION}/:tab?`
  }
]
