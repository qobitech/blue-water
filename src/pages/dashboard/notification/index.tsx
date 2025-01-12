import { useState } from 'react'
import {
  RefreshComponent,
  TabSection,
  useTabSection
} from '../../../components/utils/reusable'
import { useNavigate, useParams } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'
import {
  INotificationResponse,
  INotificationResponses
} from '../../../interface/INotification'

import { TypeInput } from '../../../components/utils/input'
import { TypeSmallButton } from '../../../components/utils/button'
import {
  IUseAPI,
  IUseAPIArg,
  defaultPATCHDataTemplate,
  useAPIPATCH
} from '../../../api'
import RightSection from '../../../components/layout/right-section'
import { getTime } from '../../../components/utils/helper'
import PaginationComponent from '../../../components/utils/pagination'
import './style.scss'
import Template from '../template'
import { useGlobalContext } from '../../../components/layout/context'
import { NotificationSVG } from '../../../components/utils/svgs'
import { useRightSection } from '../../../components/layout/right-section/hooks'

const NotificationPage = () => {
  const { refreshNotificationMessages, globalStateActions } = useGlobalContext()

  if (!globalStateActions) return <></>

  const { notificationProps } = globalStateActions

  const { tab: pageTab } = useParams()
  const navigate = useNavigate()

  const [selectedNotification, setSelectedNotification] =
    useState<INotificationResponse | null>(null)

  enum notificationEnum {
    ALL = 'All',
    REQUESTS = 'Requests',
    BETTIPS = 'Bet Tips',
    SUBSCRIPTION = 'Subscription',
    CASE = 'Case',
    COMMUNITY = 'Community Forum'
  }

  const getDefaultTab = () => {
    return pageTab || notificationEnum.ALL
  }

  const { tabProps, tab } = useTabSection(
    getDefaultTab(),
    notificationEnum,
    '',
    (tab) => {
      navigate(`${pageurl.NOTIFICATION}/${tab}`)
      setSelectedNotification(null)
    }
  )

  const isAll = notificationEnum.ALL === tab
  const isReq = notificationEnum.REQUESTS === tab
  const isBet = notificationEnum.BETTIPS === tab
  const isSub = notificationEnum.SUBSCRIPTION === tab
  const isCase = notificationEnum.CASE === tab
  const isCommunityForum = notificationEnum.COMMUNITY === tab

  const filterNotifications = (notification: INotificationResponse) => {
    if (isAll) return true
    if (isReq) return notification.category === 'REQUESTS'
    if (isBet) return notification.category === 'BETTIPS'
    if (isSub) return notification.category === 'SUBSCRIPTION'
    if (isCase) return notification.category === 'CASE'
    if (isCommunityForum) return notification.category === 'COMMUNITY FORUM'
    return false
  }

  const getFilteredNotifications = (
    notificationProps?: IUseAPI<INotificationResponses>
  ) => {
    return (
      notificationProps?.data?.data?.notifications?.filter(
        filterNotifications
      ) || []
    )
  }
  const notifications = [
    // ...getFilteredNotifications(disappearingCodeNotificationProps),
    ...getFilteredNotifications(notificationProps)
  ]

  const handlePagination = (selectedItem: { selected: number }) => {}

  const { mutate } = useAPIPATCH({
    route: 'notification',
    defaultData: {
      ...defaultPATCHDataTemplate,
      data: {
        notification: {} as INotificationResponse
      }
    },
    onSuccess: (data) => {
      refreshNotificationMessages?.()
      if (data?.data?.notification.status === 'UNREAD') {
        setSelectedNotification(null)
      }
    }
  })

  const handleUpdate = (data: IUseAPIArg) => {
    mutate(data)
  }

  const rsProps = useRightSection()

  return (
    <>
      <div className="rsprops-class-notification">
        <RightSection rsProps={rsProps}>
          {rsProps.isView('view', 'notification') ? (
            <ReadNotification selectedNotification={selectedNotification} />
          ) : null}
        </RightSection>
      </div>
      <Template
        title="Notification"
        icon={<NotificationSVG />}
        crumbs={[{ title: 'Notification', url: `${pageurl.NOTIFICATION}` }]}
      >
        <TabSection tabProps={tabProps} position="start" tabGap="30" />
        <div className="f-column-7">
          <div className="f-row aic">
            <div className="f-row-20 aic text-left">
              <p className="m-0 text-small">Inbox</p>
              <RefreshComponent
                onRefresh={refreshNotificationMessages}
                load={notificationProps?.isLoading}
              />
            </div>
            <div className="ml-auto f-row-10 aic jce">
              <TypeInput
                style={{ height: '40px', fontSize: '14px' }}
                placeholder="Search notification..."
              />
              <TypeSmallButton title="Search" />
            </div>
          </div>
          <div className="f-row aistretch jcsb">
            <div className="notification-left">
              {!notifications?.length ? (
                <p className="m-0 color-light text-small">No data</p>
              ) : (
                <div className="f-column">
                  <div
                    style={{
                      height: '45vh',
                      overflow: 'scroll'
                    }}
                    className="f-column pb-2 gap-10"
                  >
                    {notifications
                      .filter(filterNotifications)
                      .map((notification, index) => (
                        <NotificationItem
                          key={index}
                          notification={notification}
                          // key={notification._id}
                          handleUpdate={handleUpdate}
                          onSelectNotification={() => {
                            setSelectedNotification(notification)
                            rsProps.callSection({
                              action: 'view',
                              component: 'notification',
                              title: 'View Notification'
                            })
                          }}
                        />
                      ))}
                  </div>
                  <PaginationComponent
                    currentPage={
                      (notificationProps?.data?.currentPage || 1) - 1
                    }
                    pages={notificationProps?.data?.pages || 1}
                    handlePagination={handlePagination}
                  />
                </div>
              )}
            </div>
            <div className="w-100 p-3 border rounded notification-right">
              <ReadNotification selectedNotification={selectedNotification} />
            </div>
          </div>
        </div>
      </Template>
    </>
  )
}

