import { useEffect, useState } from 'react'
import { defaultGETDataTemplate, useAPIGET } from '../../../api'
import {
  ISubscription,
  ISubscriptionResponse
} from '../../../interface/ISubscription'
import {
  IBetChannel,
  IMultiBetTicketResponse,
  IMultiBetTicketResponses
} from '../../../interface/IBet'
import { showAmount, getUserData } from '../../../constants/global'
import { TypeSelect } from '../../../components/utils/select'
import { TypeInput } from '../../../components/utils/input'
import { getNumberOfTickets } from '../../../components/utils/helper'
import MyPredictionTable from '../../../components/table/my-predictions'
import { useCopy } from '../../../components/utils/hooks'
import { pageurl } from '../../../constants/pageurl'
import PaginationComponent from '../../../components/utils/pagination'
import { RefreshComponent } from '../../../components/utils/reusable'
import { useGlobalContext } from '../../../components/layout/context'
import { IPredictionRecord } from '../../../components/table/utils'
import { SubHeader } from '../my-account/wallet/data'

const predictionssTH = ['Bet Code', 'Bookie', 'Feedback']

export const ChildComponent = ({
  multiplePredictions,
  refresh,
  handlePagination,
  currentPage,
  page
}: {
  multiplePredictions: IMultiBetTicketResponse[]
  refresh: () => void
  handlePagination: (selectedItem: { selected: number }) => void
  currentPage: number
  page: number
}) => {
  const { setShareProps, rsProps } = useGlobalContext()
  const copyProps = useCopy()

  const predictions: IPredictionRecord[] = multiplePredictions?.map(
    (i, index) => ({
      id: i.code + index,
      row: [
        {
          value: i.code,
          id: 'code',
          props: {
            odds: i.odds,
            startDate: i.startDate,
            endDate: i.endDate,
            sports: i.sports,
            isSubscribed: true,
            unlock: () => {},
            active: i.active,
            copySuccess: copyProps.action === i._id,
            copy: () => {
              copyProps.setAction(i._id + '')
              copyProps.copy(i.code)
            },
            share: () => {
              setShareProps?.({
                url: `${pageurl.BETCHANNEL}/${i.channel?.slug}`,
                description: `${i.bookie} Bet Code "${i.code}" (${i.odds} odds).`,
                title: 'Channel',
                category: 'bet tips'
              })
            }
          }
        },
        {
          value: i.bookie,
          id: 'bookie',
          props: {
            stake: () => {}
          }
        },
        {
          value: i.channel?.title,
          id: 'feedback',
          props: {
            reviews: i.reviewCount,
            onReport: () => {
              rsProps?.callSection({
                action: 'create',
                component: 'report',
                id: i._id,
                title: 'Add Report'
              })
            },
            onReview: () => {
              rsProps?.callSection({
                action: 'create',
                component: 'review',
                id: i._id,
                title: 'Add Review',
                data: {
                  betCodeData: i
                },
                onRefresh: refresh
              })
            },
            viewReviews: () => {
              rsProps?.callSection({
                action: 'view',
                component: 'review',
                id: i._id,
                title: 'View Reviews'
              })
            },
            isReview: !i.active,
            subscribed: true,
            onSubscribe: () => {},
            subscribeLoad: false
          }
        }
      ]
    })
  )
  return (
    <>
      <div className="w-100 bg-white py-3" style={{ overflow: 'auto' }}>
        <MyPredictionTable
          header={predictionssTH}
          currentPage={1}
          record={predictions}
          cellWidth={100 / predictionssTH.length}
          hideNumbering
        />
      </div>
      <PaginationComponent
        currentPage={currentPage}
        pages={page}
        handlePagination={handlePagination}
      />
    </>
  )
}

