import { FC } from 'react'
import { IFeedbackCTA } from './utils'

export const FeedbackCTA: FC<IFeedbackCTA> = ({
  handleDoneWithFeedback,
  cancelFeedback
}) => {
  return (
    <div className="f-row-11 aic jce">
      <div
        className="f-row-11 aic hw-mx px-3 py-2 rounded-43 border rounded cursor-pointer"
        style={{ height: '35px' }}
        onClick={handleDoneWithFeedback}
      >
        <p className="text-tiny m-0">Done</p>
      </div>
      <div
        className="f-row-11 aic hw-mx px-3 py-2 rounded-43 bg-light rounded cursor-pointer"
        style={{ height: '35px' }}
        onClick={cancelFeedback}
      >
        <p className="text-tiny m-0 color-label">Cancel</p>
      </div>
    </div>
  )
}
