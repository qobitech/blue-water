import { useState, useRef } from 'react'

// Define types for the media recorder and recorded chunks
type MediaRecorderType = MediaRecorder | null

interface IUSAR {
  startRecording: () => Promise<void>
  stopRecording: () => void
  recording: boolean
  videoURL: string | null
}

export const useScreenAudioRecorder = (): IUSAR => {
  // State to manage recording status and video URL
  const [recording, setRecording] = useState<boolean>(false)
  const [videoURL, setVideoURL] = useState<string | null>(null)

  // Refs for the media recorder and recorded chunks
  const mediaRecorderRef = useRef<MediaRecorderType>(null)
  const recordedChunksRef = useRef<Blob[]>([])

  // Function to start recording
  const startRecording = async () => {
    try {
      // Request screen capture
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      })

      // Request audio capture
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })

      // Combine screen and audio streams
      const combinedStream = new MediaStream([
        ...screenStream.getTracks(),
        ...audioStream.getTracks()
      ])

      // Initialize MediaRecorder with the combined stream
      mediaRecorderRef.current = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm; codecs=vp9'
      })

      // Handle data available event to collect chunks
      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      // Handle stop event to create video URL
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: 'video/webm'
        })
        setVideoURL(URL.createObjectURL(blob))
        recordedChunksRef.current = []
      }

      // Start recording
      mediaRecorderRef.current.start()
      setRecording(true)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  // Function to stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  return {
    startRecording,
    stopRecording,
    recording,
    videoURL
  }
}
