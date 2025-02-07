import { memo } from 'react'
import './style.scss'
import { ActionComponent, IOptionAction } from '../../utils/reusable'
import { HamburgerSVG } from '../../utils/svgs'
import { NavItems } from './nav-items'
import { IRightSection } from '../right-section/utils'
import { LogoTextSVG } from '../../utils/svgs/f-awesome'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

interface IHeader {
  rsProps: IRightSection<{}> | undefined
}

const Header = memo(({ rsProps }: IHeader) => {
  const navigate = useNavigate()
  const createFeedback = () => {
    rsProps?.callSection({
      action: 'create',
      component: 'feedback',
      title: 'Create Feedback Link',
      max: true
    })
  }

  const actions: IOptionAction[] = [
    {
      label: 'Explore the Property',
      action: createFeedback
    },
    {
      label: 'Partner with Us',
      action: createFeedback
    }
  ]

  return (
    <div className={`header-container-wrapper px-2 fix-nav`}>
      <div className="header-container gap-73">
        <div className="w-100 f-row-39 aic">
          <div
            className="logo-container hw-mx"
            onClick={() => navigate(pageurl.HOME)}
          >
            <LogoTextSVG />
          </div>
          <NavItems />
          <div className="nav-profile-container gap-20 mr-4">
            <ActionComponent
              title="Get Started"
              actions={actions}
              buttonType="outlined"
            />
          </div>
          <div className="profile-container-mobile gap-20">
            <div className="cursor-pointer hw-mx">
              <HamburgerSVG />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

Header.displayName = 'Header'

export default Header
