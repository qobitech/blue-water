import RightSection, {
  IRightSection,
  useRightSection
} from '../../../components/layout/right-section'
import { CardHeader } from '../reusable/card-table'
import { CardFilter, useCardFilter } from '../overview'
import MembershipSetting from './membership'
import Sport from './sport'
import Bookie from './bookie'
import NotificationPreferenceSettings from './notification-preference'
// import SubscriptionSetting from './membership-subscription-plan'
import MemberSubscriptionService from './membership-subscription-service'
import UserTier from './user-tier'
import ChannelSubscriptionThreshold from './channel-sub-threshold'
import EarningEvents from './earning-events'
import ReportCategory from './report-category'
import AchievementsAndRewardsSettings from './achievements-and-tasks'
import RewardSettings from './rewards'
import './index.scss'
import '../page.scss'

const filterEnums = {
  SUBSCRIPTION: 'Subscription',
  NOTIFICATION: 'Notification',
  TRANSACTIONS: 'Transactions',
  OTHERS: 'Others'
} as const

type typeFilterEnum = (typeof filterEnums)[keyof typeof filterEnums]

interface ISettingsData {
  title: string
  description: string
  category: typeFilterEnum
  action: () => void
}

const settingsData = (rsProps: IRightSection<{}>): ISettingsData[] => [
  {
    title: 'Membership',
    description: 'Lorem ipsum',
    category: 'Subscription',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'membership-settings',
        title: 'Membership Settings'
      })
    }
  },
  {
    title: 'Membership Subscription Plan',
    description: 'Lorem ipsum',
    category: 'Subscription',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'subscription-settings',
        title: 'Membership Subscription'
      })
    }
  },
  {
    title: 'Member Subscription Service',
    description: 'Lorem ipsum',
    category: 'Subscription',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'member-subscription-service-settings',
        title: 'Member Subscription Service'
      })
    }
  },
  {
    title: 'User Tier',
    description: 'Lorem ipsum',
    category: 'Subscription',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'user-tier',
        title: 'User Tier Setup'
      })
    }
  },
  {
    title: 'Channel Subscription Threshold',
    description: 'Lorem ipsum',
    category: 'Subscription',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'channel-subscription-service-settings',
        title: 'Channel Subscription Threshold'
      })
    }
  },
  {
    title: 'Earning Events',
    description: 'Lorem ipsum',
    category: 'Transactions',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'earning-events',
        title: 'Earning Events'
      })
    }
  },
  {
    title: 'Sports',
    description: 'Lorem ipsum',
    category: 'Others',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'sports',
        title: 'Sports'
      })
    }
  },
  {
    title: 'Bookies',
    description: 'Lorem ipsum',
    category: 'Others',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'bookies',
        title: 'Bookies'
      })
    }
  },
  {
    title: 'Notification',
    description: 'Lorem ipsum',
    category: 'Notification',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'notification-preference',
        title: 'Notification Preference'
      })
    }
  },
  {
    title: 'Report Category',
    description: 'Lorem ipsum',
    category: 'Subscription',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'report-category',
        title: 'Report Category'
      })
    }
  },
  {
    title: 'Achievements & Tasks',
    description: 'Lorem ipsum',
    category: 'Others',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'achievements-&-tasks',
        title: 'Achievements & Tasks'
      })
    }
  },
  {
    title: 'Rewards',
    description: 'Lorem ipsum',
    category: 'Others',
    action: () => {
      rsProps.callSection({
        action: 'view',
        component: 'rewards',
        title: 'Rewards'
      })
    }
  }
]

const AdminSettings = () => {
  const rsProps = useRightSection()
  const cardFilterProps = useCardFilter()

  const filteredSettingsData = settingsData(rsProps).filter((i) =>
    cardFilterProps.filterItems(i.category)
  )

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView('view', 'earning-events') && <EarningEvents />}
        {rsProps.isView('view', 'membership-settings') && <MembershipSetting />}
        {rsProps.isView('view', 'channel-subscription-service-settings') && (
          <ChannelSubscriptionThreshold />
        )}
        {rsProps.isView('view', 'user-tier') && <UserTier />}
        {rsProps.isView('view', 'member-subscription-service-settings') && (
          <MemberSubscriptionService />
        )}
        {/* {rsProps.isView('view', 'subscription-settings') && (
          <SubscriptionSetting />
        )} */}
        {rsProps.isView('view', 'sports') && <Sport />}
        {rsProps.isView('view', 'bookies') && <Bookie />}
        {rsProps.isView('view', 'notification-preference') && (
          <NotificationPreferenceSettings />
        )}
        {rsProps.isView('view', 'report-category') && <ReportCategory />}
        {rsProps.isView('view', 'achievements-&-tasks') && (
          <AchievementsAndRewardsSettings />
        )}
        {rsProps.isView('view', 'rewards') && <RewardSettings />}
      </RightSection>
      <div className="admin-page">
        <div className="admin-page-container">
          <div className="admin-settings">
            <CardHeader title="Settings" tag="Manage app settings" />
            <div className="py-4" />
            <CardFilter
              cardFilterProps={cardFilterProps}
              filterEnums={Object.values(filterEnums)}
            />
            <div className="grid-wrapper-20 gap-30">
              {filteredSettingsData.map((i, index) => (
                <SettingsCard
                  description={i.description}
                  title={i.title}
                  key={index}
                  action={i.action}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSettings

const SettingsCard = ({
  title,
  description,
  action
}: {
  title: string
  description: string
  action: () => void
}) => {
  return (
    <div className="admin-settings-card" onClick={action}>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  )
}
