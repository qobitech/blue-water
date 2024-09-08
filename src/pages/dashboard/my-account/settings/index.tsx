import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { pageurl } from '../../../../constants/pageurl'
import { _isUrl } from '../../../../components/utils/helper'
import ProfileSettings from './profile'
import { LABEL_COLOR } from '../../../../constants/global'
import PasswordSettings from './password'
import './style.scss'
import {
  HamburgerSVG,
  TimesSVG
} from '../../../../components/utils/svgs/f-awesome'

const menuListEnum = {
  PROFILE: 'profile',
  PASSWORD: 'password',
  CONTACT: 'contact'
} as const

type menuPathType = (typeof menuListEnum)[keyof typeof menuListEnum]

export const getSettingsURL = (path: menuPathType) =>
  `${pageurl.MYACCOUNT}/settings/${path}`

const Settings = () => {
  const location = useLocation()

  const getMenuListEnum = () => {
    const { CONTACT, ...best } = menuListEnum
    return best
  }

  const menuList = Object.values(getMenuListEnum()).map((i) => ({
    title: i,
    url: getSettingsURL(i),
    isActive: _isUrl(getSettingsURL(i), location)
  }))

  const activeMenuName =
    menuList.filter((i) => i.isActive)?.[0]?.title || 'Error'

  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div className="bg-white rounded pt-3">
      <div className="f-row-20 aic mb-4">
        <p className="m-0 fs-16 color-brand">
          Settings&nbsp;&nbsp;&nbsp;
          <span style={{ color: LABEL_COLOR }}>({activeMenuName})</span>
        </p>
        <div className="responsive-section">
          <div
            className="hw-mx cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <HamburgerSVG />
          </div>
        </div>
      </div>
      <div className="w-100 f-row ais">
        <div
          className={`setting-menu-left pr-2 ${
            showMenu ? 'showMenu' : 'hideMenu'
          }`}
        >
          <div className="responsive-section gap-10">
            <div
              className="position-absolute px-3"
              onClick={() => setShowMenu(!showMenu)}
              style={{ top: 0, right: 0 }}
            >
              <TimesSVG />
            </div>
            <h5 className="m-0 mb-4">Settings Menu</h5>
          </div>
          <ul className="m-0 p-0 w-100">
            {menuList.map((i, index) => (
              <MenuComponent key={index} {...i} setShowMenu={setShowMenu} />
            ))}
          </ul>
        </div>
        <div className="setting-menu-right">
          {activeMenuName === menuListEnum.PROFILE && (
            <>
              <ProfileSettings />
            </>
          )}
          {activeMenuName === menuListEnum.PASSWORD && (
            <>
              <PasswordSettings />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const MenuComponent = ({
  title,
  url,
  isActive,
  setShowMenu
}: {
  title: string
  url: string
  isActive: boolean
  setShowMenu: (value: React.SetStateAction<boolean>) => void
}) => {
  const navigate = useNavigate()
  return (
    <li
      onClick={() => {
        navigate(url)
        setShowMenu(false)
      }}
      className={`menu-item-li ${isActive ? 'isActive' : ''}`}
    >
      <p className={`text-small m-0`} style={{ fontFamily: 'Outfit_Regular' }}>
        {title || ''}
      </p>
    </li>
  )
}

export default Settings
