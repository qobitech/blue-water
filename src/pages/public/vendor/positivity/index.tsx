import { TypeButton } from '../../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { getIsLogged, getUserData } from '../../../../constants/global'
import { pageurl } from '../../../../constants/pageurl'
import { PageContainer } from '../../../../components/utils/reusable'
import './style.scss'

const PositivitySection = () => {
  const navigate = useNavigate()
  return (
    <div className="PositivitySectionWrapper">
      <PageContainer>
        <div className="f-column-20 Positivity">
          <h5 className="PositivityText1">
            Beyond the thrill of earning,{' '}
            <span className="PositivityText1Span">
              experience the rewarding feeling of positively impacting
              people&apos;s lives.
            </span>
          </h5>
          <h5 className="PositivityText2">
            Your expert predictions help others improve their chances of success
            in the betting world.
          </h5>
          <div className="PositivityCTA">
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
                    : pageurl.ONBOARDING + '/' + getUserData()?.user?.userName
                )
              }
            />
          </div>
          <div className="mt-auto py-3">
            <p className="PositivityText3">
              “Imagine the satisfaction of witnessing the joy and gratitude from
              those who have benefited from your invaluable tips.”
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default PositivitySection
