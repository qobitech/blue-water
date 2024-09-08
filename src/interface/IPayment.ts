export interface IPaymentResponse {
  link: string
}

export interface IPaymentConfirmationData {
  tx_ref: string
  amount: number
  currency: string
  status: string
  payment_type: string
  created_at: '2024-03-11T05:39:17.000Z'
  customer: {
    name: string
    email: string
  }
}

export interface IPaymentConfirmation {
  status: string
  message: string
  data: {
    transaction: IPaymentConfirmationData
  }
}

export interface IBank {
  id: number
  code: string
  name: string
}
export interface IBanks {
  status: string
  message: string
  data: IBank[]
}
