import { UseMutateFunction, useMutation, useQuery } from '@tanstack/react-query'
// import { useNavigate } from 'react-router-dom'
import {
  getUserData,
  getUserRole,
  typeRoleId,
  encodeData,
  roleType,
  GETDASHBOARDURL
} from '../constants/global'
import {
  IUserResponse,
  IUser,
  IPasswordResponse,
  IPasswordRequest,
  IUsers
} from '../interface/IUser'
import {
  IBasicInfoSchema,
  // IBetCodeWebsitePreferenceSchema,
  INotificationPreferenceSchema
  // ISubscribeMultiBetChannelSchema
} from '../pages/onboarding/data'
// import { getAllItems } from '../pages/admin/settings/components'
import { IGetGenericHooks } from './membership'
import {
  IAchievement,
  IAchievements,
  IUserTask,
  IUserTasks,
  IUserTier,
  IUserTiers
} from '../interface/IOther'
import {
  IDefaultGETTemplate,
  IResponse,
  IUseAPI,
  apiFeatures,
  defaultGETDataTemplate,
  useAPIGET
} from '.'
import { roleEnum } from '../pages/auth/register/data'
import { onErrorType, onSuccessType } from './sports'
import {
  IDefaultResponse,
  useGETAPI,
  usePATCHAPI,
  usePOSTAPI,
  usePUTAPI
} from './utils'
import { useNavigate } from 'react-router-dom'

export interface IUUser {
  handleBasicInfo: (data: IBasicInfoSchema) => void
  isLoading: boolean
  updateUserAction: UseMutateFunction<
    IUserResponse,
    any,
    {
      [key: string]: any
    },
    unknown
  >
  handleUpdateUser: (data: IUser) => void
  response: IResponse
  getNotificationPreferenceData: (data: INotificationPreferenceSchema) => {
    notificationPreference: Array<{
      title: string
      value: any
    }>
  }
}

export const useUser = (
  setNotificationStatus?: (notice: string, status: boolean) => void
): IUUser => {
  const navigate = useNavigate()
  const updateUser = async (userData: {
    [key: string]: any
  }): Promise<IUserResponse> => {
    return await apiFeatures.patch('updateUser', '', userData)
  }
  const { mutate, isLoading, data } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      if (getUserData().user.stage === 'onboarding1') {
        setNotificationStatus?.('Basic Info Saved Successfully', true)
      } else if (getUserData().user.stage === 'onboarding2') {
        setNotificationStatus?.('Preferred Bookies Selected Successfully', true)
      } else if (getUserData().user.stage === 'onboarding3') {
        setNotificationStatus?.(
          'Notification Preference Set Successfully',
          true
        )
      } else if (getUserData().user.stage === 'onboarding4') {
        setNotificationStatus?.('Suscribed Successfully', true)
      } else setNotificationStatus?.('User Profile Updated Successfully', true)
      const userResponseData = data.data.user
      const userRole = getUserRole(userResponseData.role as typeRoleId)
      encodeData(userResponseData, userRole as roleType)
      setTimeout(() => {
        navigate(GETDASHBOARDURL())
      }, 1500)
    },
    onError: ({ response }: any) => {
      const { data } = response
      setNotificationStatus?.(data.message, false)
    }
  })

  const handleBasicInfo = (data: IBasicInfoSchema) => {
    mutate({
      ...data,
      stage: getUserData().role === roleEnum.seller ? 'onboarding2' : 'user'
    })
  }

  const getNotificationPreferenceData = (
    data: INotificationPreferenceSchema
  ) => {
    const notifValues: { [key: string]: any } = data.values
    const notificationPreference = Object.keys(notifValues)
      .filter((j) => notifValues[j])
      .map((i) => ({
        title: i,
        value: notifValues[i]
      }))
    return { notificationPreference }
  }

  const handleUpdateUser = (data: IUser) => {
    mutate(data)
  }

  return {
    handleBasicInfo,
    isLoading,
    updateUserAction: mutate,

    handleUpdateUser,
    response: {
      message: data?.message,
      status: data?.status || ''
    },
    getNotificationPreferenceData
  }
}

