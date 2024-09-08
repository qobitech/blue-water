import {
  TabSection,
  useTabSection
} from '../../../../components/utils/reusable'
import UserTaskSettings from './tasks'
import UserAchievementSettings from './achievements'

const arEnum = {
  TASKS: 'Tasks',
  ACHIEVEMENTS: 'Achievements'
}

const AchievementsAndRewards = () => {
  const tabSectionProps = useTabSection(arEnum.TASKS, arEnum)

  const isTasks = tabSectionProps.isTab(arEnum.TASKS)
  const isAchievements = tabSectionProps.isTab(arEnum.ACHIEVEMENTS)
  return (
    <div>
      <TabSection
        tabProps={tabSectionProps.tabProps}
        position="start"
        tabGap="30"
      />
      {isTasks ? <UserTaskSettings /> : null}
      {isAchievements ? <UserAchievementSettings /> : null}
    </div>
  )
}

export default AchievementsAndRewards
