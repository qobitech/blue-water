import { PageContainer } from '../../../../components/utils/reusable'
import { TypeButton } from '../../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { getIsLogged, getUserData } from '../../../../constants/global'
import { pageurl } from '../../../../constants/pageurl'
import { gallery } from '../../../../assets'
import './style.scss'

const AboutSection = () => {
  const navigate = useNavigate()
  return (
    <div className="AnalyticsContainer">
      <PageContainer>
        <div className="Analytics f-row jcsb">
          <div className="f-column jcc analytics-content">
            <h1 className="AnalyticsHeader">
              We strongly believe that reducing risks can greatly increase your
              chances of achieving success
            </h1>
            <p className="AnalyticsHeaderDescription">
              With our extensive data, you will have unmatched insight into each
              vendor, allowing you to evaluate their suitability based on
              various critical factors
            </p>
            <div className="">
              <TypeButton
                title="GET STARTED AT MYTIPSTER.PRO"
                buttonSize="large"
                className="px-3"
                style={{ background: '#F4BB40', color: '#123430' }}
                buttonShape="curve"
                onClick={() =>
                  navigate(
                    !getIsLogged()
                      ? pageurl.REGISTER
                      : pageurl.ONBOARDING + '/' + getUserData()?.user?.userName
                  )
                }
              />
            </div>
          </div>
          <div className="AnalyticsIllustration">
            <img src={gallery.risk.src} alt="risk" />
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default AboutSection
