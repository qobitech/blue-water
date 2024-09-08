import { useState } from 'react'
import TextPrompt from '../../utils/text-prompt'
import { IGlobalRightSection } from '../../layout/right-section'
import { TypeButton } from '../../utils/button'
import { showAmount } from '../../../constants/global'
import { RightAngleSVG, TopAngleSVG } from '../../utils/svgs/f-awesome'
import { AccordionCartItems } from '../../../pages/public/faq'

export interface summaryData {
  id: number
  label: string
  item: string
  itemType: string
  description: string
  amount: string
}

const OrderSummary = ({
  globalContext,
  hideButton
}: IGlobalRightSection & { hideButton?: boolean }) => {
  if (!globalContext) return <></>

  const {
    rsProps,
    paymentDetails,
    orderSummaryProps,
    setPaymentInfo,
    paymentItemType
    // refreshCartItems
  } = globalContext

  if (!paymentItemType) return <></>
  if (!setPaymentInfo) return <></>

  const prstyle = { letterSpacing: '2px' }

  const [openAccordion, setOpenAccordion] = useState<number>(-1)

  const [openSection, setOpenSection] = useState<boolean>(!hideButton)

  const handlePaymentMethodSelection = () => {
    rsProps?.addRightSectionHistory()

    rsProps?.callSection({
      action: 'view',
      component: 'checkout',
      title: 'Checkout'
    })
  }

  // const [cartItemIndex, setCartItemIndex] = useState<number | null>()

  // const removePaymentDetail = (itemIndex: number) => {
  //   const pd = paymentDetails?.filter((_, index) => index !== itemIndex) || []
  //   setPaymentInfo(pd, paymentItemType, true)
  // }

  // const onModifyCartSuccess = () => {
  //   removePaymentDetail(cartItemIndex || 0)
  //   // refreshCartItems?.()
  // }

  // const modifyCartProps = useModifyCartItem(onModifyCartSuccess)

  // const removeCartItem = (cartItem: IPaymentDetails | undefined) => {
  //   modifyCartProps.mutate({
  //     body: {
  //       itemId: cartItem?.itemId
  //     }
  //   })
  // }

  // const onRemove = (index: number) => {
  //   setCartItemIndex(index)
  //   const cartItem = paymentDetails?.[index]
  //   removeCartItem(cartItem)
  // }

  const isPayment = !!paymentDetails?.length

  return (
    <>
      <div className="bg-white p-2 p-lg-3 mt-3 border rounded">
        <div
          onClick={() => setOpenSection(!openSection)}
          className="f-row aic jcsb cursor-pointer"
        >
          <p className="m-0 ff-bold">ORDER SUMMARY</p>
          <p className="m-0">
            {openSection ? <TopAngleSVG /> : <RightAngleSVG />}
          </p>
        </div>
        {openSection ? (
          <div className="mt-3">
            <p className="text-little color-label">
              Check the provided details and make sure its accurate
            </p>
            <div className="py-3">
              {isPayment ? (
                <div>
                  <div className="bg-white accordion-section">
                    {paymentDetails.map((i, index) => (
                      <AccordionCartItems
                        label={i.title}
                        amount={i.amount + ''}
                        itemInfo={
                          <ItemInfo
                            description={i.description}
                            item={i.item}
                            itemType={i.itemType as string}
                          />
                        }
                        id={index}
                        key={index}
                        noborder={
                          index === paymentDetails.length - 1 ? 'true' : 'false'
                        }
                        setOpenAccordion={setOpenAccordion}
                        openAccordion={openAccordion}
                        // onRemove={() => onRemove(index)}
                        // load={
                        //   modifyCartProps.isLoading && index === cartItemIndex
                        // }
                        mutateQuantity={i.mutateQuantity}
                        quantity={i.quantity}
                        onMutateQuantity={(quantity) => {
                          const tempPaymentDetails = paymentDetails || []
                          tempPaymentDetails[index].quantity = quantity
                          setPaymentInfo(tempPaymentDetails, paymentItemType)
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <TextPrompt prompt="Cart is empty" />
                </div>
              )}
            </div>

            {paymentDetails?.length ? (
              <div className="border-top pt-4">
                <div className="w-100 f-row aic jcsb">
                  <p className="text-little">Subtotal</p>
                  <p className="medium text-little" style={prstyle}>
                    {showAmount(orderSummaryProps?.subAmount || '')}
                  </p>
                </div>
                <div className="w-100 f-row aic jcsb">
                  <p className="text-little">Service fee</p>
                  <p className="medium text-little" style={prstyle}>
                    {showAmount(orderSummaryProps?.serviceFee)}
                  </p>
                </div>
                <div className="w-100 f-row aic jcsb">
                  <p className="ff-bold text-small">Total</p>
                  <p className="medium text-small" style={prstyle}>
                    <b>{showAmount(orderSummaryProps?.totalAmount || '')}</b>
                  </p>
                </div>
              </div>
            ) : null}
            {!hideButton ? (
              <div className="pt-5">
                <TypeButton
                  title="Checkout"
                  buttonShape="curve"
                  onClick={isPayment ? handlePaymentMethodSelection : undefined}
                  buttonType={isPayment ? 'bold' : 'disabled'}
                  className="w-100"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      {!openSection ? (
        <div className="w-100 f-row aic jcsb pt-4 px-3">
          <p className="medium text-small">Total</p>
          <p className="medium text-small" style={prstyle}>
            <b>{showAmount(orderSummaryProps?.totalAmount)}</b>
          </p>
        </div>
      ) : null}
    </>
  )
}

const ItemInfo = ({
  item,
  itemType,
  description
}: {
  item: string
  itemType: string
  description: string
}) => {
  return (
    <div className="w-100">
      <ItemInfoItem label="Item" value={item} />
      <ItemInfoItem label="Item type" value={itemType} />
      <ItemInfoItem label="Description" value={description} />
    </div>
  )
}

const ItemInfoItem = ({ label, value }: { label: string; value: string }) => {
  const divclass = 'w-100 f-row ais jcsb'
  const pclass = 'text-tiny color-label'

  return (
    <div className={divclass}>
      <p className={pclass} style={{ width: '150px' }}>
        {label}
      </p>
      <p className="medium text-tiny text-right">{value}</p>
    </div>
  )
}

export default OrderSummary
