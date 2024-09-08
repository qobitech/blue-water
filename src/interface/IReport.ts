import { IGetDatasType } from './IOther'
import { IReportCategory } from './IReportCategory'
import { IUser } from './IUser'

export type reportType = 'betcode'

export interface ICreateReport {
  itemType: reportType
  itemId: string
  category: string
  comment: string
}

export interface ICreateReportResponse {
  status: string
  message: string
}

export type reportStatusType =
  | 'accepted'
  | 'rejected'
  | 'under-review'
  | 'un-reviewed'

export interface IReportResponse<T = undefined> {
  comment: string
  _id: string
  userId: string
  itemType: reportType
  itemId: string
  category: string
  modified: string
  user: IUser
  'report-category': IReportCategory
  id: string
  status: reportStatusType
  item: T
}

export interface IReportResponses<T = undefined> extends IGetDatasType {
  data: {
    reports: Array<IReportResponse<T>>
  }
}
