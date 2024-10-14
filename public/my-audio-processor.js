class MyAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super()
    this.buffer = []
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0]

    if (input.length > 0) {
      const channelData = input[0] // Get the audio data from the first channel
      this.port.postMessage(channelData) // Send the audio data to the main thread
    }

    return true // Keep the processor running
  }
}

registerProcessor('my-audio-processor', MyAudioProcessor)
