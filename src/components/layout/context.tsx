import { createContext, useContext } from 'react'
import { INotification } from '../../interface/IOther'
import {
  IOrderSummaryProps,
  IPaymentDetails,
  filterQueryType,
  routeType,
  themeType,
  transactionItemType
} from '../../constants/global'
import { IUseNotificationModal } from '../utils/modal'
import { IRightSection } from '../layout/right-section/utils'
import { IMultiBetTicketResponse } from '../../interface/IBet'
import { IShareProps } from '../utils/share'
import { IUseTab } from '../utils/reusable'
import { ICopyProps } from '../utils/hooks'
import { IUseBetChannels } from '../../api/channels'
import { IUseAPI } from '../../api'
import { IDefaultResponse } from '../../api/utils'
import { IPaymentResponse } from '../../interface/IPayment'
import { IComponentState, initComponentState } from './global-schema'
import { IUSH } from './state-hook'

export interface IGlobalContext {
  menuOpen?: boolean
  subMenuOpen?: number
  setMenuOpen?: (menuOpen: boolean) => void
  setSubMenuOpen?: (subMenuOpen: number) => void
  theme?: themeType
  setTheme?: (theme: themeType) => void
  notification?: INotification
  setNotification?: (
    notice: string,
    status: boolean,
    dontClose?: boolean
  ) => void
  handleSession?: () => void
  closeSessionHandle?: () => void
  setPaymentInfo?: (
    paymentDetails: IPaymentDetails[],
    paymentItemType: transactionItemType,
    noCall?: boolean
  ) => void
  paymentDetails?: IPaymentDetails[] | null
  refreshNotificationMessages?: () => void
  paymentNotificationProps?: IUseNotificationModal
  paymentItemType?: transactionItemType
  rsProps?: IRightSection<{}>
  handleSetPrediction?: (prediction: IMultiBetTicketResponse) => void
  prediction?: IMultiBetTicketResponse | null
  handlePaymentLink?: (paymentLink: string | null) => void
  shareProps?: IShareProps | null
  setShareProps?: (shareProps: IShareProps) => void
  orderSummaryProps?: IOrderSummaryProps | null
  filters?: { [key: string]: string } | null
  setFilters?: (
    filters: { [key: string]: string },
    filterQuery: filterQueryType
  ) => void
  setFilterQuery?: (query: filterQueryType) => void
  filterQuery?: filterQueryType | null
  handleFilterQuery?: (query: string) => void
  betTipsTabProps?: IUseTab
  betChannelTabProps?: IUseTab
  copyProps?: ICopyProps
  betChannelProps?: IUseBetChannels
  refreshUserData?: () => void
  makePayment?: IUseAPI<IDefaultResponse<IPaymentResponse>>
  setPaymentItemType?: (
    value: React.SetStateAction<transactionItemType>
  ) => void
  triggerConfetti?: (trigger: boolean) => void
  setShowConsentBanner?: (visible: boolean) => void
  showConsentBanner?: boolean
  setJoinWaitingList?: (visible: boolean) => void
  joinWaitingList?: boolean
  setSubscribe?: (visible: boolean) => void
  subscribe?: boolean
  global: IUSH<IComponentState>
  route: routeType
}

export const GlobalContext = createContext<IGlobalContext>({
  menuOpen: false,
  subMenuOpen: 0,
  theme: 'dark',
  notification: { notice: '', status: false },
  global: {
    state: initComponentState,
    updateState: () => {},
    clearState: () => {},
    clearAll: () => {}
  },
  route: 'user'
})

export const useGlobalContext = (): IGlobalContext => {
  const globalContext = useContext(GlobalContext)

  return {
    ...globalContext
  }
}
