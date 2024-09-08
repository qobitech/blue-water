import { IGetDatasType } from './IOther'
import { IUser } from './IUser'

export type reviewType = 'betcode' | 'betchannel'
export type reviewResult = 'no answer' | 'won' | 'lost' | 'not yet'

export interface ICreateReview {
  itemType: reviewType
  itemId: string
  channelID: string
  code: string
  bookie: string
  rating: number
  comment: string
  result: reviewResult
}

export interface ICreateReviewResponse {
  status: string
  message: string
}

export interface IReviewResponse {
  user: IUser
  userId: string
  modified: string
  itemType: reviewType
  itemId: string
  rating: number
  comment: string
  result: reviewResult
}

export interface IReviewResponses extends IGetDatasType {
  data: {
    reviews: IReviewResponse[]
  }
}
