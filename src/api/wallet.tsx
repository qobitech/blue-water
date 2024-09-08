import { IUseAPI, defaultGETDataTemplate, useAPIGET } from '.'
import { GETISSELLER } from '../constants/global'
import {
  IWalletTransactionStat,
  IWalletTransactionStats
} from '../interface/ITransaction'
import { onErrorType, onSuccessType } from './sports'
import { useGETAPI } from './utils'

export const useWalletQuery = (
  onSuccess?: onSuccessType<IWalletTransactionStats>,
  onError?: onErrorType
): IUseAPI<IWalletTransactionStats> => {
  const walletProps = useAPIGET<IWalletTransactionStats>({
    route: `transaction/${GETISSELLER() ? 'seller/' : ''}wallet-stats`,
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        stats: {
          balance: 0,
          totalWithdrawable: 0,
          totalCredit: 0,
          totalDebit: 0
        }
      }
    },
    onError,
    onSuccess
  })

  return walletProps
}

export const useGetWalletBalance = (
  onSuccess?: onSuccessType<IWalletTransactionStats>,
  onError?: onErrorType
): IUseAPI<IWalletTransactionStats> => {
  return useGETAPI<{ stats: IWalletTransactionStat }, IWalletTransactionStats>(
    'transaction/wallet-stats',
    onSuccess,
    onError
  )
}
