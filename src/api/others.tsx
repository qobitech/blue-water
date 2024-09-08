import { useQuery } from '@tanstack/react-query'
import {
  IBookies,
  INotificationPreferences,
  ISports
} from '../interface/IOther'
import { apiFeatures } from '.'

export const getAllBookies = async (): Promise<IBookies> => {
  return await apiFeatures.get<IBookies>('bookie')
}

export interface IUseSports {
  data: ISports | undefined
  isLoading: boolean
}

export interface IUseNotificationPreference {
  data: INotificationPreferences | undefined
  isLoading: boolean
}

export const useNotificationPreferenceQuery =
  (): IUseNotificationPreference => {
    const { data, isLoading } = useQuery({
      queryFn: async () =>
        await apiFeatures.get<INotificationPreferences>(
          'notification-preference'
        ),
      queryKey: ['allnotification-preference'],
      staleTime: Infinity,
      cacheTime: 0,
      retry: false,
      refetchOnWindowFocus: false
    })

    return {
      data,
      isLoading
    }
  }
