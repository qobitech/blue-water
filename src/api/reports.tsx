import { IUseAPI } from '.'
import { IReportResponse, IReportResponses } from '../interface/IReport'
import { onErrorType, onSuccessType } from './sports'
import { IDefaultResponse, useGETAPI, usePATCHAPI } from './utils'

export const useGetReports = (
  onSuccess?: onSuccessType<IReportResponses>,
  onError?: onErrorType
): IUseAPI<IReportResponses> => {
  return useGETAPI<{ reports: IReportResponse[] }, IReportResponses>(
    'report',
    onSuccess,
    onError
  )
}

export const useUpdateReport = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse> => {
  return usePATCHAPI('report', onSuccess, onError)
}

export const usePatchReport = (
  onSuccess?: onSuccessType<any>,
  onError?: onErrorType
): IUseAPI<any> => {
  return useGETAPI('report', onSuccess, onError)
}
