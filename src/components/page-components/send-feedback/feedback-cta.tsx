import { FC } from 'react'
import { IFeedbackCTA } from './utils'

export const FeedbackCTA: FC<IFeedbackCTA> = ({
  handleDoneWithFeedback,
  cancelFeedback,
  isDone,
  color
}) => {
  return (
    <div className="f-row-11 aic jce">
      <div
        className={`f-row-11 aic hw-mx px-3 py-2 rounded-43 ${
          isDone ? 'cursor-pointer' : 'bg-light cursor-not-allowed'
        } rounded `}
        style={{
          height: '35px',
          background: !isDone
            ? ''
            : `linear-gradient(35deg, ${color?.to}, ${color?.from})`
        }}
        onClick={isDone ? handleDoneWithFeedback : undefined}
      >
        <p
          className={`text-tiny m-0 ${isDone ? '' : 'color-label'}`}
          style={{ color: !isDone ? '' : color.text }}
        >
          Done
        </p>
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
