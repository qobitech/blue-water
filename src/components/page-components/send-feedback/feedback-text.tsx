import { FC } from 'react'
import { TypeTextArea } from '../../utils/text-area'
import { IFeedbackText } from './utils'

export const FeedbackText: FC<IFeedbackText> = ({
  feedbackText,
  setFeedbackText
}) => {
  return (
    <>
      <TypeTextArea
        autoresize
        autoFocus
        label="Whats on your mind?"
        placeholder="Type here..."
        onChange={(e) => setFeedbackText(e.target.value)}
        value={feedbackText}
      />
    </>
  )
}
