import { IUseAPI } from '.'
import {
  IVerificationRequest,
  IVerificationRequests
} from '../interface/IVerificationRequest'
import { onErrorType, onSuccessType } from './sports'
import { IDefaultResponse, useGETAPI, usePOSTAPI, usePUTAPI } from './utils'

export const useCreateVerificationRequest = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  return usePOSTAPI('verification-request', onSuccess, onError)
}

export const useGetVerificationRequest = (
  onSuccess?: onSuccessType<IVerificationRequests>,
  onError?: onErrorType
): IUseAPI<IVerificationRequests> => {
  return useGETAPI<
    { idVerificationRequest: IVerificationRequest[] },
    IVerificationRequests
  >('verification-request', onSuccess, onError)
}

export const useReviewVerificationRequest = (
  onSuccess?: onSuccessType<{ status: string; message: string }>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  return usePUTAPI('verification-request/review', onSuccess, onError)
}
