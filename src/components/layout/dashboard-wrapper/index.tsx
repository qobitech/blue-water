import SideContentComponent from '../../page-components/side-content'
import './style.scss'
import { GETISBUYER, GETISSELLER, getIsLogged } from '../../../constants/global'

const DashboardWrapper = ({ children }: { children?: any }) => {
  return (
    <div className="main-wrapper w-100">
      <div
        className={`main-content-wrapper ${getIsLogged() ? 'islogged' : ''}`}
      >
        {children}
      </div>
      {GETISBUYER() || GETISSELLER() ? (
        <div className="side-content-main-wrapper">
          <SideContentComponent />
        </div>
      ) : null}
    </div>
  )
}

export default DashboardWrapper
