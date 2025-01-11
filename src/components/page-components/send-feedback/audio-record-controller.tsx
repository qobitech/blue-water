import { useEffect } from 'react'
import { useAudioRecorder } from './audio-record-legacy-2'
import AudioRecordSection from './audio-record-section'
import CustomAudioPlayer from './custom-audio-player'

export const AudioRecordController = () => {
  const audioProps = useAudioRecorder()

  useEffect(() => {
    audioProps.setOptions('audio')
    audioProps.handleStartRecording()
  }, [])

  return (
    <>
      <div className="w-100 f-column-33">
        {!!audioProps.audioURL && !audioProps.recording && (
          <CustomAudioPlayer audioProps={audioProps} />
        )}
        {audioProps.options ? (
          <AudioRecordSection audioProps={audioProps} />
        ) : null}
      </div>
    </>
  )
}
