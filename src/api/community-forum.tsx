import {
  IUseAPI,
  defaultGETDataTemplate,
  defaultPATCHDataTemplate,
  useAPIGET,
  useAPIPATCH,
  useAPIPOST,
  useAPIPUT
} from '.'
import {
  IGETCommunityForum,
  IGETCommunityForumComment,
  IGETCommunityForumComments,
  IGETCommunityForumNotification,
  IGETCommunityForumNotifications,
  IGETCommunityForumPosts,
  IGETCommunityForumUsers,
  IGETCommunityForums
} from '../interface/ICommunityForum'
import { onErrorType, onSuccessType } from './sports'
import { IDefaultResponse, useGETAPI, usePATCHAPI } from './utils'

export const useCreateCommunityForum = (
  onSuccess?: onSuccessType<{ status: string; message: string }>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  const communityForumProps = useAPIPOST({
    route: 'community-forum',
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return communityForumProps
}

export const useUpdateCommunityForum = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse> => {
  return usePATCHAPI('community-forum', onSuccess, onError)
}

export const useJoinCommunityForum = (
  onSuccess?: onSuccessType<{ status: string; message: string }>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  const communityForumProps = useAPIPOST({
    route: 'community-forum/join',
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return communityForumProps
}

export const useUpdateCommunityForumUserRole = (
  onSuccess?: onSuccessType<{ status: string; message: string }>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  const communityForumProps = useAPIPUT({
    route: 'community-forum/user/role',
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return communityForumProps
}

export const useUpdateCommunityForumUserStatus = (
  onSuccess?: onSuccessType<{ status: string; message: string }>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  const communityForumProps = useAPIPUT({
    route: 'community-forum/user/status',
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return communityForumProps
}

export const useCreateCommunityForumPost = (
  onSuccess?: onSuccessType<{ status: string; message: string }>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  const communityForumProps = useAPIPOST({
    route: 'community-forum/post',
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return communityForumProps
}

export const useCreateCommunityForumComment = (
  onSuccess?: onSuccessType<{ status: string; message: string }>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  const communityForumProps = useAPIPOST({
    route: 'community-forum/comment',
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return communityForumProps
}

export const useCreateCommunityForumReaction = (
  onSuccess?: onSuccessType<{ status: string; message: string }>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  const communityForumProps = useAPIPATCH({
    route: 'community-forum/reaction',
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return communityForumProps
}

export const useGetCommunityForum = (
  onSuccess?: onSuccessType<IGETCommunityForums>,
  onError?: onErrorType
): IUseAPI<IGETCommunityForums> => {
  return useGETAPI<
    { communityForums: IGETCommunityForum[] },
    IGETCommunityForums
  >('community-forum', onSuccess, onError, 'getCommunityForum')
}

export const useGetCommunityForumByID = (
  onSuccess?: onSuccessType<IGETCommunityForums>,
  onError?: onErrorType
): IUseAPI<IGETCommunityForums> => {
  return useGETAPI<
    { communityForums: IGETCommunityForum[] },
    IGETCommunityForums
  >('community-forum', onSuccess, onError, 'getCommunityForumByID')
}

export const useGetCommunityForumUser = (
  onSuccess?: onSuccessType<IGETCommunityForumUsers>,
  onError?: onErrorType
): IUseAPI<IGETCommunityForumUsers> => {
  const communityForumProps = useAPIGET<IGETCommunityForumUsers>({
    route: 'community-forum/user',
    defaultData: {
      ...defaultGETDataTemplate,
      data: { communityForumUsers: [] }
    },
    onSuccess,
    onError
  })
  return communityForumProps
}

export const useGetCommunityForumPosts = (
  onSuccess?: onSuccessType<IGETCommunityForumPosts>,
  onError?: onErrorType
): IUseAPI<IGETCommunityForumPosts> => {
  const communityForumProps = useAPIGET<IGETCommunityForumPosts>({
    route: 'community-forum/post',
    defaultData: {
      ...defaultGETDataTemplate,
      data: { communityForumPosts: [] }
    },
    onSuccess,
    onError
  })
  return communityForumProps
}

// export const useGetCommunityForumPosts = (
//   onSuccess?: onSuccessType<IGETCommunityForumPosts>,
//   onError?: onErrorType
// ): IUseAPI<IGETCommunityForumComments> => {
//   return useGETAPI<
//     { communityForumComments: IGETCommunityForumPost[] },
//     IGETCommunityForumPosts
//   >('community-forum/post', onSuccess, onError)
// }

export const useGetCommunityForumComments = (
  onSuccess?: onSuccessType<IGETCommunityForumComments>,
  onError?: onErrorType
): IUseAPI<IGETCommunityForumComments> => {
  return useGETAPI<
    { communityForumComments: IGETCommunityForumComment[] },
    IGETCommunityForumComments
  >('community-forum/comment', onSuccess, onError)
}

export const useGetCommunityForumNotifications = (
  onSuccess?: onSuccessType<IGETCommunityForumNotifications>,
  onError?: onErrorType
): IUseAPI<IGETCommunityForumNotifications> => {
  return useGETAPI<
    { notifications: IGETCommunityForumNotification[] },
    IGETCommunityForumNotifications
  >('community-forum-notification', onSuccess, onError)
}
