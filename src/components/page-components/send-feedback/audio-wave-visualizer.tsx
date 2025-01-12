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
        analyser.fftSize = 256 // Adjusted for fewer bars
        audioContextRef.current = audioContext
        analyserRef.current = analyser

        // Connect the microphone stream to the audio context
        const source = audioContext.createMediaStreamSource(stream)
        source.connect(analyser)

        // Step 3: Visualize audio data on canvas
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
            barHeight = dataArray[i] * 0.3 // Scale for visual effect

            // Create a gradient for dynamic coloring
            const gradient = canvasCtx.createLinearGradient(
              0,
              canvas.height - barHeight,
              0,
              canvas.height
            )
            gradient.addColorStop(0, `rgba(255, 0, 0, 1)`) // Red
            gradient.addColorStop(0.5, `rgba(255, 165, 0, 1)`) // Orange
            gradient.addColorStop(1, `rgba(0, 255, 0, 1)`) // Green

            canvasCtx.fillStyle = gradient
            canvasCtx.fillRect(
              x,
              canvas.height - barHeight,
              barWidth - 2, // Narrower bars
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
        style={{
          background: 'linear-gradient(to bottom, #000428, #004e92)',
          borderRadius: '10px',
          height: '75px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}
      />
    </div>
  )
}

export default AudioVisualizerBars
