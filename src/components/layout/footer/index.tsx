import { memo } from 'react'
import { PageContainer } from '../../utils/reusable'
import { TypeSmallButton } from '../../utils/button'
import './index.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

const Footer = memo(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  return (
    <div className="footer-container">
      <PageContainer>
        <div className="pt-4 pb-5 footer border-label-top w-100">
          <div className="footer-left f-row-40 flex-wrap aic">
            <p className="m-0 text-little">
              &#169; BlueWater Shores Realty, {new Date().getFullYear()}
            </p>
          </div>
          <div className="footer-right">
            <ul>
              <li style={{ listStyleType: 'none' }} className="cursor-pointer">
                <TypeSmallButton
                  title={isHome ? 'About Us' : 'Home'}
                  className="bg-none text-little p-0"
                  style={{
                    fontSize: '12px',
                    background: 'none',
                    textDecoration: 'underline'
                  }}
                  onClick={() =>
                    navigate(isHome ? pageurl.ABOUT : pageurl.HOME)
                  }
                />
              </li>
              <li style={{ listStyleType: 'none' }} className="cursor-pointer">
                <p className="m-0 text-little color-label">
                  Developed by{' '}
                  <span
                    className="text-decoration-underline cursor-pointer"
                    onClick={() => {
                      window.open('https://edekobi.com', '_blank')
                    }}
                  >
                    Qobi Solutions
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </PageContainer>
    </div>
  )
})

Footer.displayName = 'Footer'

export default Footer
