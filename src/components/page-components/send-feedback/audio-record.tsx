// src/AudioRecorder.tsx

import { useState, useRef } from 'react'

interface IUAR {
  recording: boolean
  audioURL: string | null
  handleStartRecording: () => Promise<void>
  handleStopRecording: () => void
}

export const useAudioRecorder = (): IUAR => {
  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [chunks, setChunks] = useState<Blob[]>([])

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setChunks((prevChunks) => [...prevChunks, event.data])
      }
    }

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: 'audio/wav' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioURL(audioUrl)
      setChunks([])
    }

    mediaRecorder.start()
    setRecording(true)
  }

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  return {
    recording,
    audioURL,
    handleStartRecording,
    handleStopRecording
  }
}
