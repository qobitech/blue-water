import { IGetDatasType } from './IOther'

export interface IWalletTransaction {
  createdAt: string
  amount: string
  _id: string
  userId: string
  tx_ref: string
  paymentStatus: string
  transactionType: string
  itemId: string
  senderId: string
  receiverId: string
  gw_ref: string
  paymentDate: string
  paymentId: string
  paymentMethod: string
  id: string
}

export interface IWallet {
  createdAt: string
  balance: number
  _id: string
  userId: string
  currency: string
  debit: IWalletTransaction[]
  credit: IWalletTransaction[]
  id: string
}

export interface IWalletResponse extends IGetDatasType {
  data: {
    wallets: IWallet[]
  }
}

export interface ICreditWallet {
  amount: number
  walletId: string
}
