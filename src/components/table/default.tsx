import { FC } from 'react'
import { TypeCheckbox } from '../utils/checkbox'
import { TypeButton } from '../utils/button'
import { PAGE_SIZE } from '../../constants/global'
import { ActionComponent, StatusText, statusType } from '../utils/reusable'
import TextPrompt from '../utils/text-prompt'
import './table.scss'
import {
  IMutateOptions,
  MutateValue
} from '../../pages/admin/reusable/table/data'
import { Link } from 'react-router-dom'
import Rating from '../utils/rating'
import { ICell, ICellAction, ITableAction, ITableRecord } from './utils'
import { TableActionComponent } from './table-components'

interface IDefaultTable {
  header: string[]
  record: ITableRecord[]
  currentPage?: number
  hideNumbering?: boolean
  tableAction?: ITableAction
  handleTableAction?: () => void
}

const DefaultTable: FC<IDefaultTable> = ({
  header,
  record,
  currentPage,
  hideNumbering,
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

  const isHeader = !!header.length

  return (
    <div className="w-100">
      {!hideCheck ? (
        <TableActionComponent
          tableAction={tableAction}
          handleTableAction={handleTableAction}
        />
      ) : null}
      <table className="resultTable">
        {isHeader ? (
          <thead className="thead_blue">
            <tr>
              {!hideNumbering && <th></th>}
              {header.map((i, index) => {
                if (index === 0) {
                  return (
                    <th
                      key={index}
                      style={{ display: 'flex', alignItems: 'center' }}
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
                    <th key={index} className={`text-little`}>
                      {i}
                    </th>
                  )
                }
              })}
            </tr>
          </thead>
        ) : null}
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
                      <td key={index}>
                        <div className="f-row aic">
                          {!hideCheck && (
                            <div style={{ marginRight: 25 }}>
                              <TypeCheckbox
                                onChange={(e) => handleSelect(e, i)}
                                checked={selectedAll || isCheckedRow(i.id)}
                                id={i.id}
                              />
                            </div>
                          )}
                          {j.rating ? (
                            <Rating rating={j.value as number} />
                          ) : (
                            <CellValueComponent {...j} />
                          )}
                        </div>
                      </td>
                    )
                  } else
                    return (
                      <td key={index}>
                        <CellValueComponent {...j} />
                      </td>
                    )
                })}
                {i?.rowActions?.[0] ? (
                  <td>
                    <div className="f-row-10">
                      {i?.rowActions?.map((j, index) => (
                        <CellValueActionComponent
                          key={index}
                          {...j}
                          nomargin={
                            index === (i?.rowActions?.length || 0) - 1
                              ? 'true'
                              : 'false'
                          }
                        />
                      ))}
                    </div>
                  </td>
                ) : null}
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
  action,
  status,
  valueStatus,
  weight,
  mutateType,
  mutateMax,
  mutateMin,
  mutatePostTxt,
  mutateOptions,
  onMutateSave,
  mutateLoad
}) => {
  return (
    <>
      {status ? (
        <StatusText status={value as statusType} />
      ) : (
        <LCComponent url={url || ''} isLink={!!isLink}>
          <TDContent
            action={action}
            value={value}
            valueStatus={valueStatus}
            weight={weight}
            mutateType={mutateType}
            mutateMax={mutateMax}
            mutateMin={mutateMin}
            mutatePostTxt={mutatePostTxt}
            mutateOptions={mutateOptions}
            onMutateSave={onMutateSave}
            mutateLoad={mutateLoad}
          />
        </LCComponent>
      )}
    </>
  )
}

const LCComponent = ({
  url,
  isLink,
  children
}: {
  url: string
  isLink: boolean
  children?: any
}) => {
  return (
    <>
      {isLink ? (
        <Link className="table-link-container" to={url || ''}>
          {children}
        </Link>
      ) : (
        children
      )}
    </>
  )
}

interface ITDC {
  action: (() => void) | undefined
  value: string | number | undefined
  valueStatus?: boolean
  weight?: string
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
  valueStatus,
  weight,
  mutateMax,
  mutateMin,
  mutatePostTxt,
  mutateType,
  mutateOptions,
  onMutateSave,
  mutateLoad
}) => {
  const statusClass =
    valueStatus === undefined
      ? ''
      : valueStatus
      ? 'text-success'
      : 'text-danger'
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
          className={`m-0 f-row aic text-small ${statusClass || ''}`}
          onClick={action}
        >
          <span className={`${weight || ''}`} title={value + ''}>
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
  icon,
  color,
  buttonType,
  view,
  load,
  actionType,
  actionStatus,
  optionActions
}) => {
  return (
    <>
      {!actionType || actionType === 'button' ? (
        <CTAContainer isLink={!!isLink} url={url as string} value={value}>
          <TypeButton
            color={color}
            title={view !== 'icon' ? value + '' : ''}
            style={{ height: '35px', fontSize: '12px' }}
            buttonType={buttonType}
            mobileOnlyIcon={view === 'icon'}
            load={load}
            onClick={isLink ? undefined : action}
            disabled={buttonType === 'disabled'}
          />
        </CTAContainer>
      ) : null}
      {actionType === 'options' ? (
        <ActionComponent
          actions={optionActions}
          buttonType={buttonType}
          load={load}
          title={value as string}
        />
      ) : null}
      {actionType === 'prompt' ? (
        <TextPrompt prompt={value?.toString() || ''} status={actionStatus} />
      ) : null}
      {actionType === 'inner-html' ? (
        <div
          dangerouslySetInnerHTML={{ __html: value?.toString() || '' }}
          onClick={action}
        ></div>
      ) : null}
    </>
  )
}

const CTAContainer = ({
  isLink,
  children,
  url,
  value
}: {
  isLink: boolean
  children?: any
  url: string
  value: any
}) => {
  return (
    <>
      {isLink ? (
        <Link
          to={url || ''}
          title={value as string}
          className="table-link-container true mr-2"
        >
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default DefaultTable
