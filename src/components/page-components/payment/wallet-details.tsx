import { useEffect, useState } from 'react'
import { getUserData } from '../../../constants/global'
import { TypeInput } from '../../utils/input'
import { defaultGETDataTemplate, useAPIGET } from '../../../api'
import { IWalletTransactionStats } from '../../../interface/ITransaction'
import SummaryOrder from './order-summary'
import { AcceptTransaction } from './payment-details'
import { TypeButton, TypeSmallButton } from '../../utils/button'
import { IGlobalRightSection } from '../../layout/right-section/utils'
import { RightAngleSVG, TopAngleSVG } from '../../utils/svgs/f-awesome'

const WalletDetails = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <></>

  const { mutate: transactionStatsMutate, data: transactionStatsData } =
    useAPIGET<IWalletTransactionStats>({
      route: 'transaction/wallet-stats',
      defaultData: {
        ...defaultGETDataTemplate,
        data: {
          stats: {
            balance: 0,
            totalWithdrawable: 0,
            totalCredit: 0,
            totalDebit: 0
          }
        }
      }
    })

  useEffect(() => {
    transactionStatsMutate({ query: `?walletId=${getUserData().user.wallet}` })
  }, [])

  const [openSection, setOpenSection] = useState<boolean>(true)

  return (
    <div className="f-column-15">
      <SummaryOrder globalContext={globalContext} hideButton />
      <div className="p-3 border rounded bg-white">
        <form onSubmit={(e) => e.preventDefault()}>
          <div
            className="f-row aic jcsb cursor-pointer"
            onClick={() => setOpenSection(!openSection)}
          >
            <p className="m-0">
              <b>WALLET DETAILS</b>
            </p>
            <p className="m-0">
              {openSection ? <TopAngleSVG /> : <RightAngleSVG />}
            </p>
          </div>
          {openSection ? (
            <div className="mt-4">
              <div className="grid-wrapper-45 gap-20">
                <TypeInput
                  label="Balance"
                  customwidth={'100%'}
                  value={transactionStatsData.data.stats.balance || ''}
                  isonlyview
                />
              </div>
              <div>
                <TypeSmallButton title="Top-up wallet" buttonType="outlined" />
              </div>
            </div>
          ) : null}
        </form>
      </div>
      <AcceptTransaction itemType="" totalAmount="200" />
      <TypeButton title="Make Payment" />
    </div>
  )
}

export default WalletDetails
