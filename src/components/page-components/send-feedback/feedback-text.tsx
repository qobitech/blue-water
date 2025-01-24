import { FC } from 'react'
import { TypeTextArea } from '../../utils/text-area'
import { IFeedbackText } from './utils'
import { FeedbackCTA } from './feedback-cta'

export const FeedbackText: FC<IFeedbackText> = ({
  feedbackText,
  setFeedbackText,
  handleDoneWithFeedback,
  cancelFeedback,
  color
}) => {
  return (
    <div className="f-column-33 w-100">
      <TypeTextArea
        autoresize
        autoFocus
        label=""
        placeholder="Answer here..."
        onChange={(e) => setFeedbackText(e.target.value)}
        value={feedbackText}
      />
      <FeedbackCTA
        handleDoneWithFeedback={handleDoneWithFeedback}
        cancelFeedback={cancelFeedback}
        isDone={feedbackText.length > 3}
        color={color}
      />
    </div>
  )
}
