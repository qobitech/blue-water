export interface ICreateWaitingListResponse {
  status: string
  data: {}
}

export const waitingListFeaturesEnum = {
  LAUNCH: 'launch v2',
  MONTHLYSUBSCRIPTION: 'monthly subscription'
} as const

export type waitingListType =
  (typeof waitingListFeaturesEnum)[keyof typeof waitingListFeaturesEnum]

export interface ICreateWaitingList {
  email: string
  feature: waitingListType
  role: any
}

export interface IWaitingList {
  email: string
  feature: string
  ipAdress: string
  device: string
  role: any
}

export interface IWaitingLists {
  status: string
  result: number
  currentPage: number
  pages: number
  hasNext: boolean
  data: {
    allWaitingList: IWaitingList[]
  }
}
