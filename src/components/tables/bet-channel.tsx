import { useState } from 'react'
import ResultTable from '../../components/table/channel'
import {
  GETISSELLER,
  showAmount,
  getUserData,
  GETISBUYER
} from '../../constants/global'
import { IBetChannelResponse } from '../../interface/IBet'
import { pageurl } from '../../constants/pageurl'
import { getNumberOfTickets } from '../utils/helper'
import { useSubscribeChannel } from '../../api/channels'
import { ITableAction, ITableRecord } from '../table/utils'
import { useGlobalContext } from '../layout/context'

const BetChannelTable = ({
  betChannels,
  tableAction,
  handleTableAction,
  myChannel,
  onSubSuccess
}: {
  betChannels: IBetChannelResponse[]
  myChannel: boolean
  tableAction?: ITableAction
  handleTableAction?: () => void
  onSubSuccess?: () => void
}) => {
  const [selectedChannel, setSelectedChannel] = useState<string>('')

  const subChannelProps = useSubscribeChannel(() => {
    onSubSuccess?.()
    setSelectedChannel('')
  })

  const { setShareProps, rsProps } = useGlobalContext()

  const topRankTH = ['Channel', 'Per Prediction Cost (PPC)', 'Actions']

  const isOwner = (userId: string) =>
    GETISSELLER() && getUserData()?.user?._id === userId

  const getSubValue = (i: IBetChannelResponse) => {
    return i.subscription === 'paid'
      ? showAmount(i.perPredictionCost)
      : i.subscription
  }

  const topRankData: ITableRecord[] = betChannels
    ?.sort((a, b) => {
      if (a.ranking < b.ranking) return -1
      return 1
    })
    .map((i, index) => ({
      id: index + 1 + '',
      row: [
        {
          id: 'channel',
          value: i.title,
          props: {
            position: i.ranking,
            url: `${pageurl.BETCHANNEL}/${i.slug}`,
            view: () => {
              rsProps?.callSection({
                action: 'view',
                component: 'bet-channel-item',
                title: 'Channel',
                data: {
                  pageTitle: i.title,
                  slug: i.slug
                }
              })
            },
            share: () => {
              setShareProps?.({
                url: `${pageurl.BETCHANNEL}/${i.slug}`,
                description: `Checkout this prediction Channel "${i.title}" on MyTipster.pro, they have amazing bet odds`,
                title: 'Channel',
                category: 'bet tips'
              })
            },
            stats: () => {
              // setBetStatProps?.({
              //   pageTitle: i.title,
              //   slug: i.slug
              // })
              rsProps?.callSection({
                action: 'view',
                component: 'bet-stats',
                title: 'Stats',
                data: {
                  pageTitle: i.title,
                  slug: i.slug
                }
              })
            },
            frequency:
              'Over ' +
              (i.odds - 0.1) +
              ' odds ( ' +
              getNumberOfTickets(i.numberOfPredictions) +
              i.frequency +
              ' )',
            verified: i.verified
          }
        },
        {
          id: 'subscription',
          value: getSubValue(i),
          props: {
            activeTips: i.predictionCount,
            subscribers: i.subscriptionCount,
            isOwner: isOwner(i.userId),
            predictions: () => {
              rsProps?.callSection({
                action: 'view',
                component: 'predictions',
                title: i.title + ' - Predictions',
                data: {
                  pageTitle: i.title,
                  slug: i.slug
                }
              })
            },
            addPrediction: myChannel
              ? () => {
                  rsProps?.callSection({
                    action: 'create',
                    component: 'predictions',
                    data: i,
                    id: i._id,
                    title: `${i.title.toUpperCase()} - Add bet code`,
                    max: true
                  })
                }
              : undefined
          }
        }
      ],
      rowActions: GETISBUYER()
        ? [
            {
              value: i.isUserSubscribed ? 'Unfollow' : 'Follow',
              action: () => {
                setSelectedChannel(i._id)
                subChannelProps.mutate({
                  id: i._id,
                  body: {
                    itemId: i._id,
                    itemType: 'channel',
                    status: i.isUserSubscribed ? 'unsubscribed' : 'subscribed',
                    name: i.title
                  }
                })
              },
              buttonType: i.isUserSubscribed ? 'outlined' : 'bold',
              load: subChannelProps.isLoading && selectedChannel === i._id
            }
          ]
        : isOwner(i.userId) && myChannel
        ? [
            {
              value: 'Edit',
              buttonType: 'outlined',
              action: () => {
                rsProps?.callSection({
                  action: 'update',
                  component: 'channel',
                  data: i,
                  id: i._id,
                  title: `${i.title.toUpperCase()} - Edit`
                })
              }
            }
          ]
        : [
            {
              value: 'Share',
              buttonType: 'outlined',
              action: () => {
                setShareProps?.({
                  url: `${pageurl.BETCHANNEL}/${i.slug}`,
                  description: `Checkout this prediction Channel "${i.title}" on MyTipster.pro, they have amazing bet odds`,
                  title: 'Channel',
                  category: 'bet tips'
                })
              }
            }
          ]
    })) as ITableRecord[]

  return (
    <div className="py-3 rounded bg-white w-100" style={{ overflow: 'auto' }}>
      <ResultTable
        hideNumbering
        header={topRankTH}
        currentPage={1}
        record={topRankData}
        cellWidth={100 / topRankTH.length}
        tableAction={tableAction}
        handleTableAction={handleTableAction}
      />
    </div>
  )
}

export default BetChannelTable
