import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../../constants/pageurl'
import { NotificationSVG } from '../../../utils/svgs'
import './style.scss'

const NotificationWidget = () => {
  const navigate = useNavigate()

  return (
    <div className="mobile-wrapper">
      <div className="all-notification-wrapper desktop-notification">
        <div
          className="hw-mx cursor-pointer"
          onClick={() => navigate(pageurl.NOTIFICATION)}
        >
          <NotificationSVG />
        </div>
      </div>
      <div className="all-notification-wrapper mobile-notification ">
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
