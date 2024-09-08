import { useMemo } from 'react'
import { TabSection, useTabSection } from '../../../components/utils/reusable'
import Settings from './settings'
import { useLocation, useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'
import { GETISADMIN, GETISBUYER, GETISSELLER } from '../../../constants/global'
import { _isUrl } from '../../../components/utils/helper'
import ProfilePage from './profile'
import SchedulesPage from './schedule'
import Template from '../template'
import Wallet from './wallet'

export const accountTabEnum = {
  PROFILE: 'Profile',
  WALLET: 'Wallet',
  SCHEDULE: 'Schedule & Earnings',
  SETTINGS: 'Settings'
}

const getTabEnum = () => {
  if (GETISBUYER()) {
    const { SCHEDULE, ...updatedTabEnum } = accountTabEnum
    return updatedTabEnum
  }
  if (GETISSELLER()) {
    return accountTabEnum
  }
  if (GETISADMIN()) {
    const { SCHEDULE, SETTINGS, ...updatedTabEnum } = accountTabEnum
    return updatedTabEnum
  }
}

const MyAccountPage = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const defaultTab = useMemo(() => {
    let pgUrl = accountTabEnum.PROFILE
    for (const url of Object.values(accountTabEnum)) {
      if (
        _isUrl(
          `${pageurl.MYACCOUNT}/${url.toLowerCase().trim().replace(/ /g, '-')}`,
          location
        )
      ) {
        pgUrl = url
        break
      }
    }
    return pgUrl
  }, [location])

  const onSetTab = (tab?: string) => {
    const pageTab = tab === accountTabEnum.SETTINGS ? `${tab}/profile` : tab
    navigate(
      `${pageurl.MYACCOUNT}/${pageTab?.toLowerCase().trim().replace(/ /g, '-')}`
    )
  }

  const myAccountTabCategories = useTabSection(
    defaultTab,
    getTabEnum() as { [key: string]: string },
    undefined,
    onSetTab
  )

  const { isTab } = myAccountTabCategories

  const isPro = isTab(accountTabEnum.PROFILE)
  const isEar = isTab(accountTabEnum.WALLET)
  const isSet = isTab(accountTabEnum.SETTINGS)
  const isSch = isTab(accountTabEnum.SCHEDULE)

  return (
    <Template
      title="My Account"
      crumbs={[{ title: 'My Account', url: pageurl.MYACCOUNT }]}
    >
      <div className="bg-white rounded pb-4">
        <div className="border-bottom mb-4">
          <TabSection
            tabProps={myAccountTabCategories.tabProps}
            position="start"
            // tabGap="10"
            type="default"
          />
        </div>
        <div className="w-100">
          <div className={isPro ? '' : 'd-none'}>
            <ProfilePage />
          </div>
          <div className={isEar ? '' : 'd-none'}>
            <Wallet />
          </div>
          <div className={isSet ? '' : 'd-none'}>
            <Settings />
          </div>
          <div className={isSch ? '' : 'd-none'}>
            <SchedulesPage />
          </div>
        </div>
      </div>
    </Template>
  )
}

export default MyAccountPage
