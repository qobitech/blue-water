import { ReactNode, useMemo, useState } from 'react'
import Header from './header'
import SideMenu, { menuData } from './side-menu'
import {
  IOrderSummaryProps,
  IPaymentDetails,
  UNDER_CONSTRUCTION,
  betChannelTabEnum,
  betTipsTabEnum,
  filterQueryType,
  getIsAdminLogged,
  getIsLogged,
  transactionItemType,
  routeType
} from '../../constants/global'
import Footer from './footer'
import { INotification } from '../../interface/IOther'
import { useModal } from '../utils/modal'
import axios from 'axios'
import GlobalRightSection from './global-right-section'
import { IMultiBetTicketResponse } from '../../interface/IBet'
import { IShareProps } from '../utils/share'
import { useTabSection } from '../utils/reusable'
import { useCopy } from '../utils/hooks'
import { useGlobalBetChannelQuery } from '../../api/channels'
import ScrollIntoViewController from './scroll-into-view-controller'
import {
  _isMobile,
  getSubAmount,
  getTotalAmount,
  getVATAmount
} from '../utils/helper'
import './style.scss'
import Confetti from '../utils/confetti'
import UnderConstruction from '../../pages/underconstruction'
import ConsentBanner from '../../pages/public/consent-banner'
import CookiePreferencesModal from '../../pages/public/consent-banner/modal'
import WaitingListModal from '../../pages/public/waiting-list'
import { GlobalContext } from './context'
import NotificationCard from './notification-card'
import { IComponentState } from './global-schema'
import { IUSH } from './state-hook'
import { useRightSection } from './right-section/hooks'

interface IDashboard {
  children: ReactNode
  route: routeType
  global: IUSH<IComponentState>
}

const useAxios = (onTokenExpire: () => void) => {
  axios.interceptors.request.use(
    function (config) {
      return config
    },
    async function (error) {
      // Do something with request error
      return await Promise.reject(error)
    }
  )

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response
    },
    async function (error) {
      // Do something with response error
      const tokenExpired = 'your token has expired!,  please login again'
      if (error.response?.data) {
        const isTokenExpired = error.response.data.message === tokenExpired
        if (isTokenExpired) onTokenExpire()
      }
      return await Promise.reject(error)
    }
  )
}

