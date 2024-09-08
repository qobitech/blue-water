import { TypeButton } from '../../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { getIsLogged, getUserData } from '../../../../constants/global'
import { pageurl } from '../../../../constants/pageurl'
import { PageContainer } from '../../../../components/utils/reusable'
import './styles.scss'

const CommunitySection = () => {
  const navigate = useNavigate()

  const points = [
    'Connect with fellow tipsters.',
    'Exchange valuable insights.',
    'Receive constructive feedback to continually sharpen your skills.'
  ]
  return (
    <div className="CommunitySectionWrapper">
      <PageContainer>
        <div className="CommunitySectionMain">
          <div className="CommunityContentWrapper">
            <div className="CommunityContent f-column-20">
              <h6 className="CommunityText1">
                By joining our community at MyTipster.pro
              </h6>
              <h6 className="CommunityText2">You have the opportunity to:</h6>
              <div className="f-column-40">
                <ol className="m-0 pl-3 pt-0">
                  {points.map((i, index) => (
                    <li className="CommunityText3" key={index}>
                      {i}
                    </li>
                  ))}
                </ol>
                <div className="f-row">
                  <TypeButton
                    title="CREATE AN ACCOUNT"
                    buttonSize="large"
                    className="px-3"
                    style={{ background: '#F4BB40', color: '#123430' }}
                    buttonShape="curve"
                    onClick={() =>
                      navigate(
                        !getIsLogged()
                          ? pageurl.REGISTER
                          : pageurl.ONBOARDING +
                              '/' +
                              getUserData()?.user?.userName
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default CommunitySection
