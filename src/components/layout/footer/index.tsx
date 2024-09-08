import { Dispatch, memo, SetStateAction } from 'react'
import { PageContainer } from '../../utils/reusable'
import { TypeButton, TypeSmallButton } from '../../utils/button'
// import { ISBETA } from '../../../constants/global'
import { pageurl } from '../../../constants/pageurl'
import { useNavigate } from 'react-router-dom'
import './index.scss'
// import { gallery } from '../../../assets'
import { HVC } from '../../utils/hvc'
import { LogoSVG, LogoTextSVG } from '../../utils/svgs'

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
    const navigate = useNavigate()
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
                  <h6 className="h5-footer-class">
                    Discover how easy it is to keep your finger on the pulse of
                    your audience. Because every voice matters, and every
                    opinion counts.
                  </h6>
                  <p className="p-footer-class">
                    Tevotea makes it simple for you to stay connected with and
                    understand your audience&apos;s thoughts, preferences, and
                    feedback, promoting a sense of value and connection between
                    you and the audience.
                  </p>
                </div>
                <div className="div-right f-column-15">
                  <h6
                    style={{ lineHeight: '30px', fontSize: '1.15rem' }}
                    className="ff-bold m-0"
                  >
                    Great content deserves great engagement?
                  </h6>
                  <p
                    style={{ fontFamily: 'Outfit_Regular', lineHeight: '25px' }}
                  >
                    Join the growing list of brands that are transforming their
                    audience engagement. From radio stations to TV networks,
                    we&apos;re helping you hear what matters.
                  </p>
                  <div className="cta-wrapper">
                    <TypeButton
                      buttonSize="large"
                      title="Start Collecting Feedback"
                      onClick={() => setJoinWaitingList?.(true)}
                      buttonType="black"
                      icon={<LogoSVG color="#fff" />}
                    />
                    {/* <TypeButton
                      buttonSize="large"
                      title="Get Started for Free"
                      buttonType="outlined"
                      onClick={() => navigate(pageurl.REGISTER)}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </HVC>
          <div className="pt-4 pb-5 footer border-label-top w-100">
            <div className="footer-left f-row-10 aic">
              <LogoTextSVG width="65" />
              <p className="m-0 text-little">
                &#169; {new Date().getFullYear()}
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
                    onClick={() => navigate(pageurl.TC)}
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
                    onClick={() => navigate(pageurl.PP)}
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
