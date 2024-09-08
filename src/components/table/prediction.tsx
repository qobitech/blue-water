import { TypeCheckbox } from '../utils/checkbox'
import { TypeButton } from '../utils/button'
import { BUTTON_PRIMARY, GETISSELLER, PAGE_SIZE } from '../../constants/global'
import {
  CheckSVG,
  CopySVG,
  PadlockSVG,
  ShareSVG,
  VerifiedSVG
} from '../utils/svgs'
import {
  ActionComponent,
  SeparatorComponent,
  getSportIcon
} from '../utils/reusable'
import './table.scss'
import {
  getIsStatusNotPublishedTxt,
  ICellAction,
  IPredictionRecord,
  IPredictionResultTable
} from './utils'
import { IconWrapper, InfoTxt } from '../utils/info-txt'
import { TableActionComponent, TableDateTxt } from './table-components'

const PredictionTable: React.FC<IPredictionResultTable> = ({
  header,
  record,
  currentPage,
  hideNumbering,
  cellWidth,
  tableAction,
  handleTableAction,
  isPublic,
  noDataCTA
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
    i: IPredictionRecord
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
      <table className="resultTable predictionTable">
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
                          <CodeValueComponent
                            code={j.value as string}
                            odds={j?.props?.odds as string}
                            active={j?.props?.active as boolean}
                            startDate={j?.props?.startDate as string}
                            sports={j?.props?.sports as string[]}
                            endDate={j?.props?.endDate as string}
                            isSubscribed={j?.props?.isSubscribed}
                            status={j.props.status}
                            onUnlock={j?.props?.unlock}
                            onCopy={j?.props?.copy}
                            onShare={j?.props?.share}
                            onModifyCart={j?.props?.onModifyCart}
                            onModifyCartLoading={j?.props?.onModifyCartLoading}
                            copySuccess={j?.props?.copySuccess}
                            isAddItemToCart={j?.props.isAddItemToCart}
                          />
                        </div>
                      </td>
                    )
                  } else {
                    return (
                      <td key={index} width={`${cellWidth}%`}>
                        {j.id === 'bookie' ? (
                          <BookieValueComponent
                            bookie={j.value as string}
                            onStake={j.props.stake}
                            status={j.props.status}
                          />
                        ) : j.id === 'channel' ? (
                          <ChannelValueComponent
                            channel={j.value as string}
                            subscribed={j?.props?.subscribed}
                            onSubscribe={j?.props?.onSubscribe}
                            subscribeLoad={j?.props?.subscribeLoad}
                            onAllPredictions={j?.props?.predictions}
                            onStats={j?.props?.stats}
                            verified={j?.props?.verified}
                            isPublic={isPublic}
                          />
                        ) : null}
                      </td>
                    )
                  }
                })}
                {i?.rowActions?.length ? (
                  <td>
                    <RowActions rowActions={i.rowActions} />
                  </td>
                ) : null}
              </tr>
            ))}
        </tbody>
      </table>
      {!isRecord && (
        <div>
          <p className="margin-auto text-center pt-4 color-light text-tiny">
            No Data
          </p>
          {noDataCTA ? (
            <div className="f-row aic jcc pb-5">{noDataCTA}</div>
          ) : null}
        </div>
      )}
    </div>
  )
}

const RowActions = ({ rowActions }: { rowActions: ICellAction[] }) => {
  return (
    <div className="f-row-10 aic">
      {rowActions?.map((j, index) => {
        return <RowAction item={j} key={index} />
      })}
    </div>
  )
}

const RowAction = ({ item }: { item: ICellAction }) => {
  return (
    <>
      {item.type === 'drop-down' ? (
        <ActionComponent
          actions={item.dropDownActions}
          title={item.title}
          buttonType={item.buttonType}
        />
      ) : null}
      {item.type === 'button' ? (
        <TypeButton
          onClick={item.action}
          title={item.title || ''}
          buttonType={item.buttonType}
        />
      ) : null}
    </>
  )
}

