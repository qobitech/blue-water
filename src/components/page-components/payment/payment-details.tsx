import { useState } from 'react'
import { BG, showAmount, getUserData } from '../../../constants/global'
import { TypeButton } from '../../utils/button'
import { TypeInput } from '../../utils/input'
import { defaultGETDataTemplate, useAPIGET } from '../../../api'
import { IBillingResponse } from '../../../interface/IBilling'
import SummaryOrder from './order-summary'
import { TypeCheckbox } from '../../utils/checkbox'
import TextPrompt from '../../utils/text-prompt'
import { IGlobalRightSection } from '../../layout/right-section'
import { RightAngleSVG, TopAngleSVG } from '../../utils/svgs/f-awesome'

const CardPaymentDetails = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <></>

  const { mutate, isLoading: getBillingInfoLoading } =
    useAPIGET<IBillingResponse>({
      route: 'billing',
      defaultData: {
        ...defaultGETDataTemplate,
        data: {
          billings: []
        }
      },
      onSuccess: (data) => {
        // if (data.data.billings.length) {
        // }
      }
    })

  const [openSection, setOpenSection] = useState<boolean>(true)

  return (
    <div className="f-column-15">
      <SummaryOrder globalContext={globalContext} hideButton />
      <div className="p-3 border rounded bg-white">
        <form onSubmit={(e) => e.preventDefault()}>
          <div
            className="f-row aic jcsb cursor-pointer"
            onClick={() => setOpenSection(!openSection)}
          >
            <p className="m-0">
              <b>BILLING DETAILS</b>
            </p>
            <p className="m-0">
              {openSection ? <TopAngleSVG /> : <RightAngleSVG />}
            </p>
          </div>
          {openSection ? (
            <div className="f-column-15">
              <div className="grid-wrapper-45 gap-20 mt-4">
                <TypeInput
                  label="Full Name"
                  customwidth={'100%'}
                  placeholder="Enter full name"
                />
                <TypeInput
                  label="Email"
                  customwidth={'100%'}
                  placeholder="Enter email address"
                />
              </div>
              <TypeInput
                label="Billing Address"
                customwidth={'100%'}
                placeholder="Enter Billing address"
                autoFocus
              />
              <div className="f-row-20 aic">
                <TypeButton
                  title="Save Billing Information"
                  buttonSize="small"
                  buttonShape="curve"
                  buttonType="outlined"
                  // onClick={handleSaveBillingsData}
                  // load={isLoading}
                />
                <TypeButton
                  title="Use Saved Billing Information"
                  buttonSize="small"
                  buttonShape="curve"
                  buttonType="outlined"
                  onClick={() =>
                    mutate({ query: `?userId=${getUserData().user._id}` })
                  }
                  load={getBillingInfoLoading}
                />
              </div>
            </div>
          ) : null}
        </form>
      </div>
      <AcceptTransaction itemType="" totalAmount="200" />
      <TypeButton title="Make Payment" />
    </div>
  )
}

export const AcceptTransaction = ({
  itemType,
  totalAmount
}: {
  itemType: string
  totalAmount: string
}) => {
  return (
    <div>
      <div className={`${BG} border-line p-2`}>
        <p className="text-little">
          Your payments will be processed internationally. Additional bank fees
          may apply.
        </p>
        <p className="text-little">
          By checking the checkbox below, you agree to our Terms of Use, Privacy
          Statement, and that you are over 18.
        </p>
        {itemType === 'channel' ? (
          <p className="text-little">
            MyTipster.pro will automatically continue your membership and charge
            the membership fee (currently
            {showAmount(totalAmount)}
            /month) to your payment method until you cancel.
          </p>
        ) : null}
        {itemType === 'betcode' ? (
          <p className="text-little">
            MyTipster.pro will charge a one-time fee (currently
            {showAmount(totalAmount)}) to your payment method until you cancel.
          </p>
        ) : null}
        <p className="text-little">
          {'You may cancel at any time ' +
            (itemType === 'channel' ? 'to avoid future charges' : '')}
          .
        </p>
      </div>
      <div
        className="f-row-15 aic pt-2"
        style={{ width: 'max-content', cursor: 'pointer' }}
      >
        <TypeCheckbox
          className="mr-2"
          error={''}
          // {...makePaymentHookForm.register('iAccept')}
        />
        <p className="m-0 text-small">I accept</p>
      </div>
      <TextPrompt
        prompt=""
        // prompt={makePaymentHookForm.formState.errors.iAccept?.message || ''}
        status={false}
      />
    </div>
  )
}

export default CardPaymentDetails
