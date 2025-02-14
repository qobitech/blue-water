import { memo } from 'react'
import { PageContainer } from '../../utils/reusable'
import { TypeSmallButton } from '../../utils/button'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

const Footer = memo(() => {
  const navigate = useNavigate()
  return (
    <div className="footer-container">
      <PageContainer>
        <div className="pt-4 pb-5 footer border-label-top w-100">
          <div className="footer-left f-row-10 aic">
            <p className="m-0 text-little">
              &#169; BlueWater Shores Realty, {new Date().getFullYear()}
            </p>
          </div>
          <div className="footer-right">
            <ul>
              <li style={{ listStyleType: 'none' }} className="cursor-pointer">
                <TypeSmallButton
                  title="About Us"
                  className="bg-none text-little p-0"
                  style={{
                    fontSize: '12px',
                    background: 'none',
                    textDecoration: 'underline'
                  }}
                  onClick={() => navigate(pageurl.ABOUT)}
                />
              </li>
              <li style={{ listStyleType: 'none' }} className="cursor-pointer">
                <TypeSmallButton
                  title="Terms"
                  className="bg-none text-little p-0"
                  style={{
                    fontSize: '12px',
                    background: 'none',
                    textDecoration: 'underline'
                  }}
                  // onClick={() => navigate(pageurl.TC)}
                />
              </li>
              <li style={{ listStyleType: 'none' }} className="cursor-pointer">
                <TypeSmallButton
                  title="Privacy"
                  className="bg-none text-little p-0"
                  style={{
                    fontSize: '12px',
                    background: 'none',
                    textDecoration: 'underline'
                  }}
                  // onClick={() => navigate(pageurl.PP)}
                />
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
