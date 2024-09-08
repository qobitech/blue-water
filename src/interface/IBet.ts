import { statusType } from '../components/utils/reusable'
import { IGetDatasType } from './IOther'

export interface IBetTicketStatus {
  month: string
  year: number
  status: {
    Published: number
    Archived: number
    Pending: number
  }
}

export interface IBetChannelInfo {
  pageTitle: string
  slug: string
}

export type subscriptionType = 'free' | 'paid'

export interface IBetChannel {
  title: string
  description: string
  id: number
  createdAt: string
  modified: string
  numberOfPredictions: number
  frequency: string
  perPredictionCost: number
  odds: number
  gamesPlayed: number
  gamesWon: number
  ranking: number
  previousRanking: number
  rating: number
  userId: string
  subscription: subscriptionType
  slug: string
}

export type betChannelStatusType = 'active' | 'suspended' | 'banned'

export interface IBetChannelResponse {
  _id: string
  createdAt: string
  modified: string
  perPredictionCost: number
  predictionCount: number
  gamesPlayed: number
  gamesWon: number
  ranking: number
  previousRanking: number
  rating: number
  title: string
  description: string
  frequency: string
  numberOfPredictions: number
  slug: string
  userId: string
  odds: number
  subscription: subscriptionType
  tandc: boolean
  subscriptionCount: number
  threshold: string
  tier: {
    _id: string
    levelId: string
    maxAmount: string
  }
  verified: boolean
  status: betChannelStatusType
  isUserSubscribed: boolean
}

export interface IBetChannelReportResponse {
  _id: string
  createdAt: string
  modified: string
  perPredictionCost: number
  predictionCount: number
  gamesPlayed: number
  gamesWon: number
  ranking: number
  previousRanking: number
  rating: number
  title: number
  description: string
  frequency: string
  verified: boolean
  numberOfPredictions: number
  slug: string
  userId: string
  odds: number
  subscription: subscriptionType
  tandc: boolean
  subscriptionCount: number
  acceptedReports: number
  threshold: {
    _id: string
    createdAt: string
    modified: string
    levelId: string
    maxAmount: string
    status: string
  }
  status: betChannelStatusType
  reportCount: number
  tier: {
    _id: string
    createdAt: string
    modified: string
    title: string
    role: string
    description: string
    status: string
  }
}

export interface ILeadershipBoard {
  _id: string
  title: string
  totalReviews: number
  totalRatings: number
  averageRating: number
  slug: string
  odds: string
  verified: boolean
  frequency: string
  numberOfPredictions: number
}

export interface IBetChannelLeadershipBoard {
  status: string
  result: number
  pages: number
  currentPage: number
  hasNext: boolean
  data: {
    channels: ILeadershipBoard[]
  }
}
export interface IBetChannelResponses {
  status: string
  result: number
  pages: number
  currentPage: number
  hasNext: boolean
  data: {
    channels: IBetChannelResponse[]
  }
}

export interface IBetChannelReportResponses {
  status: string
  result: number
  pages: number
  currentPage: number
  hasNext: boolean
  data: {
    channels: IBetChannelReportResponse[]
  }
}
// betTicketStatus: IBetTicketStatus[] | null

export interface IBetChannels {
  data: IBetChannel[]
  totalPages: number
  currentPage: number
  totalItems: number
}

export type betTicketShareOptionType = 'All' | 'Subscribers' | 'Private'

export interface IBetTicket {
  _id?: string
  bookie: string
  code: string
  odds: string
  channelId: string
  channel: string
  channelSlug: string
  userId: string
  status: statusType
  shareOption: betTicketShareOptionType
  sports: string[]
  createdAt?: string
  modified?: string
  startDate: string
  endDate: string
  payPerTip?: boolean
  discountPPT?: number | null
  referralLink?: string | null
  upvote?: number
  requestEdit?: boolean
  edit?: {
    status: boolean
    betPredictionId: string
    sellerId: string
  }
}

export interface IBetSubscriber {
  id?: string
  betChannelId: string
  userId: string
  userName: string
  continuity: number
}
export interface IBookie {
  id: string
  title: string
  won: string
  lost: string
  preference: number
  bookingCode: number
  active: boolean
}

export interface IBetSport {
  id: string
  title: string
}
export interface INotificationPreference {
  id: string
  title: string
  preference: string
  active: boolean
}

// export interface IMBChannel {
//   _id: string
//   createdAt: string
//   modified: string
//   perPredictionCost: number
//   gamesPlayed: number
//   gamesWon: number
//   ranking: number
//   previousRanking: number
//   rating: number
//   title: string
//   description: string
//   frequency: string
//   numberOfPredictions: number
//   slug: string
//   userId: string
//   odds: number
//   subscription: 'free' | 'paid'
//   tandc: boolean
// }

export interface IMultiBetTicketResponse {
  _id: string
  edit: {
    status: boolean
    betPredictionId: string | null
    sellerId: string | null
  }
  createdAt: string
  modified: string
  shareOption: 'All' | 'Subscribers'
  payPerTip: boolean
  discountPPT: number
  referralLink: null | string
  upvote: number
  requestEdit: boolean
  sports: string[]
  bookie: string
  code: string
  odds: string
  startDate: string
  endDate: string
  status: 'Pending' | 'Published' | 'Archived'
  slug: string
  channelId: string
  channel: IBetChannelResponse
  reviewCount: number
  reportCount: number
  active: boolean
}
export interface IMultiBetTicketResponses extends IGetDatasType {
  data: {
    multiplePredictions: IMultiBetTicketResponse[]
  }
}

export type monthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface IBetChannelStat {
  _id: monthType
  totalPredictions: number
  totalReviews: number
  subscribers: number
  wins: number
  totalRatings: number
  averageRating: number
}

export interface IBetChannelStats {
  status: string
  message: string
  data: {
    stats: IBetChannelStat[]
  }
}

export interface ISellerStat {
  totalBetSoldCurrentMonth: number
  totalBetSoldLastMonth: number
  totalFollowingCurrentMonth: number
  totalFollowingLastMonth: number
}
export interface ISellerStats {
  status: string
  result: number
  currentPage: number
  pages: number
  hasNext: boolean
  data: {
    stats: ISellerStat
  }
}
