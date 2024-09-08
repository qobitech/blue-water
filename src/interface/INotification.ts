import { IGetDatasType } from './IOther'

export type notificationType =
  | 'BETTIPS'
  | 'SUBSCRIPTION'
  | 'REQUESTS'
  | 'CASE'
  | 'COMMUNITY FORUM'

export interface INotificationResponse {
  _id: string
  title: string
  body: string
  status: 'UNREAD' | 'READ'
  category: notificationType
  createdAt: string
  sender: {
    userName: string
  }
  receiverId: string
}
export interface INotificationResponses extends IGetDatasType {
  data: {
    notifications: INotificationResponse[]
  }
}
