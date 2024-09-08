import { memo, useEffect, useState } from 'react'
import Lottie from 'react-lottie'
import confetti from '../../../assets/animation/74659-confetti-day.json'
import { HVC } from '../../utils/hvc'

interface IConfetti {
  isConfetti: boolean
}

const Confetti = memo(({ isConfetti }: IConfetti) => {
  const [confettiTimer, setConfettiTimer] = useState<boolean>(false)

  useEffect(() => {
    if (isConfetti) {
      setConfettiTimer(true)
    }
    const timer: NodeJS.Timeout = setTimeout(() => {
      setConfettiTimer(false)
    }, 1500)
    return () => {
      clearTimeout(timer)
    }
  }, [isConfetti])

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: confetti,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <HVC
      view={confettiTimer}
      removeDOM
      style={{
        position: 'fixed',
        top: -400,
        zIndex: 8000,
        width: '100%'
      }}
    >
      <Lottie options={defaultOptions} />
    </HVC>
  )
})

Confetti.displayName = 'Confetti'

export default Confetti
