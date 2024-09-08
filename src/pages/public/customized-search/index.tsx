import { LegacyRef, FC } from 'react'
import { TypeButton } from '../../../components/utils/button'
import {
  HeaderComponent,
  PageContainer
} from '../../../components/utils/reusable'
import TabToggler, {
  useTabToggler
} from '../../../components/utils/tab-toggler'
import { pageurl } from '../../../constants/pageurl'
import { useNavigate } from 'react-router-dom'
import AllBetTips from '../../dashboard/bet-codes/all'
import { SINGLETIPSCONFIG } from '../../../constants/global'

interface ICustomizedSearch {
  freeTipsRef?: LegacyRef<HTMLDivElement> | undefined
}

const CustomizedSearch: FC<ICustomizedSearch> = ({ freeTipsRef }) => {
  enum categoryEnum {
    SINGLE = 'Single Tips',
    BOOKINGNUMBER = 'Bet Code'
  }

  const navigate = useNavigate()

  const tabOptions = [
    {
      id: '1',
      name: categoryEnum.SINGLE,
      icon: ''
    },
    {
      id: '2',
      name: categoryEnum.BOOKINGNUMBER,
      icon: ''
    }
  ]

  const tabTogglerProps = useTabToggler(tabOptions, tabOptions[0], 'right')

  return (
    <div className="py-5" style={{ background: '#fff' }}>
      <PageContainer>
        <div className="text-center pt-5">
          <h5 className="HeaderBodyLandingText">Predictions</h5>
        </div>
        <div className="w-100 pt-4 pb-5" ref={freeTipsRef}>
          <div className="w-100 rounded-50 border-top border-bottom bg-white p-0 p-lg-4">
            <div className="w-100 rounded px-4 pt-4 d-none">
              <div>
                <HeaderComponent title="Discover your daily free betting tips" />
              </div>
              {SINGLETIPSCONFIG && (
                <TabToggler tabTogglerProps={tabTogglerProps} />
              )}
            </div>
            <AllBetTips />
          </div>
          <div className="f-row-20 cta-wrapper py-5 jcc">
            <TypeButton
              buttonSize="large"
              title="Signup to get more tips"
              onClick={() => navigate(`${pageurl.REGISTER}`)}
              buttonType="outlined"
            />
            <TypeButton
              buttonSize="large"
              title="Signup as a bet advisor"
              onClick={() => navigate(`${pageurl.REGISTER}`)}
            />
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default CustomizedSearch
