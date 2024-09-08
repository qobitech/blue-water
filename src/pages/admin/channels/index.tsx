import CardTable from '../reusable/card-table'
import { TypeInput } from '../../../components/utils/input'
import { TypeSelect } from '../../../components/utils/select'
import { TypeSmallButton } from '../../../components/utils/button'
import { defaultGETDataTemplate, useAPIGET } from '../../../api'
import { IBetChannelReportResponses } from '../../../interface/IBet'
import { wordVariation } from '../../../components/utils/helper'
import '../page.scss'
import { ITableRecord } from '../../../components/table/utils'
import { useGlobalContext } from '../../../components/layout/context'
import { useTableAction } from '../../../components/table/table-components'

const AdminChannels = () => {
  const { rsProps } = useGlobalContext()
  const { data, isLoading, mutate } = useAPIGET<IBetChannelReportResponses>({
    route: 'channel/reports',
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        channels: []
      }
    }
  })

  const allChannels = data?.data.channels

  const tableData: ITableRecord[] = allChannels?.map((i, index) => ({
    id: i._id,
    row: [
      {
        value: i.title,
        isLink: true,
        url: '',
        action: () => {
          rsProps?.callSection({
            action: 'view',
            component: 'channel',
            id: '1',
            title: 'View Channel',
            data: i
          })
        }
      },
      {
        value: i.tier.title,
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: wordVariation(i.reportCount, 'report'),
        isLink: true,
        url: '',
        action: () => {
          rsProps?.callSection({
            action: 'view',
            component: 'report',
            title: 'Report',
            id: i._id
          })
          // setSelectedReportItem(prediction)
        }
      },
      {
        value: wordVariation(i.acceptedReports, 'report'),
        isLink: false,
        url: '',
        action: () => {}
      }
    ],
    rowActions: [
      {
        value: 'Upgrade',
        isLink: true,
        url: '',
        action: () => {},
        buttonType: 'outlined'
      },
      {
        value: i.verified ? 'Unverify' : 'Verify',
        isLink: true,
        url: '',
        action: () => {},
        buttonType: 'bold'
      },
      {
        value:
          i.status === 'active'
            ? 'Suspend'
            : i.status === 'banned'
            ? 'Banned'
            : 'Activate',
        isLink: true,
        url: '',
        action: () => {
          rsProps?.callSection({
            action: 'update',
            component: 'channel',
            id: '1',
            title: 'Suspend Channel'
          })
        },
        buttonType: i.status === 'banned' ? 'disabled' : 'danger'
      }
    ]
  })) as ITableRecord[]

  const getTableActionEnums = (): { [key: string]: string } | null => {
    return {
      SUSPEND: 'Suspend'
    }
  }

  const tableAction = useTableAction(getTableActionEnums())

  const handlePagination = (selectedItem: { selected: number }) => {}

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-container">
          <div className="admin-channels">
            <CardTable
              admin
              handlePagination={handlePagination}
              paginationProps={{
                forcePage: data.currentPage - 1,
                pageCount: data.pages
              }}
              tableData={tableData}
              load={isLoading}
              tableHeader={[
                'Title',
                'Level',
                'Reports',
                'Accepted Report',
                'Action'
              ]}
              tag="Manage all channels"
              title="Channels"
              isFilter
              onRefresh={() => mutate({})}
              tableAction={tableAction}
            >
              <div className="admin-filter-section">
                <TypeInput placeholder="enter title" />
                <TypeSelect initoption={{ label: 'Select role', value: '' }} />
                <div className="admin-filter-cta">
                  <TypeSmallButton title="FILTER" buttonType="outlined" />
                  <TypeSmallButton title="Clear" buttonType="danger" />
                </div>
              </div>
            </CardTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminChannels
