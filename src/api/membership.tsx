import { useQuery } from '@tanstack/react-query'
import { IMembershipSubscriptions } from '../interface/ISubscription'
import { IMemberSubscriptionServices, IMemberships } from '../interface/IOther'
import { apiFeatures } from '.'

export interface IGetGenericHooks<T> {
  data: T | undefined
  isLoading: boolean
}

export const useMembershipPlan =
  (): IGetGenericHooks<IMembershipSubscriptions> => {
    const { data, isLoading } = useQuery({
      queryFn: async () =>
        await apiFeatures.get<IMembershipSubscriptions>('member-subscription'),
      queryKey: ['all-member-subscription-plans'],
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

export const useMemberService =
  (): IGetGenericHooks<IMemberSubscriptionServices> => {
    const { data, isLoading } = useQuery({
      queryFn: async () =>
        await apiFeatures.get<IMemberSubscriptionServices>(
          'member-subscription-service'
        ),
      queryKey: ['all-member-subscription-service'],
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

export const useMemberships = (): IGetGenericHooks<IMemberships> => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await apiFeatures.get<IMemberships>('membership'),
    queryKey: ['all-members']
  })

  return {
    data,
    isLoading
  }
}
