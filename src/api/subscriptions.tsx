import { ISubscriptionResponse } from '../interface/ISubscription'
import { useState } from 'react'
import { apiFeatures, useAPIPATCH } from '.'
import { IBetChannelResponse } from '../interface/IBet'

export const getSubscriptions = async <T extends {}>(query?: string) => {
  const route = `subscription${query || ''}`
  return await apiFeatures.get<ISubscriptionResponse<T>>(route)
}

interface ISubProps {
  text: string
  icon: string
  load: boolean
  action: () => void
}

export interface IPUCS {
  handleChannelSubscription: (i: IBetChannelResponse) => void
  subChannelLoading: boolean
  selectedChannel: string
  isSubscribed: (
    channel: IBetChannelResponse
  ) => 'Renew' | 'Follow' | 'Unfollow'
  getSubProps: (data: IBetChannelResponse) => ISubProps
}

export const useChannelSubscriptions = (
  onSubSuccessful?: () => void
): IPUCS => {
  const [selectedChannel, setSelectedChannel] = useState<string>('')

  const { mutate: handleSubscription, isLoading: subChannelLoading } =
    useAPIPATCH({
      route: 'subscription',
      defaultData: {},
      onSuccess: () => {
        onSubSuccessful?.()
      }
    })

  const handleChannelSubscription = (i: IBetChannelResponse) => {
    if (!i) return
    const channelId = i._id
    setSelectedChannel(channelId)
    if (!i.isUserSubscribed) {
      handleSubscription({
        id: channelId,
        body: {
          itemId: i._id,
          itemType: 'channel',
          status: 'subscribed'
        }
      })
    } else {
      handleSubscription({
        id: channelId,
        body: {
          status: i.isUserSubscribed ? 'unsubscribed' : 'subscribed'
        }
      })
    }
  }

  const isSubscribed = (channel: IBetChannelResponse) => {
    if (!channel) return 'Follow'
    if (channel.isUserSubscribed) {
      return 'Unfollow'
    }
    return 'Follow'
  }

  const getSubProps = (i: IBetChannelResponse) => {
    if (!i)
      return {
        text: 'Follow',
        buttonType: 'disabled',
        icon: '',
        load: false,
        action: () => {}
      }
    const isSub = !!i.isUserSubscribed
    const text = isSubscribed(i)
    return {
      text,
      buttonType: isSub ? 'outlined' : 'bold',
      icon: '',
      load: subChannelLoading && selectedChannel === i._id,
      action: () => {
        handleChannelSubscription(i)
      }
    }
  }

  return {
    isSubscribed,
    handleChannelSubscription,
    subChannelLoading,
    selectedChannel,
    getSubProps
  }
}