const ReadNotification = ({
  selectedNotification
}: {
  selectedNotification: INotificationResponse | null
}) => {
  return (
    <>
      {!selectedNotification ? (
        <div className="f-row aic jcc h-100">
          <p className="m-0 color-light text-little">
            Click message on the left to read here
          </p>
        </div>
      ) : (
        <div>
          <div className="f-row aic jcsb mb-3">
            <p className="m-0">{selectedNotification?.sender?.userName}</p>
            <p className="m-0 color-light text-little mml-auto">
              {new Date(selectedNotification?.createdAt).toDateString()}
              &nbsp;&nbsp;-&nbsp;&nbsp;
              {getTime(selectedNotification?.createdAt)}
            </p>
          </div>
          <div className="border-bottom py-2 mb-4">
            <p>
              <b>{selectedNotification?.title}</b>
            </p>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: selectedNotification?.body
            }}
            // style={{ fontSize: '18px' }}
            className="mb-0 text-small"
          />
        </div>
      )}
    </>
  )
}

function removeHTML(data: string): string {
  if (typeof data !== 'string') return '' // Ensure data is a string
  const regExp = /(&nbsp;|<([^>]+)>)/gi // RegExp to match HTML tags and &nbsp;
  const res = data.replace(regExp, ' ') // Replace HTML tags and &nbsp; with a space
  const wSExp = /\s{2,}/gi // RegExp to match multiple consecutive whitespaces
  return res.replace(wSExp, ' ').trim() // Replace multiple whitespaces with a single space and trim the result
}

const NotificationItem = ({
  notification,
  handleUpdate,
  onSelectNotification
}: {
  notification: INotificationResponse
  handleUpdate: (data: IUseAPIArg) => void
  onSelectNotification: () => void
}) => {
  return (
    <div
      className="border rounded p-3 cursor-pointer"
      onClick={() => {
        onSelectNotification()
        if (notification.status === 'UNREAD')
          handleUpdate({
            id: notification._id,
            body: {
              status: 'READ'
            }
          })
      }}
    >
      <div className="text-left mb-3 f-row-15 ais">
        <p className="m-0 text-little color-light">
          {notification.sender.userName}
        </p>
      </div>
      <div className="text-left w-100">
        <div
          dangerouslySetInnerHTML={{ __html: notification.title }}
          className={`m-0 mb-2 w-100 single-ellipsis ${
            notification.status === 'READ' ? 'color-light' : ''
          }`}
          style={{ fontWeight: notification.status === 'READ' ? '' : 'bold' }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: removeHTML(notification.body) }}
          className="m-0 w-100 text-little color-light single-ellipsis"
        />
        <div className="f-row aic jcsb mt-4">
          <p
            className="m-0 text-little cursor-pointer color-brand"
            onClick={() =>
              handleUpdate({
                id: notification._id,
                body: {
                  status: notification.status === 'READ' ? 'UNREAD' : 'READ'
                }
              })
            }
          >
            Mark as {notification.status === 'READ' ? 'unread' : 'read'}
          </p>
          <p className="m-0 text-little color-light">
            {new Date(notification.createdAt).toDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
