import { useEffect, useRef, useState } from 'react'
import { CommentComponent, getModernRole, ReactionComponent } from './utils'
import moment from 'moment'
import { CommentSVG, DislikeSVG, LikeSVG } from '../../../components/utils/svgs'
import { IGETCommunityForumPost } from '../../../interface/ICommunityForum'
import { getUserRole } from '../../../constants/global'
import { HVC, HVCLoad } from '../../../components/utils/hvc'
import {
  BottomAngleSVG,
  TopAngleSVG
} from '../../../components/utils/svgs/f-awesome'
import { _mutateHTMLPost } from '../../../components/utils/helper'

export interface IFP {
  onUpVote?: () => void
  onDownvote?: () => void
  onComment?: () => void
  onView?: () => void
  isLoad?: boolean
  onShowUserData?: () => void
  post: IGETCommunityForumPost
  isViewMore?: boolean
  hideComment?: boolean
}

export const ForumPost: React.FC<IFP> = ({
  post,
  onComment,
  onDownvote,
  onUpVote,
  onView,
  isLoad,
  onShowUserData,
  isViewMore,
  hideComment
}) => {
  const {
    commentCount,
    modified,
    user,
    downVoteCount,
    upVoteCount,
    post: writeUp
    // userLevel
  } = post

  const { userName, role } = user

  // const { title: levelTitle } = userLevel

  const uReactedComment = post.isComment
  const uReactedDownVote = post.isDownVote
  const uReactedUpVote = post.isUpVote

  const userRole = getUserRole(role)

  const divRef = useRef<HTMLDivElement>(null)

  const [viewMore, setViewMore] = useState<boolean>(false)
  const [isMore, setIsMore] = useState<boolean>(false)

  useEffect(() => {
    // Accessing the height of the div
    if (divRef.current) {
      const height = divRef.current.clientHeight
      if (height === 64 && isViewMore) {
        setIsMore(true)
        setViewMore(true)
      }
    }
  }, [])

  return (
    <div className="py-3 f-row-15 ais">
      <div className="flag-post-user">
        <p className="m-0 text-little ff-bold">
          {userName?.[0]?.toUpperCase()}
        </p>
      </div>
      <div className="w-100" style={{ paddingTop: '1.5px' }}>
        <div>
          <div className="f-row-50 aic pb-2 mb-2">
            <div className="f-row-20 aic">
              <h6
                className="m-0 text-little cursor-pointer text-hover-underline color-label"
                onClick={onShowUserData}
              >
                {userName || '...'}
              </h6>

              {/* <HVC
                removeDOM
                view={userRole === 'seller'}
                className={`f-row-20 align-items-center`}
              >
                <div className={`cf-user-tier-indicator ${levelTitle}`}>
                  <p className="m-0 text-tiny">{levelTitle || '...'}</p>
                </div>
              </HVC> */}
              <div className={`mx-wh-fit cf-user-role-indicator ${userRole}`}>
                <p className="m-0 text-tiniest">{getModernRole(userRole)}</p>
              </div>
            </div>
            <div className="f-row ml-auto text-right">
              <p className="m-0 text-tiny color-light">
                {moment(modified).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <div onClick={onView} style={{ cursor: 'default' }}>
          <div
            dangerouslySetInnerHTML={{ __html: _mutateHTMLPost(writeUp) }}
            className={viewMore ? '' : 'multiline-ellipsis'}
            ref={divRef}
          />
        </div>
        <div className="f-row-30 aic">
          {!hideComment ? (
            <CommentComponent
              icon={<CommentSVG />}
              action={onComment}
              value={commentCount}
              uReacted={uReactedComment}
            />
          ) : null}
          <HVC removeDOM view={false}>
            <ReactionComponent
              icon={<LikeSVG />}
              value={upVoteCount}
              action={onUpVote}
              uReacted={uReactedUpVote}
            />
          </HVC>
          <HVC removeDOM view={false}>
            <ReactionComponent
              icon={<DislikeSVG />}
              action={onDownvote}
              value={downVoteCount}
              uReacted={uReactedDownVote}
            />
          </HVC>
          <HVCLoad removeDOM load={isLoad} className="ml-auto" />
          {isMore ? (
            <div className="ml-auto">
              <p
                className={`m-0 text-little cursor-pointer ${
                  viewMore ? 'color-light' : ''
                }`}
                onClick={() => setViewMore(!viewMore)}
              >
                View {viewMore ? 'less' : 'more'}
                <span className="ml-3">
                  {viewMore ? <TopAngleSVG /> : <BottomAngleSVG />}
                </span>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
