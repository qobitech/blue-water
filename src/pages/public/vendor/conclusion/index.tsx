import { TypeButton } from '../../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../../constants/pageurl'
import { getIsLogged, getUserData } from '../../../../constants/global'
import './style.scss'

const ConclusionSection = () => {
  const navigate = useNavigate()
  return (
    <div className="ConclusionSectionWrapper">
      <div className="Conclusion">
        <div className="ConclusionCard1">
          <p className="ConclusionCard1Text">
            Seize this opportunity to showcase your talent, earn a significant
            income, and make a genuine difference...
          </p>
        </div>
        <div className="ConclusionCard2">
          <p className="ConclusionCard2Text">
            Join our community of passionate tipsters today and let your bet
            predictions improve people&apos;s chance at winning.
          </p>
        </div>
      </div>
      <div className="f-row jcc">
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
    </div>
  )
}

export default ConclusionSection
