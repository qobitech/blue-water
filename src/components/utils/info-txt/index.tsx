import { BUTTON_PRIMARY } from '../../../constants/global'
import { HVC } from '../hvc'

export const InfoTxt = ({
  value,
  icon,
  onClick,
  iconClick
}: {
  value: string
  icon?: string | JSX.Element
  onClick?: () => void
  iconClick?: () => void
}) => {
  const isLink = typeof onClick === 'function'

  const cursor = isLink ? 'cursor-pointer' : ''

  const txtColor = isLink ? BUTTON_PRIMARY : '#757575'

  const isIconClick = typeof iconClick === 'function'

  return (
    <div
      className={`f-row-12 aic ${isIconClick ? '' : cursor}`}
      style={{ color: txtColor }}
      onClick={isIconClick ? undefined : onClick}
    >
      <p
        className={`m-0 text-tiny ${!isIconClick ? '' : 'cursor-pointer'}`}
        onClick={!isIconClick ? undefined : onClick}
      >
        {value}
      </p>
      <HVC
        removeDOM
        view={!!icon}
        className="hw-mx cursor-pointer border-label rounded p-2 f-row aic jcc"
        onClick={iconClick}
      >
        {icon}
      </HVC>
    </div>
  )
}

export const IconWrapper = ({
  children,
  onClick,
  title
}: {
  onClick?: () => void
  children?: any
  title?: string
}) => {
  const isLink = typeof onClick === 'function'
  const cursor = isLink ? 'cursor-pointer' : ''
  return (
    <div onClick={onClick} className={cursor} title={title || ''}>
      {children}
    </div>
  )
}