const CodeValueComponent = (props: {
  code: string
  odds: string
  startDate: string
  endDate: string
  active: boolean
  isSubscribed: boolean
  status: 'Pending' | 'Published' | 'Archived'
  onUnlock?: () => void
  onCopy?: () => void
  onShare?: () => void
  onModifyCart?: () => void
  onModifyCartLoading?: boolean
  isAddItemToCart?: boolean
  copySuccess?: boolean
  sports: string[]
}) => {
  const statusNotPublishedTxt = getIsStatusNotPublishedTxt(props.status)
  const sportIcon =
    props?.sports?.length === 1 ? getSportIcon(props?.sports?.[0]) : ''
  return (
    <div>
      {props.isSubscribed ? (
        <div className="f-row-15 aic">
          <div className="f-row-7 aic">
            {sportIcon}
            <p className="m-0 medium" style={{ letterSpacing: '2px' }}>
              {props.code}
            </p>
          </div>
          {statusNotPublishedTxt ? null : (
            <>
              <div style={{ width: '20px' }}>
                <IconWrapper onClick={props.onCopy}>
                  {props.copySuccess ? (
                    <CheckSVG color={BUTTON_PRIMARY} />
                  ) : (
                    <CopySVG />
                  )}
                </IconWrapper>
              </div>
              <IconWrapper onClick={props.onShare}>
                <ShareSVG />
              </IconWrapper>
            </>
          )}
        </div>
      ) : (
        <div
          className={`f-row-15 aic ${GETISSELLER() ? '' : 'cursor-pointer'}`}
        >
          <p
            className="m-0 d-none d-lg-block"
            style={{ letterSpacing: '2px', filter: `blur(8px)` }}
          >
            123456
          </p>
          <div
            className="f-row-7 aic"
            onClick={GETISSELLER() ? undefined : props?.onUnlock}
          >
            <PadlockSVG />
            {GETISSELLER() ? null : (
              <p className="m-0 text-tiny text-success">Get bet code</p>
            )}
          </div>
        </div>
      )}
      {statusNotPublishedTxt ? (
        <div className="f-row-15 aic mt-3">
          <p className="m-0 text-tiny color-label">{statusNotPublishedTxt}</p>
        </div>
      ) : (
        <div className="f-row-15 aic mt-3">
          <InfoTxt value={`${props.odds} odds`} />
          <SeparatorComponent />
          {props.active ? (
            <TableDateTxt startDate={props.startDate} />
          ) : (
            <InfoTxt value="Ended" />
          )}
        </div>
      )}
    </div>
  )
}

const BookieValueComponent = ({
  bookie,
  onStake,
  status
}: {
  bookie: string
  onStake?: () => void
  status: 'Pending' | 'Published' | 'Archived'
}) => {
  const statusNotPublishedTxt = getIsStatusNotPublishedTxt(status)
  return (
    <div>
      <div className="f-row-20 aic">
        <p className="m-0">{bookie}</p>
      </div>
      <div className="f-row-7 aic mt-3 cursor-pointer">
        {!statusNotPublishedTxt ? (
          <InfoTxt value="Stake bet" icon="" onClick={onStake} />
        ) : (
          <p className="m-0 text-tiny color-label">{statusNotPublishedTxt}</p>
        )}
      </div>
    </div>
  )
}

const ChannelValueComponent = (props: {
  channel: string
  subscribed: boolean
  onSubscribe?: () => void
  subscribeLoad?: boolean
  onStats?: () => void
  onAllPredictions?: () => void
  verified: boolean
  isPublic?: boolean
}) => {
  return (
    <div>
      <div className="f-row-20 aic">
        <p className="m-0">{props.channel}</p>
        {props.verified ? (
          <IconWrapper>
            <VerifiedSVG />
          </IconWrapper>
        ) : null}
      </div>
      <div className="f-row-20 aic mt-3 cursor-pointer">
        <div className="f-row-7 aic cursor-pointer" onClick={props.onStats}>
          <p className="m-0 text-tiny color-light">Stats</p>
        </div>
        {!props.isPublic ? (
          <>
            <SeparatorComponent />
            <div
              className="f-row-7 aic cursor-pointer"
              onClick={props.onAllPredictions}
            >
              <p className="m-0 text-little color-light text-decoration-underline">
                All predictions
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default PredictionTable
