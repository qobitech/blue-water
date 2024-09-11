import { memo, useMemo } from 'react'
import './style.scss'
import { pageurl } from '../../../constants/pageurl'
import {
  getIsOnboarding,
  getUserData,
  routeType
} from '../../../constants/global'
import {
  ActionComponent,
  // ActionComponent,
  DropDownMenu,
  IOptionAction,
  // IOptionAction,
  SeparatorComponent
} from '../../utils/reusable'
// import { useNavigate } from 'react-router-dom'
import NotificationWidget from './notification'
// import { useLogout } from '../../../api/logout'
import HeaderBrand from './brand'
import Profile from './profile'
import { HVC } from '../../utils/hvc'
import { useNavigate } from 'react-router-dom'
import { HamburgerSVG } from '../../utils/svgs'

interface IHeader {
  setMenu: () => void
  route: routeType
  toggle: boolean
  setSubscribe?: (view: boolean) => void
}

const Header = memo(({ setMenu, route, toggle, setSubscribe }: IHeader) => {
  const navigate = useNavigate()

  const membership = useMemo(
    () =>
      getUserData()?.role !== 'admin'
        ? getUserData()?.user?.membership
        : 'Admin',
    [getUserData()]
  )

  // const { logout } = useLogout()

  const dropDownItems = useMemo(
    () => [
      {
        action: () => {
          // window.open(pageurl.MYACCOUNTPROFILE, '_self')
        },
        title: 'My Account',
        disabled: !getIsOnboarding()
      },
      {
        action: () => {
          // logout()
        },
        title: 'Log out',
        disabled: false
      }
    ],
    [getIsOnboarding()]
  )

  const actions: IOptionAction[] = [
    {
      label: 'Create Account',
      action: () => {
        navigate(pageurl.REGISTER)
      }
    },
    {
      label: 'Login',
      action: () => {
        navigate(pageurl.LOGIN)
      }
    }
  ]

  const isDashboard = route !== 'public' && route !== 'auth'

  return (
    <div className={`header-container-wrapper ${isDashboard ? '' : 'p-2'}`}>
      <div className="header-container">
        <HeaderBrand isMenu={isDashboard} setMenu={setMenu} />
        <HVC view={isDashboard} removeDOM className="w-100">
          <div className="nav-profile-container gap-60">
            <NotificationWidget />
            <div className="f-row-20 aic">
              <Profile membership={membership} />
              <DropDownMenu id="dropdownMenuButton" items={dropDownItems} />
            </div>
          </div>
          <div className="profile-container-mobile gap-20">
            <NotificationWidget />
            <SeparatorComponent />
            <DropDownMenu id="dropdownMenuButton" items={dropDownItems} />
          </div>
        </HVC>
        <HVC view={!isDashboard} removeDOM className="w-100">
          <div className="nav-profile-container gap-20 mr-4">
            <ActionComponent
              title="Get Started"
              actions={actions}
              buttonType="outlined"
            />
          </div>
          <div className="profile-container-mobile gap-20">
            <div className="cursor-pointer hw-mx">
              <HamburgerSVG color="#fff" />
            </div>
          </div>
        </HVC>
      </div>
    </div>
  )
})

Header.displayName = 'Header'

export default Header
