import { formatTime } from '../../utils/helper'
import { IUseAudioRecorderProps } from './audio-record-legacy-2'
import AudioWaveVisualizer from './audio-wave-visualizer'

interface ARSProps {
  audioProps: IUseAudioRecorderProps
}

const AudioRecordSection = ({
  audioProps: {
    handleStartRecording,
    handleStopRecording,
    recording,
    recordingTime
  }
}: ARSProps) => {
  const styleh = {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    border: '1px solid rgb(234, 234, 234)',
    flexShrink: 0
  }
  return (
    <div className="f-column-33">
      <div className="f-column-17 justify-content-center">
        {recording ? <AudioWaveVisualizer /> : null}
        <div className="f-row-17 aic justify-content-center p-2">
          {!recording ? (
            <div
              className="f-row-11 jcc aic hw-mx cursor-pointer"
              onClick={handleStartRecording}
            >
              <p className="m-0 text-tiny color-label">Click to record</p>
              <div
                style={{
                  borderRadius: '50%',
                  width: '15px',
                  height: '15px',
                  background: 'red',
                  flexShrink: 0
                }}
              />
            </div>
          ) : (
            <div style={styleh} className="f-row jcc aic">
              <div
                style={{
                  borderRadius: '3px',
                  width: '10px',
                  height: '10px',
                  background: 'red',
                  flexShrink: 0
                }}
                onClick={handleStopRecording}
              />
            </div>
          )}
          {recording ? (
            <p className="m-0 text-little">{formatTime(recordingTime)}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default AudioRecordSection
