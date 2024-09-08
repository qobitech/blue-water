import { useEffect, useState } from 'react'
import {
  IBetChannelLeadershipBoard,
  IBetChannelResponse,
  IBetChannelResponses
} from '../interface/IBet'
import {
  IUseAPI,
  apiFeatures,
  defaultGETDataTemplate,
  getMultiDataArray,
  getNextPage,
  pgQuery,
  removeData,
  useAPIGET
} from '.'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { replaceObjects } from '../components/utils/helper'
import { IChannelSubscriptionThresholds } from '../interface/IOther'
import { onErrorType, onSuccessType } from './sports'
import { IDefaultResponse, useGETAPI, usePATCHAPI, usePOSTAPI } from './utils'
import { betChannelTabEnum } from '../constants/global'

export const getBetChannels = async (query?: string) => {
  const route = `channel${query || ''}`
  return await apiFeatures.get<IBetChannelResponses>(route)
}

export const useBetChannelItemQuery = (): IUseAPI<IBetChannelResponses> => {
  const betChannelProps = useAPIGET<IBetChannelResponses>({
    route: 'channel',
    defaultData: { ...defaultGETDataTemplate, data: { channels: [] } }
  })

  return betChannelProps
}

export const usePublicBetChannelItemQuery =
  (): IUseAPI<IBetChannelResponses> => {
    const betChannelProps = useAPIGET<IBetChannelResponses>({
      route: 'channel/public',
      defaultData: { ...defaultGETDataTemplate, data: { channels: [] } }
    })

    return betChannelProps
  }

export interface IUseBetChannelMutate {
  data: IBetChannelResponses | undefined
  isLoading: boolean
  getChannelsOnScrollTop: () => void
  getChannelsOnScrollBottom: () => void
  getChannels: (pageQuery: string) => void
}

export const useBetChannelMutate = (query?: string): IUseBetChannelMutate => {
  const [onScrollQuery, setOnScrollQuery] = useState<string>('')
  const [channelData, setChannelData] = useState<
    IBetChannelResponses | undefined
  >()
  const [scrollDirection, setScrollDirection] = useState<
    'top' | 'bottom' | null
  >(null)

  const getModifiedChannels = (
    data: IBetChannelResponses
  ): IBetChannelResponses | undefined => {
    if (channelData)
      return {
        ...channelData,
        data: {
          ...channelData.data,
          channels: getMultiDataArray(
            data,
            channelData.data.channels,
            scrollDirection,
            '_id',
            'channels'
          )
        },
        hasNext: data.hasNext,
        result: data.result,
        currentPage: data.currentPage,
        status: data.status
      }
    return data
  }

  const removeChannelData = (startIndex: number, deleteCount: number) => {
    setChannelData((p) => {
      if (p)
        return {
          ...p,
          data: {
            ...p.data,
            channels: removeData(p.data.channels, startIndex, deleteCount)
          }
        }
      else return undefined
    })
  }

  const { mutate, isLoading } = useAPIGET<IBetChannelResponses>({
    route: 'channel',
    defaultData: {
      ...defaultGETDataTemplate,
      data: { channels: [] }
    },
    onSuccess: (data) => {
      const isRemoveData =
        data?.data?.channels?.length === 10 &&
        (channelData?.data?.channels?.length || 1) === 10
      if (isRemoveData) {
        if (scrollDirection === 'top') {
          removeChannelData(10, 10)
        }
        if (scrollDirection === 'bottom') {
          removeChannelData(0, 10)
        }
      }
      setChannelData(getModifiedChannels(data))
      setScrollDirection(null)
    }
  })

  const getChannels = (pageQuery?: string) => {
    setChannelData(undefined)
    const pgquery = pgQuery(1)
    mutate({ query: pgquery + (pageQuery || query || '').replace('?', '&') })
    setOnScrollQuery(pageQuery || query || '')
  }

  const getChannelsOnScroll = (scrollDirection: 'top' | 'bottom') => {
    const pgNum = getNextPage(channelData, scrollDirection)
    const pgquery = pgQuery(pgNum)
    mutate({ query: pgquery + onScrollQuery.replace('?', '&') })
  }

  const getChannelsOnScrollTop = () => {
    setScrollDirection('top')
    getChannelsOnScroll('top')
  }

  const getChannelsOnScrollBottom = () => {
    setScrollDirection('bottom')
    getChannelsOnScroll('bottom')
  }

  return {
    data: channelData,
    isLoading,
    getChannelsOnScrollTop,
    getChannelsOnScrollBottom,
    getChannels
  }
}

