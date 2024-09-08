import { IUseAPI } from '.'
import { transactionItemType } from '../constants/global'
import { IBanks, IPaymentResponse } from '../interface/IPayment'
import { onErrorType, onSuccessType } from './sports'
import { IDefaultResponse, useGETAPI, usePOSTAPI } from './utils'

export type IUsePayment = (
  onSuccess?: onSuccessType<IDefaultResponse<IPaymentResponse>>,
  onError?: onErrorType
) => IUseAPI<IDefaultResponse<IPaymentResponse>>

export const usePayment = (
  paymentItemType: transactionItemType
): IUsePayment => {
  const getRoute = () => {
    switch (paymentItemType) {
      case 'credit-wallet':
        return 'pay/credit-wallet'
      case 'betcode':
        return 'pay/pay-per-tip'
      default:
        return ''
    }
  }

  const makePayment = (
    onSuccess?: onSuccessType<IDefaultResponse<IPaymentResponse>>,
    onError?: onErrorType
  ): IUseAPI<IDefaultResponse<IPaymentResponse>> => {
    return usePOSTAPI(getRoute(), onSuccess, onError)
  }

  return makePayment
}

export const useGetBanks = (
  onSuccess?: onSuccessType<IBanks>,
  onError?: onErrorType
): IUseAPI<IBanks> => {
  return useGETAPI('pay/banks', onSuccess, onError)
}

export const useTransfer = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  return usePOSTAPI('pay/transfer', onSuccess, onError)
}
