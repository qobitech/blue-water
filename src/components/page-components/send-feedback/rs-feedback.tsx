import { FC, useState } from 'react'
import { MetaData } from './meta-data'
import { IRSFeedback, feedbackType } from './utils'
import { WatchDemo } from './watch-demo'
import { FeedbackActions } from './feedback-actions'
import { FeedbackText } from './feedback-text'
import { FeedbackAudio } from './feedback-audio'
import { FeedbackCTA } from './feedback-cta'

export const RSFeedback: FC<IRSFeedback> = ({ feedbackContent }) => {
  const [feedbackType, setFeedbackType] = useState<feedbackType>()

  const [feedbackText, setFeedbackText] = useState<string>('')

  const handleAudio = () => {
    setFeedbackType('audio')
  }

  const handleText = () => {
    setFeedbackType('text')
  }

  const cancelFeedback = () => {
    setFeedbackType(undefined)
  }

  const handleShare = () => {}

  const handleDoneWithFeedback = () => {
    if (feedbackText) setFeedbackType(undefined)
  }

  return (
    <div className="w-100 f-column-33">
      <div className="w-100 f-row-30">
        <div className="flex-basis-50 bg-light text-center d-none">
          <WatchDemo feedbackContent={feedbackContent} />
        </div>
        <div className="flex-basis-50 m-auto">
          <div className="f-column-37 jcc aic text-center h-100 p-2">
            <h4 className="m-0" style={{ lineHeight: '2.2rem' }}>
              {feedbackContent.subject}
            </h4>
            {!feedbackType && (
              <>
                <FeedbackActions
                  handleAudio={handleAudio}
                  handleShare={handleShare}
                  handleText={handleText}
                />
                <div className="f-row-11 aic">
                  <p className="m-0 font-10 color-label">
                    {feedbackContent.totalFeedback.toLocaleString()} feedback
                    collected
                  </p>
                </div>
              </>
            )}
            <div className="f-column-33 w-100">
              {feedbackType === 'text' && (
                <FeedbackText
                  feedbackText={feedbackText}
                  setFeedbackText={setFeedbackText}
                />
              )}
              {feedbackType === 'audio' && <FeedbackAudio />}
              {!!feedbackType && (
                <FeedbackCTA
                  handleDoneWithFeedback={handleDoneWithFeedback}
                  cancelFeedback={cancelFeedback}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <MetaData feedbackContent={feedbackContent} />
    </div>
  )
}
