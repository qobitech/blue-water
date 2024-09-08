import { getUserData, membershipType } from '../../../constants/global'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'
import { SeparatorComponent } from '../../utils/reusable'

interface IProfile {
  membership: 'Admin' | membershipType
}

const Profile = ({ membership }: IProfile) => {
  const navigate = useNavigate()

  return (
    <div className="f-row-20 aic pr-4">
      <p
        title={getUserData()?.user?.userName}
        onClick={() => navigate(pageurl.MYACCOUNTPROFILE)}
        className="profile-name cursor-pointer"
      >
        {getUserData()?.user?.userName}
      </p>
      <SeparatorComponent />
      <p
        className="m-0 medium px-2 py-1 rounded f-row aic role-indentifier"
        title={membership !== 'Admin' ? membership + ' membership' : membership}
      >
        {getUserData()?.role === 'buyer' ? 'Bet Seeker' : 'Bet Advisor'}
      </p>
    </div>
  )
}

Profile.displayName = 'Profile'

export default Profile
