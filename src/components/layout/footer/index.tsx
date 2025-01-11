import { Dispatch, memo, SetStateAction } from 'react'
import { PageContainer } from '../../utils/reusable'
import { TypeButton, TypeSmallButton } from '../../utils/button'
// import { ISBETA } from '../../../constants/global'
// import { pageurl } from '../../../constants/pageurl'
// import { useNavigate } from 'react-router-dom'
import './index.scss'
// import { gallery } from '../../../assets'
import { HVC } from '../../utils/hvc'
import { LogoTextSVG } from '../../utils/svgs'
import { _isMobile } from '../../utils/helper'

interface IFooter {
  hideTopFooter?: boolean
  showConsentBanner: () => void
  setSubscribe?: (view: boolean) => void
  setJoinWaitingList: Dispatch<SetStateAction<boolean>>
}

const Footer = memo(
  ({
    hideTopFooter,
    showConsentBanner,
    setSubscribe,
    setJoinWaitingList
  }: IFooter) => {
    // const navigate = useNavigate()
    return (
      <div className="footer-container">
        <PageContainer>
          <HVC removeDOM view={!hideTopFooter} className="py-5">
            <div className="f-column-25">
              <div className="ResponsiveDivLeft">
                <LogoTextSVG />
              </div>
              <div className="div-wrapper">
                <div className="div-left f-column-10">
                  <p className="p-footer-class">
                    Collect authentic feedback from your users effortlessly.
                    Whether you&apos;re refining features, validating ideas, or
                    understanding user pain points, Tevotea empowers you to stay
                    connected with your audience and deliver what they truly
                    need.
                  </p>
                  <p className="p-footer-class">
                    <b>Stop guessing, start building products users love.</b>
                  </p>
                </div>
                <div className="div-right f-column-15">
                  <h6
                    style={{ lineHeight: '30px', fontSize: '1.15rem' }}
                    className="ff-bold m-0"
                  >
                    Build Better Products with Real Engagement
                  </h6>
                  <p
                    style={{ fontFamily: 'Outfit_Regular', lineHeight: '25px' }}
                  >
                    Transform how you connect with your users. Engage them
                    meaningfully and capture the feedback that drives impactful
                    product decisions.
                  </p>
                  <div className="cta-wrapper">
                    <TypeButton
                      buttonSize="large"
                      title="Start Collecting Feedback"
                      className={_isMobile() ? 'hw-mx mx-auto' : ''}
                      // onClick={() => setJoinWaitingList?.(true)}
                      buttonType="bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </HVC>
          <div className="pt-4 pb-5 footer border-label-top w-100">
            <div className="footer-left f-row-10 aic">
              <p className="m-0 text-little">
                &#169; Tevotea, {new Date().getFullYear()}
              </p>
            </div>
            <div className="footer-right">
              <ul>
                {/* <li
                  style={{ listStyleType: 'none' }}
                  className="cursor-pointer"
                >
                  <TypeSmallButton
                    title="Login"
                    className="bg-none text-little p-0"
                    style={{
                      fontSize: '12px',
                      background: 'none',
                      textDecoration: 'underline'
                    }}
                    onClick={() => navigate(pageurl.LOGIN)}
                  />
                </li> */}
                {/* <li
                  style={{ listStyleType: 'none' }}
                  className="cursor-pointer"
                >
                  <TypeSmallButton
                    title="Manage Cookie Preference"
                    className="bg-none text-little p-0"
                    style={{
                      fontSize: '12px',
                      background: 'none',
                      textDecoration: 'underline'
                    }}
                    onClick={showConsentBanner}
                  />
                </li> */}
                {/* <li
                  style={{ listStyleType: 'none' }}
                  className="cursor-pointer"
                >
                  <TypeSmallButton
                    title="Free tips"
                    className="bg-none text-little p-0"
                    style={{
                      fontSize: '12px',
                      background: 'none',
                      textDecoration: 'underline'
                    }}
                    onClick={() => navigate(pageurl.BETTICKETS)}
                  />
                </li> */}
                {/* <li
                  style={{ listStyleType: 'none' }}
                  className="cursor-pointer"
                >
                  <TypeSmallButton
                    title="Channels"
                    className="bg-none text-little p-0"
                    style={{
                      fontSize: '12px',
                      background: 'none',
                      textDecoration: 'underline'
                    }}
                    onClick={() => navigate(pageurl.BETCHANNEL)}
                  />
                </li> */}
                {/* <li
                  style={{ listStyleType: 'none' }}
                  className="cursor-pointer"
                >
                  <TypeSmallButton
                    title="Twitter"
                    className="bg-none text-little p-0"
                    style={{
                      fontSize: '12px',
                      background: 'none',
                      textDecoration: 'underline'
                    }}
                    onClick={() =>
                      window.open('https://twitter.com/mytipsterpro', '_blank')
                    }
                  />
                </li> */}
                <li
                  style={{ listStyleType: 'none' }}
                  className="cursor-pointer"
                >
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
                <li
                  style={{ listStyleType: 'none' }}
                  className="cursor-pointer"
                >
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
  }
)

Footer.displayName = 'Footer'

export default Footer
