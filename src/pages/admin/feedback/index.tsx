import { useEffect } from 'react'
import { CardHeader } from '../reusable/card-table'
import { RefreshComponent } from '../../../components/utils/reusable'
import DefaultTable from '../../../components/table/default'
import PaginationComponent from '../../../components/utils/pagination'
import '../page.scss'
// import api
import moment from 'moment'
import { useGetFeedback } from '../../../api/feedback'
import { FilterComponent } from '../../../components/utils/hooks'
import { useGlobalContext } from '../../../components/layout/context'
import { ITableRecord } from '../../../components/table/utils'

const Feedback = () => {
  const { rsProps } = useGlobalContext()

  const feedbackProps = useGetFeedback()

  const feedbacks = feedbackProps?.data?.data?.feedbacks || []

  const onRefresh = () => {
    feedbackProps.mutate({})
  }

  const tableRecord = feedbacks?.map((item, index) => ({
    id: index + '',
    row: [
      {
        value: item.rating,
        rating: true,
        isLink: false
      },
      {
        value: moment(item?.modified).fromNow(),
        isLink: false
      },
      {
        value: item.category,
        isLink: false
      },
      {
        value: item.status,
        isLink: false
      }
    ],
    rowActions: [
      {
        value: 'View',
        isLink: false,
        buttonType: 'outlined',
        action: () => {
          rsProps?.callSection({
            action: 'view',
            component: 'feed-back',
            data: {
              data: item
            },
            onRefresh,
            title: 'View Feedback'
          })
        }
      }
    ]
  })) as ITableRecord[]

  useEffect(() => {
    onRefresh()
  }, [])

  const handlePagination = (selectedItem: { selected: number }) => {}

  const onFilterChange = (id: string, value: string) => {}

  // const load = verificationRequestProps.isLoading

  return (
    <div className="admin-page">
      <div className="admin-page-container">
        <div className="admin-management">
          <CardHeader tag="" title="Feedback" />
          <div>
            <div className="pt-4 f-column gap-10">
              <div className="f-row-30 aic">
                <RefreshComponent
                  load={feedbackProps.isLoading}
                  onRefresh={onRefresh}
                />
                <FilterComponent
                  onFilterChange={onFilterChange}
                  optionsDataManager={[]}
                  optionsDataRepository={[]}
                />
              </div>
              <div className="border rounded over-flow-auto">
                <DefaultTable
                  header={['Rating', 'Date', 'Category', 'Status', 'Action']}
                  record={tableRecord}
                  currentPage={1}
                  hideNumbering
                />
              </div>
              <PaginationComponent
                currentPage={1}
                pages={1}
                handlePagination={handlePagination}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
