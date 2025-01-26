import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { GETDASHBOARDURL } from '../../../constants/global'
import { HamburgerSVG } from '../../utils/svgs/f-awesome'
import { LogoTextSVG } from '../../utils/svgs'

interface IHeaderBrand {
  isMenu: boolean
  setMenu: () => void
}

const HeaderBrand = memo(({ isMenu, setMenu }: IHeaderBrand) => {
  const navigate = useNavigate()
  return (
    <div className="f-row-23 aic">
      {isMenu && (
        <div className="hamburger hx-mx" onClick={setMenu}>
          <HamburgerSVG />
        </div>
      )}
      <div
        className={`header-link-container`}
        onClick={() => navigate(GETDASHBOARDURL())}
      >
        <div className="logo-container">
          <LogoTextSVG width="63" />
        </div>
      </div>
    </div>
  )
})

HeaderBrand.displayName = 'HeaderBrand'

export default HeaderBrand
