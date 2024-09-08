import { IUseAPI } from '.'
import { onErrorType, onSuccessType } from './sports'
import { IDefaultResponse, usePOSTAPI } from './utils'

export const useCreateWithdrawRequest = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  return usePOSTAPI('withdraw-request', onSuccess, onError)
}
