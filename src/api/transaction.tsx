import {
  ICreateTransaction,
  ICreateTransactionResponse,
  ITransaction,
  ITransactionResponse
} from '../interface/ITransaction'
import { IUseAPI, apiFeatures } from '.'
import { IDefaultResponse, useGETAPI, usePATCHAPI } from './utils'
import { onErrorType, onSuccessType } from './sports'

export const createTransaction = async (
  transactionData: ICreateTransaction
) => {
  return await apiFeatures.post<ICreateTransactionResponse>(
    'transaction',
    transactionData
  )
}

export const useGetTransactions = (
  onSuccess?: onSuccessType<ITransactionResponse>,
  onError?: onErrorType
): IUseAPI<ITransactionResponse> => {
  return useGETAPI<{ transactions: ITransaction[] }, ITransactionResponse>(
    'transaction',
    onSuccess,
    onError
  )
}

export const useUpdateTransactions = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse> => {
  return usePATCHAPI('transaction', onSuccess, onError)
}
