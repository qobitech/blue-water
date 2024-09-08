import { useEffect } from 'react'
import {
  useBetChannelItemQuery,
  usePublicBetChannelItemQuery
} from '../../../api/channels'
import { useChannelSubscriptions } from '../../../api/subscriptions'
import { ChannelDetails } from './by-id/data'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import { HVCLoad } from '../../../components/utils/hvc'
import { TypeSmallButton } from '../../../components/utils/button'
import { IBetChannelInfo } from '../../../interface/IBet'

const ViewBetChannel = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps, route } = globalContext
  const data = rsProps?.data as unknown as IBetChannelInfo

  const isDashboard = route !== 'auth' && route !== 'public'

  const betChannelProps = isDashboard
    ? useBetChannelItemQuery()
    : usePublicBetChannelItemQuery()
  const { getSubProps } = useChannelSubscriptions(() => {
    betChannelProps.mutate({ query: `?slug=${data?.slug}` })
  })

  useEffect(() => {
    if (data?.slug) betChannelProps.mutate({ query: `?slug=${data?.slug}` })
  }, [data?.slug])

  const betChannel = betChannelProps.data.data.channels?.[0]

  const subProps = getSubProps(betChannel)

  return (
    <HVCLoad
      removeDOM
      view
      load={betChannelProps.isLoading}
      className="pt-3 f-column-25"
    >
      <ChannelDetails
        betChannel={betChannel}
        isLoad={betChannelProps.isLoading}
      />
      <div className="f-row-20 aic flex-wrap border-top py-3">
        {isDashboard ? (
          <TypeSmallButton
            buttonSize="small"
            title={subProps.text}
            buttonType="outlined"
            load={subProps.load}
            onClick={subProps.action}
          />
        ) : null}
        <TypeSmallButton
          buttonSize="small"
          buttonType="active"
          title={`Active Predictions (${betChannel?.predictionCount || 0})`}
          onClick={() => {
            rsProps?.addRightSectionHistory()
            rsProps?.callSection({
              action: 'view',
              component: 'public-predictions',
              title: betChannel.title + ' - Predictions',
              data
            })
          }}
        />
        <TypeSmallButton
          buttonSize="small"
          title="Stats"
          onClick={() => {
            rsProps?.addRightSectionHistory()
            rsProps?.callSection({
              action: 'view',
              component: 'bet-stats',
              title: 'Stats',
              data
            })
          }}
        />
        <HVCLoad
          removeDOM
          load={betChannelProps.isLoading}
          className="ml-auto"
        />
      </div>
    </HVCLoad>
  )
}

export default ViewBetChannel
