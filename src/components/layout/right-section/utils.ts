import { Dispatch, SetStateAction } from 'react'
import { paymentStatusType } from '../../../interface/ITransaction'
import { SNART_XER } from '../../page-components/payment/payment-status'
import { buttonType } from '../../utils/button'
import { IOptionAction } from '../../utils/reusable'
import { IGlobalContext } from '../context'

export type optionType = 'audio' | 'screen' | undefined

export type actionType = 'create' | 'view' | 'update' | 'delete' | null
export type actionComponent =
  | 'channel'
  | 'admin-management'
  | 'tips'
  | 'users'
  | 'subscription-settings'
  | 'member-subscription-service-settings'
  | 'channel-subscription-service-settings'
  | 'user-tier'
  | 'settings'
  | 'sports'
  | 'bookies'
  | 'notification-preference'
  | 'predictions'
  | 'public-predictions'
  | 'transaction'
  | 'membership-settings'
  | 'earning-events'
  | 'review'
  | 'report'
  | 'report-category'
  | 'fund-wallet'
  | 'select-payment-method'
  | 'select-card-payment-method'
  | 'select-wallet-payment-method'
  | 'order-summary'
  | 'get-code-option'
  | 'checkout'
  | 'notification'
  | 'share'
  | 'bet-stats'
  | 'filter'
  | 'login'
  | 'register'
  | 'bet-channel-item'
  | 'achievements-&-tasks'
  | 'rewards'
  | 'community-forum'
  | 'community-forum-post'
  | 'community-forum-join'
  | 'community-forum-user-role'
  | 'community-forum-user-status'
  | 'community-forum-user-data'
  | 'predict-n-win'
  | 'predict-game'
  | 'predict-n-win-predictions'
  | 'predict-n-win-stats'
  | 'fun-n-games'
  | 'service-transaction'
  | 'purchase-transaction'
  | 'purchased-prediction'
  | 'competition'
  | 'withdraw-funds'
  | 'account-details'
  | 'withdraw-request-transaction'
  | 'request-status'
  | 'view-competition'
  | 'post-payment'
  | 'tournament'
  | 'tournament-games'
  | 'exclusive-ad-rights'
  | 'reason'
  | 'tipster-indentification'
  | 'review-verification-request'
  | 'view-game-participant'
  | 'suspend-user'
  | 'create-user'
  | 'feed-back'
  | 'quick-nav'
  | 'avatars'
  | 'bet-code-filter'
  | 'bet-stats-instruction'
  | 'send-feedback'
  | 'record-feedback'
  | 'feedback'
  | null
export type actionId = string | null

export interface IRSAction {
  type: actionType
  component: actionComponent
  id?: actionId
}

export interface IGetCTA {
  action: actionType
  component: actionComponent
  title?: string
  id?: string
}

export interface ICallSection<T> {
  action: actionType
  component: actionComponent
  title?: string | JSX.Element
  id?: string
  data?: T | any
  slug?: string
  onRefresh?: () => void
  status?: boolean
  paymentStatus?: paymentStatusType
  max?: boolean
  additionalAmountNeeded?: string
}

export interface IRsPropsCTA {
  title: string
  buttonType: buttonType
  action?: () => void
  load?: boolean
  loadText?: string
  actionType?: 'single' | 'multiple'
  icon?: JSX.Element
  actionOptions?: IOptionAction[]
}

export interface IRightSection<K> {
  closeSection: () => void
  openSection: boolean
  setAction: React.Dispatch<React.SetStateAction<IRSAction>>
  action: IRSAction
  setTitle: React.Dispatch<React.SetStateAction<string | JSX.Element>>
  title: string | JSX.Element
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  callSection(data: ICallSection<K>): void
  isView: (type: actionType, component: actionComponent) => boolean
  data: K | null | undefined
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  updateData(data: any): void
  setDataRequestCounter: React.Dispatch<React.SetStateAction<number>>
  dataRequestCounter: number
  addRightSectionHistory: (data?: any) => void
  removeRightSectionHistory: () => void
  isSectionHistory: boolean
  clearRightSectionHistory: () => void
  removeItemRightSectionHistory: (component: actionComponent) => void
  slug: string
  setMediaURL: React.Dispatch<React.SetStateAction<string>>
  mediaUrl: string
  setDataById: React.Dispatch<any>
  dataById: any
  status: boolean
  paymentStatus: paymentStatusType | null
  max: boolean
  additionalAmountNeeded: string
  setAdditionalAmountNeeded: React.Dispatch<React.SetStateAction<string>>
  onRefresh?: () => void
  cta: IRsPropsCTA[]
  setCTA: (value: React.SetStateAction<IRsPropsCTA[]>) => void
  audioProps: boolean
  setAudioProps: (value: React.SetStateAction<boolean>) => void
  setFeedbackOption: Dispatch<SetStateAction<optionType>>
  feedbackOption: optionType
}

export interface IRightSectionHistory {
  action: actionType
  component: actionComponent
  title: string
  id?: string
  data?: any
}

export interface IRSection<T> {
  children?: any
  rsProps: IRightSection<T>
  globalContext?: IGlobalContext
}

export interface IGlobalRightSection<T = undefined> {
  rsProps?: IRightSection<T>
  globalContext?: IGlobalContext
}

export const clearTransRef = () => {
  if (localStorage.getItem(SNART_XER)) localStorage.removeItem(SNART_XER)
}
