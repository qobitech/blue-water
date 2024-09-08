import { TypeButton } from '../../utils/button'
import { IUPC } from './post-payment/hooks'
import { getTxRef } from '../../../constants/global'

const PaymentFrame = ({
  paymentLink,
  handlePaymentLink,
  paymentConfirmationProps
}: {
  paymentLink: string | null
  handlePaymentLink?: ((paymentLink: string | null) => void) | undefined
  paymentConfirmationProps: IUPC
}) => {
  if (!paymentLink) return <></>
  if (!paymentConfirmationProps) return <></>

  const verifyTransaction = paymentConfirmationProps.verifyTransaction

  return (
    <div
      style={{ position: 'fixed', height: '100vh', zIndex: 2000 }}
      className="w-100 bg-white"
    >
      <div className="position-relative f-column-1 aic jcc w-100 h-100">
        <iframe
          src={paymentLink}
          title="Online Payment"
          // sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          style={{ width: '100%', height: '100vh' }}
          id="paypal-checkout-sandbox"
        ></iframe>
        <div
          className="f-column aic mt-auto py-3 border-top w-100"
          style={{ bottom: 0 }}
        >
          <TypeButton
            title="Close"
            buttonType="danger"
            onClick={() => {
              verifyTransaction(getTxRef())
              handlePaymentLink?.(null)
            }}
            buttonShape="curve"
            buttonSize="table"
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentFrame
