import { getIsLogged, getUserData } from '../../../../constants/global'
import { TypeButton } from '../../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../../constants/pageurl'
import { gallery } from '../../../../assets'
import './style.scss'

const Jumbotron = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        background: `linear-gradient(180deg, #129C6A 0%, #064F35 100%)`
      }}
    >
      <div
        className="JumbotronContainer px-5 w-100 position-relative"
        style={{ overflow: 'visible' }}
      >
        <div className="JumbotronContent tipster-container box bounce-2">
          <div className="VendorTextWrapper">
            <p className="VendorBrandText">Make Smarter Bets with Pro Tips</p>
            <h1 className="VendorHeaderText">MYTIPSTER.PRO</h1>
            <h4 className="VendorTagline">
              Unlock your talent for betting predictions and transform it into a
              profitable monthly source of income.
            </h4>
          </div>
          <div className="CTAWrapper gap-20">
            <TypeButton
              title="GET STARTED AS A BET ADVISOR"
              buttonSize="large"
              className="px-3"
              style={{ background: '#F4BB40', color: '#265941' }}
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
        <div className="ImgWrapper py-5 pr-5">
          <img
            src={gallery.vendorJumbo.src}
            alt=""
            style={{ width: '600px' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Jumbotron
