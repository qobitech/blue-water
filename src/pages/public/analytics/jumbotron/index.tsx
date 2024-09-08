import { PageContainer } from '../../../../components/utils/reusable'
import { TypeButton } from '../../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { getIsLogged, getUserData } from '../../../../constants/global'
import { pageurl } from '../../../../constants/pageurl'
import { gallery } from '../../../../assets'
import './style.scss'

const JumbotromSection = () => {
  const navigate = useNavigate()
  return (
    <div className="AnalyticsHeaderContainer">
      <PageContainer>
        <div className="AnalyticsHeaderTop f-row jcsb">
          <div className="f-column jcc analytics-content">
            <h1 className="AnalyticsHeader">
              Discover Mytipster.pro&apos;s exclusive insights!
            </h1>
            <p className="AnalyticsHeaderTag">
              Making informed decisions can be the difference between triumph
              and defeat
            </p>
            <p className="AnalyticsHeaderDescription">
              At Mytipster.pro, our commitment is to deliver invaluable
              information that enables you to make well-informed decisions when
              buying betting tips
            </p>
            <div>
              <TypeButton
                title="JOIN MYTIPSTER.PRO"
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
          <div className="AnalyticsHeaderIllustration">
            <img src={gallery.analytics.src} alt="analytics" />
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default JumbotromSection
