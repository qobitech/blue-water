import { useNotificationQuery } from './notification'
import { useWalletQuery } from './wallet'
import { useGetCartQuery } from './cart'
import { IUseAPI } from '.'
import { INotificationResponses } from '../interface/INotification'
import { IWalletTransactionStats } from '../interface/ITransaction'
import { ICartResponse } from '../interface/ICart'

export interface IUserGlobalStateActions {
  notificationProps: IUseAPI<INotificationResponses>
  walletProps: IUseAPI<IWalletTransactionStats>
  cartProps: IUseAPI<ICartResponse>
}

export const useGlobalStateActions = (): IUserGlobalStateActions => {
  const notificationProps = useNotificationQuery()
  const walletProps = useWalletQuery()
  const cartProps = useGetCartQuery()

  return {
    notificationProps,
    walletProps,
    cartProps
  }
}
