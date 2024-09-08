import { actionComponent } from '../../../../components/layout/right-section'
import { TypeSmallButton } from '../../../../components/utils/button'
import { HVC } from '../../../../components/utils/hvc'
import { RefreshComponent } from '../../../../components/utils/reusable'
import { TypeSelect } from '../../../../components/utils/select'
import { FilterSVG } from '../../../../components/utils/svgs'
import TabToggler, {
  ITabToggesOption,
  useTabToggler
} from '../../../../components/utils/tab-toggler'
import { GETISSELLER, LABEL_COLOR } from '../../../../constants/global'
import {
  ITransaction,
  IWalletTransactionStats
} from '../../../../interface/ITransaction'

export const getWalletStatsData = (
  transactionStatsData: IWalletTransactionStats | undefined
) => {
  const stats = transactionStatsData?.data.stats
  return [
    {
      title: 'Wallet Balance',
      amount: stats?.balance || 0
    },
    {
      title: 'Credit Transactions',
      amount: stats?.totalCredit || 0
    },
    {
      title: 'Debit Transactions',
      amount: stats?.totalDebit || 0
    },
    {
      title: 'Withdrawable',
      amount: stats?.totalWithdrawable || 0,
      hide: !GETISSELLER()
    }
  ]
}

export const SubHeader = ({
  title,
  description,
  load,
  refreshAction
}: {
  title: string
  description: string
  load?: boolean
  refreshAction?: () => void
}) => {
  const isRefresh = typeof refreshAction === 'function'
  return (
    <div className="pb-2">
      <div className="f-row-20 mb-2">
        <p className="m-0 fs-16 color-brand">{title}</p>
        {isRefresh ? (
          <RefreshComponent load={load} onRefresh={refreshAction} />
        ) : null}
      </div>
      <div className="w-100">
        <p className="m-0 color-label ff-regular text-little">{description}</p>
      </div>
    </div>
  )
}

export interface ISubHeaderCTA {
  title: string
  action?: () => void
  buttonType?: 'bold' | 'disabled' | 'outlined' | 'danger' | 'active'
  load?: boolean
}

export const SubHeaderTips = ({
  title,
  description,
  load,
  refreshAction,
  handleCategory,
  categoryOptions,
  position,
  category,
  onFilter,
  cta,
  ctas
}: {
  title: string
  description: string
  load?: boolean
  refreshAction?: () => void
  handleCategory?: (category: string) => void
  categoryOptions?: ITabToggesOption[]
  position?: 'center' | 'left' | 'right'
  category?: string
  onFilter?: () => void
  cta?: ISubHeaderCTA
  ctas?: ISubHeaderCTA[]
}) => {
  const isRefresh = typeof refreshAction === 'function'
  const isFilter = typeof onFilter === 'function'
  const isCategory = typeof handleCategory === 'function'

  const tabTogglerProps = useTabToggler(
    categoryOptions || [],
    categoryOptions?.[0] || ({} as ITabToggesOption),
    position
  )

  const isCTA = typeof cta?.action === 'function'
  const isCTAs = !!ctas?.length

  return (
    <div className="f-row ais pb-2">
      <div>
        <div className="f-row-20 mb-2 aic">
          <p className="m-0 fs-16 color-brand">{title}</p>
          {isRefresh ? (
            <RefreshComponent load={load} onRefresh={refreshAction} />
          ) : null}
          {isCTA ? (
            <div className="ml-3">
              <TypeSmallButton
                title={cta.title}
                buttonType={cta.buttonType}
                onClick={cta.action}
                load={cta.load}
              />
            </div>
          ) : null}
          {isCTAs ? (
            <div className="ml-3 f-row-20 flex-wrap">
              {ctas?.map((cta, index) => (
                <TypeSmallButton
                  title={cta.title}
                  buttonType={cta.buttonType}
                  onClick={cta.action}
                  load={cta.load}
                  key={index}
                />
              ))}
            </div>
          ) : null}
          {isFilter ? (
            <div
              className="ml-5 cursor-pointer"
              style={{ width: 'max-content', height: 'max-content' }}
              onClick={onFilter}
            >
              <FilterSVG fill={LABEL_COLOR} />
            </div>
          ) : null}
        </div>
        <div className="w-100">
          <p className="m-0 color-label ff-light text-little">{description}</p>
        </div>
      </div>
      {isCategory ? (
        <div className="ml-auto">
          <TabToggler tabTogglerProps={tabTogglerProps} />
        </div>
      ) : null}
    </div>
  )
}

export const SubHeaderFilter = ({
  title,
  description,
  load,
  refreshAction,
  onFilter,
  optionsData,
  initoption,
  onSelect,
  value
}: {
  title: string
  description: string
  load?: boolean
  refreshAction?: () => void
  onFilter?: () => void
  initoption: { label: string; value: string | number }
  optionsData?: Array<{
    id: string | number
    label: string
    value: string | number
    hide?: boolean | undefined
  }>
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value: string
}) => {
  const isRefresh = typeof refreshAction === 'function'
  const isFilter = typeof onFilter === 'function'
  return (
    <div className="jcsb ais pb-2 cta-wrapper mb-5 gap-53">
      <div className="f-column-12 py-4">
        <div className="f-row-20">
          <p className="m-0 fs-16 color-brand">{title}</p>
          {isRefresh ? (
            <RefreshComponent load={load} onRefresh={refreshAction} />
          ) : null}
          {isFilter ? (
            <div
              className="ml-5 cursor-pointer"
              style={{ width: 'max-content', height: 'max-content' }}
              onClick={onFilter}
            >
              <FilterSVG fill={LABEL_COLOR} />
            </div>
          ) : null}
        </div>
        <HVC removeDOM view={!!description} className="w-100">
          <p className="m-0 color-label ff-regular">{description}</p>
        </HVC>
      </div>
      <div className="hx-mx">
        <TypeSelect
          initoption={initoption}
          optionsdata={optionsData}
          style={{ height: '35px', fontSize: '0.8rem' }}
          className="pl-2"
          onChange={onSelect}
          value={value || ''}
        />
      </div>
    </div>
  )
}

export const getRSAComponent = (value: string): actionComponent => {
  switch (value) {
    case 'service':
      return 'service-transaction'
    case 'purchase':
      return 'purchase-transaction'
    case 'withdraw-request':
      return 'withdraw-request-transaction'
    default:
      return null
  }
}

export const getTransactionType = (i: ITransaction) => {
  if (!i.escrow) return i.transactionType
  return `${i.transactionType}`
}

export const setFirstCharUpper = (value: string) =>
  value[0].toUpperCase() + value.substring(1, value.length).toLowerCase()

export const getTransaction = (i: ITransaction) => {
  return getTransactionType(i)
}
