import { FC } from 'react'
import { IFeedbackAudio } from './utils'
import AudioRecordSection from './audio-record-section'
import CustomAudioPlayer from './custom-audio-player'
import { FeedbackCTA } from './feedback-cta'

export const FeedbackAudio: FC<IFeedbackAudio> = ({
  audioProps,
  handleDoneWithFeedback,
  cancelFeedback,
  color
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
        {!audioProps.recording && (
          <FeedbackCTA
            handleDoneWithFeedback={handleDoneWithFeedback}
            cancelFeedback={() => {
              if (audioProps.audioURL)
                audioProps.handleDeleteRecording(cancelFeedback)
              cancelFeedback()
            }}
            isDone={!!audioProps.audioURL}
            color={color}
          />
        )}
      </div>
    </>
  )
}
