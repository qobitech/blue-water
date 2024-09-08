import {
  GETISBUYER,
  getIsLogged,
  getUserData,
  showAmount
} from '../../../constants/global'
import { pageurl } from '../../../constants/pageurl'
import { useNavigate } from 'react-router-dom'
import { AdSideRightBannerI221X101, displayAd } from '../../../ad'
import moment from 'moment'
import './style.scss'
import { PreviewSVG } from '../../utils/svgs'
import { useGlobalContext } from '../../layout/context'
import { getWalletStatsData } from '../../../pages/dashboard/my-account/wallet/data'

const SideContentComponent = () => {
  const { globalStateActions, rsProps } = useGlobalContext()

  if (!globalStateActions) return <>reload page</>

  const {
    walletProps
    // cartProps
  } = globalStateActions

  // const cartItems = cartProps?.data?.data?.carts

  if (!walletProps) return <></>

  const walletStats = getWalletStatsData(walletProps?.data)

  const lastLogin = Number(getUserData()?.user?.lastLogin)

  const level = getUserData()?.user?.level?.[0]?.title || '...'

  const quickInfo = [
    {
      title: 'Last Login',
      value: `${lastLogin ? moment(lastLogin).fromNow() : 'new login'}`,
      url: ''
    },
    {
      title: 'Level',
      value: level,
      url: '',
      action: () => {
        rsProps?.callSection({
          action: 'view',
          component: 'user-tier',
          title: 'View User Level Info'
        })
      },
      hide: GETISBUYER()
    },
    {
      title: 'Wallet',
      url: `${pageurl.MYACCOUNT}/wallet`,
      value: showAmount(walletStats[0].amount)
    },
    // {
    //   title: 'Avatar',
    //   url: ``,
    //   value: 'The ' + (getUserData()?.user?.avatar || 'undecided'),
    //   action: () => {
    //     rsProps?.callSection({
    //       action: 'view',
    //       component: 'avatars',
    //       title: `Avatar - The ${getUserData()?.user?.avatar || 'undecided'}`,
    //       data: {
    //         avatar: getUserData()?.user?.avatar || 'undecided'
    //       }
    //     })
    //   }
    // },
    {
      title: 'Navigation',
      url: ``,
      value: '',
      icon: <PreviewSVG />,
      action: () => {
        rsProps?.callSection({
          action: 'view',
          component: 'quick-nav',
          title: 'Navigation'
        })
      }
    }
  ]

  // const sellerData = [
  //   // {
  //   //   title: 'Add Bet tip',
  //   //   url: `${pageurl.BETTICKETS}/create`
  //   // },
  //   // {
  //   //   title: 'My Channels',
  //   //   url: `${pageurl.BETCHANNEL}/all`
  //   // },
  //   {
  //     title: 'Check Schedule',
  //     url: `${pageurl.MYACCOUNT}/schedule-&-earnings`
  //   },
  //   {
  //     title: 'My Account',
  //     url: pageurl.MYACCOUNTPROFILE
  //   }
  // ]

  // const buyerData = [
  //   {
  //     title: 'My Account',
  //     url: pageurl.MYACCOUNTPROFILE
  //   },
  //   {
  //     title: 'View Cart',
  //     url: pageurl.MYACCOUNTPROFILE,
  //     action: () => {
  //       setPaymentInfo?.(
  //         cartItems?.map((cartItem) => ({
  //           amount: parseFloat(cartItem.amount),
  //           item: cartItem.item,
  //           itemType: cartItem.itemType as transactionItemType,
  //           description: cartItem.description,
  //           itemId: cartItem.itemId,
  //           transactionType: cartItem.transactionType as transactionType,
  //           title: cartItem.title,
  //           quantity: 1,
  //           mutateQuantity: false
  //         })) || [],
  //         'betcode'
  //       )
  //     },
  //     hide: true
  //   }
  // ]

  // interface IBox {
  //   title: string
  //   value?: string
  //   url?: string
  //   action?: () => void
  //   hide?: boolean
  // }

  // const boxData: IBox[] = GETISSELLER()
  //   ? sellerData
  //   : GETISBUYER()
  //   ? buyerData
  //   : [
  //       {
  //         title: '',
  //         value: '',
  //         url: '',
  //         action: () => {}
  //       }
  //     ]

  return (
    <div className="side-content mb-5 w-100 f-column-10">
      <div className={`side-content-wrapper bg-white w-100 p-3 ${displayAd}`}>
        <AdSideRightBannerI221X101 />
      </div>
      {getIsLogged() && (
        <div className="f-column-10">
          <div className="side-content-wrapper bg-white p-3 w-100 rounded">
            <SideHeader title="USER INFO" />
            <div className="f-column-7">
              {quickInfo
                .filter((i) => !i.hide)
                .map((i, index) => (
                  <SideBox
                    key={index}
                    title={i.title}
                    url={i.url}
                    value={i.value}
                    action={i.action}
                    icon={i.icon}
                  />
                ))}
            </div>
          </div>
          {/* <div className="side-content-wrapper bg-white p-3 w-100 rounded">
            <SideHeader title="QUICK ACTION" />
            {boxData
              .filter((i) => !i.hide)
              .map((i, index) => (
                <SideBoxQuickAction
                  key={index}
                  title={i.title}
                  url={i.url || ''}
                  onAction={i.action}
                />
              ))}
          </div> */}
        </div>
      )}
    </div>
  )
}

export default SideContentComponent

const SideHeader = ({ title }: { title: string }) => {
  return (
    <div className="border-bottom pb-2 mb-2">
      <div>
        <p className="text-little m-0 mb-2">{title}</p>
      </div>
    </div>
  )
}

// const SideBoxQuickAction = ({
//   url,
//   title,
//   onAction
// }: {
//   url: string
//   title: string
//   onAction?: () => void
// }) => {
//   const navigate = useNavigate()
//   const isAction = typeof onAction === 'function'
//   return (
//     <div className="f-row ais jcsb py-2">
//       <p
//         onClick={() => (isAction ? onAction() : navigate(url))}
//         className={`m-0 text-little  ${
//           url ? 'color-brand cursor-pointer' : ''
//         }`}
//       >
//         {title}
//       </p>
//     </div>
//   )
// }

const SideBox = ({
  url,
  value,
  title,
  action,
  icon
}: {
  url: string
  value: string
  title: string
  action?: () => void
  icon?: JSX.Element
}) => {
  const navigate = useNavigate()
  const isAction = typeof action === 'function'
  return (
    <div className="f-row ais jcsb py-2">
      <div style={{ width: '100px' }} className="f-row-7 aic">
        <p
          onClick={() => {
            if (isAction) {
              action?.()
            } else {
              navigate(url)
            }
          }}
          className={`m-0 text-tiny  ${
            url || isAction ? 'color-brand cursor-pointer' : ''
          }`}
        >
          {title}
        </p>
        {icon}
      </div>
      <p className="m-0 text-tiny">{value}</p>
    </div>
  )
}
