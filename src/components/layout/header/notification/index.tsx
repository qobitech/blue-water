import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../../constants/pageurl'
import { INotificationResponses } from '../../../../interface/INotification'
import { IUseAPI } from '../../../../api'
import { NotificationSVG } from '../../../utils/svgs'
import './style.scss'
import { useGlobalContext } from '../../context'

const NotificationWidget = () => {
  const navigate = useNavigate()
  const { globalStateActions } = useGlobalContext()

  if (!globalStateActions) return <>reload page</>

  const { notificationProps } = globalStateActions

  const getIsNotification = (
    notificationProps?: IUseAPI<INotificationResponses>
  ) => {
    return notificationProps?.data?.data.notifications?.filter(
      (i) => i.status === 'UNREAD'
    )?.length
  }

  const isNotification = getIsNotification(notificationProps)

  return (
    <div className="mobile-wrapper">
      <div className="all-notification-wrapper desktop-notification">
        {isNotification ? <div className="notify-indicator" /> : null}
        <div
          className="hw-mx cursor-pointer"
          onClick={() => navigate(pageurl.NOTIFICATION)}
        >
          <NotificationSVG />
        </div>
      </div>
      <div className="all-notification-wrapper mobile-notification ">
        {isNotification ? <div className="notify-indicator" /> : null}
        <div
          className="hw-mx cursor-pointer"
          onClick={() => navigate(pageurl.NOTIFICATION)}
        >
          <NotificationSVG color="#fff" />
        </div>
      </div>
    </div>
  )
}

export default NotificationWidget
