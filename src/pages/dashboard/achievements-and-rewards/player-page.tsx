import { LegacyRef } from 'react'
import AchievementsandRewards from '.'
import Template from '../template'

const AchievementsRewardsPage = ({
  eventsRef
}: {
  eventsRef?: LegacyRef<HTMLDivElement>
}) => {
  return (
    <Template
      title="Achievements & Rewards"
      crumbs={[{ title: 'Achievements & Rewards', url: '' }]}
    >
      <AchievementsandRewards />
    </Template>
  )
}

export default AchievementsRewardsPage
