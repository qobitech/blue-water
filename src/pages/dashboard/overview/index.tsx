import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { GETISBUYER, GETISSELLER, getUserData } from '../../../constants/global'
import { StatsSection } from './stats'
import { ISCTA, SalesSection } from './sales'
import { handleScroll } from '../../../components/utils/helper'
import { pageurl } from '../../../constants/pageurl'
import Template from '../template'
import NextAction from './next-action'
// style
import './index.scss'
import { JumboSection } from './jumbo'
// import Avatars from './avatars'
import { useGlobalContext } from '../../../components/layout/context'

const Overview = () => {
  const { rsProps } = useGlobalContext()
  const navigate = useNavigate()

  const tabSectionRef = useRef<HTMLDivElement>(null)

  const sellerCTA: ISCTA[] = [
    {
      title: 'Add Bet Code',
      type: 'bold',
      action: () => {
        rsProps?.callSection({
          action: 'create',
          component: 'predictions',
          title: 'Add Bet Code',
          max: true
        })
      }
    }
  ]

  const buyerCTA: ISCTA[] = [
    {
      title: 'Browse Tips',
      type: 'bold',
      action: () => {
        navigate(pageurl.BETTICKETS)
        handleScroll(tabSectionRef)
      }
    }
  ]

  const salesCTA = GETISSELLER() ? sellerCTA : buyerCTA

  return (
    <Template title={''} crumbs={[{ title: 'Overview', url: '' }]} nobg>
      <div className="f-column-53 pb-5">
        <div className="f-column-17">
          <JumboSection
            campaignTitle={'Welcome ' + getUserData().user?.userName}
          />
          <SalesSection
            campaignTitle={'Football season is here!'}
            tagline="Gear up for the excitement—get ready to dive into the action!"
            cta={salesCTA}
          />
        </div>
        {/* <Avatars /> */}
        <NextAction />
        {!GETISBUYER() ? <StatsSection /> : null}
      </div>
    </Template>
  )
}

export default Overview
