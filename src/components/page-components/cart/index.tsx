import { CartBlockSVG, CartSVG } from '../../utils/svgs'
import {
  BUTTON_PRIMARY,
  transactionItemType,
  transactionType
} from '../../../constants/global'
import { useGlobalContext } from '../../layout/context'

const CartWidget = () => {
  const { globalStateActions, setPaymentInfo } = useGlobalContext()

  if (!globalStateActions) return <>reload page</>

  const { cartProps } = globalStateActions

  if (!cartProps) return <>reload page</>

  const cartItems = cartProps?.data?.data?.carts

  const isCart = !!cartItems?.length

  return (
    <div className="mobile-wrapper">
      <div
        className="all-notification-wrapper desktop-notification"
        onClick={() => {
          setPaymentInfo?.(
            cartItems?.map((cartItem) => ({
              amount: parseFloat(cartItem.amount),
              item: cartItem.item,
              itemType: cartItem.itemType as transactionItemType,
              description: cartItem.description,
              itemId: cartItem.itemId,
              transactionType: cartItem.transactionType as transactionType,
              title: cartItem.title,
              quantity: 1,
              mutateQuantity: false
            })) || [],
            'betcode'
          )
        }}
      >
        {isCart ? <div className="notify-indicator" /> : null}
        <div
          style={{ width: 'max-content', height: 'max-content' }}
          className="cursor-pointer"
        >
          {isCart ? <CartBlockSVG color={BUTTON_PRIMARY} /> : <CartSVG />}
        </div>
      </div>
      <div className="all-notification-wrapper mobile-notification border">
        {isCart ? <div className="notify-indicator" /> : null}
        <div
          style={{ width: 'max-content', height: 'max-content' }}
          className="cursor-pointer"
        >
          {isCart ? <CartBlockSVG color={BUTTON_PRIMARY} /> : <CartSVG />}
        </div>
      </div>
    </div>
  )
}

export default CartWidget
