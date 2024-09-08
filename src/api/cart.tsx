import { IUseAPI } from '.'
import { ICartResponse, ICartResponseData } from '../interface/ICart'
import { onErrorType, onSuccessType } from './sports'
import { IDefaultResponse, useGETAPI, usePUTAPI } from './utils'

export const useGetCartQuery = (
  onSuccess?: onSuccessType<ICartResponse>,
  onError?: onErrorType
): IUseAPI<ICartResponse> => {
  return useGETAPI<{ carts: ICartResponseData[] }, ICartResponse>(
    'cart',
    onSuccess,
    onError
  )
}

export const useModifyCartItem = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  return usePUTAPI('cart', onSuccess, onError)
}
