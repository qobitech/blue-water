import { useEffect } from 'react'
import {
  GETISBUYER,
  betChannelTabEnum,
  getUserData
} from '../../../../constants/global'
import { PublicBetChannels } from '../../overview/data'
import { TabSection } from '../../../../components/utils/reusable'
import { useGlobalContext } from '../../../../components/layout/context'
import { SubHeaderTips } from '../../my-account/wallet/data'

const PublicBetChannelsPage = () => {
  const { betChannelTabProps, betChannelProps } = useGlobalContext()
  if (!betChannelProps) return <></>
  if (!betChannelTabProps) return <></>

  const handleChannels = (page?: number) => {
    const statusQuery =
      betChannelTabProps.tab === betChannelTabEnum.SUBSCRIBED
        ? `&status=subscribed&userId=${getUserData().user._id}`
        : ''
    betChannelProps.getChannels(`?limit=10${statusQuery}&page=${page || 1}`)
  }

  useEffect(() => {
    handleChannels()
  }, [betChannelTabProps.tab])

  const postTitle =
    betChannelTabProps.tab === betChannelTabEnum.ALL ? '' : ' ( you follow )'

  return (
    <>
      {GETISBUYER() ? (
        <TabSection
          tabProps={betChannelTabProps?.tabProps}
          position="center"
          tabGap="35"
        />
      ) : null}
      <div className="py-2" />
      <SubHeaderTips
        title={`Channels ${postTitle}`}
        description=""
        load={betChannelProps.isLoading}
        refreshAction={() =>
          handleChannels(betChannelProps.data.currentPage || 1)
        }
      />
      <div className="bg-white px-2">
        <PublicBetChannels
          channelsProps={betChannelProps.data}
          loading={betChannelProps.isLoading}
          handleChannels={handleChannels}
        />
      </div>
    </>
  )
}

export default PublicBetChannelsPage
