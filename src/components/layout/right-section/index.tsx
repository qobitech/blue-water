import { Children, useState } from 'react'
import { TypeButton } from '../../utils/button'
import { Loader2 } from '../../utils/hooks'
import TextPrompt from '../../utils/text-prompt'
import { BellBoldSVG, BellOutlineSVG, VerifiedSVG } from '../../utils/svgs'
import { IUseBetMultiBetTicket } from '../../../api/multi-prediction'
import { IBetChannelResponse } from '../../../interface/IBet'
import { useChannelSubscriptions } from '../../../api/subscriptions'
import './index.scss'
import { paymentStatusType } from '../../../interface/ITransaction'
import { HVC, HVCLoad } from '../../utils/hvc'
import { LeftAngleSVG } from '../../utils/svgs/f-awesome'
import { IGlobalContext } from '../../layout/context'
import { IconWrapper } from '../../utils/info-txt'
import { SNART_XER } from '../../page-components/payment/payment-status'
import { btnType } from '../../tables/public-bet-channel'
import {
  ActionComponent,
  IOptionAction,
  RefreshComponent
} from '../../utils/reusable'
import { AudioRecordController } from '../../page-components/send-feedback/audio-record-controller'

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
  | null
export type actionId = string | null

interface IRSAction {
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
  buttonType: btnType
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
}

export const clearTransRef = () => {
  if (localStorage.getItem(SNART_XER)) localStorage.removeItem(SNART_XER)
}

export interface IRightSectionHistory {
  action: actionType
  component: actionComponent
  title: string
  id?: string
  data?: any
}

export const useRightSection = <K extends {}>(): IRightSection<K> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sectionHistories, setSectionHistories] = useState<
    IRightSectionHistory[] | null
  >(null)
  const [title, setTitle] = useState<string | JSX.Element>('')
  const [dataRequestCounter, setDataRequestCounter] = useState<number>(0)
  const [additionalAmountNeeded, setAdditionalAmountNeeded] =
    useState<string>('')
  const [openSection, setOpenSection] = useState<boolean>(() => false)
  const [mediaUrl, setMediaURL] = useState<string>(() => '')
  const [slug, setSlug] = useState<string>(() => '')
  const [status, setStatus] = useState<boolean>(() => false)
  const [onRefresh, setOnRefresh] = useState<(() => void) | undefined>(
    undefined
  )
  const [paymentStatus, setPaymentStatus] = useState<paymentStatusType | null>(
    null
  )
  const [max, setMax] = useState<boolean>(false)
  const [action, setAction] = useState<IRSAction>({
    type: null,
    component: null,
    id: null
  })
  const [data, setData] = useState<K | null | undefined>(null)
  const [dataById, setDataById] = useState<any>(null)
  const [cta, setCTA] = useState<IRsPropsCTA[]>([])
  const [audioProps, setAudioProps] = useState<boolean>(false)

  function updateData(data: K | null) {
    setData(data)
  }

  const isView = (type: actionType, component: actionComponent) => {
    return action.type === type && action.component === component
  }

  function callSection<T>(arg: ICallSection<T>) {
    const {
      action,
      component,
      title,
      id,
      data,
      slug,
      status,
      max,
      additionalAmountNeeded,
      paymentStatus,
      onRefresh
    } = arg
    setAction({ type: action, component, id })
    setTitle(title || '')
    setOpenSection(true)
    setData((prev) => (data ? (data as unknown as K) : prev))
    setSlug((prev) => slug || prev)
    setStatus(status || false)
    setMax((prev) => max || prev)
    setAdditionalAmountNeeded((prev) => additionalAmountNeeded || prev)
    setPaymentStatus(paymentStatus || null)
    setOnRefresh((prev) => onRefresh || prev)
  }

  const addRightSectionHistory = () => {
    if (typeof title !== 'string') return
    if (!action.component) return
    setSectionHistories((prev) => {
      const sh = prev || []
      sh.push({
        action: action.type,
        component: action.component,
        title,
        id: slug || '',
        data
      })
      return sh
    })
  }

  const removeRightSectionHistory = () => {
    setSectionHistories((prev) => {
      if (!prev) return null
      const sh = prev.pop()
      setData(sh?.data as unknown as K)
      callSection({
        action: sh?.action || 'view',
        title: sh?.title || '',
        component: sh?.component || null,
        slug: sh?.id || slug || '',
        data: sh?.data
      })
      return prev
    })
  }

  const removeItemRightSectionHistory = (component: actionComponent) => {
    setSectionHistories((prev) => {
      if (!prev) return null
      return prev.filter((i) => i.component !== component)
    })
  }

  const clearRightSectionHistory = () => {
    setSectionHistories(null)
  }

  const closeSection = () => {
    setAction({ component: null, type: null, id: null })
    setOpenSection(false)
    setSectionHistories(null)
    clearTransRef()
    setSlug('')
    setMediaURL('')
    setMax(false)
    setAdditionalAmountNeeded('')
    setPaymentStatus(null)
    setOnRefresh(undefined)
    setCTA([])
    setAudioProps(false)
  }

  return {
    closeSection,
    openSection,
    setAction,
    action,
    setTitle,
    title,
    callSection,
    isView,
    data,
    updateData,
    setDataRequestCounter,
    dataRequestCounter,
    addRightSectionHistory,
    removeRightSectionHistory,
    isSectionHistory: Array.isArray(sectionHistories) && !!sectionHistories[0],
    clearRightSectionHistory,
    removeItemRightSectionHistory,
    slug,
    setMediaURL,
    mediaUrl,
    setDataById,
    dataById,
    status,
    max,
    setAdditionalAmountNeeded,
    additionalAmountNeeded,
    paymentStatus,
    onRefresh,
    audioProps,
    setAudioProps,
    cta,
    setCTA
  }
}

