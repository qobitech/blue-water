import { useEffect } from 'react'
import { CardHeader } from '../reusable/card-table'
import { RefreshComponent } from '../../../components/utils/reusable'
import DefaultTable from '../../../components/table/default'
import PaginationComponent from '../../../components/utils/pagination'
import '../page.scss'
// import api
import { useGetVerificationRequest } from '../../../api/verification-request'
import { getCountry } from '../../../constants/global'
import moment from 'moment'
import { FilterComponent } from '../../../components/utils/hooks'
import { useGlobalContext } from '../../../components/layout/context'
import { ITableRecord } from '../../../components/table/utils'

const VerificationRequest = () => {
  const { rsProps } = useGlobalContext()

  const verificationRequestProps = useGetVerificationRequest()

  const verificationRequests =
    verificationRequestProps?.data?.data?.idVerificationRequest || []

  const onRefresh = () => {
    verificationRequestProps.mutate({})
  }

  const tableRecord = verificationRequests?.map((item, index) => ({
    id: index + '',
    row: [
      {
        value: item.firstName + ' ' + item.lastName,
        isLink: false
      },
      {
        value: getCountry(item?.countryOfResidence),
        isLink: false
      },
      {
        value: moment(item?.modified).fromNow(),
        isLink: false
      },

      {
        value: item.status,
        isLink: false,
        mutateType: 'select'
      }
    ],
    rowActions: [
      {
        value: 'Review',
        isLink: false,
        buttonType: 'outlined',
        action: () => {
          rsProps?.callSection({
            action: 'view',
            component: 'review-verification-request',
            data: {
              data: item
            },
            onRefresh,
            title: 'Review Verification Request'
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

  const load = verificationRequestProps.isLoading

  return (
    <div className="admin-page">
      <div className="admin-page-container">
        <div className="admin-management">
          <CardHeader tag="" title="Verification Request" />
          <div>
            <div className="pt-4 f-column gap-10">
              <div className="f-row-30 aic">
                <RefreshComponent load={load} onRefresh={onRefresh} />
                <FilterComponent
                  onFilterChange={onFilterChange}
                  optionsDataManager={[]}
                  optionsDataRepository={[]}
                />
              </div>
              <div className="border rounded over-flow-auto">
                <DefaultTable
                  header={['User', 'Country', 'Date', 'Status', 'Action']}
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

export default VerificationRequest
