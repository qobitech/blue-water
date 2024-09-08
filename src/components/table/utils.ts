import { IOptionAction } from '../utils/reusable'

export interface ITableAction {
  action: string
  setAction: React.Dispatch<React.SetStateAction<string>>
  selectedItems: string[] | null
  setSelectedItems: React.Dispatch<React.SetStateAction<string[] | null>>
  selectedItem: string | null
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>
  actionEnums?: {
    [key: string]: string
  } | null
}

export interface IMutateOptions {
  label: string
  value: string | number
}

export interface ICell {
  mutateType?: 'number' | 'text' | 'select'
  mutateMin?: number
  mutateMax?: number
  mutatePostTxt?: string
  mutateOptions?: IMutateOptions[]
  onMutateSave?: (value: any) => void
  mutateLoad?: boolean
  value?: string | number
  isLink?: boolean
  position?: number
  status?: boolean
  ranking?: boolean
  active?: boolean
  noDecoration?: boolean
  lastPosition?: number
  url?: string
  action?: () => void
  props?: { [key: string]: any }
  id?: string
  icon?: JSX.Element
  valueStatus?: boolean
  rating?: boolean | number
  weight?: string
}

export interface ICellAction extends ICell {
  color?: string
  view?: 'text' | 'icon' | 'both'
  background?: string
  buttonType?: 'bold' | 'outlined' | 'disabled' | 'danger' | undefined
  load?: boolean
  hide?: boolean
  actionType?: 'button' | 'link' | 'prompt' | 'inner-html' | 'options'
  actionStatus?: boolean
  optionActions?: IOptionAction[]
  dropDownActions?: Array<{
    label: string
    action?: () => void
  }>
  type?: 'button' | 'drop-down'
  title?: string
}

export interface ITableRecord {
  id: string
  row: ICell[]
  rowActions?: ICellAction[]
}

export interface IResultTable {
  admin?: boolean
  header: string[]
  record: ITableRecord[]
  currentPage?: number
  hideNumbering?: boolean
  ranking?: boolean
  cellWidth?: number
  tableAction?: ITableAction
  handleTableAction?: () => void
}

export interface IPredictionResultTable {
  header: string[]
  record: IPredictionRecord[]
  currentPage?: number
  hideNumbering?: boolean
  cellWidth?: number
  tableAction?: ITableAction
  handleTableAction?: (action?: string, id?: string) => void
  isPublic?: boolean
  noDataCTA?: JSX.Element | null
}

export interface IPredictionRecord {
  id: string
  row: Array<{
    value: string | number
    id: 'code' | 'bookie' | 'feedback' | 'odds' | 'endDate' | 'channel'
    props: { [key: string]: any }
  }>
  rowActions?: ICellAction[]
}

export const getTime = (value: string) => {
  const currentTime = new Date(value)
  let hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours || 12 // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes // ensure two digits for minutes
  return hours + ' : ' + minutesStr + ' ' + ampm
}

export const isPastTime = (time: string) => {
  const targetDateTime = new Date(time)
  const currentDateTime = new Date()
  return targetDateTime < currentDateTime
}

export const getIsStatusNotPublishedTxt = (
  status?: 'Pending' | 'Published' | 'Archived'
) => {
  switch (status) {
    case 'Archived':
      return 'Archived'
    case 'Pending':
      return 'Draft'
    default:
      return ''
  }
}