const getSubscriptionInfo = (subscription: ISubscription<IBetChannel>) => {
  const isPaid = subscription?.item?.subscription === 'paid'
  return [
    { label: 'Subscription Type', value: isPaid ? 'Paid' : 'Free' },
    { label: 'Minimum Odds', value: subscription.item.odds },
    {
      label: 'Per Prediction Cost',
      value: showAmount(isPaid ? subscription.item.perPredictionCost : '0')
    },
    {
      label: 'Frequency',
      value:
        getNumberOfTickets(subscription.item.numberOfPredictions) +
        subscription.item.frequency
    },
    {
      label: 'Start Date',
      value: new Date(
        isPaid ? subscription?.startDate : subscription.modified
      ).toDateString()
    },
    {
      label: 'End Date',
      value: isPaid ? new Date(subscription?.endDate).toDateString() : '...'
    }
  ]
}

const SubscribedBetTips = () => {
  const {
    mutate: subscriptionMutate,
    data,
    isLoading: subChannelLoading
  } = useAPIGET<ISubscriptionResponse<IBetChannel>>({
    route: 'subscription',
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        subscriptions: []
      }
    }
  })

  const subscriptions = data?.data.subscriptions

  const [selectedChannel, setSelectedChannel] = useState<string>('')

  const subscriptionType = subscriptions?.map((i) => ({
    id: i._id,
    label: i.item.title + ' (' + i.item.subscription + ')',
    value: i._id
  }))

  const subscription = subscriptions?.filter(
    (i) => i._id === selectedChannel
  )?.[0]

  const {
    mutate: multiplePredictionMutate,
    data: multiplePredictionResponse,
    isLoading
  } = useAPIGET<IMultiBetTicketResponses>({
    route: 'prediction/multiple',
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        multiplePredictions: []
      }
    }
  })

  const currentPage = multiplePredictionResponse.currentPage
  const pages = multiplePredictionResponse.pages

  const multiplePredictions =
    multiplePredictionResponse?.data.multiplePredictions

  useEffect(() => {
    if (getUserData().user)
      subscriptionMutate({
        query: `?userId=${getUserData().user._id}&status=subscribed`
      })
  }, [])

  const handleMultiplePredictionMutate = (page?: number) => {
    multiplePredictionMutate({
      query: `?channelId=${subscription?.itemId}&page=${page}`
    })
  }

  const handlePagination = (selectedItem: { selected: number }) => {
    handleMultiplePredictionMutate((selectedItem.selected || 1) + 1)
  }

  return (
    <>
      <SubHeader
        title="Subscribed tips"
        description=""
        load={subChannelLoading}
        refreshAction={() =>
          subscriptionMutate({
            query: `?userId=${getUserData().user._id}&status=subscribed`
          })
        }
      />
      <div className="w-100 f-column-15 rounded bg-white">
        <div className="grid-wrapper-25 gap-25">
          <TypeSelect
            initoption={{ label: 'Select Channel', value: '' }}
            optionsdata={subscriptionType}
            label="Select Channel"
            customwidth={'100%'}
            onChange={({ target }) => {
              const { value } = target
              const subscription = subscriptions.filter(
                (subscription) => subscription._id === value
              )[0]
              multiplePredictionMutate({
                query: `?channelId=${subscription?.itemId}`
              })
              setSelectedChannel(value)
            }}
            value={selectedChannel || ''}
          />
        </div>
        {subscription ? (
          <div className="grid-wrapper-25 border rounded pt-3 px-3 gap-25">
            <>
              {getSubscriptionInfo(subscription).map(
                ({ label, value }, index) => (
                  <TypeInput
                    isonlyview
                    defaultValue={value}
                    label={label}
                    key={value + '' + index}
                  />
                )
              )}
            </>
          </div>
        ) : null}
        {subscription ? (
          <>
            <div className="f-row-10 aic pb-4">
              <p className="m-0 text-small">Refresh</p>
              <RefreshComponent
                load={isLoading}
                onRefresh={() => handleMultiplePredictionMutate(currentPage)}
              />
            </div>
            <ChildComponent
              multiplePredictions={multiplePredictions}
              refresh={handleMultiplePredictionMutate}
              currentPage={currentPage}
              page={pages}
              handlePagination={handlePagination}
            />
          </>
        ) : null}
      </div>
    </>
  )
}

export default SubscribedBetTips
