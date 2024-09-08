import { useEffect } from 'react'
import ResultTable from '../table/ranking'
import { PRIMARY_COLOR, getUserData } from '../../constants/global'
import { roleEnum } from '../../pages/auth/register/data'
import PaginationComponent from '../utils/pagination'
import { pageurl } from '../../constants/pageurl'
import { getNumberOfTickets } from '../utils/helper'
import { IUseAPI } from '../../api'
import { IBetChannelLeadershipBoard } from '../../interface/IBet'
import { ITableRecord } from '../table/utils'
import { useGlobalContext } from '../layout/context'

const LeadershipTable = ({
  leadershipBoardData
}: {
  leadershipBoardData: IUseAPI<IBetChannelLeadershipBoard>
}) => {
  const globalContext = useGlobalContext()
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  useEffect(() => {
    leadershipBoardData.mutate({})
  }, [])

  const { setShareProps } = globalContext

  const topRankTH = ['Channel', 'Rating', 'Actions'].filter((i) =>
    getUserData().role !== roleEnum.admin
      ? i !== 'Multiple Won' && i !== 'Ranking'
      : i
  )

  const betChannels = leadershipBoardData.data.data.channels

  const topRankData: ITableRecord[] = betChannels.map((i, index) => ({
    id: index + 1 + '',
    row: [
      {
        value: i.title,
        position: i.averageRating,
        action: () => {},
        props: {
          share: () => {
            setShareProps?.({
              url: `${pageurl.BETCHANNEL}/${i.slug}`,
              description: `Checkout this prediction Channel "${i.title}" on MyTipster.pro, they have amazing bet odds`,
              title: 'Channel',
              category: 'bet tips'
            })
          },
          stats: () => {
            // setBetStatProps?.({ pageTitle: i.title, slug: i.slug })
            rsProps?.callSection({
              action: 'view',
              component: 'bet-stats',
              title: 'Stats',
              data: { pageTitle: i.title, slug: i.slug }
            })
          },
          frequency:
            'Over ' +
            (parseInt(i.odds) - 0.1) +
            ' odds ( ' +
            getNumberOfTickets(i.numberOfPredictions) +
            i.frequency +
            ' )',
          verified: i.verified
        }
      },
      {
        value: i.title,
        isLink: true,
        action: () => {},
        rating: i.averageRating
      }
    ],
    rowActions: [
      {
        value: 'View Info',
        isLink: false,
        url: '',
        action: () => {
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
        color: '#fff',
        view: 'both',
        background: PRIMARY_COLOR,
        buttonType: 'outlined'
      }
    ]
  })) as ITableRecord[]

  const handlePagination = (selectedItem: { selected: number }) => {
    leadershipBoardData.mutate({
      query: `?=page=${selectedItem.selected || '1'}`
    })
  }

  return (
    <div className="pt-2">
      <div className="pt-2" style={{ overflow: 'auto' }}>
        <ResultTable
          ranking={true}
          hideNumbering
          header={topRankTH}
          currentPage={1}
          record={topRankData}
          cellWidth={100 / topRankTH.length}
        />
      </div>
      <PaginationComponent
        currentPage={leadershipBoardData.data.currentPage}
        pages={leadershipBoardData.data.pages}
        handlePagination={handlePagination}
      />
    </div>
  )
}

export default LeadershipTable
