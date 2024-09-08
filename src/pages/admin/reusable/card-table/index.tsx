import { Children, FC, useState } from 'react'
import Table from '../table'
import {
  TypeButton,
  TypeSmallButton
} from '../../../../components/utils/button'
import { TypeInput } from '../../../../components/utils/input'
import { RefreshSVG } from '../../../../components/utils/svgs'
import PaginationComponent from '../../../../components/utils/pagination'
import './index.scss'
import { HVCLoad } from '../../../../components/utils/hvc'
import { ITableAction, ITableRecord } from '../../../../components/table/utils'

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
  isFilter?: boolean
  children?: any
  inner?: boolean
  tableAction?: ITableAction | undefined
  handleTableAction?: () => void
  admin?: boolean
  load?: boolean
  paginationProps?: IPaginationProps
  onRefresh?: () => void
}

const CardTable: React.FC<IProps> = ({
  tableData,
  tableHeader,
  title,
  tag,
  cta,
  isFilter,
  handlePagination,
  children,
  inner,
  tableAction,
  handleTableAction,
  admin,
  load,
  paginationProps,
  onRefresh
}) => {
  const isPagination = typeof handlePagination === 'function'

  const [filter, setFilter] = useState<boolean>(false)

  const handleFilter = () => {
    setFilter(!filter)
  }

  const matchChild: any = Children.map(children, (child) => {
    if (child)
      return (child = {
        ...child,
        props: { ...child.props }
      })
    return child
  })

  return (
    <div className={`application-card ${inner ? 'inner' : ''}`}>
      <CardHeader tag={tag} title={title} cta={cta} inner={inner} load={load} />
      <div className="filter-section">
        {isFilter && <TypeSmallButton title="Filter" onClick={handleFilter} />}
        <div className="f-row-10 aic">
          {filter && (
            <TypeSmallButton
              title=""
              close
              buttonType="danger"
              onClick={handleFilter}
            />
          )}
          {!filter ? (
            <div
              style={{
                width: 'max-content',
                height: 'max-content',
                cursor: 'pointer'
              }}
              onClick={onRefresh}
            >
              <RefreshSVG />
            </div>
          ) : null}
        </div>
        <TypeInput
          placeholder="Search"
          className="ml-auto"
          style={{ height: '40px', fontSize: '14px' }}
        />
      </div>
      <div>
        <div className="table-filter">
          <div className={`filter-section ${filter ? 'show' : ''}`}>
            {matchChild}
          </div>
          <div className={`table-containers ${filter ? 'shrink' : ''}`}>
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

export default CardTable

interface ICardHeader {
  title: string
  tag: string
  inner?: boolean
  cta?: Array<{
    title: string
    action?: () => void
  }>
  load?: boolean
}

export const CardHeader: FC<ICardHeader> = ({
  title,
  tag,
  inner,
  cta,
  load
}) => {
  return (
    <div className="application-header">
      <div className="application-header-content">
        <div className="header">
          <h3 className={inner ? 'inner' : ''}>{title}</h3>
          <HVCLoad removeDOM load={load} />
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
