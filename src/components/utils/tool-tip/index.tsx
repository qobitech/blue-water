import { useEffect, useRef, useState } from 'react'
import { AlertSMSVG } from '../svgs'

interface TooltipProps {
  tip: string
}

const ToolTip: React.FC<TooltipProps> = ({ tip }) => {
  const [position, setPosition] = useState<string>('bottom')
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleMouseEnter = () => {
      const tooltipElement = tooltipRef.current
      if (tooltipElement) {
        const tooltipRect = tooltipElement.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        if (tooltipRect.right > viewportWidth - 20) {
          setPosition('left')
        } else if (window.innerWidth - tooltipRect.right < 300) {
          setPosition('right')
        } else if (tooltipRect.top < 20) {
          setPosition('top')
        } else {
          setPosition('bottom')
        }
      }
    }

    const tooltipElement = tooltipRef.current
    if (tooltipElement) {
      tooltipElement.addEventListener('mouseenter', handleMouseEnter)
    }

    return () => {
      if (tooltipElement) {
        tooltipElement.removeEventListener('mouseenter', handleMouseEnter)
      }
    }
  }, [])

  return (
    <div
      className={`tool-tip position-relative hw-mx`}
      ref={tooltipRef}
      data-tooltip={tip}
      style={{ left: position === 'left' ? '23px' : '' }}
    >
      <AlertSMSVG />
    </div>
  )
}

export default ToolTip
