import { useEffect } from 'react'
import {
  SeparatorComponent,
  TabSection,
  useTabSection
} from '../../../components/utils/reusable'
import { ForumPost } from './forum-post'
import AboutCommunityForum from './about-community-forum'
import CommunityForumRules from './community-forum-rules'
import {
  IGETCommunityForum,
  IGETCommunityForumPost,
  IGETCommunityForumUser,
  communityForumReactionType,
  communityForumUserStatusEnumType
} from '../../../interface/ICommunityForum'
import { useQueryValuesHook } from '../../../components/utils/hooks'
import { getIsAdminLogged, getUserData } from '../../../constants/global'
import { useNavigate } from 'react-router-dom'
import {
  useCreateCommunityForumReaction,
  useGetCommunityForumByID,
  useGetCommunityForumPosts,
  useGetCommunityForumUser
} from '../../../api/community-forum'
import CommunityForumFollowers from './community-forum-followers'
import TextPrompt from '../../../components/utils/text-prompt'
import { HVC, HVCLoad } from '../../../components/utils/hvc'
import { ArrowLeftSVG } from '../../../components/utils/svgs/f-awesome'
import Skeleton from '../../../components/utils/skeleton'
import CommunityForumNotifications from './community-forum-notifications'
import { useGlobalContext } from '../../../components/layout/context'
import { ISubHeaderCTA, SubHeaderTips } from '../my-account/wallet/data'

const communityForumTabEnums = {
  POSTS: 'Posts',
  NOTIFICATIONS: 'Notifications',
  ABOUT: 'About',
  RULES: 'Rules',
  MEMBERS: 'Members'
}

