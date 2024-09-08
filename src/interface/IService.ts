import { serviceType, transactionType } from '../constants/global'
import { IGetDatasType, typeScheduleType } from './IOther'
import { ITransaction } from './ITransaction'

export interface IBetCodeServiceRequest {
  amount: string
  description: string
  itemId: string
  itemType: serviceType
  transactionType: transactionType
  startSchedule: string
  deadline: string
  month: string
  odds: number
  scheduleType: typeScheduleType
}

export type serviceResultType = 'no answer' | 'won' | 'lost'

export interface IService<T> {
  paymentMethod: string
  itemReview: {
    rating: number
    comment: string
  }
  serviceReview: {
    rating: number
    comment: string
  }
  result: serviceResultType
  _id: string
  itemId: string
  item: T
  itemType: serviceType
  transaction: string
  transactionItem: ITransaction
  userId: string
  senderId: string
  receiverId: string
  status: string
  startDate: string
  endDate: string
  id: string
}

export interface IServiceResponse<T> extends IGetDatasType {
  data: {
    services: Array<IService<T>>
  }
}
