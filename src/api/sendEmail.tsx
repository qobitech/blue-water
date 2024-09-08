import { IUseAPI } from '.'
import { onErrorType, onSuccessType } from './sports'
import { usePOSTAPI } from './utils'

export const useSendCustomEmail = (
  onSuccess?: onSuccessType<any>,
  onError?: onErrorType
): IUseAPI<any> => {
  return usePOSTAPI('send-custom-mail', onSuccess, onError)
}

export const useSendCustomEmailWithTemplate = (
  onSuccess?: onSuccessType<any>,
  onError?: onErrorType
): IUseAPI<any> => {
  return usePOSTAPI('send-custom-mail/template', onSuccess, onError)
}
