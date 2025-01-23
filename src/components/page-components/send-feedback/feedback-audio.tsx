import { FC } from 'react'
import { IFeedbackAudio } from './utils'
import AudioRecordSection from './audio-record-section'
import CustomAudioPlayer from './custom-audio-player'
import { FeedbackCTA } from './feedback-cta'

export const FeedbackAudio: FC<IFeedbackAudio> = ({
  audioProps,
  handleDoneWithFeedback,
  cancelFeedback
}) => {
  return (
    <>
      <div className="w-100 f-column-33">
        {!!audioProps.audioURL && !audioProps.recording && (
          <CustomAudioPlayer audioProps={audioProps} />
        )}
        {(!audioProps.audioURL || audioProps.recording) && (
          <AudioRecordSection audioProps={audioProps} />
        )}
        <FeedbackCTA
          handleDoneWithFeedback={handleDoneWithFeedback}
          cancelFeedback={cancelFeedback}
          isDone={!!audioProps.audioURL}
        />
      </div>
    </>
  )
}
