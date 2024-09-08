import { useNavigate } from 'react-router-dom'
import { gallery } from '../../../assets'
import { GETISBUYER } from '../../../constants/global'
import { pageurl } from '../../../constants/pageurl'

const sellerQuickActions = [
  {
    action: 'Add Bet code',
    icon: gallery.qa_plus.src,
    url: `${pageurl.BETTICKETS}/create`
  },
  {
    action: 'Add Channel',
    icon: gallery.qa_addFile.src,
    url: `${pageurl.BETCHANNEL}/create`
  },
  {
    action: 'View Channels',
    icon: gallery.qa_internet.src,
    url: `${pageurl.BETCHANNEL}/all`
  },
  {
    action: 'View Profile',
    icon: gallery.qa_search.src,
    url: pageurl.MYACCOUNTPROFILE
  },
  // {
  //   action: 'Edit Profile',
  //   icon: edit,
  //   url: `${pageurl.MYACCOUNT}/settings/profile`
  // },
  // { action: 'Play & Win', icon: game, url: '' },
  {
    action: 'Check Schedule',
    icon: gallery.qa_calendar.src,
    url: `${pageurl.MYACCOUNT}/schedule-&-earnings/subscribers`
  },
  {
    action: 'Go to Settings',
    icon: gallery.qa_gear.src,
    url: `${pageurl.MYACCOUNT}/settings/profile`
  },
  // {
  //   action: 'Upgrade Plan',
  //   icon: gallery.qa_badge.src,
  //   url: `${pageurl.MYACCOUNT}/membership`
  // },
  {
    action: 'Check Wallet',
    icon: gallery.qa_wallet.src,
    url: `${pageurl.MYACCOUNT}/wallet`
  }
  // {
  //   action: 'Earn Points',
  //   icon: earning,
  //   url: `${pageurl.MYACCOUNT}/membership`
  // }
]

const buyerQuickActions = [
  // {
  //   action: 'My Bet Tips',
  //   icon: idea,
  //   url: `${pageurl.MYBETTICKETS}`
  // },
  // {
  //   action: 'Get Bet Tips',
  //   icon: idea,
  //   url: `${pageurl.BETTICKETS}/all`
  // },
  // {
  //   action: 'Subscribe',
  //   icon: subscribe,
  //   url: `${pageurl.BETCHANNEL}/all`
  // },
  {
    action: 'Check Wallet',
    icon: gallery.qa_wallet.src,
    url: `${pageurl.MYACCOUNT}/wallet`
  },
  {
    action: 'View Profile',
    icon: gallery.qa_search.src,
    url: pageurl.MYACCOUNTPROFILE
  },
  // {
  //   action: 'Edit Profile',
  //   icon: edit,
  //   url: `${pageurl.MYACCOUNT}/settings/profile`
  // },
  // // { action: 'Play & Win', icon: game, url: '' },
  // // { action: 'Check Schedule', icon: calendar, url: '' },
  {
    action: 'Go to Settings',
    icon: gallery.qa_gear.src,
    url: `${pageurl.MYACCOUNT}/settings/profile`
  }
  // {
  //   action: 'Upgrade Plan',
  //   icon: badge,
  //   url: `${pageurl.MYACCOUNT}/membership`
  // }

  // {
  //   action: 'Check Schedule',
  //   icon: calendar,
  //   url: `${pageurl.MYACCOUNT}/schedule`
  // }
  // {
  //   action: 'Earn Points',
  //   icon: earning,
  //   url: `${pageurl.MYACCOUNT}/membership`
  // }
]

export const quickActionData = GETISBUYER()
  ? buyerQuickActions
  : sellerQuickActions

export const QuickAction = ({
  action,
  icon,
  url
}: {
  action: string
  icon: string
  url: string
}) => {
  const navigate = useNavigate()
  return (
    <div
      style={{ border: '1px dotted #c8c8c8', minWidth: '151.3px' }}
      className="w-100 rounded f-column aic jcc py-4 px-3 cursor-pointer"
      onClick={() => navigate(url)}
    >
      <img src={icon} alt="" className="mb-2" style={{ width: '35px' }} />
      <p className="m-0 cursor-pointer text-little color-brand">{action}</p>
    </div>
  )
}
