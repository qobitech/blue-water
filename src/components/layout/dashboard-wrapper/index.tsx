import './style.scss'
import { getIsLogged } from '../../../constants/global'

const DashboardWrapper = ({ children }: { children?: any }) => {
  return (
    <div className="main-wrapper w-100">
      <div
        className={`main-content-wrapper ${getIsLogged() ? 'islogged' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}

export default DashboardWrapper
