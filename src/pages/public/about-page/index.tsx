import { PageContainer } from '../../../components/utils/reusable'
import { TypeButton } from '../../../components/utils/button'

import staffing from '../../../assets/images/Lakeside Cityscape with Palm Trees.webp'
import './style.scss'
import { Reveal } from '../landing-page/utils'
import MissionSection from './mission'
import { useGlobalContext } from '../../../components/layout/context'

const AboutPage = () => {
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
    <>
      <div className="AnalyticsContainer">
        <PageContainer>
          <div className="container grid-wrapper-40 gap-40">
            <div className="AnalyticsIllustration">
              <img
                src={staffing}
                alt="risk"
                className="w-100 h-100"
                style={{ objectFit: 'cover', objectPosition: 'left' }}
              />
            </div>
            <div className="f-column jcc analytics-content">
              <p className="m-0 mb-4 header-txt-landing about-header-title">
                About Us
              </p>
              <h1 className="AnalyticsHeader">
                BlueWater Shores Realty Ltd was founded with a vision to create
                timeless developments on Nigeria’s most exclusive waterfront
                property.
              </h1>
              <p className="AnalyticsHeaderDescription">
                Our 10,000 square metres property is surrounded by breathtaking
                water views and is primed for transformative projects.
              </p>
              <Reveal className="cta-wrapper container f-row px-0">
                <TypeButton
                  title="Explore the property"
                  buttonSize="large"
                  // buttonType="outlined"
                  buttonShape="square"
                  aria-label="Proceed to Sign up oor Sign in"
                  onClick={createFeedback}
                />
                <TypeButton
                  title="Partner with Us"
                  buttonSize="large"
                  buttonType="outlined"
                  buttonShape="square"
                  className="border-0"
                  // style={{ background: 'none' }}
                  aria-label="Proceed to Sign up oor Sign in"
                  onClick={createFeedback}
                />
              </Reveal>
            </div>
          </div>
        </PageContainer>
      </div>
      <MissionSection />
    </>
  )
}

export default AboutPage
