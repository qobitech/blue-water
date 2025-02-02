import { SetStateAction } from 'react'

export interface INavItem {
  title: string
  isParent: boolean
  onClick: () => void
  onMouseEnter: () => void
}

export interface IMenuItem {
  title: string
  url: string
  childId?: subMenuIdType
}

export type subMenuIdType = 'product' | 'solutions' | 'resources' | undefined

export interface ISubMenuTray {
  id: subMenuIdType
  setSubMenuId: (value: SetStateAction<subMenuIdType>) => void
}

export const menuItems: IMenuItem[] = [
  {
    title: 'About BlueWater Realty',
    url: ''
  }
]

export interface ISubMenuItem {
  onMouseEnter: () => void
  onMouseLeave: () => void
}
