import { IUseAPI } from '../../../../api'
import { IRightSection } from '../../../../components/layout/right-section'
import DefaultTable from '../../../../components/table/default'
import { getTime, ITableRecord } from '../../../../components/table/utils'
import PaginationComponent from '../../../../components/utils/pagination'
import { getUserData, showAmount } from '../../../../constants/global'
import {
  ITransaction,
  ITransactionResponse
} from '../../../../interface/ITransaction'
import { getRSAComponent, getTransaction, setFirstCharUpper } from './data'

const Transactions = ({
  transactionProps,
  handlePagination,
  rsProps
}: {
  transactionProps: IUseAPI<ITransactionResponse>
  handlePagination: (selectedItem: { selected: number }) => void
  rsProps?: IRightSection<{}>
}) => {
  const getAccountType = (i: ITransaction) => {
    if (i.paymentStatus !== 'Successful') return undefined
    return i.receiverId === getUserData().user.wallet
  }

  const tableRecord: ITableRecord[] =
    transactionProps.data.data.transactions.map((i) => ({
      id: i._id,
      row: [
        {
          value: new Date(i.modified).toDateString(),
          isLink: false
        },
        {
          value: getTime(i.modified),
          isLink: false
        },
        {
          value: getTransaction(i),
          isLink: !!getRSAComponent(getTransaction(i) || ''),
          action: () => {
            if (getRSAComponent(getTransaction(i) || ''))
              rsProps?.callSection({
                action: 'view',
                component: getRSAComponent(getTransaction(i) || ''),
                title: `View ${setFirstCharUpper(
                  getTransaction(i) || ''
                )} Transaction`,
                data: i.item,
                status: i.paymentStatus === 'Successful',
                paymentStatus: i.paymentStatus
              })
          }
        },
        {
          value: showAmount(i.amount),
          isLink: false,
          valueStatus: getAccountType(i)
        },
        {
          value: i.paymentStatus,
          isLink: false
        }
      ]
    })) as ITableRecord[]

  return (
    <div>
      <div className="f-row aic mb-4 over-flow-auto">
        <DefaultTable
          header={['DATE', 'TIME', 'TRANSACTION', 'AMOUNT', 'STATUS']}
          record={tableRecord}
          hideNumbering
        />
      </div>
      <PaginationComponent
        currentPage={transactionProps.data.currentPage}
        handlePagination={handlePagination}
        pages={transactionProps.data.pages}
      />
    </div>
  )
}
export default Transactions
