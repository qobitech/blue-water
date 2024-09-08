import { useNavigate } from 'react-router-dom'
import { TypeCheckbox } from '../../../../components/utils/checkbox'
import { PAGE_SIZE } from '../../../../constants/global'
import { TypeSmallButton } from '../../../../components/utils/button'
import './table.scss'
import { IMutateOptions, MutateValue } from './data'
import {
  ICell,
  ICellAction,
  ITableAction,
  ITableRecord
} from '../../../../components/table/utils'
import { TableActionComponent } from '../../../../components/table/table-components'

interface IResultTable {
  header: string[]
  record: ITableRecord[]
  currentPage?: number
  hideNumbering?: boolean
  tableAction?: ITableAction
  handleTableAction?: () => void
  admin?: boolean
}

const Table: React.FC<IResultTable> = ({
  header,
  record,
  currentPage,
  hideNumbering,
  tableAction,
  handleTableAction,
  admin
}) => {
  const isRecord = (record?.length || 0) > 0
  const isCheckedRow = (id: string) => {
    return !!tableAction?.selectedItems?.includes?.(id)
  }

  const hideCheck =
    !Object.keys(tableAction?.actionEnums || {})?.[0] || !record?.[0]

  const selectedAll =
    tableAction?.selectedItems !== null &&
    tableAction?.selectedItems?.length === record?.length

  return (
    <div className="admin-table-container">
      {!hideCheck ? (
        <TableActionComponent
          tableAction={tableAction}
          handleTableAction={handleTableAction}
          admin={admin}
        />
      ) : null}
      <table className="admin-result-table">
        <thead className="thead_blue">
          <tr>
            {!hideNumbering && <th></th>}
            {header.map((i, index) => {
              if (index === 0) {
                return (
                  <th
                    key={index}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {!hideCheck && (
                      <div style={{ marginRight: 25 }}>
                        <TypeCheckbox
                          onChange={({ target }) => {
                            const { checked } = target
                            if (checked) {
                              const ids = record.map((i) => i.id)
                              tableAction?.setSelectedItems?.(ids)
                            } else {
                              tableAction?.setSelectedItems?.(null)
                            }
                          }}
                          checked={selectedAll}
                        />
                      </div>
                    )}
                    {i}
                  </th>
                )
              } else {
                return <th key={index}>{i}</th>
              }
            })}
          </tr>
        </thead>
        <tbody>
          {isRecord &&
            record.map((i, jindex) => (
              <tr key={jindex}>
                {!hideNumbering && (
                  <td
                    style={{ padding: '10px 0px 10px 10px' }}
                    width={`${100 / header.length}%`}
                  >
                    <p style={{ margin: 0 }}>
                      {jindex + 1 + ((currentPage || 0) - 1) * PAGE_SIZE}
                    </p>
                  </td>
                )}
                {i?.row?.map((j, index) => {
                  if (index === 0) {
                    return (
                      <td key={index} width={`${100 / header.length}%`}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {!hideCheck && (
                            <div style={{ marginRight: 25 }}>
                              <TypeCheckbox
                                onChange={({ target }) => {
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
                                }}
                                checked={selectedAll || isCheckedRow(i.id)}
                                id={i.id}
                              />
                            </div>
                          )}
                          <CellValueComponent {...j} />
                        </div>
                      </td>
                    )
                  } else {
                    return (
                      <td key={index} width={`${100 / header.length}%`}>
                        <CellValueComponent {...j} />
                      </td>
                    )
                  }
                })}
                <td width={`${100 / header.length}%`}>
                  <div className="admin-table-cell-action">
                    {
                      i?.rowActions?.map((j, index) => (
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
  value,
  action,
  isLink,
  mutateType,
  mutateMax,
  mutateMin,
  mutatePostTxt,
  mutateOptions,
  onMutateSave,
  mutateLoad
}) => {
  return (
    <TDContent
      action={action}
      value={value}
      isLink={isLink}
      mutateType={mutateType}
      mutateMax={mutateMax}
      mutateMin={mutateMin}
      mutatePostTxt={mutatePostTxt}
      mutateOptions={mutateOptions}
      onMutateSave={onMutateSave}
      mutateLoad={mutateLoad}
    />
  )
}

interface ITDC {
  action: (() => void) | undefined
  value: string | number | undefined
  isLink?: boolean
  mutateType?: 'number' | 'text' | 'select'
  mutateMax?: number
  mutateMin?: number
  mutatePostTxt?: string
  mutateOptions?: IMutateOptions[]
  onMutateSave?: (value: any) => void
  mutateLoad?: boolean
}

const TDContent: React.FC<ITDC> = ({
  action,
  value,
  isLink,
  mutateMax,
  mutateMin,
  mutatePostTxt,
  mutateType,
  mutateOptions,
  onMutateSave,
  mutateLoad
}) => {
  const isMutate = !!mutateOptions
  return (
    <>
      {isMutate ? (
        <MutateValue
          mutateType={mutateType}
          mutateMax={mutateMax}
          mutateMin={mutateMin}
          mutatePostTxt={mutatePostTxt}
          mutateOptions={mutateOptions}
          onMutateSave={onMutateSave}
          value={value}
          mutateLoad={mutateLoad}
          key={value}
        />
      ) : (
        <p
          className={`m-0 f-row aic text-small ${
            isLink ? 'text-decoration-underline cursor-pointer' : ''
          }`}
          onClick={action}
        >
          <span className="d-block" style={{ width: '120px' }}>
            {value}
          </span>
        </p>
      )}
    </>
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
  color,
  buttonType,
  view
}) => {
  const navigate = useNavigate()
  return (
    <TypeSmallButton
      color={color}
      title={view !== 'icon' ? value + '' : ''}
      buttonType={buttonType}
      style={{ height: '35px', fontSize: '12px' }}
      onClick={() => (isLink ? action?.() : navigate(url || ''))}
      className="mr-2"
    />
  )
}

export default Table
