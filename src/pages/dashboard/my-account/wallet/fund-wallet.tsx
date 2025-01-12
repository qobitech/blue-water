import * as yup from 'yup'
import { IGlobalRightSection } from '../../../../components/layout/right-section/utils'
import { useFormHook } from '../../../../components/utils/hooks'
import {
  BASEURLFE,
  getUserData,
  showAmount
} from '../../../../constants/global'
import { HVC } from '../../../../components/utils/hvc'
import { NoticeComponent } from '../../../../components/utils/reusable'
import { TypeInput } from '../../../../components/utils/input'
import { TypeButton } from '../../../../components/utils/button'

const FundWallet = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <></>

  const { makePayment, rsProps, setPaymentItemType } = globalContext

  if (!makePayment) return <></>

  const MAXAMOUNT = 1000

  const [hookForm] = useFormHook<{ amount: number }>({
    amount: yup
      .number()
      .typeError('input empty')
      .required('amount required')
      .min(1, 'min amount should be $ 1')
      .max(MAXAMOUNT, `max amount should be $ ${MAXAMOUNT.toLocaleString()}`)
  })

  const handleSubmit = (data: { amount: number }) => {
    const { amount } = data
    setPaymentItemType?.('credit-wallet')
    const paymentRequest = {
      amount,
      name: getUserData().user.userName,
      email: getUserData().user.email,
      redirect_url: `${BASEURLFE}/payment-status`,
      title: 'Top-up Wallet',
      itemId: getUserData().user.wallet,
      itemType: 'credit-wallet',
      transactionType: 'credit-wallet',
      paymentMethod: 'card'
    }
    makePayment.mutate({ body: paymentRequest })
    hookForm.setValue('amount', 0)
    rsProps?.callSection({
      action: 'view',
      component: 'post-payment',
      title: 'Payment Status'
    })
  }

  return (
    <div className="py-4 f-column-33">
      <HVC removeDOM view={!!rsProps?.additionalAmountNeeded}>
        <NoticeComponent
          notice={`Additional credit needed - ${showAmount(
            rsProps?.additionalAmountNeeded
          )}`}
        />
        <p className="text-small mt-3">
          {showAmount(rsProps?.additionalAmountNeeded)} ={' '}
          {showAmount(rsProps?.additionalAmountNeeded, true)}
        </p>
      </HVC>
      <form
        onSubmit={hookForm.handleSubmit(handleSubmit)}
        className="f-column-15"
      >
        <TypeInput
          placeholder="Enter amount"
          type="number"
          autoFocus
          {...hookForm.register('amount')}
          error={hookForm.formState.errors.amount?.message}
          step="any"
          customwidth={'100%'}
          label="Amount ($)"
        />
        <TypeInput
          placeholder="Amount"
          customwidth={'100%'}
          type="text"
          onChange={() => {}}
          value={`${showAmount(
            parseInt((hookForm.watch('amount') || 0) + '')?.toLocaleString() ||
              '0',
            true
          )}`}
          isonlyview
          label="Fund wallet with"
        />
        <TypeButton
          buttonShape="curve"
          title="Fund Wallet"
          type="submit"
          load={makePayment.isLoading}
        />
      </form>
    </div>
  )
}

export default FundWallet
