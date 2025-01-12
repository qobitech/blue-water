import { useCopy } from '../hooks'
import { CheckSVG, CopySVG } from '../svgs'

export interface ICardItem {
  title: string
  value: string | number
  url?: boolean
  onUrlClick?: () => void
  copy?: boolean
}

export const CardItems = ({
  title,
  value,
  url,
  onUrlClick,
  copy
}: ICardItem) => {
  const copyProps = useCopy()
  const onCopy = () => {
    copyProps.copy(value as string)
  }
  function isValidURL(str: string) {
    try {
      // eslint-disable-next-line no-new
      new URL(str)
      return true
    } catch (e) {
      return false
    }
  }
  const valueToURL = () => {
    if (typeof value === 'string' && isValidURL(value))
      return value.replace(/www./g, 'https://')
    return `https://google.com/search?q=${value}`
  }
  return (
    <>
      <div className="bet-chnnel-item-wrapper">
        <OverViewHeader title={title} />
        <div className="f-row-7 align-items-center item-value gap-7">
          {!url ? (
            <p className="text-medium m-0">{value}</p>
          ) : (
            <p
              className="text-medium cursor-pointer m-0"
              onClick={() => {
                onUrlClick?.()
                window.open(valueToURL(), '_blank')
              }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {value}
            </p>
          )}
          {copy ? (
            <div className="hw-max cursor-pointer" onClick={onCopy}>
              {copyProps?.copySuccess ? (
                <CheckSVG color="green" />
              ) : (
                <CopySVG />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export const OverViewHeader = ({
  title,
  moreInfo,
  onMoreInfo,
  isInfo
}: {
  title: string
  moreInfo?: boolean
  isInfo?: boolean
  onMoreInfo?: () => void
}) => {
  return (
    <p className="text-little m-0 color-label" style={{ color: '#616161' }}>
      {title}{' '}
      {moreInfo ? (
        <span onClick={onMoreInfo}>
          <i className={`fas fa-${isInfo ? 'minus' : 'info'}-circle ml-2`} />
        </span>
      ) : null}
    </p>
  )
}
