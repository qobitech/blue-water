import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { _isUrl } from '../utils/helper'
import { pageurl } from '../../constants/pageurl'
import {
  ChannelMenuSVG,
  CommunitySVG,
  MenuToggleSVG,
  NotificationSVG,
  SwitchOffSVG,
  TipMenuSVG,
  DashboardSVG,
  UserSVG,
  TransactionsSVG,
  ReportSVG,
  VerificationRequestSVG,
  AchievementsRewardsSVG,
  FeedbackSVG,
  CookiesSVG,
  OpportunitySVG,
  MailSVG
} from '../utils/svgs'
import { gallery } from '../../assets'
import './style.scss'
import { GETDASHBOARDURL, GETISBUYER } from '../../constants/global'
import { useLogout } from '../../api/logout'

export const getResultTabs = (url: string) => {
  return url.toLowerCase().trim().replace(/ /g, '-')
}

interface IMenuItem {
  icon: JSX.Element
  title: string
  isActive?: boolean
  pageUrl: string
  action?: () => void
  hide?: boolean
}

export const resultTabEnums = {
  VIOLATION: 'Violations',
  STATUSSUMMARY: 'Status Summary',
  TRANSACTIONS: 'Transactions'
}

export const isPage = (query: string, value: string) =>
  query === getResultTabs(value)

export const menuData: IMenuItem[] = [
  {
    icon: <DashboardSVG />,
    title: 'Overview',
    pageUrl: GETDASHBOARDURL()
  },
  {
    icon: <TipMenuSVG />,
    title: 'Bet Codes',
    pageUrl: pageurl.BETTICKETS
  },
  {
    icon: <ChannelMenuSVG />,
    title: 'Channels',
    pageUrl: pageurl.BETCHANNEL
  },
  {
    icon: <AchievementsRewardsSVG />,
    title: 'Achievements',
    pageUrl: pageurl.ACHIEVEMENTS,
    hide: GETISBUYER()
  },
  {
    icon: <CommunitySVG />,
    title: 'Community Forum',
    pageUrl: pageurl.COMMUNITYFORUM
  },
  {
    icon: <NotificationSVG />,
    title: 'Notification',
    pageUrl: pageurl.NOTIFICATION
  },
  {
    icon: <UserSVG />,
    title: 'My Account',
    pageUrl: pageurl.MYACCOUNTPROFILE
  },
  {
    icon: <OpportunitySVG />,
    title: 'Open Jobs',
    pageUrl: pageurl.OPPORTUNITIES
  },
  {
    icon: <CookiesSVG />,
    title: 'Manage Cookies',
    pageUrl: 'ews'
  }
]

export const adminMenuData: IMenuItem[] = [
  {
    title: 'Overview',
    pageUrl: pageurl.ADMINDASHBOARD,
    icon: <DashboardSVG />
  },
  {
    title: 'Channels',
    pageUrl: pageurl.ADMINBETCHANNELS,
    icon: <ChannelMenuSVG />
  },
  {
    title: 'Bet Codes',
    pageUrl: pageurl.ADMINBETTIPS,
    icon: <TipMenuSVG />
  },
  {
    title: 'Users',
    pageUrl: pageurl.ADMINUSERS,
    icon: <UserSVG />
  },
  {
    title: 'Feedback',
    pageUrl: pageurl.ADMINFEEDBACK,
    icon: <FeedbackSVG color="#000" />
  },
  {
    title: 'Transactions',
    pageUrl: pageurl.ADMINTRANSACTIONS,
    icon: <TransactionsSVG />
  },
  {
    title: 'Reports',
    pageUrl: pageurl.ADMINREPORTS,
    icon: <ReportSVG />
  },
  {
    title: 'Community Forum',
    pageUrl: pageurl.ADMINCOMMUNITYFORUM,
    icon: <CommunitySVG />
  },
  {
    title: 'Verification Request',
    pageUrl: pageurl.ADMINVERIFICATIONREQUEST,
    icon: <VerificationRequestSVG />
  },
  {
    title: 'Send Message',
    pageUrl: pageurl.ADMINSENDMESSAGE,
    icon: <MailSVG />
  }
]

const MenuItem: FC<IMenuItem> = ({ icon, title, pageUrl, action }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const onClick = () => {
    if (typeof action === 'function') {
      action()
    } else {
      navigate(`${pageUrl}`)
    }
  }

  const isMenu = _isUrl(pageUrl, location)

  const activeClass = isMenu ? 'active' : ''

  return (
    <li
      className={`${activeClass} f-row-20 aic`}
      onClick={onClick}
      data-tooltip={title}
    >
      <div className="svg-container">{icon}</div>
      <p className="m-0 text-little">{title}</p>
    </li>
  )
}

interface ISideMenu {
  menu: IMenuItem[]
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  toggle: boolean
  showConsentBanner: () => void
}

const SideMenu: FC<ISideMenu> = ({
  menu,
  setToggle,
  toggle,
  showConsentBanner
}) => {
  const { logout } = useLogout()

  const navigate = useNavigate()

  const handleToggle = () => {
    setToggle(!toggle)
  }

  const toggleClass = toggle ? 'toggle' : ''

  return (
    <div className={`menu-container ${toggleClass}`}>
      <nav>
        <div className="f-row-15 nav-brand aic">
          <img
            src={gallery.logoIcon.src}
            alt=""
            style={{ width: '30px' }}
            onClick={() => navigate(GETDASHBOARDURL())}
          />
          <p className="m-0">
            <b>My Tipster</b>
          </p>
          <div className="menu-toggle" onClick={handleToggle}>
            <MenuToggleSVG />
          </div>
        </div>
        <ul className="f-column-15 m-0 p-0">
          {menu
            .filter((i) => !i.hide)
            .map((menuItem, index) => (
              <MenuItem
                icon={menuItem.icon}
                title={menuItem.title}
                isActive={menuItem.isActive}
                key={index}
                pageUrl={menuItem.pageUrl}
                action={
                  menuItem.title === 'Manage Cookies'
                    ? showConsentBanner
                    : undefined
                }
              />
            ))}
          <div className="logout-section">
            <MenuItem
              icon={<SwitchOffSVG />}
              title="Logout"
              pageUrl={'sdwdfw'}
              action={logout}
            />
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default SideMenu
