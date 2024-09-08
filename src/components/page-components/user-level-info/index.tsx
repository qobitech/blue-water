import { getUserData } from '../../../constants/global'
import { TypeSmallButton } from '../../utils/button'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

const UserLevelInfo = () => {
  const navigate = useNavigate()

  const onAchievements = () => {
    navigate(pageurl.ACHIEVEMENTS)
  }

  const level = getUserData()?.user?.level?.[0]?.title

  const benefits = {
    Novice: noviceBenefits,
    Junior: jnrBenefits,
    Intermediate: intermediateBenefits,
    Senior: snrBenefits,
    Master: masterBenefits
  }

  return (
    <div className="f-column-33">
      <div>
        <h4>User Level - {level}</h4>
      </div>
      <div className="f-column-7">
        <p className="ff-bold text-small m-0">BENEFITS</p>
        <div className="border-label rounded p-4">
          <ul className="f-column-23">
            {benefits[level].map((i, index) => (
              <li className="text-small" key={index}>
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="f-row-20 flex-wrap aic">
        <p className="m-0 text-little">To move to the next level</p>
        <TypeSmallButton
          buttonSize="small"
          buttonType="outlined"
          title="Go to Achievents & Rewards Page"
          onClick={onAchievements}
        />
      </div>
    </div>
  )
}

const noviceBenefits = [
  'Complete User Verification and Start Selling bet tips for up to $0.50 each'
]
const jnrBenefits = [
  'Boost your earnings by increasing the price for bet tips to up to $1 each.'
]
const intermediateBenefits = [
  'Boost your earnings by increasing the price for bet tips to up to $2 each.'
]
const snrBenefits = [
  'Boost your earnings by increasing the price for bet tips to up to $5 each.',
  'Get Featured in the recommendation section'
]
const masterBenefits = [
  'Boost your earnings by increasing the price for bet tips to up to $10 each.',
  'Get Featured in the recommendation section',
  'Join the Prop Firm Challenge (Coming Soon)'
]

export default UserLevelInfo
