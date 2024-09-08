import ResultTable from '../table/channel'
import { GETISSELLER, showAmount } from '../../constants/global'
import { IBetChannelResponse } from '../../interface/IBet'
import { pageurl } from '../../constants/pageurl'
import { getNumberOfTickets } from '../utils/helper'
import { useChannelSubscriptions } from '../../api/subscriptions'
import { useGlobalContext } from '../layout/context'
import { ITableRecord } from '../table/utils'

export type btnType = 'outlined' | 'bold' | 'disabled' | 'danger' | undefined

const PublicBetChannelTable = ({
  betChannels,
  callChannel
}: {
  betChannels: IBetChannelResponse[]
  callChannel: () => void
}) => {
  const { getSubProps } = useChannelSubscriptions(callChannel)
  const { rsProps, setShareProps } = useGlobalContext()

  const topRankTH = ['Channel', 'Per Prediction Cost (PPC)', 'Actions']

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
              // setBetChannelItemProps?.({
              //   pageTitle: i.title,
              //   slug: i.slug
              // })
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
            isOwner: false,
            predictions: () => {
              // setBetChannelSlug?.(i.slug, i.title, 'public')
              rsProps?.callSection({
                action: 'view',
                component: 'public-predictions',
                title: i.title + ' - Predictions',
                data: {
                  pageTitle: i.title,
                  slug: i.slug
                }
              })
            },
            addPrediction: () => {}
          }
        }
      ],
      rowActions: !GETISSELLER()
        ? [
            {
              value: getSubProps(i).text,
              action: () => {
                getSubProps(i).action()
              },
              buttonType: getSubProps(i).buttonType,
              load: getSubProps(i).load
            }
          ]
        : [
            {
              value: 'Share',
              icon: '',
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
    <>
      <div
        className="bs px-2 py-3 rounded bg-white w-100"
        style={{ overflow: 'auto' }}
      >
        <ResultTable
          hideNumbering
          header={topRankTH}
          currentPage={1}
          record={topRankData}
          cellWidth={100 / topRankTH.length}
        />
      </div>
    </>
  )
}

export default PublicBetChannelTable
