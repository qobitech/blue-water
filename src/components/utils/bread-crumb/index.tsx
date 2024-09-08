import { useNavigate } from 'react-router-dom'
import { GETDASHBOARDURL } from '../../../constants/global'
import './style.scss'
import { AngleRightSVG, HomeSVG, PulseSVG, RightArrowSVG } from '../svgs'

export interface ICrumb {
  title: string
  url: string
}
export interface IBreadCrumb {
  crumbs: ICrumb[]
}

const BreadCrumb: React.FC<IBreadCrumb> = ({ crumbs }) => {
  const navigate = useNavigate()

  return (
    <div className="bread-crumb-section">
      <div className="bread-crumb-container gap-18">
        <div className="f-row aic" onClick={() => navigate(GETDASHBOARDURL())}>
          <HomeSVG />
        </div>
        <RightArrowSVG />
        {crumbs.map((i, index) => {
          if (index !== crumbs.length - 1) {
            return (
              <div className="bread-crumb-header-text" key={index}>
                <div
                  onClick={() => navigate(i.url)}
                  className="color-label bread-crumb-link-container"
                >
                  {i.title}
                </div>
                &nbsp;&nbsp;
                <div className="hw-mx mx-2">
                  <AngleRightSVG />
                </div>
                &nbsp;
              </div>
            )
          } else {
            return (
              <div className="bread-crumb-header-text" key={index}>
                {i.title || <PulseSVG />}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default BreadCrumb