const ViewCommunityForum = () => {
  const { rsProps, globalStateActions } = useGlobalContext()

  if (!rsProps) return <>reload page</>
  if (!globalStateActions) return <>reload page</>

  // const { getCFPostsProps } = globalStateActions

  const getCFPostsProps = useGetCommunityForumPosts()
  const getCFUserProps = useGetCommunityForumUser()
  const getCFProps = useGetCommunityForumByID()

  const navigate = useNavigate()

  const { forum } = useQueryValuesHook()

  const communityForum = getCFProps?.data?.data?.communityForums?.[0]

  const getCommunityForum = () => {
    getCFProps.mutate({ query: `?slug=${forum}` })
  }

  const onSuccessReactCFPost = () => {
    getCommunityForum()
  }

  const reactCFProps = useCreateCommunityForumReaction(onSuccessReactCFPost)

  useEffect(() => {
    if (!communityForum && forum) {
      getCommunityForum()
    }
  }, [])

  useEffect(() => {
    if (communityForum) {
      getCFPostsProps.mutate({
        query: `?communityId=${communityForum?._id}&limit=10`
      })
      getCFUserProps.mutate({
        query: `?communityId=${communityForum?._id}&userId=${
          getUserData().user._id
        }`
      })
    }
  }, [communityForum])

  const communityForumUser = getCFUserProps.data.data.communityForumUsers[0]

  const isBanned = communityForumUser?.status === 'banned'
  const isSuspended = communityForumUser?.status === 'suspended'

  const getTabEnumsByRole = () => {
    switch (communityForumUser?.role) {
      case 'admin':
        return communityForumTabEnums
      case 'moderator':
        return communityForumTabEnums
      case 'user':
        // eslint-disable-next-line no-case-declarations
        const getRest = () => {
          const { MEMBERS, ...rest } = communityForumTabEnums
          return rest
        }
        return getRest()
      default:
        // eslint-disable-next-line no-case-declarations
        const { MEMBERS, ...best } = communityForumTabEnums
        return best
    }
  }

  const tabSectionProps = useTabSection(
    communityForumTabEnums.POSTS,
    getTabEnumsByRole()
  )

  const isPosts = tabSectionProps.isTab(communityForumTabEnums.POSTS)
  const isAbout = tabSectionProps.isTab(communityForumTabEnums.ABOUT)
  const isRules = tabSectionProps.isTab(communityForumTabEnums.RULES)
  const isMem = tabSectionProps.isTab(communityForumTabEnums.MEMBERS)
  const isNotifications = tabSectionProps.isTab(
    communityForumTabEnums.NOTIFICATIONS
  )

  const onAddPost = () => {
    if (!isSuspended && !isBanned) {
      rsProps.callSection({
        action: 'create',
        component: 'community-forum-post',
        title: 'Add Post',
        data: {
          communityForumUser
        },
        onRefresh: getCommunityForum
      })
    }
  }

  const onView = (post: IGETCommunityForumPost) => {
    if (!isSuspended && !isBanned) {
      rsProps.callSection({
        action: 'view',
        component: 'community-forum',
        title: 'View Post',
        data: {
          post
        },
        onRefresh: getCommunityForum
      })
    }
  }

  const onJoin = () => {
    rsProps.callSection({
      action: 'create',
      component: 'community-forum-join',
      title: `Join ${communityForum?.title}`,
      data: {
        forum: communityForum
      },
      onRefresh: () => {
        getCommunityForum()
      }
    })
  }

  const onReturn = () => {
    navigate('?')
  }

  const posts = getCFPostsProps.data.data.communityForumPosts || []

  if (!communityForum && getCFProps.isLoading) {
    return <Skeleton />
  }

  if (!communityForum) {
    return <>reload page</>
  }

  const cta: ISubHeaderCTA = communityForum.isMember
    ? {
        title: 'Add Post',
        action: onAddPost,
        buttonType: 'outlined'
      }
    : {
        title: 'Join',
        action: onJoin,
        buttonType: 'active'
      }

  const editCTA: ISubHeaderCTA = {
    title: 'Edit',
    action: () => {
      rsProps.callSection({
        action: 'update',
        component: 'community-forum',
        title: 'Update Community Forum',
        data: {
          updateData: communityForum
        }
      })
    },
    buttonType: 'active'
  }

  const updateReaction = (
    itemId: string,
    reaction: communityForumReactionType
  ) => {
    if (!isSuspended && !isBanned) {
      reactCFProps.mutate({
        body: {
          itemId,
          reaction,
          itemType: 'post',
          communityUserId: communityForumUser?._id,
          communityId: communityForum._id
        },
        id: itemId
      })
    }
  }

  const onDownvote = (id: string) => {
    updateReaction(id, 'down-vote')
  }

  const onUpvote = (id: string) => {
    updateReaction(id, 'up-vote')
  }

  const onShowUserData = (post: IGETCommunityForumPost) => {
    rsProps.callSection({
      action: 'view',
      component: 'community-forum-user-data',
      title: 'View User',
      data: {
        post
      }
    })
  }

  const onRefresh = () => {
    getCFPostsProps.mutate({
      query: `?communityId=${communityForum?._id}&limit=10`
    })
  }

  return (
    <HVCLoad removeDOM view load={getCFProps.isLoading} className="f-column-33">
      <Header communityForumUser={communityForumUser} onReturn={onReturn} />
      <HeaderMain
        communityForum={communityForum}
        ctas={getIsAdminLogged() ? [editCTA, cta] : [cta]}
        onRefresh={onRefresh}
        isBanned={isBanned}
        isLoading={getCFPostsProps.isLoading}
      />
      <div>
        <CFUserStatus status={communityForumUser?.status}>
          <TabSection tabProps={tabSectionProps.tabProps} position="start" />
          <div className="community-post-wrapper gap-20">
            <div className="community-post-section">
              <HVC view={isPosts}>
                <div className="f-column gap-20">
                  {posts.map((post, index) => {
                    return (
                      <div
                        key={index}
                        className="border rounded px-3 pt-1 pb-2"
                      >
                        <ForumPost
                          onDownvote={() => {
                            onDownvote(post._id)
                          }}
                          onUpVote={() => {
                            onUpvote(post._id)
                          }}
                          post={post}
                          onComment={() => {
                            onView(post)
                          }}
                          onView={() => {
                            onView(post)
                          }}
                          onShowUserData={() => onShowUserData(post)}
                        />
                      </div>
                    )
                  })}
                  {!posts.length ? (
                    <div className="f-row aic jcc p-4">
                      <p className="color-label text-small">No post</p>
                    </div>
                  ) : null}
                </div>
              </HVC>
              <HVC view={isAbout}>
                <AboutCommunityForum forum={communityForum} />
              </HVC>
              <HVC view={isRules}>
                <CommunityForumRules forum={communityForum} />
              </HVC>
              <HVC view={isMem}>
                <CommunityForumFollowers
                  forum={communityForum}
                  communityForumUser={communityForumUser}
                />
              </HVC>
              <HVC view={isNotifications}>
                <CommunityForumNotifications forum={communityForum} />
              </HVC>
            </div>
            <div className="d-none community-post-ad-wrapper">
              <div className="community-post-ad-section f-column gap-20">
                <div className="bs rounded">
                  <p className="text-tiny ff-bold">UPDATE</p>
                  <p className="text-tiny">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Error placeat, ab modi inventore beatae ipsum voluptatem
                    incidunt reprehenderit.
                  </p>
                </div>
                <div className="bs rounded">
                  <p className="text-tiny ff-bold">AD</p>
                  <p className="text-tiny">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Error placeat, ab modi inventore beatae ipsum voluptatem
                    incidunt reprehenderit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CFUserStatus>
      </div>
    </HVCLoad>
  )
}

