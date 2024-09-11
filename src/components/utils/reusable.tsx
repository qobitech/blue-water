import { FC, useState } from 'react'
import { TypeButton } from './button'
import TextPrompt from './text-prompt'
import { BG, BUTTON_PRIMARY, DISABLED_COLOR } from '../../constants/global'
import { useNavigate } from 'react-router-dom'
import {
  AmericanFootballSVG,
  BaseBallSVG,
  BasketBallSVG,
  BoxingSVG,
  IceHockeySVG,
  NoticeSVG,
  PingPongSVG,
  PreviewSVG,
  PulseSVG,
  RefreshSVG,
  RugbySVG,
  SoccerSVG,
  TennisSVG,
  TrashSVG,
  VolleyBallSVG
} from './svgs'
import { btnType } from '../tables/public-bet-channel'
import './index.scss'
import ButtonLoader from './button/button-loader'
import { HVC, HVCLoad } from './hvc'
import {
  ArrowUpSVG,
  BottomAngleSVG,
  EllipsisSVG,
  TimesSVG
} from './svgs/f-awesome'
import { IconWrapper } from './info-txt'

export interface ICTA {
  cta?: string
  ctaAction?: () => void
  ctaTxt?: string
  ctaType?: 'bold' | 'outlined' | 'disabled'
  ctaIcon?: string
  ctaLoad?: boolean
  ctaHide?: boolean
}

interface IHC {
  icon?: string
  iconText?: string
  title: string
  ctas?: ICTA[]
  children?: any
  load?: boolean
  refreshAction?: () => void
}

