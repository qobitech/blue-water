import { TypeCheckbox } from '../utils/checkbox'
import { BUTTON_PRIMARY, PAGE_SIZE } from '../../constants/global'
import { CheckSVG, CopySVG, ShareSVG, ViewSVG } from '../utils/svgs'
import './table.scss'
import { SeparatorComponent, getSportIcon } from '../utils/reusable'
import { FlagSVG } from '../utils/svgs/f-awesome'
import { HVC } from '../utils/hvc'
import { IconWrapper, InfoTxt } from '../utils/info-txt'
import { IPredictionRecord, IPredictionResultTable } from './utils'
import { TableActionComponent, TableDateTxt } from './table-components'

const MyPredictionTable: React.FC<IPredictionResultTable> = ({
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
                            sports={j?.props?.sports as string[]}
                            code={j.value as string}
                            odds={j?.props?.odds as string}
                            startDate={j?.props?.startDate as string}
                            endDate={j?.props?.endDate as string}
                            active={j?.props?.active as boolean}
                            isSubscribed={j?.props?.isSubscribed}
                            onUnlock={j?.props?.unlock}
                            onCopy={j?.props?.copy}
                            onShare={j?.props?.share}
                            copySuccess={j?.props?.copySuccess}
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
                          />
                        ) : j.id === 'feedback' ? (
                          <FeedbackValueComponent
                            reviews={j?.props.reviews}
                            onReport={j?.props?.onReport}
                            onReview={j?.props?.onReview}
                            viewReviews={j?.props?.viewReviews}
                            isReview={j?.props?.isReview}
                          />
                        ) : null}
                      </td>
                    )
                  }
                })}
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

const CodeValueComponent = (props: {
  code: string
  odds: string
  startDate: string
  endDate: string
  active: boolean
  isSubscribed: boolean
  onUnlock?: () => void
  onCopy?: () => void
  onShare?: () => void
  copySuccess?: boolean
  sports: string[]
}) => {
  const sportIcon =
    props?.sports?.length === 1 ? getSportIcon(props?.sports?.[0]) : ''
  return (
    <div>
      <div className="f-row-15 aic">
        <div className="f-row-10 aic">
          {sportIcon}
          <p
            className="m-0 cursor-pointer"
            style={{ letterSpacing: '2px' }}
            onClick={props.onCopy}
          >
            <b>{props.code}</b>
          </p>
        </div>

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
      </div>
      <div className="f-row-15 aic mt-3">
        <InfoTxt value={`${props.odds} odds`} />
        <SeparatorComponent />
        {props.active ? (
          <TableDateTxt startDate={props.startDate} />
        ) : (
          <InfoTxt value="Ended" />
        )}
      </div>
    </div>
  )
}

const BookieValueComponent = ({
  bookie,
  onStake
}: {
  bookie: string
  onStake?: () => void
}) => {
  return (
    <div>
      <div className="f-row-20 aic">
        <p className="m-0">{bookie}</p>
      </div>
      <div className="f-row-7 aic mt-3 cursor-pointer">
        <InfoTxt value="Stake bet" onClick={onStake} />
      </div>
    </div>
  )
}

const FeedbackValueComponent = (props: {
  reviews: number
  onReport?: () => void
  onReview?: () => void
  viewReviews?: () => void
  isReview?: boolean
}) => {
  const reviewForm = `review${props.reviews > 1 ? 's' : ''}`
  return (
    <div>
      <div className="f-row-20 aic cursor-pointer" onClick={props.viewReviews}>
        <p className="m-0">
          {props.reviews || 0} {reviewForm}
        </p>
        <IconWrapper onClick={props.viewReviews}>
          <ViewSVG />
        </IconWrapper>
      </div>
      <div className="f-row-20 aic mt-3 cursor-pointer">
        <HVC removeDOM view={props.isReview} className="f-row-20 aic">
          <p
            className="m-0 text-tiny color-light text-decoration-underline cursor-pointer"
            onClick={props.onReview}
          >
            Add review
          </p>
          <SeparatorComponent />
        </HVC>
        <div className="f-row-7 aic cursor-pointer" onClick={props.onReport}>
          <p className="m-0 text-tiny color-light text-decoration-underline">
            Add report
          </p>
          <FlagSVG />
        </div>
      </div>
    </div>
  )
}

export default MyPredictionTable