export default ViewCommunityForum

const CFUserStatus = ({
  status,
  children
}: {
  status: communityForumUserStatusEnumType
  children?: any
}) => {
  // const isActive = status === 'active'
  const isBanned = status === 'banned'
  // const isSuspended = status === 'suspended'

  if (isBanned)
    return (
      <div className="p-4 f-row jcc">
        <TextPrompt prompt="You're banned from all activities on this forum" />
      </div>
    )
  return <>{children}</>
}

interface IHeader {
  communityForumUser: IGETCommunityForumUser
  onReturn?: () => void
}

const Header: React.FC<IHeader> = ({ communityForumUser, onReturn }) => {
  const isUser = !!communityForumUser?.role
  return (
    <div className="f-row-30 aic pb-3">
      <p
        className="text-tiny color-label cursor-pointer m-0"
        onClick={onReturn}
      >
        <span>
          <ArrowLeftSVG />
        </span>
        &nbsp;&nbsp;Back to main
      </p>
      <div className={`ml-auto d-${isUser ? 'flex' : 'none'} aic gap-20`}>
        <p className="text-tiny m-0">{communityForumUser?.role}</p>
        <SeparatorComponent />
        <div
          className={`mx-wh-fit cf-status-indicator ${communityForumUser?.status}`}
        >
          <p className="text-tiny m-0 ml-auto">{communityForumUser?.status}</p>
        </div>
      </div>
    </div>
  )
}

interface IHeaderMain {
  communityForum: IGETCommunityForum
  isBanned: boolean
  isLoading: boolean
  onRefresh: () => void
  cta?: ISubHeaderCTA
  ctas?: ISubHeaderCTA[]
}

const HeaderMain: React.FC<IHeaderMain> = ({
  communityForum,
  isBanned,
  isLoading,
  onRefresh,
  cta,
  ctas
}) => {
  return (
    <div>
      <SubHeaderTips
        title={communityForum.title}
        description={`${communityForum.memberCount} member${
          communityForum.memberCount > 1 ? 's' : ''
        }`}
        refreshAction={isBanned ? undefined : onRefresh}
        load={isLoading}
        cta={isBanned ? undefined : cta}
        ctas={isBanned ? undefined : ctas}
      />
    </div>
  )
}