export interface IUseBetChannelQuery {
  data: IBetChannelResponses | undefined
  isLoading: boolean
  setIsExtremeScroll: (isScroll: boolean) => void
  fetchonScrollTop: () => void
  fetchonScrollBottom: () => void
}

export const useBetChannelQueryScroll = (
  query?: string
): IUseBetChannelQuery => {
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isExtremeScroll, setIsExtremeScroll] = useState<boolean>(false)
  const [scrollDirection, setScrollDirection] = useState<
    'top' | 'bottom' | null
  >(null)
  const [channelData, setChannelData] = useState<
    IBetChannelResponses | undefined
  >()

  const getChannelArray = (
    data: IBetChannelResponses,
    channels: IBetChannelResponse[]
  ) => {
    const mb2 = data.data.channels
    if (!channels) return mb2
    if (scrollDirection === null) return replaceObjects(channels, mb2, '_id')
    if (scrollDirection === 'top') return [...channels, ...mb2]
    return [...mb2, ...channels]
  }

  const getModifiedChannels = (
    data: IBetChannelResponses
  ): IBetChannelResponses | undefined => {
    if (!channelData) return data
    return {
      ...channelData,
      data: {
        ...channelData.data,
        channels: getChannelArray(data, channelData.data.channels)
      },
      hasNext: data.hasNext,
      result: data.result,
      currentPage: data.currentPage,
      status: data.status
    }
  }

  const removeChannelData = (startIndex: number, deleteCount: number) => {
    setChannelData((p) => {
      if (p)
        return {
          ...p,
          data: {
            ...p.data,
            channels: removeData(p.data.channels, startIndex, deleteCount)
          }
        }
      else return undefined
    })
  }

  const { isLoading } = useQuery({
    queryFn: async () =>
      await getBetChannels(
        pgQuery(currentPage) + (query ? query.replace('?', '&') : '')
      ),
    queryKey: ['allbetchannels'],
    onSuccess: (data) => {
      if (scrollDirection === 'top') {
        removeChannelData(0, 10)
      }
      if (scrollDirection === 'bottom') {
        removeChannelData(10, 10)
      }
      setChannelData(getModifiedChannels(data))
      setCurrentPage(data.currentPage)
      setScrollDirection(null)
    }
  })

  useEffect(() => {
    if (isExtremeScroll) {
      queryClient.invalidateQueries(['allbetchannels'])
      setIsExtremeScroll(false)
    }
  }, [isExtremeScroll])

  const fetchonScrollTop = () => {
    if (currentPage > 1 && !isExtremeScroll) {
      setScrollDirection('top')
      setCurrentPage(Math.max(1, currentPage - 1))
      setIsExtremeScroll(true)
    }
  }

  const fetchonScrollBottom = () => {
    if (!isExtremeScroll) {
      setScrollDirection('bottom')
      setCurrentPage(currentPage + 1)
      setIsExtremeScroll(true)
    }
  }

  return {
    data: channelData,
    isLoading,
    setIsExtremeScroll,
    fetchonScrollTop,
    fetchonScrollBottom
  }
}

export interface IUseBetChannel {
  data: IBetChannelResponses | undefined
  isLoading: boolean
}

export const useBetChannelQuery = (query?: string): IUseBetChannel => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await getBetChannels(query || ''),
    queryKey: ['getAllChannelByID']
    // staleTime: Infinity,
    // cacheTime: 0,
    // retry: false,
    // refetchOnWindowFocus: false
  })

  return {
    data,
    isLoading
  }
}

