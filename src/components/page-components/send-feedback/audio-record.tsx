import { useRef, useState } from 'react'

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
  // const [audioDataBuffer, setAudioDataBuffer] = useState<BlobPart[]>([])
  const localChunks = useRef<Blob[]>([]) // Use a ref for storing chunks locally
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  let micStream: MediaStream | null // Reference to the microphone stream
  // let audioContext: AudioContext | null // Reference to the AudioContext
  // let audioWorkletNode: AudioWorkletNode | null // Reference to the AudioWorkletNode

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

      // audioContext = new AudioContext()
      // const osc = audioContext.createOscillator()
      // const dest = audioContext.createMediaStreamDestination()
      const mediaRecorder = new MediaRecorder(micStream)
      mediaRecorderRef.current = mediaRecorder
      // osc.connect(dest)

      // mediaRecorder.start()
      // osc.start(0)

      // const micStreamAudioSourceNode =
      //   audioContext.createMediaStreamSource(micStream)

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

      // Add the audio processor worklet
      // await audioContext.audioWorklet.addModule('my-audio-processor.js')
      // audioWorkletNode = new AudioWorkletNode(
      //   audioContext,
      //   'my-audio-processor'
      // )

      mediaRecorder.start()
      // osc.start(0)
      setRecording(true)
      startTimeRef.current = Date.now()

      // Track the recording time manually
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setElapsedTime((Date.now() - startTimeRef.current) / 1000) // Convert to seconds
        }
      }, 1000) // Update every second

      // Listen to audio data sent from the AudioWorkletProcessor
      // audioWorkletNode.port.onmessage = (event) => {
      //   // Push incoming audio frames into the buffer
      //   localChunks.current.push(event.data)
      // }

      // Connect the audio worklet node
      // micStreamAudioSourceNode.connect(audioWorkletNode)
    } catch (err: any) {
      console.error('Error accessing microphone:', err)

      // if (
      //   err.name === 'NotAllowedError' ||
      //   err.message === 'The user aborted a request.'
      // ) {
      //   const retry = window.confirm(
      //     'Microphone access was denied. Would you like to try again? Please allow microphone access when prompted.'
      //   )
      //   if (retry) {
      //     handleStartRecording() // Retry the function
      //   }
      // } else if (err.name === 'NotFoundError') {
      //   alert('No microphone found. Please ensure a microphone is connected.')
      // } else {
      //   alert(`Error accessing microphone: ${err.message}`)
      // }
    }
  }

  // const downloadFile = async (
  //   url: string,
  //   // updateState: (type: IComponentStateKey, payload: any) => void,
  //   name?: string
  // ) => {
  //   // updateState('downloadLoader', true)
  //   const fname = url.substring(0, url.lastIndexOf('?'))
  //   const fileName = fname.substring(0, url.lastIndexOf('.'))
  //   const downloadurl = url.replace('dl=0', 'raw=1') || ''
  //   fetch(downloadurl).then((response) => {
  //     response.blob().then((blob) => {
  //       const fileURL = window.URL.createObjectURL(blob)
  //       const alink = document.createElement('a')
  //       alink.href = fileURL
  //       alink.download = (name || fileName) + '.mp3'
  //       alink.click()
  //       // updateState('downloadLoader', false)
  //     })
  //   })
  // }

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
    // if (localChunks.current.length > 0) {
    //   // Disconnect the microphone stream and close the audio context
    //   audioWorkletNode?.disconnect()
    //   micStream?.getTracks().forEach((track) => track.stop())
    //   audioContext?.close()
    //   setRecording(false)

    //   // Combine audio data into a single buffer
    //   const audioBlob = new Blob(localChunks.current, { type: 'audio/wav' })
    //   const audioUrl = URL.createObjectURL(audioBlob)
    //   setAudioURL(audioUrl)
    //   downloadFile(audioUrl, 'recording')

    //   console.log('Audio URL:', audioBlob, localChunks.current.length)

    //   // Reset references
    //   micStream = null
    //   audioContext = null
    //   audioWorkletNode = null
    //   localChunks.current = []

    //   if (intervalRef.current) {
    //     startTimeRef.current = null
    //     clearInterval(intervalRef.current)
    //   }

    //   // Use the audioBlob for saving or playback
    //   // This function would update the state with the audio URL
    // } else {
    //   console.log('No active recording found.')
    // }
  }

  const handleDeleteRecording = () => {
    const isConfirmDelete = window.confirm(
      'Are you sure you want to delete the recording?'
    )
    if (isConfirmDelete) {
      setRecording(false)
      setAudioURL(null)
      setElapsedTime(0)
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