interface IRSection<T> {
  children?: any
  rsProps: IRightSection<T>
  globalContext?: IGlobalContext
}

export interface IGlobalRightSection<T = undefined> {
  rsProps?: IRightSection<T>
  globalContext?: IGlobalContext
}

const RightSection = <T extends {}>({
  children,
  rsProps,
  globalContext
}: IRSection<T>) => {
  const matchChild: any = Children.map(children, (child) => {
    if (child)
      return { ...child, props: { ...child.props, rsProps, globalContext } }
    return child
  })

  const isTitleString = typeof rsProps.title === 'string'

  const ctaLoad = rsProps.cta.reduce<{ status: boolean; text: string }>(
    (t, i) => {
      if (i.load) t = { status: true, text: i?.loadText || '' }
      return t
    },
    { status: false, text: '' }
  )

  const isCTASectIon = !!rsProps.cta.length || rsProps.audioProps

  return (
    <>
      {rsProps.openSection ? (
        <div className="back-drop" onClick={rsProps.closeSection} />
      ) : null}
      <div
        className={`right_container ${
          rsProps.openSection ? 'menuopen' : 'menuclose'
        } ${rsProps.max ? 'max' : ''}`}
      >
        <div className="rs-header">
          <div className="ctas">
            <TypeButton
              title=""
              close
              buttonType="danger"
              buttonSize="small"
              buttonShape="curve"
              onClick={rsProps.closeSection}
            />
          </div>
          {isTitleString ? <h3>{rsProps.title}</h3> : rsProps.title}
        </div>
        {rsProps.isSectionHistory ? (
          <div
            className="mt-auto py-3 cursor-pointer f-row-7 aic"
            onClick={() => {
              clearTransRef()
              rsProps.removeRightSectionHistory()
            }}
          >
            <LeftAngleSVG />
            <p className="m-0 text-little">Back</p>
          </div>
        ) : null}
        {rsProps.title ? (
          <div className="rs-body position-relative">
            {matchChild}
            <div
              className="position-fixed bg-white border-label-top shadow w-100 py-3 justify-content-between align-items-center px-4"
              style={{
                bottom: 0,
                left: 0,
                display: isCTASectIon ? 'flex' : 'none',
                zIndex: 50
              }}
            >
              <div className="mx-auto f-row-17" style={{ width: '94%' }}>
                {rsProps?.cta?.map((i, index) => (
                  <>
                    {i.actionType !== 'multiple' ? (
                      <TypeButton
                        title={i.title}
                        buttonType={ctaLoad.status ? 'disabled' : i.buttonType}
                        onClick={i.action}
                        key={index}
                        icon={i.icon}
                      />
                    ) : (
                      <ActionComponent
                        title={i.title}
                        actions={i.actionOptions}
                        buttonType={i.buttonType}
                        icon={i.icon}
                      />
                    )}
                  </>
                ))}
                {rsProps?.audioProps ? <AudioRecordController /> : null}
              </div>
              <div>
                <RefreshComponent load={ctaLoad.status} text={ctaLoad.text} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {rsProps.data !== null && !rsProps.data ? (
              <div className="pt-3">
                <TextPrompt prompt="Something went wrong" status={false} />
              </div>
            ) : (
              <Loader2 loader />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default RightSection

export const ChannelTitle = ({
  title,
  verified,
  channel,
  multiBetProps
}: {
  title: string
  verified: boolean
  channel: IBetChannelResponse
  multiBetProps: IUseBetMultiBetTicket
}) => {
  const query = `?status=Published`
  const channelSubscriptionProps = useChannelSubscriptions(() => {
    multiBetProps?.getMultiBets(query)
  })

  return (
    <div
      className="f-row-7 aic cursor-pointer"
      onClick={() =>
        channelSubscriptionProps.handleChannelSubscription(channel)
      }
    >
      <h3 className="m-0">{title}</h3>
      {verified ? <VerifiedSVG /> : null}
      <HVCLoad
        removeDOM
        load={channelSubscriptionProps.subChannelLoading}
        view={!!channelSubscriptionProps.isSubscribed(channel)}
      >
        <IconWrapper>
          <BellBoldSVG />
        </IconWrapper>
      </HVCLoad>
      <HVC removeDOM view={!channelSubscriptionProps.isSubscribed(channel)}>
        <IconWrapper>
          <BellOutlineSVG />
        </IconWrapper>
      </HVC>
    </div>
  )
}
