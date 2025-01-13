import { FC } from 'react'
import { ICardListItem, ICardListProps } from './utils'
import './style.scss'

const CardList: FC<ICardListProps> = ({ cardLists, onAction }) => {
  return (
    <div className="f-column-11">
      {cardLists?.map((i, index) => (
        <CardListItem
          key={index}
          title={i.title}
          description={i.description}
          isSelected={i.isSelected}
          value={i.value}
          action={() => onAction(i)}
        />
      ))}
    </div>
  )
}

export default CardList

const CardListItem: FC<ICardListItem> = ({
  title,
  description,
  action,
  isSelected
}) => {
  return (
    <div
      className={`f-column-11 rounded p-3 cursor-pointer ${
        isSelected ? 'border-selected' : 'border-label'
      }`}
      onClick={action}
    >
      <h6 className="m-0">{title}</h6>
      <p className="m-0 text-little color-label">{description}</p>
    </div>
  )
}
