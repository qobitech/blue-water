import { useEffect } from 'react'
import { useQueryValuesHook } from '../../utils/hooks'
import crying from '../../../assets/animation/crying.json'
import RequestStatus from '../../utils/request-status'

export const SNART_XER = 'SNART_XER'

const PaymentStatusPage = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { status, tx_ref } = useQueryValuesHook()

  useEffect(() => {
    if (tx_ref) {
      localStorage.setItem(SNART_XER, JSON.stringify(tx_ref))
    }
  }, [tx_ref])

  const getPSProps = () => {
    switch (status) {
      case 'cancelled':
        return { title: 'Payment Cancelled', description: '', lottie: crying }
      case 'successful':
        return { title: 'Payment Successful', description: '', lottie: '' }
      default:
        return { title: 'Cancelled', description: '', lottie: crying }
    }
  }

  const psProps = getPSProps()

  return (
    <div style={{ height: '90vh' }} className="position-relative jcc f-row aic">
      <RequestStatus
        title={psProps.title}
        lottie={psProps.lottie}
        success={psProps.title === 'Payment Successful'}
        description={psProps.description}
        loop={false}
      />
    </div>
  )
}

export default PaymentStatusPage
