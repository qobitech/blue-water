import { FC } from 'react'
import { IColorItemProps } from './utils'

export const ColorItem: FC<IColorItemProps> = ({
  color,
  isSelected,
  handleColor
}) => {
  const highlightValue = '20px'
  const mainValue = '12px'
  return (
    <div
      className={`${isSelected ? 'border-label' : ''} f-row aic jcc`}
      style={{
        height: highlightValue,
        width: highlightValue,
        minHeight: highlightValue,
        minWidth: highlightValue,
        borderRadius: '50%'
      }}
      onClick={() => handleColor(color)}
    >
      <div
        style={{
          height: mainValue,
          width: mainValue,
          minHeight: mainValue,
          minWidth: mainValue,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color.from}, ${color.to})`
        }}
      />
    </div>
  )
}
