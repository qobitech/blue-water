import { PageContainer } from '../../../components/utils/reusable'
import { TypeButton } from '../../../components/utils/button'
import './style.scss'
import { Reveal } from '../landing-page/reveal'
import {
  ExcellenceSVG,
  IntegritySVG,
  SustainabilitySVG
} from '../../../components/utils/svgs'
import { useGlobalContext } from '../../../components/layout/context'

const MissionSection = () => {
  const { rsProps } = useGlobalContext()

  const createFeedback = (title: string) => {
    rsProps?.callSection({
      action: 'create',
      component: 'feedback',
      title,
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

  return (
    <div className="DIContainer">
      <PageContainer>
        <div className="DI f-column-20">
          <p className="mx-auto m-0 header-txt-landing">Mission</p>
          <p className="DIHeader">
            To collaborate with leading developers to build sustainable, iconic
            projects that enhance communities and deliver exceptional returns.
          </p>
          <div style={{ maxWidth: '69.375rem' }} className="mx-auto w-100">
            <div className="grid-wrapper-30 gap-20">
              {diContents.map((i, index) => (
                <div className="DISection gap-17" key={index}>
                  <div className="icon-card-container f-row aic jcc">
                    {i.icon}
                  </div>
                  <h1 className="DISectionHeader header-txt-landing m-0">
                    {i.header}
                  </h1>
                  <p className="DISectionDescription">{i.description}</p>
                </div>
              ))}
            </div>
          </div>
          <Reveal className="cta-wrapper container f-row px-0 jcc pt-5 mt-4">
            <TypeButton
              buttonSize="large"
              buttonType="bold"
              buttonShape="square"
              title="Explore the property"
              aria-label="Explore the Property - BlueWater Shores"
              onClick={() => createFeedback('Explore the Property')}
            />
            <TypeButton
              buttonSize="large"
              buttonType="outlined"
              buttonShape="square"
              title="Partner with Us"
              aria-label="Partner with Us - BlueWater Shores"
              onClick={() => createFeedback('Partner with Us')}
            />
          </Reveal>
        </div>
      </PageContainer>
    </div>
  )
}

export default MissionSection
