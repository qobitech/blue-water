import { memo } from 'react'
import { Link } from 'react-router-dom'
import { GETDASHBOARDURL } from '../../../constants/global'
import { HamburgerSVG } from '../../utils/svgs/f-awesome'
import { LogoTextSVG } from '../../utils/svgs'

interface IHeaderBrand {
  isMenu: boolean
  setMenu: () => void
}

const HeaderBrand = memo(({ isMenu, setMenu }: IHeaderBrand) => {
  return (
    <div className="f-row-23 aic">
      {isMenu && (
        <div className="hamburger hx-mx" onClick={setMenu}>
          <HamburgerSVG />
        </div>
      )}
      <Link to={GETDASHBOARDURL()} className={`header-link-container`}>
        <div className="py-1">
          <div className="logo-container">
            <LogoTextSVG width="75" />
          </div>
        </div>
      </Link>
    </div>
  )
})

HeaderBrand.displayName = 'HeaderBrand'

export default HeaderBrand
