import { IUser } from './IUser'

export const feedbackCategoryEnum = {
  BETTIPS: 'bet tips',
  CHANNEL: 'channel',
  COMMUNITYFORUM: 'community forum',
  PAYMENT: 'payment',
  FUNNGAMES: 'fun and games',
  NOTIFICATION: 'notification',
  WITHDRAWREQUEST: 'withdraw request',
  REPORT: 'report',
  OTHERS: 'others'
} as const

export type feedbackCategoryType =
  (typeof feedbackCategoryEnum)[keyof typeof feedbackCategoryEnum]

export const feedbackStatusEnum = {
  PUBLIC: 'public',
  PRIVATE: 'private'
} as const

export type feedbackStatusType =
  (typeof feedbackStatusEnum)[keyof typeof feedbackStatusEnum]
export interface IGetFeedback {
  category: feedbackCategoryType
  userId: string
  device: string
  ipAddress: string
  _id: string
  email: string
  rating: number
  feedback: string
  createdAt: string
  modified: string
  user: IUser
  status: feedbackStatusType
}

export interface IGetFeedbacks {
  status: string
  data: {
    feedbacks: IGetFeedback[]
  }
}
