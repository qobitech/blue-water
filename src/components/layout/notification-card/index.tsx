import React, { useState, useEffect } from 'react'
import './NotificationCard.scss'
import { CheckSVG } from '../../utils/svgs'
import { ErrorSVG } from '../../utils/svgs/f-awesome'

interface NotificationCardProps {
  notice: string
  duration?: number // Optional duration for how long the notification should be visible
  status?: boolean
  handleNotification: (
    notice: string,
    status: boolean,
    dontClose?: boolean
  ) => void
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notice,
  duration = 3000,
  status = true,
  handleNotification
}) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show the notification when the component is mounted
    setVisible(!!notice)

    // Hide the notification after the specified duration
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    const ndtimer = setTimeout(() => {
      handleNotification('', false)
    }, duration + 1000)

    // Cleanup the timer when the component is unmounted
    return () => {
      clearTimeout(timer)
      clearTimeout(ndtimer)
    }
  }, [notice])

  const iconStr = '16px'

  return (
    <div
      className={`notification-card ${visible ? 'show' : ''} ${
        status ? 'success' : 'error'
      } ${notice ? '' : 'no-notice'}`}
    >
      <div className="f-row-7 aic">
        <p className="m-0 text-small">{notice}</p>
        <div
          className="hw-mx f-row aic jcc"
          style={{
            width: iconStr,
            height: iconStr,
            minWidth: iconStr,
            minHeight: iconStr
          }}
        >
          {status ? <CheckSVG color="green" /> : <ErrorSVG />}
        </div>
      </div>
    </div>
  )
}

export default NotificationCard
