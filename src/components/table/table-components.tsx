import { FC, useState } from 'react'
import { TypeSelect } from '../utils/select'
import { TypeSmallButton } from '../utils/button'
import { ITableAction } from './utils'
import { IconWrapper, InfoTxt } from '../utils/info-txt'
import { ShareSVG, StatsSVG, VerifiedSVG } from '../utils/svgs'
import { getGameTime } from '../utils/hooks'

export const useTableAction = (
  actionEnums?: { [key: string]: string } | null
): ITableAction => {
  const [action, setAction] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<string[] | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  return {
    action,
    setAction,
    selectedItems,
    setSelectedItems,
    selectedItem,
    setSelectedItem,
    actionEnums
  }
}

interface ITableActionComponent {
  tableAction: ITableAction | undefined
  handleTableAction: (() => void) | undefined
  admin?: boolean
}

export const TableActionComponent: FC<ITableActionComponent> = ({
  tableAction,
  handleTableAction,
  admin
}) => {
  const isTableAction = !!tableAction?.selectedItems?.[0]
  return (
    <div
      style={{
        borderBottom: !admin ? `1px solid #f1f1f1` : '',
        position: 'sticky',
        left: 0
      }}
      className={`${!admin ? 'px-3' : ''} pb-3 f-row aic`}
    >
      <div className="f-row-20 aic">
        <TypeSelect
          initoption={{ label: 'Select action', value: '' }}
          optionsdata={Object.values(tableAction?.actionEnums || {}).map(
            (i, index) => ({
              id: index,
              label: i,
              value: i
            })
          )}
          disabled={!isTableAction}
          value={tableAction?.action || ''}
          style={{
            width: '150px',
            height: '35px',
            fontSize: '12px',
            outline: '0'
          }}
          onChange={({ target }) => {
            const { value } = target
            tableAction?.setAction?.(value)
          }}
        />
        <TypeSmallButton
          title="Proceed"
          buttonType={isTableAction ? 'outlined' : 'disabled'}
          onClick={handleTableAction}
          disabled={!isTableAction}
        />
      </div>
    </div>
  )
}

export const ChannelValueComponent = (props: {
  channel: string
  onStats?: () => void
  onView?: () => void
  onShare?: () => void
  verified?: boolean
  frequency: string
}) => {
  return (
    <div>
      <div className="f-row-20 aic">
        <div className="f-row-7 aic">
          <p className="m-0 medium cursor-pointer" onClick={props.onView}>
            {props.channel}
          </p>
          {props.verified ? (
            <IconWrapper>
              <VerifiedSVG />
            </IconWrapper>
          ) : null}
        </div>
        <IconWrapper onClick={props.onStats} title="Stats">
          <StatsSVG />
        </IconWrapper>
        <IconWrapper onClick={props.onShare} title="Share">
          <ShareSVG />
        </IconWrapper>
      </div>
      <div className="f-row-20 aic mt-3">
        <InfoTxt value={props.frequency} />
      </div>
    </div>
  )
}

export const TableDateTxt = ({ startDate }: { startDate: string }) => {
  return (
    <div className={`f-row-10 aic`}>
      <TableDateItem date={startDate} />
    </div>
  )
}

export const TableDateItem = ({ date }: { date: string }) => {
  const txtColor = '#757575'

  const gameTime = getGameTime(date)

  return (
    <div className={`f-row-7 aic`} style={{ color: txtColor }}>
      <p className={`m-0 text-tiny`}>{gameTime}</p>
    </div>
  )
}

export const TableDateTxtItem = ({
  date,
  time
}: {
  date: string
  time: string
}) => {
  const txtColor = '#757575'
  const iconColor = '#A5A5A5'

  return (
    <div className={`f-row-7 aic`} style={{ color: txtColor }}>
      <p className={`m-0 text-little`}>
        {date}
        <span style={{ color: iconColor }}>{time}</span>
      </p>
    </div>
  )
}
