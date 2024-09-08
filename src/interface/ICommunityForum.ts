import { typeRoleId } from '../constants/global'

export const communityForumStatusEnum = {
  ACTIVE: 'active',
  INACTIVE: 'in-active',
  SUSPENDED: 'suspended',
  CLOSED: 'closed'
}

export type communityForumStatusType =
  (typeof communityForumStatusEnum)[keyof typeof communityForumStatusEnum]

export const communityForumPostStatusEnum = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  HIDDEN: 'hidden'
}

export type communityForumPostStatusType =
  (typeof communityForumPostStatusEnum)[keyof typeof communityForumPostStatusEnum]

export interface IGETCommunityForum {
  createdAt: string
  modified: string
  status: communityForumStatusType
  _id: string
  title: string
  about: string
  description: string
  userId: string
  slug: string
  memberCount: number
  isMember: boolean
  tag: string
  color: string
  icon: string
}

export interface IGETCommunityForums {
  status: string
  result: number
  currentPage: number
  pages: number
  hasNext: boolean
  data: {
    communityForums: IGETCommunityForum[]
  }
}

export const communityForumUserStatusEnum = {
  APPROVED: 'active',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  PENDING: 'pending'
} as const

export type communityForumUserStatusEnumType =
  (typeof communityForumUserStatusEnum)[keyof typeof communityForumUserStatusEnum]

export const communityForumUserRoleEnum = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user'
} as const

export type communityForumUserRoleType =
  (typeof communityForumUserRoleEnum)[keyof typeof communityForumUserRoleEnum]

export interface IGETCommunityForumUser {
  _id: string
  createdAt: string
  modified: string
  communityId: string
  userId: string
  user: {
    _id: string
    country: string
    userName: string
    role: typeRoleId
    levelId: string
  }
  userLevel: {
    _id: string
    title: string
    description: string
  }
  role: communityForumUserRoleType
  status: communityForumUserStatusEnumType
}

export interface IGETCommunityForumUsers {
  status: string
  result: number
  currentPage: number
  pages: number
  hasNext: boolean
  data: {
    communityForumUsers: IGETCommunityForumUser[]
  }
}

export interface IGETCommunityForumPost {
  createdAt: string
  modified: string
  status: communityForumPostStatusType
  _id: string
  communityId: string
  post: string
  communityUserId: string
  user: {
    _id: string
    country: string
    userName: string
    role: typeRoleId
    levelId: string
  }
  userLevel: {
    _id: string
    title: string
    description: string
  }
  upVoteCount: number
  downVoteCount: number
  commentCount: number
  isComment: boolean
  isUpVote: boolean
  isDownVote: boolean
}

export interface IGETCommunityForumPosts {
  status: string
  result: number
  currentPage: number
  pages: number
  hasNext: boolean
  data: {
    communityForumPosts: IGETCommunityForumPost[]
  }
}

export const communityForumReactionItemEnum = {
  POST: 'post',
  COMMENT: 'comment'
} as const

export type communityForumReactionItemType =
  (typeof communityForumReactionItemEnum)[keyof typeof communityForumReactionItemEnum]

export interface IGETCommunityForumComment {
  _id: string
  postId: string
  communityUserId: string
  comment: string
  reply: string
  createdAt: string
  modified: string
  user: {
    _id: string
    country: string
    userName: string
    role: typeRoleId
    levelId: string
  }
  userLevel: {
    _id: string
    title: string
    description: string
  }
  upVoteCount: number
  downVoteCount: number
  isUpVote: boolean
  isDownVote: boolean
}

export interface IGETCommunityForumComments {
  status: string
  result: number
  currentPage: number
  pages: number
  hasNext: boolean
  data: {
    communityForumComments: IGETCommunityForumComment[]
  }
}

export const communityForumReactionEnum = {
  UPVOTE: 'up-vote',
  DOWNVOTE: 'down-vote'
} as const

export type communityForumReactionType =
  (typeof communityForumReactionEnum)[keyof typeof communityForumReactionEnum]

export const communityForumNotificationEnum = {
  BETTIPS: 'BET TIPS',
  MEMBER: 'MEMBER',
  BETWINS: 'BET WINS'
} as const

export type communityForumNotificationType =
  (typeof communityForumNotificationEnum)[keyof typeof communityForumNotificationEnum]
export interface IGETCommunityForumNotification {
  title: string
  body: string
  category: communityForumNotificationType
  senderId: string
  receiverId: string
  createdAt: string
  url: string
  urlTitle: string
}
export interface IGETCommunityForumNotifications {
  status: string
  result: number
  currentPage: number
  pages: number
  hasNext: boolean
  data: {
    notifications: IGETCommunityForumNotification[]
  }
}
