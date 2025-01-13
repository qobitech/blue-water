export interface ICardListItem {
  title: string
  description: string
  value: string
  action: () => void
  isSelected?: boolean
}

export interface ICardListProps {
  cardLists?: ICardListItem[]
  onAction: (action: ICardListItem) => void
}
