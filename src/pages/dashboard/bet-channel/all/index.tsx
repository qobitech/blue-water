import { useEffect } from 'react'
import { RefreshComponent } from '../../../../components/utils/reusable'
import {
  GETISBUYER,
  GETISSELLER,
  getUserData
} from '../../../../constants/global'
import {
  useGetAllChannels,
  useGetChannelsSubscribed,
  useGetMyChannels,
  useLeadershipBoard
} from '../../../../api/channels'
import TabToggler, {
  ITabToggesOption,
  useTabToggler
} from '../../../../components/utils/tab-toggler'
import BetChannelTable from '../../../../components/tables/bet-channel'
import PaginationComponent from '../../../../components/utils/pagination'
import LeadershipTable from '../../../../components/tables/leadership-board'
import { statusCategoryEnum } from '../../overview/data'
import Template from '../../template'
import { useNavigate, useParams } from 'react-router-dom'
import { pageurl } from '../../../../constants/pageurl'
import { HVC } from '../../../../components/utils/hvc'
import Skeleton from '../../../../components/utils/skeleton'
import { useQueryValuesHook } from '../../../../components/utils/hooks'
import { useGlobalContext } from '../../../../components/layout/context'
import { ChannelMenuSVG } from '../../../../components/utils/svgs'

export type channelPageTab =
  | 'all'
  | 'my-channel'
  | 'leadership-board'
  | 'following'

const AllBetChannels = () => {
  return (
    <Template
      title="Channel"
      icon={<ChannelMenuSVG />}
      crumbs={[{ title: 'Channel', url: '' }]}
    >
      <AllBetChannelsBody />
    </Template>
  )
}

