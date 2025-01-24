import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { optionType } from '.'

export interface IUseAudioRecorderProps {
  recording: boolean
  audioURL: string | null
  handleStartRecording: () => Promise<void>
  handleStopRecording: () => void
  handleDeleteRecording: (callback?: () => void) => void
  handleSubmit: () => void
  recordingTime: number
  setOptions: Dispatch<SetStateAction<optionType>>
  options: optionType
  setRecordSection: Dispatch<SetStateAction<boolean>>
  recordSection: boolean
}

export const useAudioRecorder = (): IUseAudioRecorderProps => {
  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [options, setOptions] = useState<optionType>()
  const [recordSection, setRecordSection] = useState<boolean>(false)
  const localChunks = useRef<Blob[]>([]) // Use a ref for storing chunks locally
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  let mediaProcessor: ScriptProcessorNode

  let micStream: MediaStream | null // Reference to the microphone stream
  let audioContext: AudioContext | null // Reference to the AudioContext

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

      if (
        !window.AudioContext ||
        !window.MediaStreamAudioSourceNode ||
        !window.AudioWorkletNode
      ) {
        alert('Your browser does not support the required APIs')
        return
      }

      // Access the microphone stream
      micStream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })

      if (!micStream) {
        console.log('mic stream not connected')
      }

      audioContext = new AudioContext()
      await audioContext.resume()
      if (
        audioContext.createScriptProcessor &&
        typeof audioContext.createScriptProcessor === 'function'
      ) {
        mediaProcessor = audioContext.createScriptProcessor(0, 1, 1)
        mediaProcessor.onaudioprocess = (event) => {
          window.postMessage(
            { cmd: 'encode', buf: event.inputBuffer.getChannelData(0) },
            '*'
          )
        }
      } else {
        // 采用新方案
        // mediaProcessor = await initWorklet()
      }

      const mediaRecorder = new MediaRecorder(micStream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (evt) => {
        // Push each chunk (blobs) in an array
        if (evt.data.size > 0) {
          localChunks.current.push(evt.data)
        } else {
          console.log('No data recorded in this chunk')
        }
      }

      mediaRecorder.onstop = (evt) => {
        // Make blob out of our blobs, and open it.
        if (localChunks.current.length > 0) {
          const audioBlob = new Blob(localChunks.current, {
            type: 'audio/aac'
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
    } catch (err: any) {
      console.error('Error accessing microphone:', err)
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop() // Stop the media recorder
      mediaRecorderRef.current = null
    }

    if (micStream) {
      // Stop all tracks in the microphone stream
      micStream.getTracks().forEach((track) => track.stop())
      micStream = null // Reset the micStream reference
    }

    if (audioContext) {
      audioContext.close() // Close the audio context
      audioContext = null // Reset the audioContext reference
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current) // Clear the elapsed time interval
      intervalRef.current = null
    }

    setRecording(false) // Update recording state
  }

  const handleDeleteRecording = (callback?: () => void) => {
    const isConfirmDelete = window.confirm(
      'Are you sure you want to delete the recording?'
    )
    if (isConfirmDelete) {
      setRecording(false)
      setAudioURL(null)
      setElapsedTime(0)
      callback?.()
    }
  }

  const handleSubmit = () => {}

  return {
    recording,
    audioURL,
    handleStartRecording,
    handleStopRecording,
    recordingTime: elapsedTime,
    handleDeleteRecording,
    setOptions,
    options,
    setRecordSection,
    recordSection,
    handleSubmit
  }
}
