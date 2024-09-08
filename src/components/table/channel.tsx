import './table.scss'
import { TypeCheckbox } from '../utils/checkbox'
import { TypeButton } from '../utils/button'
import { PAGE_SIZE } from '../../constants/global'
import { PlusSVG } from '../utils/svgs/f-awesome'
import { ICellAction, IResultTable, ITableRecord } from './utils'
import { InfoTxt } from '../utils/info-txt'
import { ChannelValueComponent, TableActionComponent } from './table-components'

const ResultTable: React.FC<IResultTable> = ({
  header,
  record,
  currentPage,
  hideNumbering,
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
        <thead
          className="thead_blue"
          style={{ position: 'sticky', top: '-16px', zIndex: 2 }}
        >
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
                      // position: 'sticky',
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
                          // position: 'sticky',
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
                            onView={j.props?.view}
                            frequency={j.props?.frequency}
                            verified={j.props?.verified}
                          />
                        </div>
                      </td>
                    )
                  } else {
                    return (
                      <td key={index} width={`${cellWidth}%`}>
                        {j.id === 'subscription' ? (
                          <SubscriptionValueComponent
                            subscription={j.value as string}
                            activeTips={j.props?.activeTips}
                            subscribers={j.props?.subscribers}
                            onPredictions={j.props?.predictions}
                            addPrediction={j.props?.addPrediction}
                            isOwner={j.props?.isOwner}
                          />
                        ) : null}
                      </td>
                    )
                  }
                })}
                <td width={`${cellWidth}%`}>
                  <div className="f-row">
                    {i?.rowActions?.map((j, index) => (
                      <CellValueActionComponent key={index} {...j} />
                    ))}
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

const CellValueActionComponent: React.FC<ICellAction> = ({
  value,
  action,
  icon,
  buttonType,
  load
}) => {
  return (
    <>
      <TypeButton
        title={value as string}
        buttonType={buttonType}
        style={{ fontSize: '12px', minWidth: '110.48px', height: '40px' }}
        className="mr-2"
        onClick={action}
        load={load}
      />
    </>
  )
}

const SubscriptionValueComponent = (props: {
  subscription: string
  activeTips: string
  subscribers: string
  onPredictions?: () => void
  addPrediction?: () => void
  isOwner?: boolean
}) => {
  const isAdd = typeof props?.addPrediction === 'function'
  return (
    <div>
      <div className="f-row-20 aic">
        <p className="m-0">{props.subscription}</p>
      </div>
      <div className="f-row-20 aic mt-3">
        <InfoTxt
          value={`Active predictions ( ${props.activeTips} )`}
          onClick={props?.onPredictions}
          icon={props.isOwner && isAdd ? <PlusSVG /> : ''}
          iconClick={props?.addPrediction}
        />
      </div>
    </div>
  )
}

export default ResultTable