const AllBetChannelsBody = () => {
  const {
    rsProps,
    global: { state }
  } = useGlobalContext()
  const navigate = useNavigate()
  const params = useParams() as { tab?: channelPageTab }
  const getMyChannelProps = useGetMyChannels()
  const getAllChannelProps = useGetAllChannels()
  const getSubscribedChannelProps = useGetChannelsSubscribed()
  const leadershipBoardProps = useLeadershipBoard()

  const queries = useQueryValuesHook()

  const getChannelByID = () => {
    rsProps?.callSection({
      action: 'view',
      component: 'bet-channel-item',
      title: 'Channel',
      data: {
        pageTitle: queries.slug,
        slug: queries.slug
      }
    })
  }

  const getChannelPrediction = () => {
    rsProps?.callSection({
      action: 'view',
      component: 'predictions',
      title: queries.slug + ' - Predictions',
      data: {
        pageTitle: queries.slug,
        slug: queries.slug
      }
    })
  }

  useEffect(() => {
    onRefresh()
    if (queries.slug) {
      if (queries.prediction) {
        getChannelPrediction()
      } else {
        getChannelByID()
      }
    }
  }, [])

  const handleChannels = (category: string, page?: number) => {
    if (
      category === statusCategoryEnum.FOLLOWING ||
      params.tab === 'following'
    ) {
      getSubscribedChannelProps.mutate({
        query: `?userId=${getUserData().user._id}&limit=10&page=${page || 1}`
      })
    }
    if (
      category === statusCategoryEnum.ALL ||
      params.tab === 'all' ||
      !params.tab
    ) {
      getAllChannelProps.mutate({ query: `?page=${page || 1}` })
    }
    if (category === statusCategoryEnum.MINE || params.tab === 'my-channel') {
      getMyChannelProps.mutate({
        query: `?userId=${getUserData().user._id}&limit=10&page=${page || 1}`
      })
    }
    if (
      category === statusCategoryEnum.LEADERSHIPBOARD ||
      params.tab === 'leadership-board'
    ) {
      leadershipBoardProps.mutate({})
    }
  }

  const tabOptions: ITabToggesOption[] = [
    {
      id: '1',
      name: statusCategoryEnum.ALL,
      onClick: () => {
        handleChannels(statusCategoryEnum.ALL)
        navigate(`${pageurl.BETCHANNEL}/all`)
      }
    },
    {
      id: '2',
      name: statusCategoryEnum.FOLLOWING,
      hidden: GETISSELLER(),
      onClick: () => {
        handleChannels(statusCategoryEnum.FOLLOWING)
        navigate(`${pageurl.BETCHANNEL}/following`)
      }
    },
    {
      id: '3',
      name: statusCategoryEnum.MINE,
      hidden: GETISBUYER(),
      onClick: () => {
        handleChannels(statusCategoryEnum.MINE)
        navigate(`${pageurl.BETCHANNEL}/my-channel`)
      }
    },
    {
      id: '4',
      name: statusCategoryEnum.LEADERSHIPBOARD,
      onClick: () => {
        handleChannels(statusCategoryEnum.LEADERSHIPBOARD)
        navigate(`${pageurl.BETCHANNEL}/leadership-board`)
      }
    }
  ]

  const tabTogglerProps = useTabToggler(tabOptions, tabOptions[0], 'right')

  useEffect(() => {
    if (params.tab) {
      const tabOptionsObj = {
        all: tabOptions[0],
        following: tabOptions[1],
        'my-channel': tabOptions[2],
        'leadership-board': tabOptions[3]
      }
      const category = tabOptionsObj[params.tab]
      tabTogglerProps.handleCategory(category)
    }
  }, [params.tab])

  const category = tabTogglerProps?.category?.name

  useEffect(() => {
    handleChannels(category)
  }, [])

  const handlePagination = (selectedItem: { selected: number }) => {
    handleChannels(category, selectedItem.selected + 1)
  }

  const getDataProps = () => {
    const subData = state?.getSubscribedChannels
    const allData = state?.getAllChannels
    const myData = state?.getMyChannels
    switch (category) {
      case statusCategoryEnum.FOLLOWING:
        return {
          channels: subData?.data?.channels || [],
          pages: subData?.pages || 1,
          currentPage: subData?.currentPage || 1,
          load: getSubscribedChannelProps.isLoading
        }
      case statusCategoryEnum.MINE:
        return {
          channels: myData?.data?.channels || [],
          pages: myData?.pages || 1,
          currentPage: myData?.currentPage || 1,
          load: getMyChannelProps.isLoading
        }
      default:
        return {
          channels: allData?.data?.channels || [],
          pages: allData?.pages || 1,
          currentPage: allData?.currentPage || 1,
          load: getAllChannelProps.isLoading
        }
    }
  }

  const dataProps = getDataProps()

  const onRefresh = () => {
    handleChannels(category)
  }

  const myChannel = category === statusCategoryEnum.MINE

  const isLeadership = category === statusCategoryEnum.LEADERSHIPBOARD

  const isData =
    leadershipBoardProps?.data?.data?.channels?.length +
      dataProps?.channels?.length >
    0

  const isLoad = leadershipBoardProps?.isLoading || dataProps.load

  if (!isData && isLoad) {
    return <Skeleton />
  }

  return (
    <div className="f-column gap-10">
      <div className="f-row-20 aic">
        <TabToggler tabTogglerProps={tabTogglerProps} />
        <RefreshComponent
          load={dataProps.load || leadershipBoardProps.isLoading}
          onRefresh={onRefresh}
        />
      </div>
      <HVC view={!isLeadership}>
        <BetChannelTable
          betChannels={dataProps.channels}
          myChannel={myChannel}
          onSubSuccess={onRefresh}
        />
        <PaginationComponent
          currentPage={dataProps.currentPage}
          pages={dataProps.pages}
          handlePagination={handlePagination}
        />
      </HVC>
      <HVC view={isLeadership}>
        <LeadershipTable leadershipBoardData={leadershipBoardProps} />
      </HVC>
    </div>
  )
}

export default AllBetChannels
