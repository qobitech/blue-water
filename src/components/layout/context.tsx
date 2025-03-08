import { createContext, useContext } from 'react'
import { filterQueryType, themeType } from '../../constants/global'

import { IRightSection } from '../layout/right-section/utils'
import { IUseTab } from '../utils/reusable'
import { ICopyProps } from '../utils/hooks'
import { IComponentState, initComponentState } from './global-schema'
import { IUSH } from './state-hook'

export interface IGlobalContext {
  menuOpen?: boolean
  subMenuOpen?: number
  setMenuOpen?: (menuOpen: boolean) => void
  setSubMenuOpen?: (subMenuOpen: number) => void
  theme?: themeType
  setTheme?: (theme: themeType) => void
  setNotification?: (
    notice: string,
    status: boolean,
    dontClose?: boolean
  ) => void
  handleSession?: () => void
  closeSessionHandle?: () => void
  refreshNotificationMessages?: () => void
  rsProps?: IRightSection<{}>
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
  triggerConfetti?: (trigger: boolean) => void
  setShowConsentBanner?: (visible: boolean) => void
  showConsentBanner?: boolean
  setJoinWaitingList?: (visible: boolean) => void
  joinWaitingList?: boolean
  setSubscribe?: (visible: boolean) => void
  subscribe?: boolean
  global: IUSH<IComponentState>
}

export const GlobalContext = createContext<IGlobalContext>({
  menuOpen: false,
  subMenuOpen: 0,
  theme: 'dark',
  global: {
    state: initComponentState,
    updateState: () => {},
    clearState: () => {},
    clearAll: () => {}
  }
})

export const useGlobalContext = (): IGlobalContext => {
  const globalContext = useContext(GlobalContext)

  return {
    ...globalContext
  }
}
