export interface IPurchaseItem {
  userId: string
  createdAt: string
  modified: string
  itemType: string
  itemId: string
  paymentMethod: string | null
  transaction: string
  status: string
}
