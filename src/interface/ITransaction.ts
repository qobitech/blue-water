import { transactionItemType } from '../constants/global'
import { IGetDatasType } from './IOther'

export interface ICreateTransaction {
  userId: string
  paymentId: string | null
  invoiceId: string | null
  amount: string
  paymentDate: string | null
  paymentStatus: paymentStatusType
  paymentMethod: string | null
  transactionType: string
  itemId: string
}

export interface ICreateTransactionResponse {
  status: string
  message: string
  data: {
    transaction: {
      createdAt: string
      modified: string
      amount: string
      _id: string
      userId: string
      paymentId: string | null
      invoiceId: string | null
      paymentDate: string | null
      paymentStatus: paymentStatusType
      paymentMethod: string | null
      transactionType: string
      itemId: string
    }
  }
}

export interface ITransactionItem {
  id: string
  itemType: string
  status: string
  transaction: string
  _id: string
}

export type paymentStatusType =
  | 'Processing'
  | 'Successful'
  | 'Failed'
  | 'Reversed'
  | 'Cancelled'

export interface ITransaction {
  amount: string
  createdAt: string
  modified: string
  _id: string
  userId: string
  senderId: string
  receiverId: string
  paymentId: string | null
  paymentDate: string | null
  paymentStatus: paymentStatusType
  paymentMethod: string | null
  transactionType: transactionItemType
  itemId: string
  item: ITransactionItem
  escrow: boolean
  service: string
}

export interface ITransactionResponse extends IGetDatasType {
  data: {
    transactions: ITransaction[]
  }
}

export interface IWalletTransactionStat {
  balance: number | null
  totalCredit: number | null
  totalDebit: number | null
  totalWithdrawable: number | null
}
export interface IWalletTransactionStats {
  status: string
  data: {
    stats: IWalletTransactionStat
  }
}

export interface IServicePayoutTransactionStats {
  status: string
  data: {
    stats: {
      balance: number | null
      totalCredit: number | null
      totalDebit: number | null
    }
  }
}

export interface IServiceTransaction {
  paymentMethod: string
  transaction: string
  _id: string
  itemId: string
  itemType: string
  userId: string
  status: string
  startDate: string
  endDate: string
  id: string
}

export interface IPurchaseTransaction {
  paymentMethod: string
  _id: string
  itemId: string
  itemType: string
  transaction: string
  userId: string
  status: string
  createdAt: string
  modified: string
  id: string
}

export interface IWithdrawRequestTransaction {
  _id: string
  userId: string
  amount: number
  account_bank: string
  account_number: string
  currency: string
  createdAt: string
  modified: string
  transaction: string
}
