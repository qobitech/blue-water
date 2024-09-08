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
import { IRightSection } from '../layout/right-section'
import { IMultiBetTicketResponse } from '../../interface/IBet'
import { IUPC } from '../page-components/payment/post-payment/hooks'
import { IShareProps } from '../utils/share'
import { IUseTab } from '../utils/reusable'
import { ICopyProps } from '../utils/hooks'
import { IUseBetChannels } from '../../api/channels'
import { IUserGlobalStateActions } from '../../api/globalStateActions'
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
  // refreshCartItems?: () => void
  paymentNotificationProps?: IUseNotificationModal
  paymentItemType?: transactionItemType
  rsProps?: IRightSection<{}>
  handleSetPrediction?: (prediction: IMultiBetTicketResponse) => void
  prediction?: IMultiBetTicketResponse | null
  handlePaymentLink?: (paymentLink: string | null) => void
  paymentConfirmationProps?: IUPC
  shareProps?: IShareProps | null
  setShareProps?: (shareProps: IShareProps) => void
  // setBetStatProps?: (betChannelInfo: IBetChannelInfo) => void
  // setBetChannelItemProps?: (betChannelInfo: IBetChannelInfo) => void
  // betChannelInfo?: IBetChannelInfo | null
  // setBetChannelSlug?: (
  //   slug: string,
  //   title: string,
  //   type: 'public' | 'user'
  // ) => void
  // betChannelSlug?: string
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
  globalStateActions?: IUserGlobalStateActions
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
