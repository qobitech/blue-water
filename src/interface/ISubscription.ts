import { membershipType, subscriptionType } from '../constants/global'
import { IGetDatasType } from './IOther'

export interface ISubscriptionChannelItem {
  createdAt: string
  modified: string
  perPredictionCost: number
  gamesPlayed: number
  gamesWon: number
  ranking: number
  previousRanking: number
  rating: number
  verified: boolean
  _id: string
  title: string
  description: string
  frequency: string
  numberOfPredictions: number
  slug: string
  userId: string
  odds: number
  subscription: string
  tandc: boolean
  id: string
}

export interface ISubscriptionChannel {
  paymentMethod: null
  _id: string
  userId: string
  startDate: string | null
  endDate: string | null
  itemType: string
  itemId: string
  transaction: string
  item: ISubscriptionChannelItem
  id: string
  status: 'subscribed' | 'unsubscribed'
}

export interface ISubscriptionChannels {
  status: string
  result: number
  data: {
    subscriptions: ISubscriptionChannel[]
  }
}

export interface ICreateSubscription {
  userId: string
  startDate: string
  endDate: string
  itemType: string
  itemId: string
  paymentMethod: string | null
  transaction: string
  status: 'subscribed' | 'unsubscribed'
}

export interface ISubscription<T> {
  paymentMethod: null | string
  _id: string
  endDate: string
  startDate: string
  modified: string
  itemId: string
  itemType: subscriptionType
  transaction: string
  userId: string
  status: 'unsubscribed' | 'subscribed'
  item: T
  id: string
}

export interface ISubscriptionResponse<T> extends IGetDatasType {
  data: {
    subscriptions: Array<ISubscription<T>>
  }
}

export interface ICreateMembershipSubscription {
  membership: string
  description: string
  services: string
  role: string
  amount: string
  status: 'Inactive' | 'Active'
  payment_plan: string
}

export interface ICreateMembershipSubscriptions {
  status: string
  message: string
  data: {
    memberSubscription: ICreateMembershipSubscription
  }
}

// export interface IMembershipSubscription {
//   _id: string
//   membership: 'standard' | 'free' | 'premium'
//   description: string
//   services: Array<{
//     amount: string
//     service: string
//     quantity: string
//   }>
//   role: string
//   amount: string
//   status: 'Inactive' | 'Active'
//   payment_plan: string
// }

export interface IMembershipSubscription {
  _id: string
  membershipId: string
  description: string
  services: [
    {
      _id: string
      service: string
      amount: string
      quantity: string
    }
  ]
  role: string
  status: 'Inactive' | 'Active'
  payment_plan: string
  amount: string
  membership: [
    {
      _id: string
      title: membershipType
      status: 'Active' | 'Inactive'
      __v: 0
      description: string
    }
  ]
  id: string
}

export interface IMembershipSubscriptions extends IGetDatasType {
  data: {
    memberSubscriptions: IMembershipSubscription[]
  }
}
