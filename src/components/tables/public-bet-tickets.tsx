import { useCopy } from '../utils/hooks'
import {
  IBetChannelResponse,
  IMultiBetTicketResponse
} from '../../interface/IBet'
import PredictionTable from '../table/prediction'
import { pageurl } from '../../constants/pageurl'
import { IPUCS } from '../../api/subscriptions'
import { GETISSELLER, getIsLogged } from '../../constants/global'
import PaginationComponent from '../utils/pagination'
import { TypeSmallButton } from '../utils/button'
import { IPredictionRecord, ITableAction } from '../table/utils'
import { useGlobalContext } from '../layout/context'

const PublicBetTickets = ({
  betTickets,
  tableAction,
  handleTableAction,
  channelSubscriptionProps,
  handlePagination,
  pageCount,
  currentPage,
  onRefresh
}: {
  betTickets?: IMultiBetTicketResponse[]
  tableAction?: ITableAction
  handleTableAction?: (action?: string, id?: string) => void
  channelSubscriptionProps?: IPUCS
  handlePagination?: (selectedItem: { selected: number }) => void
  pageCount?: number
  currentPage?: number
  onRefresh?: () => void
}) => {
  const { rsProps, handleSetPrediction, setShareProps, globalStateActions } =
    useGlobalContext()

  if (!globalStateActions) return <>reload page</>

  const { cartProps } = globalStateActions

  const predictionssTH = tableAction?.actionEnums
    ? ['Bet Code', 'Bookie', 'Channel', 'Action']
    : ['Bet Code', 'Bookie', 'Channel']

  const copyProps = useCopy()

  // const [selectedCartId, setSelectedCartId] = useState<string>('')

  const getSubValues = (i: IBetChannelResponse) => {
    const channelId = i?._id
    const isSubscribed = !!i?.isUserSubscribed
    const isSelected = channelSubscriptionProps?.selectedChannel === channelId
    return {
      isSubscribed,
      load: isSelected ? channelSubscriptionProps?.subChannelLoading : false,
      action: () => {
        channelSubscriptionProps?.handleChannelSubscription(i)
      }
    }
  }

  // const onModifyCartSuccess = (data: IDefaultResponse) => {
  //   setNotification?.(data.message, true)
  //   refreshCartItems?.()
  //   setSelectedCartId('')
  // }

  // const modifyCartProps = useModifyCartItem(onModifyCartSuccess)

  const handleDropDownActions = (
    data: IMultiBetTicketResponse,
    action: string
  ) => {
    handleTableAction?.(action, data._id)
  }

  const dropDownActions = (data: IMultiBetTicketResponse) =>
    Object.values(tableAction?.actionEnums || {}).map((i, index) => ({
      label: i,
      action: () => {
        handleDropDownActions(data, i)
      }
    }))

  const getIsAddItemToCart = (id: string) => {
    const cartItems = cartProps?.data?.data?.carts || []
    return !!cartItems.filter((i) => i.itemId === id)?.[0]
  }

  const predictions = betTickets?.map((i) => ({
    id: i._id,
    row: [
      {
        value: i.code,
        id: 'code',
        props: {
          odds: i.odds,
          startDate: i.startDate,
          endDate: i.endDate,
          isSubscribed: !i.code.includes('*'),
          status: i.status,
          active: i.active,
          sports: i.sports,
          unlock: () => {
            if (getIsLogged()) {
              handleSetPrediction?.(i)
              rsProps?.addRightSectionHistory()
              rsProps?.callSection({
                action: 'view',
                component: 'get-code-option',
                title: 'Get Code',
                onRefresh
              })
            } else {
              rsProps?.callSection({
                action: 'view',
                component: 'login',
                title: 'Login'
              })
            }
          },
          isAddItemToCart: getIsAddItemToCart(i._id),
          onModifyCart: () => {
            // setSelectedCartId(i._id)
            // modifyCartProps.mutate({
            //   body: {
            //     userId: userData.user._id,
            //     item: 'code',
            //     amount: getAmount(i.channel.perPredictionCost + ''),
            //     description: `Pay for bet code (${i.odds} odds)`,
            //     itemType: 'betcode',
            //     itemId: i._id,
            //     transactionType: TRANSACTIONTYPEENUM.PURCHASE,
            //     title: `Bet code (${i.odds} odds)`
            //   }
            // })
          },
          // onModifyCartLoading:
          //   selectedCartId === i._id && modifyCartProps.isLoading,
          copySuccess: copyProps.action === i._id,
          copy: () => {
            copyProps.setAction(i._id + '')
            copyProps.copy(i.code)
          },
          share: () => {
            setShareProps?.({
              title: 'Channel',
              url: `${pageurl.BETCHANNEL}/${i.channel?.slug}`,
              description: `${i.bookie} Bet Code "${i.code}" (${i.odds} odds).`,
              category: 'bet tips'
            })
          }
        }
      },
      {
        value: i.bookie,
        id: 'bookie',
        props: {
          stake: () => {},
          status: i.status
        }
      },
      {
        value: i.channel?.title,
        id: 'channel',
        props: {
          verified: i.channel?.verified,
          stats: () => {
            // setBetStatProps?.({
            //   pageTitle: i.channel?.title,
            //   slug: i.slug
            // })
            rsProps?.callSection({
              action: 'view',
              component: 'bet-stats',
              title: 'Stats',
              data: {
                pageTitle: i.channel?.title,
                slug: i.slug
              }
            })
          },
          predictions: () => {
            // setBetChannelSlug?.(i.slug, i.channel?.title, 'public')
            rsProps?.callSection({
              action: 'view',
              component: 'public-predictions',
              title: i.channel?.title + ' - Predictions',
              data: {
                pageTitle: i.channel?.title,
                slug: i.slug
              }
            })
          },
          subscribed: getSubValues(i.channel).isSubscribed,
          onSubscribe: () => {
            getSubValues(i.channel).action()
          },
          subscribeLoad: getSubValues(i.channel).load
        }
      }
    ],
    rowActions: tableAction?.actionEnums
      ? [
          {
            title: 'Options',
            type: 'drop-down',
            dropDownActions: dropDownActions(i),
            buttonType: 'outlined'
          }
        ]
      : []
  })) as IPredictionRecord[]

  const onAddBetTip = () => {
    rsProps?.callSection({
      action: 'create',
      component: 'predictions',
      title: `Add bet code`,
      max: true
    })
  }

  return (
    <>
      <div
        className="py-3 rounded bg-white w-100 over-flow-auto"
        // style={{ maxHeight: '335px' }}
      >
        <PredictionTable
          header={predictionssTH}
          currentPage={1}
          record={predictions}
          cellWidth={100 / predictionssTH.length}
          hideNumbering
          isPublic
          noDataCTA={
            GETISSELLER() ? (
              <TypeSmallButton title="Add Bet Code" onClick={onAddBetTip} />
            ) : null
          }
          handleTableAction={handleTableAction}
          tableAction={tableAction}
        />
      </div>
      <PaginationComponent
        currentPage={currentPage || 1}
        pages={pageCount || 0}
        handlePagination={handlePagination}
      />
    </>
  )
}

export default PublicBetTickets
