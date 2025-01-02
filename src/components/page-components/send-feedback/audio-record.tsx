import { useState, useRef } from 'react'

export interface IUseAudioRecorderProps {
  recording: boolean
  audioURL: string | null
  handleStartRecording: () => Promise<void>
  handleStopRecording: () => void
  handleDeleteRecording: () => void
  recordingTime: number
}

const checkMimeTypeSupport = (mimeType: string) => {
  return MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined
}

export const useAudioRecorder = (): IUseAudioRecorderProps => {
  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const localChunks = useRef<Blob[]>([])
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleStartRecording = async () => {
    const isConfirmDelete = audioURL
      ? window.confirm(
          'Starting a new recording will replace the current one. Do you want to continue?'
        )
      : true

    if (!isConfirmDelete) return

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        alert('Your browser does not support audio recording.')
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      })

      if (!stream) {
        alert('Unable to access microphone. Please try again.')
        return
      }

      // Check for supported MIME type
      const mimeType =
        checkMimeTypeSupport('audio/webm') ||
        checkMimeTypeSupport('audio/ogg') ||
        'audio/wav' // Fallback MIME type

      const mediaRecorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          localChunks.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        if (localChunks.current.length > 0) {
          const audioBlob = new Blob(localChunks.current, { type: mimeType })
          const audioUrl = URL.createObjectURL(audioBlob)
          setAudioURL(audioUrl)
          localChunks.current = []
        }
        if (intervalRef.current) clearInterval(intervalRef.current)
      }

      mediaRecorder.start()
      setRecording(true)
      startTimeRef.current = Date.now()

      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setElapsedTime((Date.now() - startTimeRef.current) / 1000)
        }
      }, 1000)
    } catch (err: any) {
      console.error('Error accessing microphone:', err)

      if (
        err.name === 'NotAllowedError' ||
        err.name === 'PermissionDeniedError'
      ) {
        alert('Microphone access was denied. Please enable permissions.')
      } else if (err.name === 'NotFoundError') {
        alert('No microphone found. Please check your device.')
      } else {
        alert('An error occurred. Please try again.')
      }
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null
      setRecording(false)

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }

  const handleDeleteRecording = () => {
    const isConfirmDelete = window.confirm(
      'Are you sure you want to delete the recording?'
    )
    if (isConfirmDelete) {
      setRecording(false)
      setAudioURL(null)
      setElapsedTime(0)
      mediaRecorderRef.current = null
      localChunks.current = []
      startTimeRef.current = null

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }

  return {
    recording,
    audioURL,
    handleStartRecording,
    handleStopRecording,
    recordingTime: elapsedTime,
    handleDeleteRecording
  }
}
