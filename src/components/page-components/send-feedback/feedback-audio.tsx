import { FC } from 'react'
import { IFeedbackAudio } from './utils'
import AudioRecordSection from './audio-record-section'
import { useAudioRecorder } from './audio-record-legacy-2'
import CustomAudioPlayer from './custom-audio-player'

export const FeedbackAudio: FC<IFeedbackAudio> = () => {
  const audioProps = useAudioRecorder()

  return (
    <>
      <div className="w-100 f-column-33">
        {!!audioProps.audioURL && !audioProps.recording && (
          <CustomAudioPlayer audioProps={audioProps} />
        )}
        {(!audioProps.audioURL || audioProps.recording) && (
          <AudioRecordSection audioProps={audioProps} />
        )}
      </div>
    </>
  )
}
