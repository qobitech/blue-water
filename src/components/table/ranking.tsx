import { TypeCheckbox } from '../utils/checkbox'
import { TypeButton } from '../utils/button'
import { PAGE_SIZE } from '../../constants/global'
import { StatusText, statusType } from '../utils/reusable'
import Rating from '../utils/rating'
import { useNavigate } from 'react-router-dom'
import { getRanking } from '../utils/helper'
import './table.scss'
import { ArrowDownSVG, ArrowUpSVG } from '../utils/svgs/f-awesome'
import { ArrowLeftSVG } from '../utils/svgs'
import { ICell, ICellAction, IResultTable, ITableRecord } from './utils'
import { ChannelValueComponent, TableActionComponent } from './table-components'

const ResultTable: React.FC<IResultTable> = ({
  header,
  record,
  currentPage,
  hideNumbering,
  ranking,
  cellWidth,
  tableAction,
  handleTableAction
}) => {
  const isRecord = record?.length > 0
  const isCheckedRow = (id: string) => {
    return !!tableAction?.selectedItems?.includes?.(id)
  }

  const hideCheck =
    !Object.keys(tableAction?.actionEnums || {})?.[0] || !record?.[0]

  const selectedAll =
    tableAction?.selectedItems !== null &&
    tableAction?.selectedItems?.length === record?.length

  const handleSelectAll = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target
    if (checked) {
      const ids = record.map((i) => i.id)
      tableAction?.setSelectedItems?.(ids)
    } else {
      tableAction?.setSelectedItems?.(null)
    }
  }

  const handleSelect = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    i: ITableRecord
  ) => {
    const { checked } = target
    if (checked) {
      const ids = tableAction?.selectedItems || []
      ids.push(i.id)
      tableAction?.setSelectedItems?.([...ids])
    } else {
      const ids = tableAction?.selectedItems || []
      const index = ids.indexOf(i.id)
      if (index >= 0) {
        ids.splice(index, 1)
        tableAction?.setSelectedItems?.([...ids])
      }
    }
  }

  return (
    <div className="w-100">
      {!hideCheck ? (
        <TableActionComponent
          tableAction={tableAction}
          handleTableAction={handleTableAction}
        />
      ) : null}
      <table className="resultTable">
        <thead className="thead_blue">
          <tr>
            {!hideNumbering && <th></th>}
            {header.map((i, index) => {
              if (index === 0) {
                return (
                  <th
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'sticky',
                      left: 0,
                      background: '#fff'
                    }}
                    className="text-little"
                  >
                    {!hideCheck && (
                      <div style={{ marginRight: 25 }}>
                        <TypeCheckbox
                          onChange={handleSelectAll}
                          checked={selectedAll}
                        />
                      </div>
                    )}
                    {i}
                  </th>
                )
              } else {
                return (
                  <th key={index} className="text-little">
                    {i}
                  </th>
                )
              }
            })}
          </tr>
        </thead>
        <tbody>
          {isRecord &&
            record.map((i, jindex) => (
              <tr key={jindex}>
                {!hideNumbering && (
                  <td style={{ padding: '10px 0px 10px 10px' }}>
                    <p style={{ margin: 0 }}>
                      {jindex + 1 + ((currentPage || 0) - 1) * PAGE_SIZE}
                    </p>
                  </td>
                )}
                {i?.row?.map((j, index) => {
                  if (index === 0) {
                    return (
                      <td
                        key={index}
                        width={`${cellWidth}%`}
                        style={{
                          position: 'sticky',
                          left: 0,
                          background: '#fff',
                          zIndex: 5
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {!hideCheck && (
                            <div style={{ marginRight: 25 }}>
                              <TypeCheckbox
                                onChange={(e) => handleSelect(e, i)}
                                checked={selectedAll || isCheckedRow(i.id)}
                                id={i.id}
                              />
                            </div>
                          )}
                          <ChannelValueComponent
                            channel={j.value as string}
                            onShare={j.props?.share}
                            onStats={j.props?.stats}
                            frequency={j.props?.frequency}
                            verified={j.props?.verified}
                          />
                        </div>
                      </td>
                    )
                  } else {
                    if (j.rating !== undefined)
                      return (
                        <td key={index} width={`${cellWidth}%`}>
                          <Rating rating={j.rating as number} />
                        </td>
                      )
                    else
                      return (
                        <td key={index} width={`${cellWidth}%`}>
                          <CellValueComponent {...j} />
                        </td>
                      )
                  }
                })}
                <td width={`${cellWidth}%`}>
                  <div className="f-row">
                    {
                      i?.rowActions
                        ?.filter((i) => !i.hide)
                        ?.map((j, index) => (
                          <CellValueActionComponent
                            key={index}
                            {...j}
                            nomargin={
                              index === (i?.rowActions?.length || 0) - 1
                                ? 'true'
                                : 'false'
                            }
                          />
                        ))
                      // )
                    }
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!isRecord && (
        <p className="margin-auto text-center py-4 color-light font-small">
          No Data
        </p>
      )}
    </div>
  )
}

const CellValueComponent: React.FC<ICell> = ({
  isLink,
  value,
  url,
  position,
  lastPosition,
  action,
  status,
  rating,
  icon,
  noDecoration,
  ranking,
  active
}) => {
  const navigate = useNavigate()
  return (
    <>
      {status ? (
        <StatusText status={value as statusType} />
      ) : (
        <div
          onClick={() => (url ? navigate(url) : action?.())}
          className={isLink ? 'cursor-pointer' : ''}
          style={{
            textDecoration: isLink && !noDecoration ? 'underline' : 'none',
            width: 'max-content'
          }}
        >
          <TDContent
            action={action}
            lastPosition={lastPosition}
            position={position}
            value={value}
            rating={rating as number}
            icon={icon}
            ranking={ranking}
            active={active}
          />
        </div>
      )}
    </>
  )
}

interface ITDC {
  lastPosition: number | undefined
  position: number | undefined
  action: (() => void) | undefined
  value: string | number | undefined
  rating?: number
  ranking?: boolean
  active?: boolean
  icon?: JSX.Element
}

const TDContent: React.FC<ITDC> = ({
  lastPosition,
  position,
  action,
  value,
  rating,
  icon,
  ranking
}) => {
  return (
    <p className="m-0 f-row aic text-small" onClick={action}>
      <span
        className="d-block"
        style={{ width: 'max-content', marginRight: '25px' }}
      >
        {ranking ? getRanking(parseInt(value as string)) : value}
        {icon}
      </span>
      {lastPosition && (
        <span>
          {lastPosition < (position || 0) && <ArrowDownSVG color="red" />}
          {lastPosition > (position || 0) && <ArrowUpSVG color="green" />}
          {lastPosition === (position || 0) && <ArrowLeftSVG fill="orange" />}
        </span>
      )}
    </p>
  )
}

interface ICVAC extends ICellAction {
  nomargin?: 'true' | 'false'
}

const CellValueActionComponent: React.FC<ICVAC> = ({
  isLink,
  value,
  url,
  action,
  icon,
  color,
  buttonType,
  view,
  load
}) => {
  const navigate = useNavigate()

  return (
    <>
      <TypeButton
        color={color}
        title={view !== 'icon' ? value + '' : ''}
        buttonType={buttonType}
        style={{ fontSize: '12px', minWidth: '110.48px', height: '40px' }}
        className="mr-2"
        onlyIcon={view === 'icon'}
        onClick={() => (isLink ? navigate(url || '') : action?.())}
        load={load}
      />
    </>
  )
}

export default ResultTable
