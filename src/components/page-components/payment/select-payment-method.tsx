import { LABEL_COLOR } from '../../../constants/global'
import { RightAngleSVG } from '../../utils/svgs/f-awesome'

import { IGlobalRightSection } from '../../layout/right-section'

const SelectPaymentMethod = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <></>

  const { rsProps, paymentItemType } = globalContext
  return (
    <div className="f-column-30 aic jcc w-100 py-2">
      <SelectPaymentMethodItem
        title="CREDIT / DEBIT / ATM CARDS"
        description="make payment with credit card"
        handleClick={() => {
          rsProps?.addRightSectionHistory()
          rsProps?.callSection({
            action: 'view',
            component: 'select-card-payment-method',
            title: 'CHECKOUT'
          })
        }}
      />
      {paymentItemType !== 'credit-wallet' ? (
        <SelectPaymentMethodItem
          title="WALLET"
          description="make payment with your wallet"
          handleClick={() => {
            rsProps?.addRightSectionHistory()
            rsProps?.callSection({
              action: 'view',
              component: 'select-wallet-payment-method',
              title: 'CHECKOUT'
            })
          }}
        />
      ) : null}
    </div>
  )
}

export default SelectPaymentMethod

const SelectPaymentMethodItem = ({
  title,
  description,
  handleClick
}: {
  title: string
  description: string
  handleClick?: () => void
}) => {
  return (
    <div
      className="f-row aistretch border rounded w-100 py-5 cursor-pointer"
      onClick={handleClick}
    >
      <div style={{ width: '100px' }} className="f-row aic jcc">
        <RightAngleSVG />
      </div>
      <div>
        <p>{title}</p>
        <p className="text-small m-0" style={{ color: LABEL_COLOR }}>
          {description}
        </p>
      </div>
    </div>
  )
}