const Dashboard: React.FC<IDashboard> = ({ route, children, global }) => {
  const [prediction, setPrediction] = useState<IMultiBetTicketResponse | null>(
    null
  )
  const [notification, setNotification] = useState<INotification>({
    notice: '',
    status: false
  })
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<{ [key: string]: string } | null>(null)
  const [filterQuery, setFilterQuery] = useState<filterQueryType | null>(null)
  const [subMenuOpen, setSubMenuOpen] = useState<number>(0)
  const [showConsentBanner, setShowConsentBanner] = useState<boolean>(false)
  const [joinWaitingList, setJoinWaitingList] = useState<boolean>(false)
  const [subscribe, setSubscribe] = useState<boolean>(false)
  const [shareProps, setShareProps] = useState<IShareProps | null>(null)
  const [confetti, setConfetti] = useState<boolean>(false)
  const [orderSummaryProps, setOrderSummaryProps] =
    useState<IOrderSummaryProps | null>(null)
  const [paymentDetails, setPaymentDetails] = useState<
    IPaymentDetails[] | null
  >(null)
  const [paymentItemType, setPaymentItemType] =
    useState<transactionItemType | null>(null)

  const useNotificationProps = useModal()

  const closeSessionHandle = () => {
    useNotificationProps.handleCloseModal()
  }

  const handleNotification = (
    notice: string,
    status: boolean,
    dontClose?: boolean
  ) => {
    setNotification((p) => ({ ...p, notice, status, dontClose }))
  }

  const handleSession = () => {
    if (getIsLogged() || getIsAdminLogged()) {
      useNotificationProps.handleOpenModal('LOGIN')
    }
  }

  const getSummaryOrderProps = (
    data: IPaymentDetails[]
  ): IOrderSummaryProps => {
    const summaryOrderProps = data.reduce(
      (t, i) => {
        t = {
          ...t,
          subAmount: (t.subAmount += getSubAmount(i)),
          totalAmount: (t.totalAmount += getTotalAmount(i)),
          vat: (t.vat += getVATAmount(i))
        }
        return t
      },
      {
        subAmount: 0,
        totalAmount: 0,
        vat: 0
      }
    )

    return {
      subAmount: summaryOrderProps.subAmount + '',
      totalAmount: summaryOrderProps.totalAmount + '',
      serviceFee: summaryOrderProps.vat + ''
    }
  }

  const setPaymentInfo = (
    paymentDetails: IPaymentDetails[],
    paymentItemType: transactionItemType,
    noCall?: boolean
  ) => {
    setPaymentDetails(paymentDetails)
    setPaymentItemType(paymentItemType)
    setOrderSummaryProps(getSummaryOrderProps(paymentDetails))
    if (!noCall)
      rsProps?.callSection({
        action: 'view',
        component: 'order-summary',
        title: 'Order Summary'
      })
  }

  useAxios(handleSession)

  if (UNDER_CONSTRUCTION) {
    return <UnderConstruction />
  }

  const refreshNotificationMessages = () => {}

  // const refreshCartItems = () => {
  //   globalStateActions.cartProps.mutate({
  //     query: `?userId=${userData?.user?._id}`
  //   })
  // }

  const handleSetPrediction = (prediction: IMultiBetTicketResponse) => {
    setPrediction(prediction)
  }

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

  const betTipsTabProps = useTabSection(betTipsTabEnum.ALL, betTipsTabEnum)

  const betChannelTabProps = useTabSection(
    betChannelTabEnum.ALL,
    betChannelTabEnum
  )

  const betChannelProps = useGlobalBetChannelQuery(betChannelTabProps.tab)

  const handleFilterQuery = (query: string) => {
    // if (filterQuery === 'tip') {
    //   multiBetProps.getMultiBets(query)
    // }
  }

  const copyProps = useCopy()

  const getMenu = () => {
    return menuData
  }

  const [toggle, setToggle] = useState<boolean>(() => !_isMobile())

  const setMenu = () => {
    setToggle(!toggle)
  }

  // const cursorContext = useCursorProvider()

  const isNotLogged = useMemo(
    () => !getIsAdminLogged() && !getIsLogged(),
    [getIsAdminLogged(), getIsLogged()]
  )

  return (
    <GlobalContext.Provider
      value={{
        global,
        menuOpen,
        subMenuOpen,
        notification,
        setMenuOpen,
        setNotification: handleNotification,
        setSubMenuOpen,
        handleSession,
        closeSessionHandle,
        paymentDetails,
        refreshNotificationMessages,
        setPaymentInfo,
        paymentItemType,
        rsProps,
        handleSetPrediction,
        prediction,
        setShareProps: handleShareProps,
        shareProps,
        orderSummaryProps,
        filters,
        setFilters: handleFilters,
        setFilterQuery,
        filterQuery,
        handleFilterQuery,
        betTipsTabProps,
        betChannelTabProps,
        betChannelProps,
        copyProps,
        setPaymentItemType,
        triggerConfetti: setConfetti,
        setShowConsentBanner,
        showConsentBanner,
        joinWaitingList,
        setJoinWaitingList,
        setSubscribe,
        subscribe,
        route
      }}
    >
      <NotificationCard
        notice={notification.notice}
        status={notification.status}
        handleNotification={handleNotification}
      />
      <WaitingListModal
        isVisible={joinWaitingList}
        setIsVisible={setJoinWaitingList}
        type="monthly subscription"
      />
      <ConsentBanner />
      <CookiePreferencesModal
        isVisible={showConsentBanner}
        setIsVisible={setShowConsentBanner}
      />
      {/* <FeedbackWidget /> */}
      <Confetti isConfetti={confetti} />
      <GlobalRightSection />
      <div className="main-container">
        <HideShow>
          <div className="children-container bg-mytipster">
            {route !== 'public' && route !== 'auth' ? (
              <SideMenu
                menu={getMenu()}
                setToggle={setToggle}
                toggle={toggle}
                showConsentBanner={() => {
                  setShowConsentBanner(true)
                }}
              />
            ) : null}
            <div className="w-100">
              <Header
                setMenu={setMenu}
                route={route}
                toggle={toggle}
                setSubscribe={setJoinWaitingList}
                rsProps={rsProps}
              />
              {children}
            </div>
          </div>
        </HideShow>
        {isNotLogged && <Footer />}
        {menuOpen ? <div className="over-lay" onClick={setMenu} /> : null}
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
