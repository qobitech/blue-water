import { FC } from 'react'
import { IColorSelectionProps } from './utils'
import { ColorItem } from './color-item'
import { cardColorGradient } from '../../../constants/global'

export const ColorSelection: FC<IColorSelectionProps> = ({
  handleColor,
  selectedColor
}) => {
  return (
    <div
      className="py-3 px-4 rounded-35 hw-mx"
      style={{ background: '#3b3b3b' }}
    >
      <div className="f-row-23">
        {cardColorGradient.map((color, index) => (
          <ColorItem
            color={color}
            isSelected={selectedColor.name === color.name}
            handleColor={handleColor}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}
