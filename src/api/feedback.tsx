import { IUseAPI } from '.'
import { IGetFeedback, IGetFeedbacks } from '../interface/IFeedback'
import { onErrorType, onSuccessType } from './sports'
import { IDefaultResponse, useGETAPI, usePATCHAPI, usePOSTAPI } from './utils'

export const useCreateFeedback = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  return usePOSTAPI('feedback', onSuccess, onError)
}

export const useGetFeedback = (
  onSuccess?: onSuccessType<IGetFeedbacks>,
  onError?: onErrorType
): IUseAPI<IGetFeedbacks> => {
  return useGETAPI<{ feedbacks: IGetFeedback[] }, IGetFeedbacks>(
    'feedback',
    onSuccess,
    onError
  )
}

export const useGetPublicFeedback = (
  onSuccess?: onSuccessType<IGetFeedbacks>,
  onError?: onErrorType
): IUseAPI<IGetFeedbacks> => {
  return useGETAPI<{ feedbacks: IGetFeedback[] }, IGetFeedbacks>(
    'feedback/public',
    onSuccess,
    onError
  )
}

export const useUpdateFeedbackStatus = (
  onSuccess?: onSuccessType<{
    status: string
    message: string
  }>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  return usePATCHAPI('feedback', onSuccess, onError)
}
