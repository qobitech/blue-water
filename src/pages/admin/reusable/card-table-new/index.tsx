import { FC } from 'react'
import Table from '../table'
import { TypeButton } from '../../../../components/utils/button'
import PaginationComponent from '../../../../components/utils/pagination'
import './index.scss'
import { ITableAction, ITableRecord } from '../../../../components/table/utils'
import { RefreshComponent } from '../../../../components/utils/reusable'

export interface IPaginationProps {
  forcePage: number
  pageCount: number
}

interface IProps {
  tableData: ITableRecord[]
  tableHeader: string[]
  handlePagination?: (selectedItem: { selected: number }) => void
  title: string
  tag: string
  cta?: Array<{
    title: string
    action?: () => void
  }>
  inner?: boolean
  tableAction?: ITableAction | undefined
  handleTableAction?: () => void
  admin?: boolean
  load?: boolean
  paginationProps?: IPaginationProps
  onRefresh?: () => void
  filterSection?: JSX.Element
}

const CardTableNew: React.FC<IProps> = ({
  tableData,
  tableHeader,
  title,
  tag,
  cta,
  handlePagination,
  inner,
  tableAction,
  handleTableAction,
  admin,
  load,
  paginationProps,
  onRefresh,
  filterSection
}) => {
  const isPagination = typeof handlePagination === 'function'

  return (
    <div className={`application-card ${inner ? 'inner' : ''}`}>
      <CardHeader
        tag={tag}
        title={title}
        cta={cta}
        inner={inner}
        load={load}
        onRefresh={onRefresh}
      />
      <div className="filter-section"></div>
      {filterSection}
      <div>
        <div className="table-filter">
          <div className={`table-containers`}>
            <div className="table-section">
              <Table
                header={tableHeader}
                record={tableData}
                hideNumbering
                tableAction={tableAction}
                handleTableAction={handleTableAction}
                admin={admin}
              />
            </div>
            {isPagination && (
              <PaginationComponent
                currentPage={1}
                pages={paginationProps?.pageCount || 1}
                handlePagination={handlePagination}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardTableNew

interface ICardHeader {
  title: string
  tag: string
  inner?: boolean
  cta?: Array<{
    title: string
    action?: () => void
  }>
  load?: boolean
  onRefresh?: () => void
}

export const CardHeader: FC<ICardHeader> = ({
  title,
  tag,
  inner,
  cta,
  load,
  onRefresh
}) => {
  return (
    <div className="application-header">
      <div className="application-header-content">
        <div className="header">
          <h3 className={inner ? 'inner' : ''}>{title}</h3>
          <RefreshComponent onRefresh={onRefresh} load={load} />
        </div>
        <p>{tag}</p>
      </div>
      <div className="application-cta">
        {cta?.map((i, index) => (
          <TypeButton
            title={i.title}
            onClick={i?.action}
            key={index}
            buttonShape="curve"
          />
        ))}
      </div>
    </div>
  )
}
