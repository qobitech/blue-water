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
                    Capture authentic feedback from your audience, stay
                    connected and truly understand their thoughts, preferences,
                    and opinions.
                  </p>
                  <p className="p-footer-class">
                    Whether you&apos;re collecting insights, gathering
                    on-the-ground statements, or seeking product feedback,
                    Tevotea simplifies the process, ensuring that you never miss
                    a beat.
                  </p>
                </div>
                <div className="div-right f-column-15">
                  <h6
                    style={{ lineHeight: '30px', fontSize: '1.15rem' }}
                    className="ff-bold m-0"
                  >
                    Great content deserves great engagement
                  </h6>
                  <p
                    style={{ fontFamily: 'Outfit_Regular', lineHeight: '25px' }}
                  >
                    Join us and transform your audience engagement, connect with
                    them in a meaningful way and capture the feedback that
                    matters most.
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
