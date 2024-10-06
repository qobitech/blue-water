import { useState, useRef } from 'react'

export interface IUseAudioRecorderProps {
  recording: boolean
  audioURL: string | null
  handleStartRecording: () => Promise<void>
  handleStopRecording: () => void
  handleDeleteRecording: () => void
  recordingTime: number
}

export const useAudioRecorder = (): IUseAudioRecorderProps => {
  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const localChunks = useRef<Blob[]>([]) // Use a ref for storing chunks locally
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

      // Add a small delay to avoid issues with permissions on mobile browsers
      setTimeout(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              sampleRate: 16000
            }
          })

          if (stream) {
            const mediaRecorder = new MediaRecorder(stream, {
              mimeType: 'audio/webm'
            })
            mediaRecorderRef.current = mediaRecorder

            mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                localChunks.current.push(event.data)
              } else {
                console.log('No data recorded in this chunk')
              }
            }

            mediaRecorder.onstop = () => {
              if (localChunks.current.length > 0) {
                const audioBlob = new Blob(localChunks.current, {
                  type: 'audio/webm'
                })
                const audioUrl = URL.createObjectURL(audioBlob)
                setAudioURL(audioUrl)
                localChunks.current = [] // Reset chunks after recording
                if (intervalRef.current) clearInterval(intervalRef.current)
              } else {
                console.error('No audio chunks were recorded.')
              }
            }

            mediaRecorder.start()
            setRecording(true)
            startTimeRef.current = Date.now()

            // Track the recording time manually
            intervalRef.current = setInterval(() => {
              if (startTimeRef.current) {
                setElapsedTime((Date.now() - startTimeRef.current) / 1000) // Convert to seconds
              }
            }, 1000) // Update every second
          }
        } catch (err) {
          console.error('Error accessing microphone:', err)

          // Check if it's a permission error
          if (
            err.name === 'NotAllowedError' ||
            err.name === 'PermissionDeniedError'
          ) {
            alert(
              'Microphone access was denied. Please enable microphone permissions in your browser settings.'
            )
          } else if (err.name === 'NotFoundError') {
            alert(
              'No microphone found. Please ensure a microphone is connected and accessible.'
            )
          } else {
            alert(
              'There was an error accessing the microphone. Please check your permissions or device settings.'
            )
          }
        }
      }, 500) // Add a 500ms delay for mobile browsers
    } catch (err) {
      console.error('Error accessing microphone:', err)
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
