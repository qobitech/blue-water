import { PageContainer } from '../../../../components/utils/reusable'
import { TypeButton } from '../../../../components/utils/button'
import './style.scss'
import { Reveal } from '../../landing-page/utils'
import {
  ExcellenceSVG,
  IntegritySVG,
  SustainabilitySVG
} from '../../../../components/utils/svgs'
import { BRANDCOLOR } from '../../../../constants/global'
import { useGlobalContext } from '../../../../components/layout/context'

const MissionSection = () => {
  const { rsProps } = useGlobalContext()
  const createFeedback = () => {
    rsProps?.callSection({
      action: 'create',
      component: 'feedback',
      title: 'Create Feedback Link',
      max: true
    })
  }
  const diContents = [
    {
      header: 'Sustainability',
      description: 'Preserving nature while innovating for the future',
      icon: <SustainabilitySVG />
    },
    {
      header: 'Integrity',
      description: 'Transparent and ethical partnerships',
      icon: <IntegritySVG />
    },
    {
      header: 'Excellence',
      description: 'Bringing top-tier quality to every project',
      icon: <ExcellenceSVG />
    }
  ]
  // const navigate = useNavigate()
  return (
    <div className="DIContainer">
      <PageContainer>
        <div className="DI f-column-20">
          <p
            className="mx-auto m-0"
            style={{ color: BRANDCOLOR, fontFamily: 'Didot' }}
          >
            <b>Mission</b>
          </p>
          <p className="DIHeader">
            To collaborate with leading developers to build sustainable, iconic
            projects that enhance communities and deliver exceptional returns.
          </p>
          <div style={{ maxWidth: '69.375rem' }} className="mx-auto w-100">
            <div className="grid-wrapper-30 gap-20">
              {diContents.map((i, index) => (
                <div className="DISection border-label gap-11" key={index}>
                  <div>{i.icon}</div>
                  <h1 className="DISectionHeader">{i.header}</h1>
                  <p className="DISectionDescription">{i.description}</p>
                </div>
              ))}
            </div>
          </div>
          <Reveal className="cta-wrapper container f-row px-0 jcc pt-5 mt-4">
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
              // className="border-0"
              // style={{ background: 'none' }}
              aria-label="Proceed to Sign up oor Sign in"
              onClick={createFeedback}
            />
          </Reveal>
        </div>
      </PageContainer>
    </div>
  )
}

export default MissionSection
