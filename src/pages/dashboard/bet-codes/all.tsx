import { useEffect, useState } from 'react'
import PublicBetTips from './public'
import PaidBetTips from './paid'
import TabToggler, {
  ITabToggesOption,
  useTabToggler
} from '../../../components/utils/tab-toggler'
import {
  useGetMultiPrediction,
  useGetMyMultiPrediction,
  useGetPublicMultiPrediction
} from '../../../api/multi-prediction'
import {
  GETISBUYER,
  GETISSELLER,
  betTipsTabEnum,
  getUserData
} from '../../../constants/global'
import {
  RefreshComponent,
  SeparatorComponent
} from '../../../components/utils/reusable'
import { tipsFilterValueType } from './data'
import { useNavigate, useParams } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'
import { HVC } from '../../../components/utils/hvc'
import { PillComponent } from '../../../components/utils/hooks'
import { PlusSVG } from '../../../components/utils/svgs/f-awesome'
import Skeleton from '../../../components/utils/skeleton'
import { useGlobalContext } from '../../../components/layout/context'
import { CloseSVG, FilterSVG } from '../../../components/utils/svgs'
import { TypeSmallButton } from '../../../components/utils/button'

export type betTipsPageTab = 'all' | 'my-tips' | 'paid'

const AllBetTips = () => {
  const navigate = useNavigate()
  const params = useParams() as { tab?: betTipsPageTab }
  const {
    rsProps,
    route,
    global: { state, updateState }
  } = useGlobalContext()
  const multiBetProps = useGetMultiPrediction()
  const multiBetPublicProps = useGetPublicMultiPrediction()
  const myMultiBetPublicProps = useGetMyMultiPrediction()

  // const [status, setStatus] = useState<multiplePredictionStatusType | null>(
  //   null
  // )

  const isDashboard = route !== 'public' && route !== 'auth'

  const handleMultiBetsQuery = (pageNum?: number, filterQuery?: string) => {
    const pg = pageNum || multiBetProps.data.currentPage || 1
    const fQuery = filterQuery ? `&${filterQuery}` : ''
    const queryStr = `?limit=10&page=${pg}${fQuery}`
    multiBetProps.mutate({ query: `/paid${queryStr}` })
  }

  const handleMultiBetsPublicQuery = (
    pageNum?: number,
    filterQuery?: string
  ) => {
    const pg = pageNum || multiBetPublicProps?.data?.currentPage || 1
    const shareQuery = isDashboard ? '' : '&shareOption=All'
    const fQuery = filterQuery ? `&${filterQuery}` : ''
    const queryStr = `?limit=10&status=Published&page=${pg}${shareQuery}${fQuery}`
    multiBetPublicProps.mutate({ query: `${queryStr}` })
  }

  const handleMyMultiBetsQuery = (pageNum?: number, filterQuery?: string) => {
    if (isDashboard) {
      const pg = pageNum || myMultiBetPublicProps?.data?.currentPage || 1
      // const statusType = status ? `&status=${status}` : ''
      const user = `&userId=${getUserData()?.user?._id}`
      // const queryStr = `?limit=10${statusType}${user}&page=${pg}`
      const fQuery = filterQuery ? `&${filterQuery}` : ''
      const queryStr = `?limit=10${user}&page=${pg}${fQuery}`
      myMultiBetPublicProps.mutate({ query: `${queryStr}` })
    }
  }

  const onHandleRequest = (
    category: string,
    refresh?: boolean,
    filterQuery?: string
  ) => {
    if (refresh) {
      if (category === betTipsTabEnum.MY || params.tab === 'my-tips') {
        handleMyMultiBetsQuery(undefined, filterQuery)
      }
      if (category === betTipsTabEnum.PAID || params.tab === 'paid') {
        handleMultiBetsQuery(undefined, filterQuery)
      }
      if (
        category === betTipsTabEnum.ALL ||
        params.tab === 'all' ||
        !params.tab
      ) {
        handleMultiBetsPublicQuery(undefined, filterQuery)
      }
    }
  }

  const switchRequest = (category: string) => {
    switch (category) {
      case betTipsTabEnum.ALL:
        onHandleRequest(
          betTipsTabEnum.ALL,
          !state.getPublicMultiPrediction?.data?.multiplePredictions?.length
        )
        break
      case betTipsTabEnum.PAID:
        onHandleRequest(
          betTipsTabEnum.PAID,
          !state.getMultiPrediction?.data?.multiplePredictions?.length
        )
        break
      default:
        onHandleRequest(
          betTipsTabEnum.MY,
          !state.getMyMultiPrediction?.data?.multiplePredictions?.length
        )
        break
    }
  }

  const tabOptions: ITabToggesOption[] = [
    {
      id: '1',
      name: betTipsTabEnum.ALL,
      onClick: () => {
        switchRequest(betTipsTabEnum.ALL)
        navigate(`${pageurl.BETTICKETS}/all`)
      }
    },
    {
      id: '2',
      name: betTipsTabEnum.PAID,
      hidden: GETISSELLER(),
      onClick: () => {
        switchRequest(betTipsTabEnum.PAID)
        navigate(`${pageurl.BETTICKETS}/paid`)
      }
    },
    {
      id: '3',
      name: betTipsTabEnum.MY,
      hidden: GETISBUYER(),
      onClick: () => {
        switchRequest(betTipsTabEnum.MY)
        navigate(`${pageurl.BETTICKETS}/my-tips`)
      }
    }
  ]

  const tabOptionsObj = {
    all: tabOptions[0],
    paid: tabOptions[1],
    'my-tips': tabOptions[2]
  }

  const tabTogglerProps = useTabToggler(
    tabOptions,
    tabOptions[0],
    'right',
    params.tab as string,
    tabOptionsObj
  )

  const category = tabTogglerProps.category.name

  const isAll = category === betTipsTabEnum.ALL
  const isPurchased = category === betTipsTabEnum.PAID
  const isMy = category === betTipsTabEnum.MY

  const onRefresh = () => {
    onHandleRequest(category, true)
  }

  useEffect(() => {
    onRefresh()
  }, [])

  const onAddBettip = () => {
    rsProps?.callSection({
      action: 'create',
      component: 'predictions',
      title: 'Add Bet Code',
      onRefresh,
      max: true
    })
  }

  const load =
    multiBetPublicProps.isLoading ||
    multiBetProps.isLoading ||
    myMultiBetPublicProps.isLoading

  // const optionData = Object.values(multiplePredictionStatusEnum).map(
  //   (i, index) => ({
  //     id: index,
  //     label: i,
  //     value: i
  //   })
  // )

  // useEffect(() => {
  //   if (status) handleMyMultiBetsQuery(1)
  // }, [status])

  const pillsData = [
    {
      label: 'All',
      filterValue: 'all'
    },
    {
      label: 'Active',
      filterValue: 'active'
    },
    {
      label: 'Ended',
      filterValue: 'ended'
    }
  ]

  const [filterValue, setFilterValue] = useState<tipsFilterValueType[]>(['all'])

  const onHandlePill = (category: string) => {
    setFilterValue((prev) => {
      if (prev.includes(category as tipsFilterValueType)) {
        return prev.filter((item) => item !== category)
      }
      return [category as tipsFilterValueType]
    })
  }

  const data = [
    ...(state?.getMultiPrediction?.data?.multiplePredictions || []),
    ...(state?.getMyMultiPrediction?.data?.multiplePredictions || []),
    ...(state?.getPublicMultiPrediction?.data?.multiplePredictions || [])
  ]

  const onOpenFilter = () => {
    rsProps?.callSection({
      action: 'update',
      component: 'bet-code-filter',
      title: 'Filter Bet Code'
    })
  }

  // filter section
  const getFilterQuery = (
    filterArray: Array<{
      param: string
      value: string
    }>
  ) => {
    return filterArray.reduce((t, i, index) => {
      const andSign = index === filterArray.length - 1 ? '' : '&'
      t += `${i.param}=${i.value}${andSign}`
      return t
    }, '')
  }

  const handleFilterReq = (
    filterArray: Array<{
      param: string
      value: string
    }>
  ) => {
    const filterQuery = getFilterQuery(filterArray)
    onHandleRequest(category, true, filterQuery)
  }

  useEffect(() => {
    if (state.isBetCodeFilter && state.betCodeFilter.length) {
      // send filter request
      handleFilterReq(state.betCodeFilter)
      updateState('isBetCodeFilter', false)
    }
  }, [state.isBetCodeFilter])

  const onClearFilter = () => {
    updateState('betCodeFilter', [])
    onHandleRequest(category, true)
  }

  const onRemoveFilter = (param: string) => () => {
    const newFilterArray = state.betCodeFilter.filter((i) => i.param !== param)
    updateState('betCodeFilter', newFilterArray)
    if (newFilterArray.length) {
      handleFilterReq(newFilterArray)
    } else {
      onClearFilter()
    }
  }
  // filter section

  if (load && !data?.length) return <Skeleton />

  return (
    <div className="f-column-10">
      <HVC view={isDashboard} className="f-column-23">
        <div className="f-column-30 flex-lg-row aic">
          <div className="f-row-40 aic flex-wrap w-100">
            <div className="f-row-20 flex-wrap aic">
              <TabToggler tabTogglerProps={tabTogglerProps} />
              <RefreshComponent load={load} onRefresh={onRefresh} />
              {isPurchased ? (
                <>
                  <SeparatorComponent />
                  <PillComponent
                    filterValues={filterValue}
                    pills={pillsData}
                    onClickPill={onHandlePill}
                  />
                </>
              ) : null}
            </div>
            {GETISSELLER() ? (
              <div
                className="mx-wh-fit cursor-pointer ml-5 f-row-10 aic ml-auto ml-lg-0"
                onClick={onAddBettip}
              >
                <p className="m-0 text-tiny color-brand">Add bet code</p>
                <div className="hw-mx p-1">
                  <PlusSVG />
                </div>
              </div>
            ) : null}
            <SeparatorComponent />
            <div className="hw-mx cursor-pointer" onClick={onOpenFilter}>
              <FilterSVG />
            </div>
          </div>
        </div>
        <HVC
          className="f-row-23 aic flex-wrap"
          removeDOM
          view={!!state.betCodeFilter?.length}
        >
          <p className="m-0 text-tiniest">Filtered by</p>
          {state?.betCodeFilter?.map((i, index) => (
            <div
              className="f-row-10 aic border-label rounded-50 px-3 py-2 hw-mx"
              key={index}
              onClick={onRemoveFilter(i.param)}
            >
              <p className="m-0 text-tiniest color-label">{i.param}</p>
              <p className="m-0 text-tiniest color-brand">
                {i.value.toLowerCase()}
              </p>
              <CloseSVG />
            </div>
          ))}
          <TypeSmallButton
            title="Remove all"
            buttonSize="small"
            buttonType="danger"
            onClick={onClearFilter}
          />
        </HVC>
      </HVC>
      <HVC view={isAll || isMy}>
        <PublicBetTips
          handleMultiBetsQuery={
            isAll ? handleMultiBetsPublicQuery : handleMyMultiBetsQuery
          }
          category={isAll ? 'all' : 'mine'}
          isOwner={isMy}
          status={null}
        />
      </HVC>
      <HVC view={isPurchased}>
        <PaidBetTips
          isFocus={isPurchased}
          handleMultiBetsQuery={handleMultiBetsQuery}
          filterValue={filterValue}
        />
      </HVC>
    </div>
  )
}

export default AllBetTips
