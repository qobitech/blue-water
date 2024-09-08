import { FC, useEffect } from 'react'
import { useGetCommunityForumNotifications } from '../../../api/community-forum'
import {
  communityForumNotificationEnum,
  communityForumNotificationType,
  IGETCommunityForum
} from '../../../interface/ICommunityForum'
import Skeleton from '../../../components/utils/skeleton'
import { PreviewSVG } from '../../../components/utils/svgs'
import moment from 'moment'
import { TabSection, useTabSection } from '../../../components/utils/reusable'
import { HVC } from '../../../components/utils/hvc'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

const enums = {
  ALL: 'ALL',
  ...communityForumNotificationEnum
}

const CommunityForumNotifications = ({
  forum
}: {
  forum: IGETCommunityForum
}) => {
  const { tabProps, tab } = useTabSection(enums.ALL, enums)

  return (
    <div className="f-column-13">
      <div>
        <TabSection
          tabProps={tabProps}
          position="start"
          type="block"
          tabGap="10"
        />
      </div>
      <CommunityForumNotificationsBody forum={forum} tab={tab} />
    </div>
  )
}

const CommunityForumNotificationsBody = ({
  forum,
  tab
}: {
  forum: IGETCommunityForum
  tab: string
}) => {
  const notifProps = useGetCommunityForumNotifications()

  const notifications = notifProps?.data?.data?.notifications || []

  useEffect(() => {
    notifProps.mutate({ query: `?receiverId=${forum._id}` })
  }, [forum])

  if (!notifications?.length && notifProps.isLoading) return <Skeleton />

  return (
    <>
      <HVC
        removeDOM
        view={!!notifications.length}
        className="border-label rounded p-4"
      >
        {notifications
          ?.filter((i) => (tab === enums.ALL ? i : i.category === tab))
          ?.map((i, index) => (
            <CFNItem
              key={index}
              body={i.body}
              createdAt={i.createdAt}
              title={i.title}
              url={i.url}
              category={i.category}
            />
          ))}
      </HVC>
      <HVC
        removeDOM
        view={!notifications.length}
        className="border-label rounded p-4 text-center"
      >
        <p className="m-0 text-little color-label">No notifications</p>
      </HVC>
    </>
  )
}

export default CommunityForumNotifications

interface ICFNItem {
  createdAt: string
  url: string
  title: string
  body: string
  category: communityForumNotificationType
}

const CFNItem: FC<ICFNItem> = ({ createdAt, title, url, body, category }) => {
  const navigate = useNavigate()
  const handleNavigate = (url: string) => () => {
    switch (category) {
      case 'BET TIPS':
        navigate(`${pageurl.BETCHANNEL}?slug=${url}&prediction=true`)
        break
      case 'MEMBER':
        navigate(`${pageurl.BETCHANNEL}?slug=${url}`)
        break
      case 'BET WINS':
        navigate(url)
        break
      default:
        navigate(url)
        break
    }
  }

  return (
    <div className="border-label-bottom py-3 f-column-7">
      <div className="f-row jcsb aic">
        <p className="m-0 text-small ff-bold">{title}</p>
        <p className="m-0 text-tiny color-label">
          {moment(createdAt).fromNow()}
        </p>
      </div>
      <p className="m-0 text-little">
        {body}{' '}
        {url ? (
          <span
            className="hw-mx cursor-pointer ml-3"
            onClick={handleNavigate(url)}
          >
            <PreviewSVG />
          </span>
        ) : null}
      </p>
    </div>
  )
}
