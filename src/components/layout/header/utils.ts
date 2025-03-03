import { SetStateAction } from 'react'

export interface INavItem {
  title: string
  isParent: boolean
  onClick: () => void
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

export const menuItems = (isHome: boolean): IMenuItem[] => [
  {
    title: isHome ? 'About Us' : 'Home',
    url: ''
  }
]

export interface ISubMenuItem {
  onMouseEnter: () => void
  onMouseLeave: () => void
}
