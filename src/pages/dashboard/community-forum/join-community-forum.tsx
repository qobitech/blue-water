import { rules } from './data'
import { TypeButton, TypeSmallButton } from '../../../components/utils/button'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import { useJoinCommunityForum } from '../../../api/community-forum'
import { IGETCommunityForum } from '../../../interface/ICommunityForum'
import { HVC } from '../../../components/utils/hvc'
import RequestStatus from '../../../components/utils/request-status'
import { _mutateHTMLPost, _removeHTML } from '../../../components/utils/helper'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

const JoinCommunityForum = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext
  const navigate = useNavigate()

  const [success, setSuccess] = useState<boolean>(false)

  const { forum } = rsProps?.data as {
    forum: IGETCommunityForum
  }

  const onClose = () => {
    rsProps?.closeSection()
  }

  const onSuccessJoinCFPost = () => {
    rsProps?.onRefresh?.()
    setSuccess(true)
  }

  const joinCFProps = useJoinCommunityForum(onSuccessJoinCFPost)

  const onJoin = () => {
    joinCFProps.mutate({
      body: { communityId: forum?._id }
    })
  }

  const onVisitCommunity = () => {
    rsProps?.closeSection()
    navigate(`${pageurl.COMMUNITYFORUM}?forum=${forum.slug}`)
  }

  if (!forum) return <>reload page</>

  return (
    <>
      <HVC removeDOM view={!success} className="f-column-33 pb-4">
        <div>
          <p className="m-0">
            To join {forum?.title || '...'}, please read and accept the
            following terms:
          </p>
        </div>
        <div className="f-column-20 border px-3 py-4 rounded">
          {rules.map((rule, index) => (
            <RulesItem key={index} index={index + 1} rule={rule} />
          ))}
        </div>
        <div className="f-row-20">
          <TypeSmallButton
            title="Accept & Join"
            buttonType="active"
            onClick={onJoin}
            load={joinCFProps.isLoading}
          />
          <TypeSmallButton
            title="Reject & Close"
            buttonType="danger"
            onClick={onClose}
          />
        </div>
      </HVC>
      <HVC removeDOM view={success} className="pt-5">
        <div className="f-column-60 aic text-center">
          <RequestStatus
            title={`You've successfully joined "${forum.title}" community`}
            success
            description={_removeHTML(_mutateHTMLPost(forum.description))}
            loop={false}
            lottie=""
          />
          <div className="cta-wrapper">
            <TypeButton
              title={`Go to "${forum.title}" community`}
              buttonType="outlined"
              onClick={onVisitCommunity}
            />
            <TypeButton title="Close" buttonType="danger" onClick={onClose} />
          </div>
        </div>
      </HVC>
    </>
  )
}

interface IRI {
  rule: string
  index: number
}

export const RulesItem: React.FC<IRI> = ({ rule, index }) => {
  return (
    <div className="f-row ais">
      <div style={{ minWidth: '40px', maxWidth: '40px' }}>
        <p className="text-small m-0 color-label ff-light">{index}.</p>
      </div>
      <p className="m-0 text-small">{rule}</p>
    </div>
  )
}

export default JoinCommunityForum
