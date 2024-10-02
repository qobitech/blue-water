import React, { useRef, useState, useEffect } from 'react'
import { BinSVG, PauseSVG, PlaySVG, StopSVG } from '../../utils/svgs'
import { _isMobile, formatTime } from '../../utils/helper'
import { IUseAudioRecorderProps } from './audio-record'

interface CustomAudioPlayerProps {
  audioProps: IUseAudioRecorderProps
}

const defaultTime = '00 : 00'

const CustomAudioPlayer = ({
  audioProps: { audioURL, recordingTime, handleDeleteRecording }
}: CustomAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioTime, setAudioTime] = useState(defaultTime)
  const [audioDuration, setAudioDuration] = useState(defaultTime)

  useEffect(() => {
    const audioElement = audioRef.current
    if (audioElement) {
      // Update the duration when the audio loads
      audioElement.onloadedmetadata = () => {
        const duration = formatTime(recordingTime)
        setAudioDuration(duration)
      }

      // Update current time during playback
      audioElement.ontimeupdate = () => {
        const currentTime = formatTime(audioRef.current?.currentTime || 0)
        setAudioTime(currentTime)
      }

      audioElement.addEventListener('ended', stopAudio)
    }

    return () => {
      audioElement?.removeEventListener('ended', stopAudio)
    }
  }, [audioURL])

  // Handle play/pause toggle
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle stopping the audio and reset its time
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setAudioTime(defaultTime)
    }
  }

  return (
    <div className={_isMobile() ? 'f-column-27' : 'f-column-13'}>
      {/* {audioURL && ( */}
      <div className="custom-audio-player">
        {audioURL && <audio ref={audioRef} src={audioURL} hidden />}
        <div
          className="controls-feedback border rounded-43 p-4 f-row-33 aic jcc hw-mx mx-auto"
          style={{ background: '#f7f7f7' }}
        >
          <div className="f-row-17 aic">
            <p className="m-0 color-label">
              Time: {audioTime} / {audioDuration}
            </p>
          </div>

          {/* Play/Pause Button */}
          <div
            className="f-row-12 aic hw-mx cursor-pointer control-item"
            onClick={togglePlayPause}
          >
            {/* <p className="m-0">{isPlaying ? 'Pause' : 'Play'}</p> */}
            {isPlaying ? <PauseSVG /> : <PlaySVG />}
          </div>

          {/* Stop Button */}
          {audioTime !== defaultTime ? (
            <div
              className="f-row-12 aic hw-mx cursor-pointer control-item"
              onClick={stopAudio}
            >
              {/* <p className="m-0">Stop</p> */}
              <StopSVG />
            </div>
          ) : null}

          {/* Delete/Reset Button */}
          {!isPlaying ? (
            <div
              className="f-row-12 aic hw-mx cursor-pointer control-item"
              onClick={handleDeleteRecording}
            >
              {/* <p className="m-0">Delete</p> */}
              <BinSVG />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CustomAudioPlayer
