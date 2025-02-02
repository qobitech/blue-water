import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { HamburgerSVG, LogoTextSVG } from '../../utils/svgs/f-awesome'
import { pageurl } from '../../../constants/pageurl'

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
        onClick={() => navigate(pageurl.HOME)}
      >
        <div className="logo-container">
          {/* <LogoTextSVG width="63" /> */}
          <LogoTextSVG />
        </div>
      </div>
    </div>
  )
})

HeaderBrand.displayName = 'HeaderBrand'

export default HeaderBrand
