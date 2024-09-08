import * as yup from 'yup'
import {
  IBetChannelResponses,
  IMultiBetTicketResponse
} from '../../../interface/IBet'
import { multiTipCategoryEnum } from '../../../constants/global'
import PaginationComponent from '../../../components/utils/pagination'
import PublicBetChannelTable from '../../../components/tables/public-bet-channel'
import { UnderConstruction } from '../../../components/utils/reusable'
import { TypeButton } from '../../../components/utils/button'
import { useToggler } from '../../../components/utils/hooks'
import {
  LeftAngleSVG,
  RightAngleSVG
} from '../../../components/utils/svgs/f-awesome'
import { cloneElement } from 'react'

export interface IBetTicketSchedule {
  betTicket: number
}

export const betTicketScheduleSchema = {
  betTicket: yup.number()
}

export const MultiTipInstruction = [
  'Copy a Bet Code from the table below.',
  'Click the Bookie on the same row as the Bet Code, you will be redirected to the Bookie platform where you can place your wager.'
]

export const betChannelIstruction = [
  'Go to the Channel table below.',
  'Click the Subscribe Button on the same row as the Channel you prefer.'
]

export type IFilterStateKey =
  | 'odds'
  | 'subscribers'
  | 'rating'
  | 'roi'
  | 'startDdate'
  | 'endDate'
  | 'betTipChannel'
  | 'subscriptionType'
  | 'title'
  | 'tags'
  | 'sports'
  | 'bookies'

export interface IFilterState {
  odds: string
  subscribers: string
  rating: string
  roi: string
  endDate: string
  startDate: string
  betTipChannel: string
  subscriptionType: string
  title: string
  tags: string[]
}

export const initFilterState = {
  odds: '0',
  subscribers: '0',
  rating: '1',
  roi: '1',
  endDate: '',
  startDate: '',
  betTipChannel: '',
  subscriptionType: '',
  title: '',
  tags: []
} as IFilterState

export const TabFilterWrapper = ({
  children,
  isFilter,
  showAllPublished,
  tag,
  hideTab,
  cta,
  noPagination
}: {
  isFilter?: boolean
  children?: any
  showAllPublished?: boolean
  tag?: string
  hideTab?: boolean
  cta?: { title: string; icon?: string; action?: () => void }
  noPagination?: boolean
}) => {
  const { category } = useToggler(categoryEnum.TABLE)

  return (
    <div className="w-100 rounded bg-white">
      <div className={!hideTab ? 'pb-3' : ''}>
        <div className="f-row mb-1 aic">
          {cta?.title && (
            <div className="ml-5">
              <TypeButton
                title={cta?.title}
                buttonSize="small"
                buttonType="outlined"
                buttonShape="curve"
                onClick={cta?.action}
              />
            </div>
          )}
        </div>
        {tag && <p className="text-little m-0 color-label">{tag}</p>}
      </div>
      <div
        className="jcsb w-100"
        style={{
          display: 'flex',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            maxWidth: isFilter ? '805.6px' : '100%',
            flexBasis: isFilter ? '80%' : '100%',
            width: isFilter ? '0' : '100%'
          }}
        >
          {children !== undefined
            ? cloneElement(children, {
                category,
                isFilter,
                showAllPublished,
                noPagination
              })
            : null}
        </div>
      </div>
    </div>
  )
}

export const AllSingleTips = ({ category }: { category?: string }) => {
  return (
    <div className="pt-3">
      <UnderConstruction />
      {/* {category === categoryEnum.CARD ? (
        <div className="text-center">
          <UnderConstruction />
        </div>
      ) : null}
      {category === categoryEnum.TABLE ? (
        <div className="text-center">
          <UnderConstruction />
        </div>
      ) : null} */}
    </div>
  )
}

export const PublicBetChannels = ({
  channelsProps,
  loading,
  handleChannels
}: {
  channelsProps: IBetChannelResponses
  loading: boolean
  handleChannels: (page?: number) => void
}) => {
  const betChannels = channelsProps.data.channels
  const pages = channelsProps.pages
  const currentPage = channelsProps.currentPage

  const handlePagination = (selectedItem: { selected: number }) => {
    handleChannels(selectedItem.selected + 1)
  }

  return (
    <div className="">
      <PublicBetChannelTable
        betChannels={betChannels}
        callChannel={() => {
          handleChannels(currentPage)
        }}
      />
      <PaginationComponent
        currentPage={currentPage}
        pages={pages}
        handlePagination={handlePagination}
      />
    </div>
  )
}

export enum statusCategoryEnum {
  ALL = 'All',
  FOLLOWING = 'Following',
  MINE = 'My Channel',
  LEADERSHIPBOARD = 'Leadership Board'
}

export const filterMultiBetCategory = (
  i: IMultiBetTicketResponse,
  multiTipCategory: string
) => {
  const getCategoryOdds = (odds: number) => {
    const handleRange = (num: number, gNum?: number) =>
      odds >= num && odds < (gNum || num + 1)
    switch (multiTipCategory) {
      case multiTipCategoryEnum.FIVEBIGODDS:
        return handleRange(5, 9)
      case multiTipCategoryEnum.TENBIGODDS:
        return handleRange(10, 19)
      case multiTipCategoryEnum.TWENTYSUREODDS:
        return handleRange(20, 29)
      case multiTipCategoryEnum.MEGAODDS:
        return odds >= 30
      default:
        return true
    }
  }
  return getCategoryOdds(parseFloat(i.odds))
}

export const CardNavComponent = () => {
  return (
    <div className="GridCardNavContainer w-100 px-2 gap-15">
      <div className="GridCardNav shadow">
        <LeftAngleSVG />
      </div>
      <div className="GridCardNav shadow">
        <RightAngleSVG />
      </div>
    </div>
  )
}

export enum categoryEnum {
  TABLE = 'Table',
  CARD = 'Card'
}

export const overviewPageSectionEnums = {
  BETTIPS: 'bet-tips',
  CHANNELS: 'channels',
  AR: 'achievements-and-rewards',
  COMMUNITYFORUM: 'community-forum',
  FUNNGAMES: 'fun-&-games'
} as const

export type overviewPageSectionType =
  (typeof overviewPageSectionEnums)[keyof typeof overviewPageSectionEnums]

export enum overviewTabEnum {
  BETTIPS = 'Bet Tips',
  CHANNELS = 'Channels',
  ACHIEVEMENTS = 'Achievements & Rewards',
  COMMUNITYFORUM = 'Community Forum',
  FUNNGAMES = 'Fun & Games'
}

export enum mobileOverviewTabEnum {
  BETTIPS = 'Bet Tips',
  CHANNELS = 'Channels'
}
