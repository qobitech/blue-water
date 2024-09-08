export interface ICart {
  userId: string
  item: string
  amount: string
  description: string
  itemType: string
  itemId: string
  transactionType: string
  title: string
}

export interface ICartResponseData {
  _id: string
  userId: string
  item: string
  amount: string
  description: string
  itemType: string
  itemId: string
  transactionType: string
  title: string
}

export interface ICartResponse {
  status: string
  data: {
    carts: ICartResponseData[]
  }
}
