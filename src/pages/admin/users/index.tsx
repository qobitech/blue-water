import { FC, useCallback, useEffect, useState } from 'react'
import { getUserRole, typeRoleId } from '../../../constants/global'
import { IUsers } from '../../../interface/IUser'
import { defaultGETDataTemplate, useAPIGET } from '../../../api'
import '../page.scss'
import { ITableRecord } from '../../../components/table/utils'
import { useGlobalContext } from '../../../components/layout/context'
// import { useTableAction } from '../../../components/table/table-components'
import PaginationComponent from '../../../components/utils/pagination'
import CardTableNew from '../reusable/card-table-new'
import { IPillData, PillComponent } from '../../../components/utils/hooks'

const defaultData: IUsers = {
  ...defaultGETDataTemplate,
  data: { users: [] }
}

const statusFilterEnums = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
} as const

const AdminUsers = () => {
  const { rsProps } = useGlobalContext()
  const { data, isLoading, mutate } = useAPIGET<IUsers>({
    route: 'users',
    defaultData
  })

  const [filters, setFilters] = useState<string>('emailConfirmed=true')

  const onRefresh = (page?: string, query?: string) => {
    const q = query ? `&${query}` : filters ? `&${filters}` : ``
    mutate({
      query: `?page=${page || 1}&limit=10${q}`
    })
  }

  useEffect(() => {
    onRefresh()
  }, [])

  const allUsers = data?.data.users

  const tableData: ITableRecord[] = allUsers?.map((i) => ({
    id: i._id,
    row: [
      {
        value: i.userName,
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: i.email,
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: i.status,
        isLink: false,
        url: '',
        action: () => {}
      },
      {
        value: getUserRole(i.role as typeRoleId),
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
          rsProps?.callSection({
            action: 'view',
            component: 'users',
            id: '1',
            title: 'View User',
            data: i
          })
        },
        buttonType: 'bold'
      },
      {
        value: i.status === 'active' ? 'Suspend' : 'Re-instate',
        isLink: true,
        url: '',
        action: () => {
          rsProps?.callSection({
            action: 'view',
            component: 'suspend-user',
            title: 'Suspend User',
            data: {
              data: i
            },
            onRefresh
          })
        },
        buttonType: i.status === 'active' ? 'danger' : 'outlined'
      }
    ]
  })) as ITableRecord[]

  // const getTableActionEnums = (): { [key: string]: string } | null => {
  //   return {
  //     SUSPEND: 'Suspend'
  //   }
  // }

  // const tableAction = useTableAction(getTableActionEnums())

  const handlePagination = (selectedItem: { selected: number }) => {
    onRefresh(selectedItem.selected ? selectedItem.selected + 1 + '' : '1')
  }

  // filter

  const handleFilter = (filterValue: string) => {
    let query = ''
    if (filterValue === statusFilterEnums.ACTIVE) {
      query = `emailConfirmed=true`
    }
    if (filterValue === statusFilterEnums.INACTIVE) {
      query = `emailConfirmed=false`
    }
    setFilters(query)
    onRefresh('1', query)
  }

  const filterSectionProps = useFilterSection(statusFilterEnums, handleFilter)

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-container">
          <div className="admin-management">
            <CardTableNew
              admin
              tableData={tableData}
              tableHeader={['Name', 'Email', 'Status', 'Role', 'Action']}
              tag="Manage users"
              filterSection={
                <div className="f-row-33 aic pb-5">
                  <FilterSection
                    filterSection={filterSectionProps}
                    title="Email confirmed"
                  />
                </div>
              }
              title="Users"
              load={isLoading}
              onRefresh={onRefresh}
              cta={[
                {
                  title: 'Create User',
                  action: () => {
                    rsProps?.callSection({
                      action: 'create',
                      component: 'create-user',
                      title: 'Create New User',
                      onRefresh
                    })
                  }
                }
              ]}
              // tableAction={tableAction}
            />
            <PaginationComponent
              currentPage={data.currentPage}
              pages={data.pages}
              handlePagination={handlePagination}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminUsers

interface IUseFilterSection {
  onClickPill: (filterValue: string) => void
  filterValue: string
  pills: IPillData[]
}

const useFilterSection = (
  enums: { [key: string]: string },
  onFilter?: (filterValue: string) => void
): IUseFilterSection => {
  const [filterValue, setFilterValue] = useState<string>(enums.ACTIVE)

  const pills: IPillData[] = [
    {
      label: enums.ACTIVE,
      filterValue: enums.ACTIVE
    },
    {
      label: enums.INACTIVE,
      filterValue: enums.INACTIVE
    }
  ]

  const onClickPill = useCallback(
    (filterValue: string) => {
      setFilterValue(filterValue)
      onFilter?.(filterValue)
    },
    [enums, filterValue]
  )

  return {
    onClickPill,
    filterValue,
    pills
  }
}

interface IFilterSection {
  filterSection: IUseFilterSection
  title: string
}

const FilterSection: FC<IFilterSection> = ({
  filterSection: { filterValue, onClickPill, pills },
  title
}) => {
  return (
    <div className="f-row-20 aic jce">
      <p className="m-0 color-label text-tiny">{title}</p>
      <PillComponent
        filterValues={[filterValue]}
        onClickPill={onClickPill}
        pills={pills}
      />
    </div>
  )
}
