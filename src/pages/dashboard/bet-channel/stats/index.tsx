import { useEffect } from 'react'
import { defaultPATCHDataTemplate, useAPIGET } from '../../../../api'
import { IBetChannelInfo, IBetChannelStats } from '../../../../interface/IBet'
import { getMonthFull, monthsFull } from '../../../../components/utils/helper'
import {
  IBetPerformance,
  ICustomerRating
} from '../../../public/analytics/visual-data'
import TabToggler, {
  useTabToggler
} from '../../../../components/utils/tab-toggler'
import {
  TabSection,
  useTabSection
} from '../../../../components/utils/reusable'
import Rating from '../../../public/analytics/visual-data/rating'
import Performance from '../../../public/analytics/visual-data/performance'
import { IGlobalRightSection } from '../../../../components/layout/right-section'

const BetStats = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps } = globalContext
  const channelInfo = rsProps?.data as unknown as IBetChannelInfo

  const { pageTitle, slug } = channelInfo

  const { mutate, data } = useAPIGET<IBetChannelStats>({
    route: 'channel/stats',
    defaultData: { ...defaultPATCHDataTemplate, data: { stats: [] } }
  })

  const stats = data.data.stats

  useEffect(() => {
    if (slug) mutate({ query: `?slug=${slug}` })
  }, [])

  enum categoryEnum {
    MULTIPLE = 'Multiple',
    SINGLE = 'Single'
  }

  enum statsEnum {
    OVERVIEW = 'Overview',
    PERFORMANCE = 'Performance',
    // ROI = 'ROI',
    RATING = 'Rating'
  }

  const mapBetPerformance = (i: string) => {
    const subValue = stats.find((stat) => getMonthFull(stat._id) === i)
    if (!subValue) return { win: 0, played: 0, month: i }
    return {
      month: i,
      win: subValue.wins,
      played: subValue.totalPredictions
    }
  }

  const betPerformance: IBetPerformance[] = monthsFull.map(mapBetPerformance)

  const mapRating = (i: string) => {
    const subValue = stats.find((stat) => getMonthFull(stat._id) === i)
    if (!subValue) return { rating: 0, month: i }
    return {
      month: i,
      rating: subValue.averageRating
    }
  }

  const customerRating: ICustomerRating[] = monthsFull.map(mapRating)

  const tabProps = useTabSection(statsEnum.OVERVIEW, statsEnum)

  const statsOverview = [
    {
      label: 'Total games predicted',
      value:
        betPerformance.reduce((t, i) => {
          t += i.played
          return t
        }, 0) + ''
    },
    {
      label: 'Total games won (as reported by customers)',
      value:
        betPerformance.reduce((t, i) => {
          t += i.win
          return t
        }, 0) + ''
    },
    {
      label: 'Customer Rating',
      value:
        customerRating.reduce((t, i) => {
          t += i.rating
          return t
        }, 0) + ''
    }
  ]

  const tabOptions = [
    {
      id: '1',
      name: categoryEnum.MULTIPLE,
      icon: ''
    },
    {
      id: '2',
      name: categoryEnum.SINGLE,
      icon: ''
    }
  ]

  const tabTogglerProps = useTabToggler(tabOptions, tabOptions[0], 'right')

  return (
    <div className="w-100 bg-white rounded f-column-15">
      <div className="pt-4">
        <div className="grid-wrapper-45 gap-20">
          <div className="w-100 f-row aic">
            <h2 className="text-medium m-0">
              Stats for <b>{pageTitle}</b>
            </h2>
          </div>
          <div className="w-100 f-row jcs justify-content-lg-end">
            <TabToggler tabTogglerProps={tabTogglerProps} />
          </div>
        </div>
      </div>
      <div className="py-3">
        <TabSection tabProps={tabProps.tabProps} position="start" />
      </div>
      <div>
        {tabProps.tab === statsEnum.OVERVIEW && (
          <BetStatsOverview statsOverview={statsOverview} />
        )}
        {tabProps.tab === statsEnum.PERFORMANCE && (
          <Performance betPerformance={betPerformance} />
        )}
        {/* {tabProps.tab === statsEnum.ROI && (
          <ROI betPerformance={betPerformance} isCalculator />
        )} */}
        {tabProps.tab === statsEnum.RATING && (
          <Rating customerRating={customerRating} />
        )}
      </div>
    </div>
  )
}

const BetStatsOverview = ({
  statsOverview
}: {
  statsOverview: Array<{ label: string; value: string; classN?: string }>
}) => {
  return (
    <div className="w-100 py-3 rounded bs">
      {statsOverview.map((i, index) => (
        <BSOItem
          key={index}
          classN={i.classN || ''}
          label={i.label}
          value={i.value}
          isLast={index + 1 === statsOverview.length}
        />
      ))}
    </div>
  )
}

const BSOItem = ({
  label,
  value,
  isLast,
  classN
}: {
  label: string
  value: string
  isLast: boolean
  classN: string
}) => {
  return (
    <div
      className={`w-100 f-row aic jcsb pt-4 px-3 ${
        isLast ? '' : 'border-bottom'
      }`}
    >
      <p className="text-small">{label}</p>
      <p className={`medium text-small ${classN}`}>{value}</p>
    </div>
  )
}

export default BetStats
