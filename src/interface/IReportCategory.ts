import { IGetDatasType, IResponseType1 } from './IOther'

export type reportType = 'betcode'

export interface IReportCategory extends IResponseType1 {
  itemType: string
}

export interface IReportCategories extends IGetDatasType {
  data: {
    reportCategories: IReportCategory[]
  }
}
