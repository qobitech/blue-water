import React, { useEffect, useRef } from 'react'

const AudioVisualizerBars = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    const startVisualization = async () => {
      try {
        // Step 1: Get audio stream from microphone
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })

        // Step 2: Create an audio context and analyser node
        const audioContext = new AudioContext()
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 256 // Smaller fftSize for fewer bars
        audioContextRef.current = audioContext
        analyserRef.current = analyser

        // Connect the microphone stream to the audio context
        const source = audioContext.createMediaStreamSource(stream)
        source.connect(analyser)

        // Step 3: Visualize audio data on canvas with vertical bars
        const canvas = canvasRef.current
        const canvasCtx = canvas?.getContext('2d')
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const drawBars = () => {
          if (!canvasCtx || !analyser || !canvas) return

          analyser.getByteFrequencyData(dataArray)

          canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

          const barWidth = canvas.width / bufferLength
          let barHeight
          let x = 0

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 0.1 // Scale the height for effect

            const colorIntensity = barHeight + 100
            canvasCtx.fillStyle = `rgb(${colorIntensity}, 50, 50)` // Reddish bars
            canvasCtx.fillRect(
              x,
              canvas.height - barHeight,
              barWidth - 2,
              barHeight
            )

            x += barWidth
          }

          // Request next frame
          animationIdRef.current = requestAnimationFrame(drawBars)
        }

        // Start visualizing
        drawBars()
      } catch (err) {
        console.error('Error accessing the microphone', err)
      }
    }

    startVisualization()

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="800"
        height="60"
        style={{ background: '#000', borderRadius: '10px', height: '60px' }}
      />
    </div>
  )
}

export default AudioVisualizerBars
