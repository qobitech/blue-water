import { pageurl } from '../../constants/pageurl'
import './style.scss'

import Icon from './page-illustration'

import { PageContainer } from '../../components/utils/reusable'
import { TypeButton } from '../../components/utils/button'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
  const nav = useNavigate()
  return (
    <div className={`PageWrapper`}>
      <div className="ContentWrapper">
        <PageContainer>
          <div className="w-100 f-column aic">
            <Icon />
            <p className="TxtContainer mt-5">Sorry for the inconvenience</p>
            <TypeButton
              title="Back to home"
              buttonType="outlined"
              onClick={() => {
                nav(pageurl.HOME)
              }}
            />
          </div>
        </PageContainer>
      </div>
    </div>
  )
}

export default Page404
