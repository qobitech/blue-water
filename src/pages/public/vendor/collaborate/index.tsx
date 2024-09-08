import { TypeButton } from '../../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { getIsLogged, getUserData } from '../../../../constants/global'
import { pageurl } from '../../../../constants/pageurl'
import './style.scss'

const CollaborateSection = () => {
  const navigate = useNavigate()
  return (
    <div className="CollaborateSectionWrapper">
      <div className="Collaborate f-column-60 jcc">
        <div className="text-center">
          <h6 className="CollaborateTxt1">
            “Collaborate with like-minded individuals”
          </h6>
        </div>
        <div className="w-100 f-column-40 jcc aic">
          <h6 className="CollaborateTxt2">
            Together, we can improve the standards of betting experience
          </h6>
          <div className="f-row">
            <TypeButton
              title="GET STARTED AS A BET ADVISOR"
              buttonSize="large"
              className="px-3"
              style={{ background: '#F4BB40', color: '#302A3B' }}
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
      </div>
    </div>
  )
}

export default CollaborateSection
