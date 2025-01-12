import { useEffect, useState } from 'react'
import {
  BASEURLFE,
  BG,
  IPaymentDetails,
  LABEL_COLOR,
  getAmount,
  paymentMethodType,
  showAmount,
  getUserData
} from '../../../constants/global'
import { TypeButton, TypeSmallButton } from '../../utils/button'
import SummaryOrder from './order-summary'
import {
  IGlobalRightSection,
  IRightSection
} from '../../layout/right-section/utils'
import { TypeRadio } from '../../utils/radio'
import TextPrompt from '../../utils/text-prompt'
import { pageurl } from '../../../constants/pageurl'
import { useGetWalletBalance } from '../../../api/wallet'
import { RefreshComponent } from '../../utils/reusable'
import './payment.scss'

const CheckoutPage = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <></>

  const {
    paymentDetails,
    rsProps,
    makePayment,
    orderSummaryProps,
    setPaymentItemType
    // setNotification
  } = globalContext

  if (!makePayment) return <></>

  const [paymentMethod, setPaymentMethod] = useState<paymentMethodType | null>(
    null
  )

  const placeOrder = () => {
    const data = {
      name: getUserData().user.userName,
      email: getUserData().user.email
    }

    const paymentDetail = paymentDetails?.[0] as IPaymentDetails

    setPaymentItemType?.(paymentDetail.itemType)

    const paymentRequest = {
      ...data,
      amount: getAmount(orderSummaryProps?.totalAmount || ''),
      subAmount: getAmount(orderSummaryProps?.subAmount || ''),
      serviceFee: getAmount(orderSummaryProps?.serviceFee || ''),
      redirect_url: `${BASEURLFE}${pageurl.PAYMENTSTATUS}`,
      title: paymentDetail.title,
      itemId: paymentDetail.itemId,
      itemType: paymentDetail.itemType,
      transactionType: paymentDetail.transactionType,
      quantity: paymentDetail.quantity,
      description: paymentDetail.description,
      paymentMethod
    }

    makePayment.mutate({ body: paymentRequest })

    rsProps?.callSection({
      action: 'view',
      title: 'Payment Status',
      component: 'post-payment'
    })
  }

  return (
    <div className="f-column-15">
      <SummaryOrder globalContext={globalContext} hideButton />
      <div className="p-3 border rounded bg-white">
        <form onSubmit={(e) => e.preventDefault()}>
          <WalletCheckout
            rsProps={rsProps}
            isChecked={paymentMethod === 'wallet'}
            onHandleChecked={() => {
              setPaymentMethod('wallet')
            }}
            totalAmount={parseFloat(orderSummaryProps?.totalAmount || '0')}
          />
        </form>
      </div>
      <AcceptTransaction paymentMethod={paymentMethod} />
      <TypeButton
        title="Place Order"
        onClick={placeOrder}
        buttonType={!paymentMethod ? 'disabled' : 'bold'}
        disabled={!paymentMethod}
        load={makePayment.isLoading}
      />
      {/* {makePayment.response ? (
        <ResponseComponent
          response={makePayment.response}
          spaceTop={20}
          timeout={500}
        />
      ) : null} */}
    </div>
  )
}

const WalletCheckout = ({
  isChecked,
  onHandleChecked,
  rsProps,
  totalAmount
}: {
  isChecked: boolean
  onHandleChecked: () => void
  rsProps?: IRightSection<{}> | undefined
  totalAmount: number
}) => {
  const walletBalanceProps = useGetWalletBalance()

  const onRefresh = () => {
    walletBalanceProps.mutate({
      query: `?walletId=${getUserData().user.wallet}`
    })
  }

  useEffect(() => {
    onRefresh()
  }, [])

  const walletBalance = walletBalanceProps?.data?.data?.stats?.balance || 0

  const isInsufficient = totalAmount > walletBalance

  const aan = totalAmount - walletBalance

  const additionalAmountNeeded = aan < 0 ? 0 : aan

  console.log(rsProps?.onRefresh, 'juju')

  return (
    <div className="f-column-33">
      <div className="f-row aic jcsb cursor-pointer">
        <p className="m-0">
          <b>PAYMENT METHOD</b>
        </p>
      </div>
      <div className=" wallet-checkout gap-33">
        <div className="f-row-33 ais wallet-checkout-cta hw-mx">
          <div
            className="f-row ais"
            style={{
              width: 'max-content',
              cursor: walletBalance ? 'pointer' : 'not-allowed'
            }}
            onClick={!isInsufficient ? onHandleChecked : undefined}
          >
            <TypeRadio
              className="mr-3"
              type="radio"
              checked={isChecked}
              defaultChecked={false}
              onChange={() => {}}
            />
            <div>
              <p
                className="m-0 text-medium"
                style={{ color: walletBalance ? '' : LABEL_COLOR }}
              >
                {showAmount(walletBalance || 0)}
              </p>
              <p className="m-0 text-little color-label">wallet</p>
            </div>
          </div>
          <div style={{ paddingTop: '5px' }}>
            <RefreshComponent
              onRefresh={onRefresh}
              load={walletBalanceProps.isLoading}
            />
          </div>
        </div>
        <TypeSmallButton
          title="Top-Up Wallet"
          buttonType={!additionalAmountNeeded ? 'disabled' : 'outlined'}
          onClick={() => {
            rsProps?.addRightSectionHistory()
            rsProps?.callSection({
              action: 'view',
              component: 'fund-wallet',
              title: 'Fund Wallet',
              additionalAmountNeeded: additionalAmountNeeded
                ? additionalAmountNeeded + ''
                : undefined
            })
          }}
          disabled={!additionalAmountNeeded}
        />
      </div>
      <div className="f-row jcc mt-3">
        <TextPrompt
          prompt={
            isInsufficient
              ? "You're low on funds, Let's top up to complete payment"
              : ''
          }
          status={false}
        />
      </div>
    </div>
  )
}

const AcceptTransaction = ({
  paymentMethod
}: {
  paymentMethod: paymentMethodType | null
}) => {
  return (
    <div>
      {paymentMethod === 'card' ? (
        <div className={`${BG} border-line p-2 f-column-10`}>
          <p className="text-little m-0">
            Your payments will be processed internationally. Additional bank
            fees may apply.
          </p>
          <p className="text-little m-0">
            By placing your order, you agree to our Terms of Use, Privacy
            Statement, and that you are over 18.
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default CheckoutPage