export const HeaderComponent: React.FC<IHC> = ({
  title,
  ctas,
  icon,
  iconText,
  children,
  load,
  refreshAction
}) => {
  const navigate = useNavigate()
  const isRefresh = typeof refreshAction === 'function'
  return (
    <div className="mb-20">
      <div className="grid-wrapper-47 gap-20">
        <div className="f-column jcc">
          <div className="ResponsiveDivLeft">
            <div className="f-row-20 aic">
              <h1
                className={`${iconText ? 'mr-3' : ''} header-body-text`}
                style={{ whiteSpace: 'nowrap' }}
              >
                {title}
              </h1>
              {isRefresh ? (
                <RefreshComponent load={load} onRefresh={refreshAction} />
              ) : null}
            </div>
            {iconText && (
              <p className="m-0 text-little px-2 py-1 border">
                {iconText}&nbsp;
                {iconText === '1' ? ' subscriber' : ' subscribers'}
                <span>
                  <i className={`${icon} ml-2 text-little color-light`} />
                </span>
              </p>
            )}
            <HVCLoad removeDOM load={load && !isRefresh} />
          </div>
          {children}
        </div>
        {ctas?.[0] && (
          <div className="ResponsiveDivRight flex-wrap gap-20">
            {ctas
              .filter((i) => !i.ctaHide)
              .map((i, index) => (
                <TypeButton
                  key={index}
                  title={i.ctaTxt || ''}
                  buttonType={i.ctaType}
                  load={i.ctaLoad}
                  style={{ width: '160px' }}
                  onClick={() => (i.cta ? navigate(i.cta) : i.ctaAction?.())}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export interface ITabheaderObject<T extends string> {
  id: number
  title: T
  description: string
  isCompleted: boolean
}

export interface ITabHeader<T extends string> {
  tab: Array<ITabheaderObject<T>>
  selectedTab: string
}

export const TabHeader: React.FC<ITabHeader<string>> = ({
  tab,
  selectedTab
}) => {
  const selectedProp = tab.filter((i) => i.title === selectedTab)[0]
  return (
    <div>
      <div className="separator-h-10 separator-w-100" />
      <ul className="f-row mx-0 px-0 jcc">
        {tab.map((i, index) => (
          <div key={i.id} className="f-row aic">
            <li
              className={`font-small ${
                i.title === selectedTab ? 'text-success' : ''
              }`}
            >
              {i.title}
            </li>
            {index + 1 !== tab.length && <div className="separator-w-40" />}
          </div>
        ))}
      </ul>
      <div className="separator-h-10" />
      <div className="text-center">
        <p className="m-0 p-0 font-large">
          <b>{selectedProp.title}</b>
        </p>
        <div className="separator-h-0" />
        <TextPrompt
          prompt={selectedProp.description}
          status={selectedProp.isCompleted}
        />
      </div>
    </div>
  )
}

export const DisableForEditComponent = ({
  value,
  label,
  children
}: {
  value: string
  children?: any
  label: string
}) => {
  const [isChange, setIsChange] = useState(false)
  return (
    <div className="w-100">
      {!isChange && (
        <div className="text-right f-row jcsb ais" style={{ height: '28px' }}>
          <p className="text-little m-0">{label}</p>

          <p
            className="text-little m-0"
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => setIsChange(!isChange)}
          >
            Change
          </p>
        </div>
      )}
      {!isChange && (
        <div
          className="border-line py-1 px-2 bg-white f-row aic"
          style={{ height: '40px' }}
        >
          <p className="m-0">{value}</p>
        </div>
      )}
      {isChange && children}
    </div>
  )
}

export const TabComponent = ({
  isSelected,
  title,
  setTab,
  number,
  onSetTab
}: {
  isSelected: boolean
  title: string
  setTab: React.Dispatch<React.SetStateAction<string>>
  number?: string
  onSetTab?: (tab?: string) => void
}) => {
  return (
    <div
      style={{
        width: 'max-content',
        height: 'max-content',
        cursor: 'pointer',
        flexShrink: 0
      }}
      onClick={() => {
        setTab(title)
        onSetTab?.(title)
      }}
    >
      <p
        className={`TabTitle mb-2 ${isSelected ? '' : 'color-light'}`}
        style={{
          whiteSpace: 'nowrap',
          fontFamily: 'Outfit_Regular'
        }}
      >
        {title}
        {number || ''}
      </p>
      <div
        style={{
          background: isSelected ? BUTTON_PRIMARY : 'none',
          height: '3px'
        }}
        className="w-100 rounded"
      />
    </div>
  )
}

export type statusType = 'Pending' | 'Published' | 'Archived'

export const StatusText = ({
  status,
  pendingTxt,
  successTxt,
  rejectedTxt
}: {
  status?: statusType
  pendingTxt?: string
  rejectedTxt?: string
  successTxt?: string
}) => {
  const txt =
    status === 'Pending'
      ? pendingTxt || 'Pending'
      : status === 'Archived'
      ? successTxt || 'Approved'
      : status === 'Published'
      ? rejectedTxt || 'Rejected'
      : ''
  const background =
    status === 'Pending'
      ? '#F0DEDE'
      : status === 'Archived'
      ? '#EBFAF2'
      : status === 'Published'
      ? '#F0DEDE'
      : ''
  const color =
    status === 'Pending'
      ? '#BF4C4C'
      : status === 'Archived'
      ? '#2DCA73'
      : status === 'Published'
      ? '#DC2B2B'
      : ''
  return (
    <p className="text-little m-0">
      <span
        style={{
          color,
          background
        }}
        className="py-2 px-3 rounded"
      >
        {txt}
      </span>
    </p>
  )
}

export interface IDropDownItem {
  title: string
  action: () => void
  icon?: JSX.Element
  disabled?: boolean
  hidden?: boolean
}

export const DropDownMenu = ({
  id,
  items,
  children
}: {
  id: string
  items: IDropDownItem[]
  children?: any
}) => {
  return (
    <div className="dropdown">
      <div
        className="dropdown-toggle cursor-pointer pr-4 ellipsis"
        id={id}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <EllipsisSVG />
        {children}
      </div>
      <ul className="dropdown-menu dm-menu" aria-labelledby={id}>
        {items.map((i, index) => (
          <li
            className="DropdownItem dropdown-item f-row py-2"
            onClick={i.disabled ? undefined : i.action}
            key={index}
            style={{
              color: i.disabled ? DISABLED_COLOR : '',
              cursor: i.disabled ? 'not-allowed' : 'pointer'
            }}
          >
            {i?.icon && (
              <span style={{ width: '25px' }} className="d-block">
                {i.icon}
              </span>
            )}
            {i.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ButtonDropDownMenu = ({
  id,
  items,
  dropDownIcon,
  children
}: {
  id: string
  items: IDropDownItem[]
  dropDownIcon?: string
  children?: any
}) => {
  return (
    <div className="dropdown">
      <div
        className="dropdown-toggle cursor-pointer"
        id={id}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {children}
      </div>
      <ul className="dropdown-menu dm-button" aria-labelledby={id}>
        {items
          .filter((i) => !i.hidden)
          .map((i, index) => (
            <li
              className="DropdownItem dropdown-item f-row py-2"
              onClick={i.disabled ? undefined : i.action}
              key={index}
              style={{
                color: i.disabled ? DISABLED_COLOR : '',
                cursor: i.disabled ? 'not-allowed' : 'pointer'
              }}
            >
              {i?.icon && (
                <span style={{ width: '25px' }} className="d-block">
                  {i.icon}
                </span>
              )}
              {i.title}
            </li>
          ))}
      </ul>
    </div>
  )
}

export const DropDown = ({
  id,
  items,
  dropDownIcon,
  betTicket
}: {
  id: string
  items: IDropDownItem[]
  dropDownIcon: string
  betTicket?: boolean
}) => {
  return (
    <div className="dropdown bg-white">
      <div
        className="dropdown-toggle cursor-pointer"
        id={id}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <BottomAngleSVG />
      </div>
      <ul
        className={`dropdown-menu ${betTicket ? 'dm-bet-ticket' : 'dm'}`}
        aria-labelledby={id}
      >
        {items
          .filter((i) => !i.hidden)
          .map((i, index) => (
            <li
              className="DropdownItem dropdown-item f-row"
              onClick={i.disabled ? undefined : i.action}
              key={index}
              style={{
                color: i.disabled ? DISABLED_COLOR : '',
                cursor: i.disabled ? 'not-allowed' : 'pointer'
              }}
            >
              <span style={{ width: '25px' }} className="d-block">
                {i.icon}
              </span>
              {i.title}
            </li>
          ))}
      </ul>
    </div>
  )
}

export const Pills = <T extends { title: string; id: string }>({
  pills,
  handleOnClick,
  handleClear,
  noAction,
  section
}: {
  pills: T[]
  handleOnClick?: (id: string) => void
  handleClear?: () => void
  noAction?: boolean
  section?: {
    title: string
    loading?: boolean
  }
}) => {
  const [closeBtn, setCloseButton] = useState<string>('')

  const handleCloseBtn = (id: string) => {
    if (noAction) return
    setCloseButton(id)
  }
  return (
    <div className="w-100">
      <div
        className={`f-row-7 flex-wrap aic w-100 ${
          pills?.[0] && !noAction ? 'py-2 border-bottom' : ''
        } `}
      >
        {pills.map((i, index) => (
          <div
            key={index}
            className={`border ${BG} ${noAction ? '' : 'cursor-pointer'}`}
            style={{
              borderRadius: '25px',
              width: 'max-content',
              transition: '.4s ease'
            }}
            onClick={() => (noAction ? undefined : handleOnClick?.(i.id))}
            onMouseEnter={() => handleCloseBtn(i.id)}
            onMouseDown={() => handleCloseBtn(i.id)}
            onMouseMove={() => handleCloseBtn(i.id)}
            onMouseOver={() => handleCloseBtn(i.id)}
            onMouseUp={() => handleCloseBtn(i.id)}
            onMouseLeave={() => handleCloseBtn('')}
          >
            <p style={{ fontSize: '10px' }} className="m-0 px-2 py-1">
              {i.title}
              {closeBtn === i.id && (
                <span>
                  &nbsp;&nbsp;&nbsp;
                  <TimesSVG />
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
      {!noAction && pills?.[0] && (
        <div className="w-100 f-row jcsb aic py-2">
          <div className="f-row aic">
            <p className="m-0 text-little color-light">
              {section?.title}{' '}
              <span className="color-brand">
                &nbsp;
                <ArrowUpSVG />
              </span>
              {section?.loading && (
                <span>
                  &nbsp;&nbsp;
                  <PulseSVG />
                </span>
              )}
            </p>
          </div>
          <div className="f-row aic">
            <p className="text-little m-0 color-light">
              {pills.length} selected
            </p>
            <div
              style={{ height: '15px', width: '1px', background: '#a1a1a1' }}
              className="mx-3"
            />
            <p
              className="text-little m-0 cursor-pointer"
              style={{ color: '#f16c79' }}
              onClick={() => handleClear?.()}
            >
              <span>
                <TrashSVG />
                &nbsp;
              </span>
              Clear all
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

interface IPageComponent
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: any
}

export const PageContainer = ({ children }: IPageComponent) => {
  return (
    <div className="w-100">
      <div className={`tipster-container`}>{children}</div>
    </div>
  )
}

export const UnderConstruction = () => {
  return <p className="color-light m-0 text-small">Under construction</p>
}

export interface ITabComponentProp {
  isSelected: boolean
  setTab: React.Dispatch<React.SetStateAction<string>>
  title: string
  onSetTab?: (tab?: string) => void
}

export interface IUseTab {
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
  isTab: (value: string) => boolean
  tabProps: ITabComponentProp[]
  getDataType: (typeQuery: string | undefined) => string
}

export const useTabSection = (
  defaultTab: string,
  tabs: { [key: string]: string } | undefined | null,
  typeQuery?: string | undefined,
  onSetTab?: (tab?: string) => void
): IUseTab => {
  const tabsArray = !tabs ? [] : Object.values(tabs)

  const filterDataType = (tabQuery: string | undefined) => {
    return (i: string) => i.toLowerCase() === tabQuery?.toLowerCase()
  }

  const getDataType = (typeQuery: string | undefined) => {
    if (!typeQuery) return defaultTab
    return tabsArray.filter(filterDataType(typeQuery))?.[0] || defaultTab
  }

  const [tab, setTab] = useState<string>(getDataType(typeQuery))

  const isTab = (value: string) => tab?.toLowerCase() === value?.toLowerCase()

  const tabProps: ITabComponentProp[] = tabsArray.map((i) => ({
    isSelected: isTab(i),
    title: i,
    setTab,
    onSetTab
  })) as ITabComponentProp[]

  return {
    tab,
    setTab,
    isTab,
    tabProps,
    getDataType
  }
}

export interface ITabSection {
  tabProps: ITabComponentProp[]
  position: 'start' | 'end' | 'center'
  positionMobile?: 'start' | 'end' | 'center'
  tabGap?: string
  type?: 'default' | 'block'
}

export const TabSection: FC<ITabSection> = ({
  tabProps,
  position,
  positionMobile,
  tabGap,
  type
}) => {
  return (
    <div
      className={`f-row pt-3 mb-3 ${
        type === 'block' ? 'flex-wrap' : 'border-bottom'
      } justify-content-${position}`}
      style={{ gap: `${tabGap || 50}px`, overflow: 'auto' }}
    >
      {type !== 'block'
        ? tabProps.map((i, index) => (
            <TabComponent
              key={index}
              isSelected={i.isSelected}
              setTab={i.setTab}
              title={i.title}
              onSetTab={i.onSetTab}
            />
          ))
        : null}
      {type === 'block'
        ? tabProps.map((i, index) => (
            <TabBlockComponent
              key={index}
              isSelected={i.isSelected}
              setTab={i.setTab}
              title={i.title}
              onSetTab={i.onSetTab}
            />
          ))
        : null}
    </div>
  )
}

export const TabBlockComponent = ({
  isSelected,
  title,
  setTab,
  number,
  onSetTab
}: {
  isSelected: boolean
  title: string
  setTab: React.Dispatch<React.SetStateAction<string>>
  number?: string
  onSetTab?: (tab?: string) => void
}) => {
  return (
    <div
      style={{
        width: 'max-content',
        height: 'max-content',
        cursor: 'pointer',
        flexShrink: 0,
        // border: `1px solid ${PRIMARY_COLOR_LIGHT}`,
        padding: '0.4725rem 0.8725rem',
        background: isSelected ? `rgb(220 242 232)` : 'none',
        transition: '.2s ease all'
      }}
      onClick={() => {
        setTab(title)
        onSetTab?.(title)
      }}
      className="rounded"
    >
      <p
        className={`TabTitle m-0 ${isSelected ? '' : ''}`}
        style={{
          whiteSpace: 'nowrap',
          fontFamily: isSelected ? 'Outfit_Regular' : 'Outfit_Light',
          fontSize: '0.79625rem'
        }}
      >
        {title}
        {number || ''}
      </p>
    </div>
  )
}

export function startSubscription(quantity: number) {
  // Calculate the start date for the new subscription period
  const newStartDate = new Date()

  // Add the remaining days to the current date to get the start date for the new subscription period
  newStartDate.setDate(newStartDate.getDate())

  // Calculate the end date for the new subscription period based on the start date and quantity of months
  const newEndDate = new Date(newStartDate)
  newEndDate.setMonth(newEndDate.getMonth() + quantity)

  return { startDate: newStartDate, endDate: newEndDate }
}

export function renewSubscription(endDate: Date, quantity: number) {
  // Calculate the remaining days from the current date to the end date of the current subscription period
  const currentDate: Date = new Date()
  const remainingDays: number = Math.ceil(
    (endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Calculate the start date for the new subscription period
  const newStartDate: Date = new Date()

  // Add the remaining days to the current date to get the start date for the new subscription period
  newStartDate.setDate(newStartDate.getDate() + remainingDays)

  // Calculate the end date for the new subscription period based on the start date and quantity of months
  const newEndDate: Date = new Date(newStartDate)
  newEndDate.setMonth(newEndDate.getMonth() + quantity)
  return { startDate: newStartDate, endDate: newEndDate }
}

export interface IOptionAction {
  label: string
  action?: () => void
  disabled?: boolean
  hide?: boolean
}

interface IActionComponent extends React.ComponentPropsWithoutRef<'button'> {
  title?: string
  actions?: IOptionAction[]
  load?: boolean
  buttonType?: btnType
  icon?: JSX.Element
}

export const ActionComponent = ({
  actions,
  title,
  load,
  buttonType,
  className,
  icon,
  ...props
}: IActionComponent) => {
  return (
    <div className="dropdown cta-section">
      <button
        title="Action"
        className={`dropdown-toggle f-row-10 aic jcc action-type-button ${
          buttonType || ''
        } ${className}`}
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        {...props}
      >
        {icon}
        {title || 'Action'}
        {load ? (
          <>
            &nbsp;&nbsp;
            <ButtonLoader
              className={buttonType === 'outlined' ? 'bg-dark' : ''}
            />
          </>
        ) : null}
      </button>

      <div
        className="dropdown-menu mr-4 mt-2 px-2"
        aria-labelledby="dropdownMenuButton"
      >
        {actions
          ?.filter((i) => !i.hide)
          .map((i, index) => (
            <p
              className={`dropdown-item m-0 py-2 text-little ${
                i.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={i.disabled ? undefined : i.action}
              key={index}
              style={{ color: i.disabled ? '#898989' : '' }}
            >
              {i.label}
            </p>
          ))}
      </div>
    </div>
  )
}

export const RefreshComponent = ({
  load,
  onRefresh
}: {
  load?: boolean
  onRefresh?: () => void
}) => {
  return (
    <HVCLoad
      removeDOM
      load={load}
      view
      className="text-center f-row aic jcc"
      onClick={onRefresh}
      style={{ width: '25px' }}
    >
      <RefreshSVG />
    </HVCLoad>
  )
}

export const SeparatorComponent = () => (
  <div style={{ width: '1px', height: '10px', background: '#cacaca' }} />
)

export const SeparatorHComponent = () => (
  <div style={{ width: '10px', height: '1px', background: '#cacaca' }} />
)

export const getSportIcon = (sport: string) => {
  const sportsIcon = () => {
    switch (sport.toLowerCase()) {
      case 'american football':
        return <AmericanFootballSVG />
      case 'base ball':
        return <BaseBallSVG />
      case 'basket ball':
        return <BasketBallSVG />
      case 'boxing':
        return <BoxingSVG />
      case 'ice hockey':
        return <IceHockeySVG />
      case 'rugby':
        return <RugbySVG />
      case 'soccer':
        return <SoccerSVG />
      case 'table tennis':
        return <PingPongSVG />
      case 'tennis':
        return <TennisSVG />
      case 'volley ball':
        return <VolleyBallSVG />
      default:
        return <></>
    }
  }
  return <IconWrapper title={sport}>{sportsIcon()}</IconWrapper>
}

export interface INoticeActionProps {
  action: () => void
  text: string
}

export const NoticeComponent = ({
  notice,
  icon,
  actionProps
}: {
  notice: string
  icon?: JSX.Element
  actionProps?: INoticeActionProps
}) => {
  return (
    <div
      className="f-row-20 ais rounded p-2 notice-component"
      style={{ border: '1px solid #ffabab' }}
    >
      <div className="f-row-10 main-notice">
        <HVC
          removeDOM
          view={!icon}
          className="hw-mx f-row align-items-center"
          style={{ height: '19px' }}
        >
          <NoticeSVG />
        </HVC>
        <HVC removeDOM view={!!icon} className="hw-mx">
          {icon}
        </HVC>
        <p className="m-0 text-little">{notice}</p>
      </div>
      {actionProps?.text ? (
        <p
          className="color-brand text-little cursor-pointer learn-more"
          onClick={actionProps?.action}
        >
          {actionProps?.text}&nbsp;&nbsp;
          <PreviewSVG />
        </p>
      ) : null}
    </div>
  )
}
