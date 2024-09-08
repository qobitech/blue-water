import { PageContainer } from '../../../../components/utils/reusable'
import { TypeButton } from '../../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { getIsLogged, getUserData } from '../../../../constants/global'
import { pageurl } from '../../../../constants/pageurl'
import './style.scss'

const DeepInsightsSection = () => {
  const diContents = [
    {
      header: 'Experience level',
      description: 'How long vs How Well'
    },
    {
      header: 'Decision making level',
      description: 'Conservative vs Risk seeking'
    },
    {
      header: 'Popularity level',
      description: 'Quantity vs Quality'
    },
    {
      header: 'Integrity level',
      description: 'Quantity vs Quality vs Consumer Rating'
    }
  ]
  const navigate = useNavigate()
  return (
    <div className="DIContainer">
      <PageContainer>
        <div className="DI f-column-20">
          <p className="DIHeader">
            Our information provides deep insights into:
          </p>
          <div style={{ maxWidth: '69.375rem' }} className="mx-auto w-100">
            <div className="grid-wrapper-40 gap-20">
              {diContents.map((i, index) => (
                <div className="DISection" key={index}>
                  <h1 className="DISectionHeader">{i.header}</h1>
                  <p className="DISectionDescription">{i.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="CTAWrapper">
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
      </PageContainer>
    </div>
  )
}

export default DeepInsightsSection