export interface IUUserProfile {
  isLoading: boolean
  updateUserAction: UseMutateFunction<
    IUserResponse,
    any,
    {
      [key: string]: any
    },
    unknown
  >
  handleUpdateUser: (data: IUser) => void
  response: IResponse
}
export const useUserProfile = (
  setNotificationStatus?: (notice: string, status: boolean) => void,
  onSuccess?: () => void,
  onError?: () => void
): IUUserProfile => {
  const updateUser = async (userData: {
    [key: string]: any
  }): Promise<IUserResponse> => {
    return await apiFeatures.patch('updateUser', '', userData)
  }
  const { mutate, isLoading, data } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      setNotificationStatus?.('User Profile Updated Successfully', true)
      onSuccess?.()
      const userResponseData = data.data.user
      const userRole = getUserRole(userResponseData.role as typeRoleId)
      encodeData(userResponseData, userRole as roleType)
    },
    onError: ({ response }: any) => {
      const { data } = response
      setNotificationStatus?.(data.message, false)
      onError?.()
    }
  })

  const handleUpdateUser = (data: IUser) => {
    mutate(data)
  }

  return {
    // handleBasicInfo,
    isLoading,
    updateUserAction: mutate,

    handleUpdateUser,
    response: {
      message: data?.message,
      status: data?.status || ''
    }
    // getNotificationPreferenceData
  }
}
export interface IUsePassword {
  passwordUpdate: UseMutateFunction<
    IPasswordResponse,
    any,
    IPasswordRequest,
    unknown
  >
  response: IResponse
  isLoading: boolean
}

export const usePassword = (
  setNotificationStatus?: (notice: string, status: boolean) => void
): IUsePassword => {
  const updatePassword = async (userData: IPasswordRequest) => {
    return await apiFeatures.patch<IPasswordResponse>(
      'updatePassword',
      '',
      userData
    )
  }
  const { mutate, isLoading, data } = useMutation({
    mutationFn: updatePassword,
    onError: ({ response }: any) => {
      const { data } = response
      setNotificationStatus?.(data.message, false)
    }
  })

  return {
    passwordUpdate: mutate,
    response: {
      message: !data?.status
        ? ''
        : `Password Update ${
            data.status === 'success' ? 'Successful' : 'Not Successful'
          }`,
      status: data?.status || ''
    },
    isLoading
  }
}

export const useAllUsers = (): IGetGenericHooks<IUsers> => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await apiFeatures.get<IUsers>('users'),
    queryKey: ['all-users']
  })

  return {
    data,
    isLoading
  }
}

export const useUserTier = (query?: string): IGetGenericHooks<IUserTiers> => {
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await apiFeatures.get<IUserTiers>('user-tier' + (query || '')),
    queryKey: ['user-tier']
  })

  return {
    data,
    isLoading
  }
}

export const useUserTierQuery = (
  onSuccess?: onSuccessType<IUserTiers>,
  onError?: onErrorType
): IUseAPI<IUserTiers> => {
  const userTierProps = useAPIGET<IUserTiers>({
    route: 'user-tier',
    defaultData: { ...defaultGETDataTemplate, data: { userTiers: [] } },
    onError,
    onSuccess
  })

  return userTierProps
}

// export const useUserTaskQuery = (): IUseAPI<IUserTasks> => {
//   const userTasksProps = useAPIGET<IUserTasks>({
//     route: 'user-task/completed-tasks',
//     defaultData: { ...defaultGETDataTemplate, data: { userTasks: [] } }
//   })

//   return userTasksProps
// }

export const useUserTaskQuery = (
  onSuccess?: onSuccessType<IUserTasks>,
  onError?: onErrorType
): IUseAPI<IUserTasks> => {
  return useGETAPI<{ userTasks: IUserTask[] }, IUserTasks>(
    'user-task/completed-tasks',
    onSuccess,
    onError,
    'getUserTasks'
  )
}

export const useUserAchievementQuery = (
  onSuccess?: onSuccessType<IAchievements>,
  onError?: onErrorType
): IUseAPI<IAchievements> => {
  return useGETAPI<{ achievements: IAchievement[] }, IAchievements>(
    'achievement/completed',
    onSuccess,
    onError,
    'getUserAchievements'
  )
}

export const useGetUserTier = (
  onSuccess?: onSuccessType<IUserTiers>,
  onError?: onErrorType
): IUseAPI<IUserTiers> => {
  return useGETAPI<{ userTiers: IUserTier[] }, IUserTiers>(
    'user-tier',
    onSuccess,
    onError
  )
}

export const useActivateUserAccount = (
  onSuccess?: onSuccessType<IDefaultResponse<{ user: IUser }>>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse<{ user: IUser }>> => {
  return usePATCHAPI('activateAccount', onSuccess, onError)
}

export const useRequestAccountActivation = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse> => {
  return usePOSTAPI('activateAccount', onSuccess, onError)
}

export const useGetUserProfile = (
  onSuccess?: onSuccessType<IDefaultGETTemplate<{ user: IUser }>>,
  onError?: onErrorType
): IUseAPI<IDefaultGETTemplate<{ user: IUser }>> => {
  return useGETAPI('profile', onSuccess, onError)
}

export const useUpdateUserLevel = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  return usePUTAPI('update-tier', onSuccess, onError)
}

export const useUpdateUserStatus = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  return usePUTAPI('update-status', onSuccess, onError)
}

export const useAdminCreateUser = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse> => {
  return usePOSTAPI('create-user', onSuccess, onError)
}
