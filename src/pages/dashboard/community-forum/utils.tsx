import { memo, useEffect, useState } from 'react'

export const ReactionComponent = memo(
  ({
    value,
    action,
    icon,
    uReacted
  }: {
    value?: number
    action?: () => void
    icon: JSX.Element
    uReacted?: boolean
  }) => {
    const [localValue, setLocalValue] = useState<number>(0)

    useEffect(() => {
      setLocalValue(value as number)
    }, [value])

    const handleAction = () => {
      if (value !== undefined) {
        setLocalValue((prev) => (prev > value ? prev - 1 : prev + 1))
        action?.()
      }
    }

    return (
      <div className="f-row aic">
        <div
          className={`svg-post-style mr-2 cursor-pointer ${
            uReacted ? 'u-reacted' : ''
          }`}
          onClick={handleAction}
        >
          {icon}
        </div>
        <p className="m-0 text-small color-light">{localValue}</p>
      </div>
    )
  }
)

ReactionComponent.displayName = 'ReactionComponent'

export const CommentComponent = memo(
  ({
    value,
    action,
    icon,
    uReacted
  }: {
    value?: number
    action?: () => void
    icon: JSX.Element
    uReacted?: boolean
  }) => {
    return (
      <div className="f-row-7 aic">
        <div
          className={`svg-post-style cursor-pointer ${
            uReacted ? 'u-reacted' : ''
          }`}
          onClick={action}
        >
          {icon}
        </div>
        <p className="m-0 text-small color-light">{value}</p>
      </div>
    )
  }
)

CommentComponent.displayName = 'CommentComponent'

export const getModernRole = (userRole: string) => {
  if (userRole === 'admin') return 'Admin'
  if (userRole === 'buyer') return 'Bet Seeker'
  if (userRole === 'seller') return 'Bet Advisor'
  return 'User'
}
