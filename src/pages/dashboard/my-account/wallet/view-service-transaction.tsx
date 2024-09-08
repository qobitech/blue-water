import { IGlobalRightSection } from '../../../../components/layout/right-section'
import { IServiceTransaction } from '../../../../interface/ITransaction'
import { CardItems } from '../../bet-channel/by-id/data'

const ServiceTransaction = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps } = globalContext
  const data = rsProps?.data as unknown as IServiceTransaction

  const dataArray = [
    {
      label: 'Service ID',
      value: data._id,
      copy: true
    },
    {
      label: 'Transaction ID',
      value: data.transaction,
      copy: true
    },
    {
      label: 'Start Date',
      value: new Date(data.startDate).toDateString()
    },
    {
      label: 'End Date',
      value: new Date(data.endDate).toDateString()
    },
    {
      label: 'Item Type',
      value: data.itemType
    },
    {
      label: 'Payment Method',
      value: data.paymentMethod
    },
    {
      label: 'Status',
      value: data.status
    }
  ]
  return (
    <div className="grid-wrapper-40 gap-40 border rounded p-4">
      {dataArray.map((i, index) => (
        <CardItems title={i.label} value={i.value} key={index} copy={i.copy} />
      ))}
    </div>
  )
}

export default ServiceTransaction
