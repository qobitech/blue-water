import { FC } from 'react'
import { INavItem } from './utils'
import { BottomAngleSVG } from '../../utils/svgs/f-awesome'
import { useLocation, useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

export const NavItems = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <div className={`nav-items-container`}>
        <ul className="nav-items-header gap-63 h-100">
          <NavItem
            title={isHome ? 'About Us' : 'Home'}
            onClick={() => navigate(isHome ? pageurl.ABOUT : pageurl.HOME)}
            isParent={false}
          />
        </ul>
      </div>
    </>
  )
}

const NavItem: FC<INavItem> = ({ title, isParent, onClick }) => {
  return (
    <li onClick={onClick} className="f-row-7 aic">
      {title}
      {isParent && <BottomAngleSVG />}
    </li>
  )
}
