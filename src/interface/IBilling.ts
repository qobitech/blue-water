export interface IBilling {
  fullName: string
  email: string
  userId: string
  billingAddress: string
  _id: string
}

export interface IBillingResponse {
  status: string
  data: {
    billings: IBilling[]
  }
}
