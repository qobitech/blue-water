import { useEffect, useState } from 'react'
import {
  getRoleId,
  monthEnum,
  showAmount,
  getUserData
} from '../../../constants/global'
import {
  defaultGETDataTemplate,
  defaultPATCHDataTemplate,
  useAPIGET,
  useAPIPUT
} from '../../../api'
import { IBetChannelResponses } from '../../../interface/IBet'
import {
  IPayPerTipScheduleResponse,
  IPayPerTipSchedule
} from '../../../interface/IOther'
import { IBetCodeServiceRequest } from '../../../interface/IService'
import {
  getNextDay,
  getNumberOfTickets,
  getTimeline
} from '../../../components/utils/helper'
import NotificationModal, {
  IUseNotificationModal,
  useModal
} from '../../../components/utils/modal'
import DefaultTable from '../../../components/table/default'
import { TypeSelect } from '../../../components/utils/select'
import { ITableRecord } from '../../../components/table/utils'
import { SubHeader } from './wallet/data'
import { CardItems } from '../../../components/utils/card-items'

const SchedulesPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedChannel, setSelectedChannel] = useState<string>('')

  const {
    mutate: channelMutate,
    data,
    isLoading: channelLoading
  } = useAPIGET<IBetChannelResponses>({
    route: 'channel',
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        channels: []
      }
    }
  })

  useEffect(() => {
    channelMutate({ query: `?userId=${getUserData().user._id}` })
  }, [])

  const {
    mutate: earningsMutate,
    data: earningsResponse,
    isLoading: earningLoading
  } = useAPIGET<IPayPerTipScheduleResponse>({
    route: 'schedule/pay-per-tip',
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        events: {
          channelSubscription: []
        }
      }
    }
  })

  const { mutate: serviceMutate, isLoading } = useAPIPUT({
    route: 'pay/channel-service',
    defaultData: defaultPATCHDataTemplate,
    onSuccess: () => {
      earningsMutate({
        query: `?channelId=${selectedChannel}&month=${selectedMonth}&role=${getRoleId(
          getUserData().role
        )}`
      })
    }
  })

  const channels = data?.data.channels

  const channelType = channels?.map((i) => ({
    id: i._id,
    label: i.title,
    value: i._id
  }))

  const monthType = Object.values(monthEnum).map((i, index) => ({
    id: index + '',
    label: i,
    value: i
  }))

  const channel = channels?.filter((i) => i._id === selectedChannel)?.[0]

  const scheduleData = earningsResponse?.data?.events?.channelSubscription

  const isEarn = (earnings: number) => earnings > 0

  const isTransferEarningToWallet = (deadline: string, earnings: number) => {
    if (!isEarn(earnings)) return false
    const currentDate = new Date().toISOString()

    return new Date(currentDate) > getNextDay(deadline)
  }

  const [loaderIndex, setLoaderIndex] = useState<number>(0)

  const getLoader = (index: number) => {
    return index === loaderIndex && isLoading
  }

  const requestTransferToWallet = (i: IPayPerTipSchedule) => {
    const data: IBetCodeServiceRequest = {
      amount: channel?.perPredictionCost + '',
      description: 'payment for bet code',
      itemId: channel?._id || '',
      itemType: 'betcode',
      transactionType: 'service',
      startSchedule: i.startSchedule,
      deadline: i.deadline,
      month: selectedMonth,
      odds: channel?.odds || 0,
      scheduleType: 'pay-per-tip'
    }
    serviceMutate({ body: data })
  }

  const getValue = (i: IPayPerTipSchedule) => {
    const getStatus = (label: string, value: number, classProp?: string) => {
      const color =
        label === 'transferred'
          ? 'text-success'
          : label === 'pending'
          ? 'text-mute'
          : 'text-danger'
      if (!value) return ''
      return `<p class="m-0 text-little ${color} ${classProp}"><span>&nbsp;&nbsp;&nbsp;</span>${value} ${
        label === 'cancelled' ? 'refunded' : label
      }</p>`
    }
    if (!i.status || (!i.status.pending && !i.status.completed))
      return 'Transfer to Wallet'
    return `
    <div>
      ${getStatus('transferred', i.status.completed, 'mb-1 cursor-pointer')}
      ${getStatus('pending', i.status.pending, 'mb-1 cursor-pointer')} 
      ${getStatus('cancelled', i.status.cancelled, 'cursor-pointer')}
    </div>`
  }

  const getActionType = (i: IPayPerTipSchedule) => {
    return !i.status || (!i.status.pending && !i.status.completed)
      ? 'button'
      : 'inner-html'
  }

  const useTransactionStatus = useModal()

  const [selectedTransaction, setSelectedTransaction] =
    useState<IPayPerTipSchedule | null>(null)

  const tableRecord: ITableRecord[] = scheduleData?.map((i, index) => ({
    id: i.week + '',
    row: [
      {
        value: i.week,
        isLink: false
      },
      // {
      //   value: i.codeDropped,
      //   isLink: false
      // },
      {
        value: i.purchaseCount,
        isLink: false
      },
      {
        value: getTimeline(i.startSchedule, i.deadline),
        isLink: false
      },
      {
        value: showAmount(i.earnings),
        isLink: false
      }
    ],
    rowActions: [
      {
        value: getValue(i),
        buttonType: isTransferEarningToWallet(i.deadline, i.earnings)
          ? 'bold'
          : 'disabled',

        action: () => {
          if (getActionType(i) === 'button') {
            setLoaderIndex(index + 1)
            requestTransferToWallet(i)
          }
          if (getActionType(i) === 'inner-html') {
            setSelectedTransaction(i)
            useTransactionStatus.handleOpenModal('WALLET TRANSFER')
          }
        },
        load: getLoader(index + 1),
        actionType: getActionType(i)
      }
    ]
  })) as ITableRecord[]

  return (
    <div className="bg-white rounded pt-3">
      <SubHeader
        title="Schedule & Earnings"
        description="monitor your bet code schedule and earnings"
        load={channelLoading || earningLoading}
        refreshAction={() =>
          channelMutate({ query: `?userId=${getUserData().user._id}` })
        }
      />
      <div className="w-100 rounded bg-white mb-5 f-column-15 pt-4">
        <div className="grid-wrapper-25 gap-25">
          <TypeSelect
            initoption={{ label: 'Select Channel', value: '' }}
            optionsdata={channelType}
            label="Channel"
            customwidth={'100%'}
            onChange={({ target }) => {
              const { value } = target
              if (selectedMonth) {
                earningsMutate({
                  query: `?channelId=${value}&month=${selectedMonth}&role=${getRoleId(
                    getUserData().role
                  )}`
                })
              }
              setSelectedChannel(value)
            }}
            value={selectedChannel || ''}
          />
          <TypeSelect
            initoption={{ label: 'Select Month', value: '' }}
            optionsdata={monthType}
            label="Month"
            customwidth={'100%'}
            onChange={({ target }) => {
              const { value } = target
              setSelectedMonth(value)
              if (selectedChannel) {
                earningsMutate({
                  query: `?channelId=${selectedChannel}&month=${value}&role=${getRoleId(
                    getUserData().role
                  )}`
                })
              }
            }}
            value={selectedMonth || ''}
          />
        </div>
        {channel ? (
          <div className="grid-wrapper-25 gap-25 border rounded p-4">
            <CardItems
              title="Frequency"
              value={
                getNumberOfTickets(channel.numberOfPredictions) +
                channel.frequency
              }
            />
            <CardItems
              title="Per Prediction Cost"
              value={`${showAmount(channel.perPredictionCost)}`}
            />
            <CardItems title="Followers" value={channel.subscriptionCount} />
          </div>
        ) : null}

        {channel ? (
          <div
            className="f-row aic mt-4 border rounded"
            style={{ overflow: 'auto' }}
          >
            <DefaultTable
              header={[
                'WEEK',
                'NUMBER OF PURCHASES',
                'TIMELINE',
                'EARNINGS',
                'ACTION'
              ]}
              record={tableRecord}
              hideNumbering
            />
          </div>
        ) : null}
      </div>
      <TransferInfo
        useNotificationProps={useTransactionStatus}
        data={selectedTransaction}
      />
    </div>
  )
}

export default SchedulesPage

export const TransferInfo = ({
  useNotificationProps,
  data
}: {
  useNotificationProps: IUseNotificationModal
  data?: any | null
}) => {
  const tableRecord = [
    {
      row: [
        {
          value: data?.status?.completed
            ? data?.status?.completed + ' completed'
            : ''
        },
        {
          value: 'Transaction completed'
        }
      ]
    },
    {
      row: [
        {
          value: data?.status?.pending ? data?.status?.pending + ' pending' : ''
        },
        {
          value: 'Ongoing investigation for channel misconduct'
        }
      ]
    },
    {
      row: [
        {
          value: data?.status?.cancelled
            ? data?.status?.cancelled + ' cancelled'
            : ''
        },
        {
          value: 'Channel misconduct'
        }
      ]
    }
  ].filter((i) => i.row[0].value) as ITableRecord[]

  return (
    <NotificationModal
      useNotificationProps={useNotificationProps}
      size="medium"
    >
      <div className="px-3 pb-4 mb-3" style={{ overflow: 'auto' }}>
        <DefaultTable
          header={['STATUS', 'REASON']}
          record={tableRecord}
          hideNumbering
        />
      </div>
    </NotificationModal>
  )
}
