import { IGlobalRightSection } from '../../../../components/layout/right-section'
import { TypeSmallButton } from '../../../../components/utils/button'
import { IPurchaseTransaction } from '../../../../interface/ITransaction'
import { CardItems } from '../../bet-channel/by-id/data'

const PurchaseTransaction = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps } = globalContext
  const data = rsProps?.data as unknown as IPurchaseTransaction

  if (!data) return <>No data found</>

  const dataArray = [
    {
      label: 'Service ID',
      value: data?._id,
      copy: true
    },
    {
      label: 'Transaction ID',
      value: data?.transaction,
      copy: true
    },
    {
      label: 'Purchase Date',
      value: new Date(data?.createdAt).toDateString()
    },
    {
      label: 'Purchased Item',
      value: data?.itemType
    },
    {
      label: 'Payment Method',
      value: data?.paymentMethod
    },
    {
      label: 'Status',
      value: data?.status
    }
  ]

  const isBetCode = data?.itemType === 'betcode'

  const onViewBetCode = () => {
    rsProps?.addRightSectionHistory()
    rsProps?.setDataById(data.itemId)
    rsProps?.callSection({
      action: 'view',
      component: 'purchased-prediction',
      title: 'View Bet Code',
      data
    })
  }

  return (
    <>
      <div className="grid-wrapper-40 gap-40 mb-5 border rounded p-4">
        {dataArray.map((i, index) => (
          <CardItems
            title={i.label}
            value={i.value}
            key={index}
            copy={i.copy}
          />
        ))}
      </div>
      {isBetCode ? (
        <TypeSmallButton title="View Bet Code" onClick={onViewBetCode} />
      ) : null}
    </>
  )
}

export default PurchaseTransaction
