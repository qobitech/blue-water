import { useState } from 'react'
import { PageContainer } from '../../../../components/utils/reusable'
import { TypeButton } from '../../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { getIsLogged, getUserData } from '../../../../constants/global'
import { pageurl } from '../../../../constants/pageurl'
import Performance from './performance'
import ROI from './roi'
import Rating from './rating'
import Upvotes from './upvotes'
import Subscribers from './subscribers'
import { gallery } from '../../../../assets'
import './style.scss'

export interface IBetPerformance {
  win: number
  played: number
  month: string
}
export interface ICustomerRating {
  rating: number
  month: string
}
export interface IUpVotes {
  upvotes: number
  month: string
}

export interface ISubscribersData {
  label: string
  value: string
}

const VisualDataSection = () => {
  const navigate = useNavigate()
  const tabHeaders = ['Performance', 'ROI', 'Rating', 'Up Votes', 'Subscribers']
  const [tab, setTab] = useState<string>(tabHeaders[0])
  const betPerformance: IBetPerformance[] = [
    {
      win: 20,
      played: 40,
      month: 'January'
    },
    {
      win: 40,
      played: 45,
      month: 'February'
    },
    {
      win: 20,
      played: 25,
      month: 'March'
    },
    {
      win: 10,
      played: 15,
      month: 'April'
    },
    {
      win: 10,
      played: 15,
      month: 'May'
    },
    {
      win: 30,
      played: 31,
      month: 'June'
    },
    {
      win: 10,
      played: 15,
      month: 'July'
    },
    {
      win: 0,
      played: 0,
      month: 'August'
    },
    {
      win: 0,
      played: 0,
      month: 'September'
    },
    {
      win: 0,
      played: 0,
      month: 'October'
    },
    {
      win: 0,
      played: 0,
      month: 'November'
    },
    {
      win: 0,
      played: 0,
      month: 'December'
    }
  ]
  const customerRating: ICustomerRating[] = [
    {
      rating: 4,
      month: 'January'
    },
    {
      rating: 4,
      month: 'February'
    },
    {
      rating: 2,
      month: 'March'
    },
    {
      rating: 1,
      month: 'April'
    },
    {
      rating: 1,
      month: 'May'
    },
    {
      rating: 3,
      month: 'June'
    },
    {
      rating: 1,
      month: 'July'
    },
    {
      rating: 0,
      month: 'August'
    },
    {
      rating: 0,
      month: 'September'
    },
    {
      rating: 0,
      month: 'October'
    },
    {
      rating: 0,
      month: 'November'
    },
    {
      rating: 0,
      month: 'December'
    }
  ]
  const upvotes: IUpVotes[] = [
    {
      upvotes: 4,
      month: 'January'
    },
    {
      upvotes: 4,
      month: 'February'
    },
    {
      upvotes: 2,
      month: 'March'
    },
    {
      upvotes: 1,
      month: 'April'
    },
    {
      upvotes: 1,
      month: 'May'
    },
    {
      upvotes: 3,
      month: 'June'
    },
    {
      upvotes: 1,
      month: 'July'
    },
    {
      upvotes: 0,
      month: 'August'
    },
    {
      upvotes: 0,
      month: 'September'
    },
    {
      upvotes: 0,
      month: 'October'
    },
    {
      upvotes: 0,
      month: 'November'
    },
    {
      upvotes: 0,
      month: 'December'
    }
  ]
  const subscribers: ISubscribersData[] = [
    {
      label: 'Jan',
      value: '10'
    },
    {
      label: 'Feb',
      value: '5'
    },
    {
      label: 'Mar',
      value: '23'
    },
    {
      label: 'Apr',
      value: '35'
    },
    {
      label: 'May',
      value: '21'
    },
    {
      label: 'Jun',
      value: '10'
    },
    {
      label: 'Jul',
      value: '11'
    },
    {
      label: 'Aug',
      value: '0'
    },
    {
      label: 'Sept',
      value: '0'
    },
    {
      label: 'Oct',
      value: '0'
    },
    {
      label: 'Nov',
      value: '0'
    },
    {
      label: 'Dec',
      value: '0'
    }
  ]
  return (
    <div className="VDContainer">
      <PageContainer>
        <div className="VD text-center">
          <h1 className="VDSectionHeader">
            We present this wealth of data in a visually appealing format
          </h1>
          <p className="VDSectionDescription">
            Very easy for you to grasp key information at a glance
          </p>
          <p className="VDHeader">Our visual representations include</p>
          <div className="DITabSection">
            <div className="DITabHeaderSection">
              {tabHeaders.map((i, index) => (
                <div
                  key={index}
                  className={`DITabHeaderItem ${tab === i ? 'active' : ''}`}
                  onClick={() => setTab(i)}
                >
                  <p className="DITabHeadertext">{i}</p>
                </div>
              ))}
            </div>
            <div className="p-3">
              {tab === tabHeaders[0] && (
                <Performance betPerformance={betPerformance} />
              )}
              {tab === tabHeaders[1] && (
                <ROI
                  betPerformance={betPerformance}
                  isCalculator
                  isDefinition
                />
              )}
              {tab === tabHeaders[2] && (
                <Rating customerRating={customerRating} />
              )}
              {tab === tabHeaders[3] && <Upvotes upvotes={upvotes} />}
              {tab === tabHeaders[4] && (
                <Subscribers subscribers={subscribers} />
              )}
            </div>
          </div>
          <div
            className="f-row jcc pt-3 pb-4 mx-auto"
            style={{ maxWidth: '1100px', width: '90%' }}
          >
            <img
              src={gallery.timeTable.src}
              alt="data analytics table"
              style={{ width: '100%' }}
            />
          </div>
          <div className="CTAWrapper">
            <TypeButton
              title="GET STARTED AT MYTIPSTER.PRO"
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

export default VisualDataSection
