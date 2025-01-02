import { renderHook, act } from '@testing-library/react-hooks'
import { useAudioRecorder } from '../src/components/page-components/send-feedback/audio-record'
import { Mock } from 'vitest'

// Mock MediaRecorder and navigator.mediaDevices
const mockStart = vi.fn()
const mockStop = vi.fn()
const mockOnDataAvailable = vi.fn()
const mockOnStop = vi.fn()

global.MediaRecorder = vi.fn().mockImplementation(() => ({
  start: mockStart,
  stop: mockStop,
  ondataavailable: mockOnDataAvailable,
  onstop: mockOnStop
})) as unknown as typeof MediaRecorder

Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getUserMedia: vi.fn()
  }
})

describe('useAudioRecorder Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(navigator.mediaDevices.getUserMedia as Mock).mockResolvedValue({
      getTracks: vi.fn().mockReturnValue([{ stop: vi.fn() }])
    })
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAudioRecorder())

    expect(result.current.recording).toBe(false)
    expect(result.current.audioURL).toBeNull()
    expect(result.current.recordingTime).toBe(0)
  })

  it('should start recording and update state', async () => {
    const { result } = renderHook(() => useAudioRecorder())

    await act(async () => {
      await result.current.handleStartRecording()
    })

    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    })
    expect(mockStart).toHaveBeenCalled()
    // expect(result.current.recording).toBe(true)
    // expect(result.current.recordingTime).toBeGreaterThanOrEqual(0)
  })

  it('should stop recording and generate an audio URL', async () => {
    const { result } = renderHook(() => useAudioRecorder())

    await act(async () => {
      await result.current.handleStartRecording()
    })

    act(() => {
      result.current.handleStopRecording()
    })

    expect(mockStop).toHaveBeenCalled()
    expect(result.current.recording).toBe(false)
    expect(result.current.audioURL).not.toBeNull()
  })

  it('should delete recording and reset state', async () => {
    const { result } = renderHook(() => useAudioRecorder())

    await act(async () => {
      await result.current.handleStartRecording()
    })

    act(() => {
      result.current.handleStopRecording()
    })

    act(() => {
      result.current.handleDeleteRecording()
    })

    expect(result.current.recording).toBe(false)
    expect(result.current.audioURL).toBeNull()
    expect(result.current.recordingTime).toBe(0)
  })

  it('should handle permission errors gracefully', async () => {
    ;(navigator.mediaDevices.getUserMedia as Mock).mockRejectedValueOnce({
      name: 'NotAllowedError'
    })

    const { result } = renderHook(() => useAudioRecorder())

    await act(async () => {
      await result.current.handleStartRecording()
    })

    expect(result.current.recording).toBe(false)
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled()
  })

  it('should handle unsupported MediaRecorder MIME types', async () => {
    global.MediaRecorder = vi.fn().mockImplementation(() => {
      throw new Error('Unsupported MIME type')
    }) as unknown as typeof MediaRecorder

    const { result } = renderHook(() => useAudioRecorder())

    await act(async () => {
      await result.current.handleStartRecording()
    })

    expect(result.current.recording).toBe(false)
  })
})
