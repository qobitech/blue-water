import { lazy } from 'react'
import { IPageRoutes } from './buyers-sellers'
import { pageurl } from '../../constants/pageurl'

const AdminManagement = lazy(
  async () => await import('../../pages/admin/management')
)
const AdminChannels = lazy(
  async () => await import('../../pages/admin/channels')
)
const AdminTips = lazy(async () => await import('../../pages/admin/tips'))
const AdminUsers = lazy(async () => await import('../../pages/admin/users'))
const AdminSettings = lazy(
  async () => await import('../../pages/admin/settings')
)
const AdminTransaction = lazy(
  async () => await import('../../pages/admin/transactions')
)
const AdminSubscriptions = lazy(
  async () => await import('../../pages/admin/subscriptions')
)
const HandleReport = lazy(
  async () => await import('../../pages/admin/handle-report')
)
const AdminOverview = lazy(
  async () => await import('../../pages/admin/overview')
)
const CommunityForumPage = lazy(
  async () => await import('../../pages/dashboard/community-forum/page')
)

const VerificationPage = lazy(
  async () => await import('../../pages/admin/verification-request')
)
const FeedbackPage = lazy(
  async () => await import('../../pages/admin/feedback')
)
const SendMessagePage = lazy(
  async () => await import('../../pages/admin/send-message')
)

export const adminsPage: IPageRoutes[] = [
  {
    page: AdminManagement,
    url: pageurl.ADMINMANAGEMENT
  },
  {
    page: AdminChannels,
    url: pageurl.ADMINBETCHANNELS
  },
  {
    page: AdminTips,
    url: pageurl.ADMINBETTIPS
  },
  {
    page: AdminUsers,
    url: pageurl.ADMINUSERS
  },
  {
    page: AdminSettings,
    url: pageurl.ADMINSETTINGS
  },
  {
    page: AdminTransaction,
    url: pageurl.ADMINTRANSACTIONS
  },
  {
    page: AdminSubscriptions,
    url: pageurl.ADMINSUBSCRIPTIONS
  },
  {
    page: HandleReport,
    url: pageurl.ADMINREPORTS
  },
  {
    page: AdminOverview,
    url: pageurl.ADMINDASHBOARD
  },
  {
    page: CommunityForumPage,
    url: `${pageurl.ADMINCOMMUNITYFORUM}/:tab?`
  },
  {
    page: VerificationPage,
    url: pageurl.ADMINVERIFICATIONREQUEST
  },
  {
    page: FeedbackPage,
    url: pageurl.ADMINFEEDBACK
  },
  {
    page: SendMessagePage,
    url: pageurl.ADMINSENDMESSAGE
  }
]
