import { FC, useState } from 'react'
import { MetaData } from './meta-data'
import { IRSFeedback, feedbackType } from './utils'
import { WatchDemo } from './watch-demo'
import { FeedbackActions } from './feedback-actions'
import { FeedbackText } from './feedback-text'
import { FeedbackAudio } from './feedback-audio'
import { useAudioRecorder } from './audio-record-legacy-2'
import { SubmitFeedback } from './submit-feedback'
import { useModal } from '../../utils/modal'

export const RSFeedback: FC<IRSFeedback> = ({ feedbackContent }) => {
  const [feedbackType, setFeedbackType] = useState<feedbackType>()
  const [feedbackText, setFeedbackText] = useState<string>('')
  const [watchDemo, setWatchDemo] = useState<boolean>(false)

  const audioProps = useAudioRecorder()

  const handleAudio = () => {
    setFeedbackType('audio')
  }

  const handleText = () => {
    setFeedbackType('text')
  }

  const cancelFeedback = () => {
    setFeedbackType(undefined)
    setFeedbackText('')
  }

  const handleWatchDemo = () => {
    setWatchDemo(!watchDemo)
  }

  const notificationProps = useModal()

  const handleDoneWithFeedback = () => {
    notificationProps.handleOpenModal('Submit Feedback')
  }

  const handleSubmit = () => {
    notificationProps.handleCloseModal(() => setFeedbackType(undefined))
  }

  return (
    <div className="w-100 f-column-33">
      <div className="w-100 f-row-21 flex-wrap">
        <div
          className={`flex-basis-55 bg-light text-center ${
            watchDemo ? '' : 'd-none'
          }`}
        >
          <WatchDemo feedbackContent={feedbackContent} />
        </div>
        <div className="flex-basis-42 m-auto">
          <div
            className={`f-column-37 ${
              watchDemo ? 'feedback-content' : 'aic text-center '
            } jcc h-100 p-2`}
          >
            <h4 className="m-0" style={{ lineHeight: '2.2rem' }}>
              {feedbackContent.subject}
            </h4>
            {!feedbackType && (
              <>
                <FeedbackActions
                  handleAudio={handleAudio}
                  handleWatchDemo={handleWatchDemo}
                  handleText={handleText}
                  watchDemo={watchDemo}
                />
                <div className="f-row-11 aic">
                  <p className="m-0 font-10 color-label">
                    {feedbackContent.totalFeedback.toLocaleString()} feedback
                    collected
                  </p>
                </div>
              </>
            )}
            <div className="w-100">
              {feedbackType === 'text' && (
                <FeedbackText
                  feedbackText={feedbackText}
                  setFeedbackText={setFeedbackText}
                  handleDoneWithFeedback={handleDoneWithFeedback}
                  cancelFeedback={cancelFeedback}
                />
              )}
              {feedbackType === 'audio' && (
                <FeedbackAudio
                  audioProps={audioProps}
                  handleDoneWithFeedback={handleDoneWithFeedback}
                  cancelFeedback={cancelFeedback}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <MetaData feedbackContent={feedbackContent} />
      <SubmitFeedback
        notificationProps={notificationProps}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