interface IChannelSubThreshold {
  data: IChannelSubscriptionThresholds | undefined
  isLoading: boolean
}

export const useChannelSubscriptionThreshold = (): IChannelSubThreshold => {
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await apiFeatures.get<IChannelSubscriptionThresholds>(
        'channel-subscription-threshold'
      ),
    queryKey: ['useChannelSubscriptionThreshold']
    // staleTime: Infinity,
    // cacheTime: 0,
    // retry: false,
    // refetchOnWindowFocus: false
  })

  return {
    data,
    isLoading
  }
}

export const useChannelSubscriptionThresholdQuery =
  (): IUseAPI<IChannelSubscriptionThresholds> => {
    const uCSTProps = useAPIGET<IChannelSubscriptionThresholds>({
      route: 'channel-subscription-threshold',
      defaultData: {
        ...defaultGETDataTemplate,
        data: { channelSubscriptionThresholds: [] }
      }
    })

    return uCSTProps
  }

export interface IUseBetChannels {
  getChannels: (pageQuery: string) => void
  data: IBetChannelResponses
  isLoading: boolean
}

export const useGlobalBetChannelQuery = (tabprops: string): IUseBetChannels => {
  const isSubscribed =
    betChannelTabEnum.SUBSCRIBED === tabprops ? '/subscribed' : ''
  const { mutate, data, isLoading } = useAPIGET<IBetChannelResponses>({
    route: `channel${isSubscribed}`,
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        channels: []
      }
    }
  })

  const getChannels = (pageQuery: string) => {
    mutate({ query: pageQuery })
  }

  return {
    data,
    isLoading,
    getChannels
  }
}

export const useLeadershipBoard = (): IUseAPI<IBetChannelLeadershipBoard> => {
  const leadershipBoardProps = useAPIGET<IBetChannelLeadershipBoard>({
    route: 'channel/leadership-board',
    defaultData: { ...defaultGETDataTemplate, data: { channels: [] } }
  })

  return leadershipBoardProps
}

export const useGetAllChannels = (
  onSuccess?: onSuccessType<IBetChannelResponses>,
  onError?: onErrorType
): IUseAPI<IBetChannelResponses> => {
  return useGETAPI<{ channels: IBetChannelResponse[] }, IBetChannelResponses>(
    'channel',
    onSuccess,
    onError,
    'getAllChannels'
  )
}

export const useGetMyChannels = (
  onSuccess?: onSuccessType<IBetChannelResponses>,
  onError?: onErrorType
): IUseAPI<IBetChannelResponses> => {
  return useGETAPI<{ channels: IBetChannelResponse[] }, IBetChannelResponses>(
    'channel',
    onSuccess,
    onError,
    'getMyChannels'
  )
}

export const useGetAllPublicChannels = (
  onSuccess?: onSuccessType<IBetChannelResponses>,
  onError?: onErrorType
): IUseAPI<IBetChannelResponses> => {
  return useGETAPI<{ channels: IBetChannelResponse[] }, IBetChannelResponses>(
    'channel/public',
    onSuccess,
    onError,
    'getPublicChannels'
  )
}

export const useGetChannelsSubscribed = (
  onSuccess?: onSuccessType<IBetChannelResponses>,
  onError?: onErrorType
): IUseAPI<IBetChannelResponses> => {
  return useGETAPI<{ channels: IBetChannelResponse[] }, IBetChannelResponses>(
    'channel/subscribed',
    onSuccess,
    onError,
    'getSubscribedChannels'
  )
}

export const useSubscribeChannel = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse> => {
  return usePATCHAPI('subscription', onSuccess, onError)
}

export const useCreateBetChannel = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse> => {
  return usePOSTAPI('channel', onSuccess, onError)
}

export const useUpdateBetChannel = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse> => {
  return usePATCHAPI('channel', onSuccess, onError)
}
