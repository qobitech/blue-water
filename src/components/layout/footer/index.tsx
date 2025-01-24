import { Dispatch, memo, SetStateAction } from 'react'
import { PageContainer } from '../../utils/reusable'
import { TypeButton, TypeSmallButton } from '../../utils/button'
import './index.scss'
import { HVC } from '../../utils/hvc'
import { _isMobile } from '../../utils/helper'
import { useGlobalContext } from '../context'
import { LogoAnimated } from '../../utils/hooks'

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
    const { rsProps } = useGlobalContext()

    const createFeedback = () => {
      rsProps?.callSection({
        action: 'create',
        component: 'feedback',
        title: 'Create Feedback Link',
        max: true
      })
    }
    return (
      <div className="footer-container">
        <PageContainer>
          <HVC removeDOM view={!hideTopFooter} className="py-5">
            <div className="f-column-25">
              <div className="div-wrapper">
                <div className="div-left f-column-10 m-auto aic text-center">
                  <div className="ResponsiveDivLeft mb-3">
                    <LogoAnimated />
                  </div>
                  <p
                    className="p-footer-class font-28"
                    style={{ lineHeight: '2.2rem' }}
                  >
                    Tevotea empowers you to stay connected with your audience
                    and deliver what they truly need.
                  </p>
                  <p className="p-footer-class">
                    So stop guessing, start building products & services users
                    love.
                  </p>
                  <div className="cta-wrapper pt-4">
                    <TypeButton
                      buttonSize="large"
                      title="Create a Feedback Campaign"
                      className={_isMobile() ? 'hw-mx mx-auto' : ''}
                      onClick={createFeedback}
                      buttonType="bold"
                    />
                  </div>
                </div>
                <div className="div-right f-column-15 d-none">
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
                <li
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
                    // onClick={() => navigate(pageurl.LOGIN)}
                  />
                </li>
                <li
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
                </li>
                <li
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
                </li>
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
