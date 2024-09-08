import moment from 'moment'
import { getModernRole, ReactionComponent } from './utils'
import { DislikeSVG, LikeSVG } from '../../../components/utils/svgs'
import {
  IGETCommunityForumComment,
  IGETCommunityForumPost
} from '../../../interface/ICommunityForum'
import { getUserRole } from '../../../constants/global'
import { HVC } from '../../../components/utils/hvc'
import { _mutateHTMLPost } from '../../../components/utils/helper'

export interface IFC {
  onUpVote?: () => void
  onDownvote?: () => void
  commentProps: IGETCommunityForumComment
  onShowUserData?: (id: string) => void
  post: IGETCommunityForumPost
}

const ForumComment: React.FC<IFC> = ({
  commentProps,
  onDownvote,
  onUpVote,
  onShowUserData,
  post
}) => {
  const {
    comment,
    modified,
    user,
    // userLevel,
    upVoteCount,
    downVoteCount,
    isDownVote,
    isUpVote
  } = commentProps
  const { userName, role } = user
  // const { title: levelTitle } = userLevel

  const userRole = getUserRole(role)

  const uDownVote = isDownVote
  const uUpVote = isUpVote

  return (
    <div className="border-bottom pb-4 f-row-17 algin-items-start">
      <div className="flag-post-user">
        <p className="m-0 text-little ff-bold">
          {userName?.[0]?.toUpperCase()}
        </p>
      </div>
      <div className="w-100">
        <div>
          <div className="f-row-40 aic pb-2 mb-3">
            <div className="f-row-20 aic">
              <h6
                className="m-0 text-little cursor-pointer text-hover-underline color-label"
                onClick={() => onShowUserData?.(post._id)}
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
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: _mutateHTMLPost(comment) }}
            className="text-medium ff-bold"
          />
        </div>
        <HVC removeDOM view={false} className="f-row-30 aic">
          <ReactionComponent
            icon={<LikeSVG />}
            action={onUpVote}
            value={upVoteCount}
            uReacted={uUpVote}
          />
          <ReactionComponent
            icon={<DislikeSVG />}
            action={onDownvote}
            value={downVoteCount}
            uReacted={uDownVote}
          />
        </HVC>
      </div>
    </div>
  )
}

export default ForumComment
