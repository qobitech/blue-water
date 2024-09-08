import { TypeButton } from '../../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { getIsLogged, getUserData } from '../../../../constants/global'
import { pageurl } from '../../../../constants/pageurl'
import { PageContainer } from '../../../../components/utils/reusable'
import './style.scss'

const AboutSection = () => {
  const navigate = useNavigate()
  return (
    <div className="AboutSectionWrapper">
      <PageContainer>
        <div className="f-column-20 text-center">
          <div className="text-center f-row jcc">
            <h6 className="AboutText1">
              We&apos;re searching for individuals like you who can make
              accurate bet predictions.
            </h6>
          </div>
          <div className="f-row jcc text-center">
            <h6 className="AboutText2">
              Imagine making a consistent income by sharing professional betting
              tips with a dedicated community.
            </h6>
          </div>
          <div className="text-center">
            <TypeButton
              title="HOW DO I BEGIN ?"
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

export default AboutSection
