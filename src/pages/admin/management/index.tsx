import CardTable from '../reusable/card-table'
import RightSection from '../../../components/layout/right-section'
import { TypeInput } from '../../../components/utils/input'
import { TypeSelect } from '../../../components/utils/select'
import { TypeSmallButton } from '../../../components/utils/button'
import './index.scss'
import '../page.scss'
import { ITableRecord } from '../../../components/table/utils'
import { useTableAction } from '../../../components/table/table-components'
import { useRightSection } from '../../../components/layout/right-section/hooks'

const AdminManagement = () => {
  const rsProps = useRightSection()
  const tableData: ITableRecord[] = [
    {
      id: '1',
      row: [
        {
          value: 'John Evans',
          isLink: false,
          url: '',
          action: () => {}
        },
        {
          value: 'email@domain.com',
          isLink: false,
          url: '',
          action: () => {}
        },
        {
          value: 'Moderator',
          isLink: false,
          url: '',
          action: () => {}
        }
      ],
      rowActions: [
        {
          value: 'View',
          isLink: true,
          url: '',
          action: () => {
            rsProps.callSection({
              action: 'view',
              component: 'admin-management',
              id: '1',
              title: 'View Admin'
            })
          },
          buttonType: 'bold'
        },
        {
          value: 'Edit',
          isLink: true,
          url: '',
          action: () => {
            rsProps.callSection({
              action: 'update',
              component: 'admin-management',
              id: '1',
              title: 'Edit Admin Details'
            })
          },
          buttonType: 'bold'
        },
        {
          value: 'Delete',
          isLink: true,
          url: '',
          action: () => {
            rsProps.callSection({
              action: 'delete',
              component: 'admin-management',
              id: '1',
              title: 'Delete Admin'
            })
          },
          buttonType: 'danger'
        }
      ]
    }
  ]
  const getTableActionEnums = (): { [key: string]: string } | null => {
    return {
      DELETE: 'Delete',
      SUSPEND: 'Suspend'
    }
  }

  const tableAction = useTableAction(getTableActionEnums())

  return (
    <>
      <RightSection rsProps={rsProps}></RightSection>
      <div className="admin-page">
        <div className="admin-page-container">
          <div className="admin-management">
            <CardTable
              admin
              tableData={tableData}
              tableHeader={['Name', 'Email', 'Role', 'Action']}
              tag="Manage admins"
              title="Admin Management"
              isFilter
              cta={[
                {
                  title: 'Create Admin',
                  action: () => {
                    rsProps.callSection({
                      action: 'create',
                      component: 'admin-management',
                      title: 'Create New Admin'
                    })
                  }
                }
              ]}
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

export default AdminManagement
