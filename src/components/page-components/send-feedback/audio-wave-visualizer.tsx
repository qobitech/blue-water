import React, { useEffect, useRef } from 'react'

const AudioVisualizerSpectrum = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    const startVisualization = async () => {
      try {
        // Access microphone stream
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })

        const audioContext = new AudioContext()
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 1024 // High resolution for smoother spectrum
        audioContextRef.current = audioContext
        analyserRef.current = analyser

        const source = audioContext.createMediaStreamSource(stream)
        source.connect(analyser)

        const canvas = canvasRef.current
        const canvasCtx = canvas?.getContext('2d')
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const drawSpectrum = () => {
          if (!canvasCtx || !analyser || !canvas) return

          analyser.getByteFrequencyData(dataArray)

          // Clear the canvas with transparency
          canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

          const barWidth = canvas.width / bufferLength
          const centerY = canvas.height / 2 // Center line
          let x = 0

          for (let i = 0; i < bufferLength; i++) {
            const volume = dataArray[i] / 255 // Normalize volume
            const barHeight = volume * (canvas.height / 2) // Scale to half canvas height

            // Dynamic dark shades based on volume
            const colorIntensity = Math.floor(volume * 150) // Range: 0–150
            canvasCtx.fillStyle = `rgba(${colorIntensity}, ${colorIntensity}, ${colorIntensity}, 1)`

            // Draw each bar from the middle
            canvasCtx.fillRect(x, centerY - barHeight, barWidth, barHeight * 2)

            x += barWidth + 1 // Slight gap between bars
          }

          animationIdRef.current = requestAnimationFrame(drawSpectrum)
        }

        drawSpectrum()
      } catch (err) {
        console.error('Error accessing microphone', err)
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
        height="50"
        style={{
          background: 'transparent', // Transparent background
          borderRadius: '10px'
        }}
      />
    </div>
  )
}

export default AudioVisualizerSpectrum
