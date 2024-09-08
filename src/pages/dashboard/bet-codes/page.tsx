import { useGlobalContext } from '../../../components/layout/context'
import { TipMenuSVG } from '../../../components/utils/svgs'
import { GETISBUYER } from '../../../constants/global'
import Template from '../template'
import AllBetTips from './all'

const BetTips = () => {
  const { rsProps } = useGlobalContext()
  return (
    <Template
      title="Bet Codes"
      hint={
        GETISBUYER() ? 'Review channel stats before selecting a bet code.' : ''
      }
      crumbs={[{ title: 'Bet Codes', url: '' }]}
      icon={<TipMenuSVG />}
      actionProps={{
        text: 'Learn more',
        action: () => {
          rsProps?.callSection({
            action: 'view',
            component: 'bet-stats-instruction',
            title: 'Channel Stats'
          })
        }
      }}
    >
      <AllBetTips />
    </Template>
  )
}

export default BetTips
