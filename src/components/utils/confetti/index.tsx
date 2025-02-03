import { memo, useEffect, useState } from 'react'
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
    ></HVC>
  )
})

Confetti.displayName = 'Confetti'

export default Confetti
