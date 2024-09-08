import { memo, useEffect, useMemo } from 'react'
import { GETISBUYER, GETISSELLER, getUserData } from '../../../constants/global'
import { useGetSellerMultiPredictionStats } from '../../../api/multi-prediction'
import { HVC } from '../../../components/utils/hvc'
import {
  ArrowDownDeg45,
  ArrowUpDeg45
} from '../../../components/utils/svgs/f-awesome'
import { useGlobalContext } from '../../../components/layout/context'

// Calculate percentage differences
const calculatePercentageDifference = (current: number, last: number) => {
  if (isNaN(current) && isNaN(last)) return 0
  if (last === 0) {
    return current === 0 ? 0 : 100 // If last month was 0, avoid division by zero
  }
  return ((current - last) / last) * 100
}

// memoized function that renders the user stats on bet code sold and number of channel followers
export const StatsSection = memo(() => {
  const { global } = useGlobalContext()
  // custom api hook to fetch seller stats
  const sellerMPSProps = useGetSellerMultiPredictionStats()

  // assign the stats data returned via the api call to the variable stats
  const stats = useMemo(
    () => global.state.getSellerMultiPredictionStats.data.stats,
    [global.state.getSellerMultiPredictionStats.data]
  )

  // get stats on first render
  useEffect(() => {
    // if (!stats)
    sellerMPSProps.mutate({
      query: `?receiverId=${getUserData()?.user?.wallet}`
    })
  }, [])

  // calculate the percentage difference between total bet codes for the current month and last month
  const betCodePercentageStats = useMemo(
    () =>
      calculatePercentageDifference(
        stats?.totalBetSoldCurrentMonth,
        stats?.totalBetSoldLastMonth
      ),
    [stats]
  )

  // calculate the percentage difference between total channel followers for the current month and last month
  const followersPercentageStats = useMemo(
    () =>
      calculatePercentageDifference(
        stats?.totalFollowingCurrentMonth,
        stats?.totalFollowingLastMonth
      ),
    [stats]
  )

  return (
    <>
      {/* sellers stats section */}
      <HVC view={GETISSELLER()} removeDOM>
        <div className="grid-wrapper-45 gap-20">
          <StatsCard
            subType={`Bet Code ( sold )`}
            statsData={[
              {
                title: 'This month',
                value: stats?.totalBetSoldCurrentMonth
              },
              {
                title: 'Last month',
                value: stats?.totalBetSoldLastMonth
              }
            ]}
            lastMonthStats={{
              value: `${betCodePercentageStats}%`,
              status: betCodePercentageStats > 0
            }}
          />
          <StatsCard
            subType={`Channel ( active followers )`}
            statsData={[
              {
                title: 'This month',
                value: stats?.totalFollowingCurrentMonth
              },
              {
                title: 'Last month',
                value: stats?.totalFollowingLastMonth
              }
            ]}
            lastMonthStats={{
              value: `${followersPercentageStats}%`,
              status: followersPercentageStats > 0
            }}
          />
        </div>
      </HVC>
      {/* buyers stats section */}
      <HVC view={GETISBUYER()} removeDOM>
        <div className="grid-wrapper-45 gap-20">
          <StatsCard
            subType={`Bets ( won )`}
            statsData={[
              {
                title: 'This month',
                value: 0
              },
              {
                title: 'All time',
                value: 0
              }
            ]}
            lastMonthStats={{ value: '-0.02%', status: false }}
          />
          <StatsCard
            subType={`Channel ( following )`}
            statsData={[
              {
                title: 'This month',
                value: 0
              },
              {
                title: 'All time',
                value: 0
              }
            ]}
            lastMonthStats={{ value: '+0.02%', status: true }}
          />
        </div>
      </HVC>
    </>
  )
})

StatsSection.displayName = 'StatsSection'

// define the structure for each stats card
interface IStatsCard {
  subType: string
  statsData: Array<{ title: string; value: number }>
  lastMonthStats: {
    value: string
    status: boolean
  }
}

// function to render the stats value passed into it as props
const StatsCard = ({ subType, statsData, lastMonthStats }: IStatsCard) => {
  return (
    <div>
      <p
        style={{
          fontSize: '12px'
        }}
        className="py-1 m-0 mb-2"
      >
        {subType}
      </p>
      <div className="bg-white p-4 rounded f-column-7 w-100 shadow-sm">
        <div className="grid-wrapper-45 gap-20">
          {statsData.map((i, index) => (
            <div className="flex-column-7 ais w-100 " key={index}>
              <div className="ResponsiveDivLeft w-100">
                <p
                  className="m-0"
                  style={{
                    color: '#8D8D8D',
                    fontFamily: 'Outfit_Light'
                  }}
                >
                  {i.title}
                </p>
              </div>
              <div className="ResponsiveDivLeft w-100">
                <h4
                  style={{ fontSize: '38px', fontWeight: '500px' }}
                  className="m-0"
                >
                  {i.value}
                </h4>
              </div>
            </div>
          ))}
        </div>
        <div className="ResponsiveDivLeft w-100">
          <p
            className="m-0"
            style={{ color: '#909090', fontFamily: 'Outfit_Light' }}
          >
            from last month{' '}
            <span
              className={lastMonthStats.status ? 'text-success' : 'text-danger'}
            >
              &nbsp;
              {lastMonthStats.status ? <ArrowUpDeg45 /> : <ArrowDownDeg45 />}
              &nbsp;{lastMonthStats.value}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
