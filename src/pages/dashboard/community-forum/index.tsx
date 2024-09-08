import { useEffect } from 'react'
import { TypeSmallButton } from '../../../components/utils/button'
import ViewCommunityForum from './view-community-forum'
import { IGETCommunityForum } from '../../../interface/ICommunityForum'
import { isAdmin } from '../../../constants/pageurl'
import { useNavigate } from 'react-router-dom'
import { useQueryValuesHook } from '../../../components/utils/hooks'
import moment from 'moment'
import './index.scss'
import {
  RefreshComponent,
  SeparatorComponent
} from '../../../components/utils/reusable'
import { getIsAdminLogged } from '../../../constants/global'
import Template from '../template'
import { HVC } from '../../../components/utils/hvc'
import { _mutateHTMLPost } from '../../../components/utils/helper'
import { useGetCommunityForum } from '../../../api/community-forum'
import Skeleton from '../../../components/utils/skeleton'
import { useGlobalContext } from '../../../components/layout/context'
import { CommunitySVG } from '../../../components/utils/svgs'

const CommunityForum = () => {
  return (
    <Template
      title="Community Forum"
      icon={<CommunitySVG />}
      crumbs={[{ title: 'Community Forum', url: '' }]}
    >
      <CommunityForumBody />
    </Template>
  )
}

const CommunityForumBody = () => {
  const { rsProps } = useGlobalContext()

  const getCFProps = useGetCommunityForum()

  if (!rsProps) return <>reload page</>

  const navigate = useNavigate()

  const { forum } = useQueryValuesHook()

  const getCommunityForums = () => {
    getCFProps.mutate({ query: `?status=active` })
  }

  useEffect(() => {
    getCommunityForums()
  }, [])

  const onJoin = (forum: IGETCommunityForum) => {
    rsProps.callSection({
      action: 'create',
      component: 'community-forum-join',
      title: `Join ${forum.title}`,
      data: {
        forum
      },
      onRefresh: getCommunityForums
    })
  }

  const onView = (communityForum: IGETCommunityForum) => {
    if (isAdmin) {
      navigate(`?forum=${communityForum.slug}`)
    } else {
      navigate(`?forum=${communityForum.slug}`)
    }
  }

  const onCreate = () => {
    rsProps.callSection({
      action: 'create',
      component: 'community-forum',
      title: 'Create Community Forum'
    })
  }

  const communityForums = getCFProps?.data?.data?.communityForums || []

  if (!communityForums?.length && getCFProps.isLoading) {
    return <Skeleton />
  }

  return (
    <div>
      <HVC removeDOM view={!forum} className={'f-column gap-20'}>
        <div className="f-row-20">
          <RefreshComponent
            load={getCFProps.isLoading}
            onRefresh={getCommunityForums}
          />
          {getIsAdminLogged() ? (
            <TypeSmallButton title="Create" onClick={onCreate} />
          ) : null}
        </div>
        <div className="gap-25 grid-wrapper-40">
          {communityForums.map((forum, index) => (
            <CommunityForumItem
              key={index}
              description={forum.description}
              title={forum.title}
              createdAt={forum.createdAt}
              onJoin={() => onJoin(forum)}
              users={forum.memberCount || 0}
              onView={() => onView(forum)}
              isMember={forum.isMember}
            />
          ))}
        </div>
      </HVC>
      <HVC removeDOM view={!!forum}>
        <ViewCommunityForum />
      </HVC>
    </div>
  )
}

export default CommunityForum

export interface ICFI {
  title: string
  description: string
  createdAt: string
  users: number
  onJoin?: () => void
  onView?: () => void
  isMember: boolean
}

const CommunityForumItem: React.FC<ICFI> = ({
  title,
  description,
  users,
  onJoin,
  onView,
  createdAt,
  isMember
}) => {
  return (
    <div className="border p-4 rounded f-column">
      <div>
        <h6 className="m-0 single-ellipsis ff-bold">{title}</h6>
      </div>
      <div className="f-row-10 flex-wrap aic pt-2">
        <p className="color-label m-0 text-tiny">
          {moment(createdAt).fromNow()}
        </p>
        <SeparatorComponent />
        <p className="color-brand m-0 text-tiny">
          {users}&nbsp; member{users > 1 ? 's' : ''}
        </p>
      </div>
      <div className="f-row-10 flex-wrap aic py-4">
        <div
          dangerouslySetInnerHTML={{ __html: _mutateHTMLPost(description) }}
          className="text-small single-ellipsis"
        />
      </div>
      <div className="f-row-10 flex-wrap mt-auto">
        {!isMember ? (
          <TypeSmallButton title="Join" onClick={onJoin} buttonType="active" />
        ) : null}
        <TypeSmallButton title="View" onClick={onView} />
      </div>
    </div>
  )
}
