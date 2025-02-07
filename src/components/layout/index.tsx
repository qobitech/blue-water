import { ReactNode, useState } from 'react'
import Header from './header'
import { UNDER_CONSTRUCTION, filterQueryType } from '../../constants/global'
import Footer from './footer'
import { useModal } from '../utils/modal'
import GlobalRightSection from './global-right-section'
import { IShareProps } from '../utils/share'
import ScrollIntoViewController from './scroll-into-view-controller'

import './style.scss'
import UnderConstruction from '../../pages/underconstruction'
import CookiePreferencesModal from '../../pages/public/consent-banner/modal'
import { GlobalContext } from './context'
import { IComponentState } from './global-schema'
import { IUSH } from './state-hook'
import { useRightSection } from './right-section/hooks'

interface IDashboard {
  children: ReactNode
  global: IUSH<IComponentState>
}

const Dashboard: React.FC<IDashboard> = ({ children, global }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<{ [key: string]: string } | null>(null)
  const [filterQuery, setFilterQuery] = useState<filterQueryType | null>(null)
  const [subMenuOpen, setSubMenuOpen] = useState<number>(0)
  const [showConsentBanner, setShowConsentBanner] = useState<boolean>(false)
  const [joinWaitingList, setJoinWaitingList] = useState<boolean>(false)
  const [subscribe, setSubscribe] = useState<boolean>(false)
  const [shareProps, setShareProps] = useState<IShareProps | null>(null)
  const useNotificationProps = useModal()

  const closeSessionHandle = () => {
    useNotificationProps.handleCloseModal()
  }

  if (UNDER_CONSTRUCTION) {
    return <UnderConstruction />
  }

  const refreshNotificationMessages = () => {}

  const rsProps = useRightSection()

  const handleShareProps = (shareProps: IShareProps) => {
    setShareProps(shareProps)
    rsProps.callSection({
      action: 'view',
      component: 'share',
      title: 'Share'
    })
  }

  const handleFilters = (
    filters: { [key: string]: string },
    filterQuery: filterQueryType
  ) => {
    if (!filters) return
    setFilters(filters)
    setFilterQuery(filterQuery)
    rsProps?.callSection({
      action: 'view',
      component: 'filter',
      title: 'Filter'
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        global,
        menuOpen,
        subMenuOpen,
        setMenuOpen,
        setSubMenuOpen,
        closeSessionHandle,
        refreshNotificationMessages,
        rsProps,
        setShareProps: handleShareProps,
        shareProps,
        filters,
        setFilters: handleFilters,
        setFilterQuery,
        filterQuery,
        setShowConsentBanner,
        showConsentBanner,
        joinWaitingList,
        setJoinWaitingList,
        setSubscribe,
        subscribe
      }}
    >
      <CookiePreferencesModal
        isVisible={showConsentBanner}
        setIsVisible={setShowConsentBanner}
      />
      <GlobalRightSection />
      <div className="main-container">
        <HideShow>
          <div className="children-container bg-mytipster">
            <div className="w-100">
              <Header rsProps={rsProps} />
              {children}
            </div>
          </div>
        </HideShow>
        <Footer />
      </div>
    </GlobalContext.Provider>
  )
}

const HideShow = ({ children }: { children?: any }) => {
  const isUser = true
  return (
    <>
      {!isUser ? (
        <ScrollIntoViewController>{children}</ScrollIntoViewController>
      ) : (
        children
      )}
    </>
  )
}

export default Dashboard
