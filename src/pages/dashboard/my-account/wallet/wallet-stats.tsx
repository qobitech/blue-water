import { FC } from 'react'
import { IRightSection } from '../../../../components/layout/right-section'
import { IWalletTransactionStats } from '../../../../interface/ITransaction'
import { GETISSELLER, showAmount } from '../../../../constants/global'
import { TypeButton } from '../../../../components/utils/button'
import { RefreshComponent } from '../../../../components/utils/reusable'
import { OverViewHeader } from '../../bet-channel/by-id/data'

export const LIMIT = 10

interface IWalletStats {
  rsProps?: IRightSection<{}>
  refreshOnSuccess: () => void
  transactionStatsData: IWalletTransactionStats
  isLoading: boolean
  getWalletStats: () => void
  walletStats: Array<{
    title: string
    amount: number
    hide?: boolean
  }>
}

const WalletStats: FC<IWalletStats> = ({
  rsProps,
  refreshOnSuccess,
  transactionStatsData,
  isLoading,
  getWalletStats,
  walletStats
}) => {
  const btnTitle = GETISSELLER() ? 'Withdraw Request' : 'Top up wallet'

  const onCTA = () => {
    rsProps?.addRightSectionHistory()
    if (!GETISSELLER()) {
      rsProps?.callSection({
        action: 'view',
        component: 'fund-wallet',
        title: 'Fund Wallet'
      })
    } else {
      rsProps?.callSection({
        action: 'view',
        component: 'withdraw-funds',
        title: 'Withdraw Funds',
        data: {
          refreshOnSuccess,
          withdrawalAmount: transactionStatsData.data.stats.totalWithdrawable,
          onClose: () => {
            rsProps.closeSection()
          }
        }
      })
    }
  }

  return (
    <>
      <div className="f-row-30 aic">
        <p className="m-0 fs-16 color-brand">Wallet</p>

        <TypeButton
          title={btnTitle}
          buttonShape="curve"
          buttonSize="small"
          onClick={onCTA}
        />
        <RefreshComponent load={isLoading} onRefresh={getWalletStats} />
      </div>
      <div className="grid-wrapper-25 d-none d-lg-flex border rounded p-4">
        {walletStats
          .filter((i) => !i.hide)
          .map((i, index) => (
            <div key={index} className="py-3 py-xl-2">
              <p className="text-small">{i.title}</p>
              <h4>{showAmount(i.amount + '')}</h4>
            </div>
          ))}
      </div>
      <div className="grid-wrapper-25 d-grid d-lg-none border rounded py-4 gap-30">
        {walletStats
          .filter((i) => !i.hide)
          .map((i, index) => (
            <div key={index} className="text-center f-column aic">
              <OverViewHeader title={i.title} />
              <h4>{showAmount(i.amount)}</h4>
            </div>
          ))}
      </div>
    </>
  )
}

export default WalletStats
