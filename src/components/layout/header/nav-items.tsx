import { FC } from 'react'
import { INavItem, menuItems } from './utils'
import { BottomAngleSVG } from '../../utils/svgs/f-awesome'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

export const NavItems = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className={`nav-items-container`}>
        <ul className="nav-items-header gap-63 h-100">
          {menuItems.map((i, index) => {
            const isParent = !!i.childId
            return (
              <NavItem
                title={i.title}
                onClick={() => navigate(pageurl.ABOUT)}
                isParent={isParent}
                key={index}
              />
            )
          })}
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
