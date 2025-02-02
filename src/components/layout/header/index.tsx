import { memo, useMemo } from 'react'
import './style.scss'
import {
  getIsOnboarding,
  getUserData,
  routeType
} from '../../../constants/global'
import {
  ActionComponent,
  DropDownMenu,
  IOptionAction,
  SeparatorComponent
} from '../../utils/reusable'
import NotificationWidget from './notification'
import HeaderBrand from './brand'
import Profile from './profile'
import { HVC } from '../../utils/hvc'
import { HamburgerSVG } from '../../utils/svgs'
import { NavItems } from './nav-items'

interface IHeader {
  setMenu: () => void
  route: routeType
  toggle: boolean
  setSubscribe?: (view: boolean) => void
}

const Header = memo(({ setMenu, route, toggle, setSubscribe }: IHeader) => {
  // const navigate = useNavigate()

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
      label: 'Explore the Property',
      action: () => {
        // navigate(pageurl.REGISTER)
      }
    },
    {
      label: 'Partner with Us',
      action: () => {
        // navigate(pageurl.LOGIN)
      }
    }
  ]

  const isDashboard = route !== 'public' && route !== 'auth'

  return (
    <div
      className={`header-container-wrapper ${
        isDashboard ? '' : 'px-2 fix-nav'
      }`}
    >
      <div className="header-container gap-73">
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
        <HVC view={!isDashboard} removeDOM className="w-100 f-row aic">
          <NavItems />
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
