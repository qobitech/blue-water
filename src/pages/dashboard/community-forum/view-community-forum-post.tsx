import { useEffect, useMemo, useState } from 'react'
import AddComment, { IACF, addCommentSchema } from './add-comment'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import { RefreshSVG } from '../../../components/utils/svgs'
import {
  useCreateCommunityForumComment,
  useCreateCommunityForumReaction,
  useGetCommunityForumComments,
  useGetCommunityForumPosts,
  useGetCommunityForumUser
} from '../../../api/community-forum'
import { useFormHook } from '../../../components/utils/hooks'
import {
  communityForumReactionItemType,
  communityForumReactionType,
  IGETCommunityForumPost
} from '../../../interface/ICommunityForum'
import { ForumPost } from './forum-post'
import ForumComment from './forum-comment'
import './index.scss'
import { HVCLoad } from '../../../components/utils/hvc'
import { TypeSmallButton } from '../../../components/utils/button'

const ViewCommunityForumPost = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page gc</>

  const { rsProps } = globalContext

  if (!rsProps) return <>reload page rsprops</>

  const { post } = rsProps.data as { post: IGETCommunityForumPost }

  const [isComment, setIsComment] = useState<boolean>(false)

  const getCFCommentProps = useGetCommunityForumComments()
  const getCFPostsProps = useGetCommunityForumPosts()
  const getCFUserProps = useGetCommunityForumUser()

  const communityForumPost = useMemo(() => {
    const posts = getCFPostsProps?.data?.data?.communityForumPosts || []
    return posts.length
      ? posts.filter((post) => post._id === rsProps.slug)[0]
      : post
  }, [getCFPostsProps.data, post])

  const communityForumUser = getCFUserProps.data.data.communityForumUsers[0]

  const [hookForm] = useFormHook<IACF>(addCommentSchema)

  const onRefreshCFComments = () => {
    const currentPage = getCFCommentProps.data?.currentPage || 1
    getCFCommentProps.mutate({
      query: `?postId=${communityForumPost?._id}&limit=10&page=${currentPage}`
    })
  }

  useEffect(() => {
    if (communityForumPost) onRefreshCFComments()
  }, [communityForumPost])

  const onRefreshCFPosts = () => {
    const currentPage = getCFPostsProps.data?.currentPage || 1
    getCFPostsProps.mutate({
      query: `?communityId=${communityForumPost?.communityId}&limit=10&page=${currentPage}`
    })
  }

  const onSuccessCreateCFComment = () => {
    setIsComment(false)
    hookForm.reset({ comment: '' })
    // onRefreshCFPosts()
    rsProps.onRefresh?.()
    onRefreshCFComments()
  }

  const createCFCommentProps = useCreateCommunityForumComment(
    onSuccessCreateCFComment
  )

  const [reactionItem, setReactionItem] =
    useState<communityForumReactionItemType | null>()

  const onSuccessReactCFPost = () => {
    rsProps.onRefresh?.()
    if (reactionItem === 'post') {
      onRefreshCFPosts()
    }
    if (reactionItem === 'comment') {
      onRefreshCFComments()
    }
    setReactionItem(null)
  }

  const reactCFProps = useCreateCommunityForumReaction(onSuccessReactCFPost)

  const onComment = (id: string) => {
    setIsComment(true)
  }

  const updateReaction = (
    itemId: string,
    itemType: communityForumReactionItemType,
    reaction: communityForumReactionType
  ) => {
    setReactionItem(itemType)
    reactCFProps.mutate({
      body: {
        communityUserId: communityForumUser?._id,
        itemId,
        itemType,
        reaction,
        communityId: communityForumPost.communityId
      },
      id: itemId
    })
  }

  const onDownvote = (id: string) => {
    updateReaction(id, 'post', 'down-vote')
  }

  const onUpvote = (id: string) => {
    updateReaction(id, 'post', 'up-vote')
  }

  const onDownVoteComment = (id: string) => {
    updateReaction(id, 'comment', 'down-vote')
  }

  const onUpVoteComment = (id: string) => {
    updateReaction(id, 'comment', 'up-vote')
  }

  const onAddComment = (data: IACF) => {
    createCFCommentProps.mutate({
      body: {
        communityId: communityForumPost.communityId,
        postId: communityForumPost._id,
        communityUserId: communityForumUser?._id,
        comment: data.comment,
        reply: ''
      }
    })
  }
  const onCancelComment = () => {
    setIsComment(false)
  }

  const comments = getCFCommentProps?.data?.data?.communityForumComments || []

  const onShowUserData = (post: IGETCommunityForumPost) => {
    rsProps.addRightSectionHistory()
    rsProps.callSection({
      action: 'view',
      component: 'community-forum-user-data',
      title: 'View User',
      data: {
        post
      }
    })
  }

  return (
    <div className="pt-2 f-column-33">
      <div className="border rounded px-3 py-1">
        <ForumPost
          isLoad={getCFPostsProps.isLoading}
          post={communityForumPost || post}
          onComment={() => {
            onComment('')
          }}
          onDownvote={() => {
            onDownvote(communityForumPost._id || post._id)
          }}
          onUpVote={() => {
            onUpvote(communityForumPost._id || post._id)
          }}
          onShowUserData={() => onShowUserData(communityForumPost || post._id)}
          isViewMore
          hideComment
        />
      </div>
      {isComment ? (
        <div className="box-transition">
          <AddComment
            onAddComment={onAddComment}
            onCancel={onCancelComment}
            isLoading={createCFCommentProps.isLoading}
            hookForm={hookForm}
          />
        </div>
      ) : null}

      <div className="f-column-33">
        <div className="border-label rounded p-4 ">
          <CommentInfo
            isComment={isComment}
            isLoading={getCFCommentProps.isLoading}
            setIsComment={setIsComment}
            comments={comments.length}
            onRefresh={onRefreshCFComments}
            isMember={!!communityForumUser}
            onAddComment={() => setIsComment(true)}
          />
        </div>
        <div
          className="f-column gap-20 border-label rounded p-4"
          style={{ height: '40vh', overflow: 'auto' }}
        >
          {comments.map((comment, index) => (
            <ForumComment
              key={index}
              commentProps={comment}
              onDownvote={() => {
                onDownVoteComment(comment._id)
              }}
              onUpVote={() => {
                onUpVoteComment(comment._id)
              }}
              onShowUserData={() => onShowUserData(communityForumPost)}
              post={communityForumPost}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const CommentInfo = ({
  comments,
  isComment,
  setIsComment,
  isLoading,
  onRefresh,
  isMember,
  onAddComment
}: {
  comments?: number
  isComment: boolean
  setIsComment: (comment: boolean) => void
  isLoading: boolean
  onRefresh: () => void
  isMember?: boolean
  onAddComment: () => void
}) => {
  return (
    <div className="f-row-33 aic">
      {!isComment ? (
        <div className="f-row-33 aic">
          <TypeSmallButton title="Add Comment" onClick={onAddComment} />
        </div>
      ) : null}
      <p className="text-tiny ff-light m-0">
        {comments || 0}
        &nbsp; Comments
      </p>
      {!isComment && isMember ? (
        <>
          <p
            className="text-tiny ff-regular color-brand m-0 cursor-pointer"
            onClick={() => setIsComment(true)}
          >
            Add Comment
          </p>
        </>
      ) : null}
      <>
        <HVCLoad
          removeDOM
          view
          load={isLoading}
          className="mx-wh-fit cursor-pointer"
          onClick={onRefresh}
        >
          <RefreshSVG />
        </HVCLoad>
      </>
    </div>
  )
}

export default ViewCommunityForumPost
