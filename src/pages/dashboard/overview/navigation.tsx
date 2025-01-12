import { gallery } from '../../../assets'
import { pageurl } from '../../../constants/pageurl'
import { useNavigate } from 'react-router-dom'
import {
  BUTTON_PRIMARY,
  GETISBUYER,
  GETISSELLER
} from '../../../constants/global'
import { IGlobalRightSection } from '../../../components/layout/right-section/utils'

const Navigation = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps } = globalContext
  const sellerQuickActions = [
    {
      action: 'Add Bet code',
      icon: gallery.qa_idea.src,
      url: ``,
      func: () => {
        rsProps?.addRightSectionHistory()
        rsProps?.callSection({
          action: 'create',
          component: 'predictions',
          title: `Add bet code`,
          max: true
        })
      }
    },
    {
      action: 'View Channels',
      icon: gallery.qa_search.src,
      url: `${pageurl.BETCHANNEL}/all`
    },
    {
      action: 'View Profile',
      icon: gallery.qa_internet.src,
      url: ``,
      func: () => {
        window.open(`${pageurl.MYACCOUNT}/profile`, '_self')
      }
    },
    {
      action: 'Edit Profile',
      icon: gallery.qa_edit.src,
      url: ``,
      func: () => {
        window.open(`${pageurl.MYACCOUNT}/settings/profile`, '_self')
      }
    },
    // { action: 'Play & Win', icon: game, url: '' },
    {
      action: 'Check Schedule',
      icon: gallery.qa_calendar.src,
      url: ``,
      func: () => {
        window.open(`${pageurl.MYACCOUNT}/schedule-&-earnings`, '_self')
      }
    },
    {
      action: 'Go to Settings',
      icon: gallery.qa_gear.src,
      url: ``,
      func: () => {
        window.open(`${pageurl.MYACCOUNT}/settings/profile`, '_self')
      }
    }
  ]

  const buyerQuickActions = [
    {
      action: 'Get Bet Tip',
      icon: gallery.qa_idea.src,
      url: ``,
      func: () => {
        window.open(`${pageurl.BETTICKETS}/all`, '_self')
      }
    },
    {
      action: 'View Profile',
      icon: gallery.qa_internet.src,
      url: ``,
      func: () => {
        window.open(`${pageurl.MYACCOUNT}/profile`, '_self')
      }
    },
    {
      action: 'Edit Profile',
      icon: gallery.qa_edit.src,
      url: ``,
      func: () => {
        window.open(`${pageurl.MYACCOUNT}/settings/profile`, '_self')
      }
    },
    {
      action: 'Go to Settings',
      icon: gallery.qa_gear.src,
      url: ``,
      func: () => {
        window.open(`${pageurl.MYACCOUNT}/settings/profile`, '_self')
      }
    }
  ]
  return (
    <div>
      <div className="mt-2">
        <div>
          <div className="grid-wrapper-30 gap-23">
            {GETISSELLER()
              ? sellerQuickActions.map((i, index) => (
                  <QuickAction
                    key={index}
                    action={i.action}
                    icon={i.icon}
                    url={i.url}
                    func={i.func}
                  />
                ))
              : null}
            {GETISBUYER()
              ? buyerQuickActions.map((i, index) => (
                  <QuickAction
                    key={index}
                    action={i.action}
                    icon={i.icon}
                    url={i.url}
                    func={i.func}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation

const QuickAction = ({
  action,
  icon,
  url,
  func
}: {
  action: string
  icon: string
  url: string
  func?: () => void
}) => {
  const navigate = useNavigate()
  const isfunc = typeof func === 'function'
  return (
    <div
      style={{ border: '1px dotted #c8c8c8', minWidth: '151.3px' }}
      className="w-100 rounded d-flex flex-column align-items-center justify-content-center py-4 px-3 cursor-pointer"
      onClick={() => (isfunc ? func() : navigate(url))}
    >
      <img src={icon} alt="" className="mb-2" style={{ width: '35px' }} />
      <p
        className="m-0 cursor-pointer text-little"
        style={{ color: BUTTON_PRIMARY }}
      >
        {action}
      </p>
    </div>
  )
}
