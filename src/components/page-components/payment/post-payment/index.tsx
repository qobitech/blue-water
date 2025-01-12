import { useEffect } from 'react'
import { IGlobalRightSection } from '../../../layout/right-section/utils'
import {
  Failed,
  NextSteps,
  Successful,
  getInstructions,
  getTitle
} from './components'
import { HVC, HVCLoad } from '../../../utils/hvc'

const PostPayment = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <></>

  const {
    rsProps,
    paymentConfirmationProps,
    makePayment,
    paymentItemType,
    paymentDetails
  } = globalContext

  const transaction = paymentConfirmationProps?.data?.data.transaction
  const loading = paymentConfirmationProps?.isLoading || makePayment?.isLoading
  const isCreditWalletTransaction = paymentItemType === 'credit-wallet'
  const success = isCreditWalletTransaction
    ? transaction?.status === 'successful'
    : makePayment?.response?.status === 'success'

  useEffect(() => {
    if (success && rsProps?.isSectionHistory) {
      rsProps?.onRefresh?.()
      if (paymentItemType === 'betcode') {
        rsProps.clearRightSectionHistory()
      } else {
        rsProps.removeItemRightSectionHistory('fund-wallet')
      }
    }
  }, [success])

  const paymentDetail = paymentDetails?.[0]

  const instructions = getInstructions(paymentItemType, paymentDetail, rsProps)
  const title = getTitle(paymentItemType)

  return (
    <div className="p-5 border-label rounded">
      <HVCLoad
        removeDOM
        view={success}
        load={loading}
        loadTxt="Payment processing..."
        className="f-column-20 aic jcc w-100 h-100"
      >
        <Successful
          response={`Transaction completed`}
          title={title}
          paymentItemType={paymentItemType}
        >
          <NextSteps rsProps={rsProps} instructions={instructions} />
        </Successful>
      </HVCLoad>
      <HVC removeDOM view={!success && !loading}>
        <Failed rsProps={rsProps} />
      </HVC>
    </div>
  )
}

export default PostPayment
