import { useEffect } from 'react'
import CardTable from '../reusable/card-table'
import RightSection from '../../../components/layout/right-section'
import { TypeInput } from '../../../components/utils/input'
import { TypeSelect } from '../../../components/utils/select'
import { TypeSmallButton } from '../../../components/utils/button'
import ViewUser from './view'
import { useAPIGET, defaultGETDataTemplate } from '../../../api'
import { ISubscriptionResponse } from '../../../interface/ISubscription'
import '../page.scss'
import { ITableRecord } from '../../../components/table/utils'
import { useTableAction } from '../../../components/table/table-components'
import { useRightSection } from '../../../components/layout/right-section/hooks'

const AdminSubscriptions = () => {
  const rsProps = useRightSection()

  const { data, isLoading, mutate } = useAPIGET<ISubscriptionResponse<any>>({
    route: 'subscription',
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        subscriptions: []
      }
    }
  })

  useEffect(() => {
    mutate({})
  }, [])

  const subscriptions = data.data.subscriptions

  const tableData: ITableRecord[] = subscriptions.map((i) => ({
    id: i._id,
    row: [
      {
        value: i.itemType,
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: new Date(i.startDate).toDateString(),
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: new Date(i.endDate).toDateString(),
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: i.userId,
        isLink: false,
        url: '',
        action: () => {}
      }
    ],
    rowActions: [
      {
        value: 'Cancel',
        isLink: true,
        url: '',
        action: () => {
          rsProps.callSection({
            action: 'view',
            component: 'users',
            id: '1',
            title: 'View User',
            data: i
          })
        },
        buttonType: 'danger'
      }
    ]
  })) as ITableRecord[]
  const getTableActionEnums = (): { [key: string]: string } | null => {
    return {
      SUSPEND: 'Suspend'
    }
  }

  const tableAction = useTableAction(getTableActionEnums())

  return (
    <>
      <RightSection rsProps={rsProps}>
        {rsProps.isView('view', 'users') ? <ViewUser /> : null}
      </RightSection>
      <div className="admin-page">
        <div className="admin-page-container">
          <div className="admin-management">
            <CardTable
              admin
              tableData={tableData}
              tableHeader={[
                'Item',
                'Start Date',
                'End Date',
                'User Id',
                'Action'
              ]}
              tag="Manage subscriptions"
              title="Subscriptions"
              isFilter
              load={isLoading}
              tableAction={tableAction}
            >
              <div className="admin-filter-section">
                <TypeInput placeholder="enter name" />
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

export default AdminSubscriptions
