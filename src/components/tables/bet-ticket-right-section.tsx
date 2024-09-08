import { useCopy } from '../utils/hooks'
import { IMultiBetTicketResponse } from '../../interface/IBet'
import PredictionTable from '../table/prediction'
import { pageurl } from '../../constants/pageurl'
import PaginationComponent from '../utils/pagination'
import { IPredictionRecord, ITableAction } from '../table/utils'
import { useGlobalContext } from '../layout/context'

const BetTicketTableRightSection = ({
  betTickets,
  tableAction,
  handleTableAction,
  handlePagination,
  pageCount,
  currentPage
}: {
  betTickets?: IMultiBetTicketResponse[]
  tableAction?: ITableAction
  handleTableAction?: () => void
  handlePagination?: (selectedItem: { selected: number }) => void
  pageCount?: number
  currentPage?: number
}) => {
  const { setShareProps, rsProps, handleSetPrediction } = useGlobalContext()

  const predictionssTH = ['Bet Code', 'Bookie']

  const copyProps = useCopy()

  const sortTicketByDate = (
    a: IMultiBetTicketResponse,
    b: IMultiBetTicketResponse
  ) => {
    if (new Date(b.createdAt || '') > new Date(a.createdAt || '')) {
      return 1
    }
    if (new Date(b.createdAt || '') < new Date(a.createdAt || '')) {
      return -1
    }
    return 0
  }

  const predictions = betTickets?.sort(sortTicketByDate)?.map((i) => ({
    id: i._id,
    row: [
      {
        value: i.code,
        id: 'code',
        props: {
          odds: i.odds,
          startDate: i.startDate,
          endDate: i.endDate,
          active: i.active,
          isSubscribed: !i.code.includes('*'),
          status: i.status,
          sports: i.sports,
          unlock: () => {
            handleSetPrediction?.(i)
            rsProps?.addRightSectionHistory()
            rsProps?.callSection({
              action: 'view',
              component: 'get-code-option',
              title: 'Get Code'
            })
          },
          copySuccess: copyProps.action === i._id,
          copy: () => {
            copyProps.setAction(i._id + '')
            copyProps.copy(i.code)
          },
          share: () => {
            rsProps?.addRightSectionHistory()
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
          status: i.status
        }
      }
    ]
  })) as IPredictionRecord[]

  return (
    <>
      <div
        className="pt-3 bg-white w-100"
        style={{ overflow: 'auto', maxHeight: '360px' }}
      >
        <PredictionTable
          header={predictionssTH}
          currentPage={1}
          record={predictions}
          cellWidth={100 / predictionssTH.length}
          tableAction={tableAction}
          handleTableAction={handleTableAction}
          hideNumbering
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

export default BetTicketTableRightSection
