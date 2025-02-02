import { FC, useState } from 'react'
import { INavItem, ISubMenuTray, menuItems, subMenuIdType } from './utils'
import { BottomAngleSVG } from '../../utils/svgs/f-awesome'
import { ProductSubMenu } from './sub-menu/product'
import { ResourcesSubMenu } from './sub-menu/resources'
import { SolutionSubMenu } from './sub-menu/solution'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

export const NavItems = () => {
  const navigate = useNavigate()
  const [subMenuId, setSubMenuId] = useState<subMenuIdType>()

  return (
    <>
      <div className={`nav-items-container ${subMenuId ? 'open' : ''}`}>
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
        <SubMenuTray id={subMenuId} setSubMenuId={setSubMenuId} />
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

const SubMenuTray: FC<ISubMenuTray> = ({ id, setSubMenuId }) => {
  return (
    <div
      className={`sub-menu-tray rounded-12 ${id ? 'open' : ''}`}
      onMouseEnter={() => setSubMenuId(id)}
    >
      <div className="sub-menu-tray-child">
        {id === 'product' && <ProductSubMenu id={id} />}
        {id === 'resources' && <ResourcesSubMenu id={id} />}
        {id === 'solutions' && <SolutionSubMenu id={id} />}
      </div>
    </div>
  )
}
