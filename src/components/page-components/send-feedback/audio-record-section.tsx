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
  return (
    <div className="f-column-33">
      <div className="f-column-17 justify-content-center">
        {recording ? (
          <div className="position-relative">
            <div
              className="position-absolute f-column aic w-100 pt-3"
              style={{ top: 0 }}
            >
              <div className="text-center text-white">
                <h6 className="color-label">New Recording</h6>
              </div>
              <div className="text-center text-white">
                <p className="text-little">{formatTime(recordingTime)}</p>
              </div>
            </div>
            <AudioWaveVisualizer />
          </div>
        ) : null}
        <div className="f-row justify-content-center">
          <div
            style={{
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              border: '1px solid #cacaca'
            }}
            className="f-row jcc aic"
          >
            {!recording ? (
              <div
                style={{
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  background: 'red'
                }}
                onClick={handleStartRecording}
              />
            ) : (
              <div
                style={{
                  borderRadius: '5px',
                  width: '40px',
                  height: '40px',
                  background: 'red'
                }}
                onClick={handleStopRecording}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioRecordSection
