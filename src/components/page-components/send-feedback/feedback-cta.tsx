import { FC } from 'react'
import { IFeedbackCTA } from './utils'

export const FeedbackCTA: FC<IFeedbackCTA> = ({
  handleDoneWithFeedback,
  cancelFeedback,
  isDone
}) => {
  return (
    <div className="f-row-11 aic jce">
      <div
        className={`f-row-11 aic hw-mx px-3 py-2 rounded-43 ${
          isDone ? 'border cursor-pointer' : 'bg-light cursor-not-allowed'
        } rounded `}
        style={{ height: '35px' }}
        onClick={isDone ? handleDoneWithFeedback : undefined}
      >
        <p className={`text-tiny m-0 ${isDone ? '' : 'color-label'}`}>Done</p>
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
