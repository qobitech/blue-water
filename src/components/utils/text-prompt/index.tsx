import { useEffect, useState } from 'react'
import { HVC } from '../hvc'
import { AlertSVG, CheckSVG } from '../svgs'

interface ITP {
  prompt?: string
  status?: boolean
  icon?: string
  noStatus?: boolean
  url?: string
  underline?: boolean
  timer?: number
  // iconPosition?: 'left' | 'right'
}

const TextPrompt = ({
  prompt,
  status,
  icon,
  noStatus,
  url,
  underline,
  timer
}: // iconPosition
ITP) => {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    let timeout: NodeJS.Timeout
    setMessage(prompt || '')
    if (timer) {
      timeout = setTimeout(() => {
        setMessage('')
      }, timer)
    }
    return () => {
      clearTimeout(timeout)
      setMessage('')
    }
  }, [prompt])

  const sty = { textDecoration: url && underline ? 'underline' : '' }
  const hvcClassName = `f-row-7 ais text-little ${
    noStatus ? '' : status ? 'text-success' : 'text-danger'
  } ${url ? 'cursor-pointer' : ''}`

  return (
    <HVC removeDOM view={!!message} className={hvcClassName}>
      {status ? <CheckSVG color="green" /> : <AlertSVG />}
      <p className="m-0" style={sty}>
        {message}
      </p>
    </HVC>
  )
}

TextPrompt.displayName = 'TextPrompt'

export default TextPrompt
