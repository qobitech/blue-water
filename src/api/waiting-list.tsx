import { IUseAPI } from '.'
import { IWaitingList, IWaitingLists } from '../interface/IWaitingList'
import { onErrorType, onSuccessType } from './sports'
import { IDefaultResponse, useGETAPI, usePOSTAPI } from './utils'

export const useCreateWaitingList = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  return usePOSTAPI('waiting-list', onSuccess, onError)
}

export const useGetWaitingList = (
  onSuccess?: onSuccessType<IWaitingLists>,
  onError?: onErrorType
): IUseAPI<IWaitingLists> => {
  return useGETAPI<{ allWaitingList: IWaitingList[] }, IWaitingLists>(
    'waiting-list',
    onSuccess,
    onError
  )
}
