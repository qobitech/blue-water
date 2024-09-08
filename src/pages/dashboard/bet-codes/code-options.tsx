import { useState } from 'react'
import { TRANSACTIONTYPEENUM, showAmount } from '../../../constants/global'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import { TypeButton } from '../../../components/utils/button'
import { getTimeline } from '../../../components/utils/helper'
import { isPastTime } from '../../../components/table/utils'

const GetCodeOptionComponent = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <></>

  const { prediction, rsProps } = globalContext

  if (!rsProps) return <></>
  if (!prediction) return <></>

  const isPast = isPastTime(prediction.startDate)

  const [isPromptedPast, setIsPromptedPast] = useState<boolean | null>(null)

  if (isPast && isPromptedPast === null)
    return (
      <PromptIsPast
        onDecision={(decision) => {
          if (decision) {
            setIsPromptedPast(decision)
          } else {
            setIsPromptedPast(null)
            rsProps?.closeSection()
          }
        }}
      />
    )

  return <PayForCodeComponent globalContext={globalContext} />
}

const PromptIsPast = ({
  onDecision
}: {
  onDecision: (decision: boolean) => void
}) => {
  return (
    <div className="text-center pt-4 border-label roundede p-4">
      <p className="mb-4">Bet code event has already started</p>
      <p className="medium">
        New regulations stipulate that customers are prohibited from purchasing
        events that have already started.
      </p>
      <div className="f-row jcc pt-4">
        {/* <TypeButton
          title="Yes"
          buttonShape="curve"
          onClick={() => onDecision(true)}
        /> */}
        <TypeButton
          title="Close"
          buttonShape="curve"
          buttonType="danger"
          onClick={() => onDecision(false)}
        />
      </div>
    </div>
  )
}

const PayForCodeComponent = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <></>

  const { prediction, setPaymentInfo, rsProps } = globalContext

  const channel = prediction?.channel

  const infoProps = [
    { label: 'Code', value: prediction?.code },
    { label: 'Odds', value: prediction?.odds },
    { label: 'Bookie', value: prediction?.bookie },
    {
      label: 'Timeline',
      value: getTimeline(prediction?.startDate || '', prediction?.endDate || '')
    },
    { label: 'Amount', value: showAmount(channel?.perPredictionCost) }
  ]

  const amount = prediction?.channel?.perPredictionCost || 0

  return (
    <div className="f-column-30 pb-4 pt-2 text-center">
      <OptionItem
        text={`Get bet code now`}
        description={`Don't miss out on potential victory!`}
      >
        <div className="f-column-25">
          {infoProps.map((info, index) => (
            <InfoComponent label={info.label} value={info.value} key={index} />
          ))}
          <TypeButton
            title="Make Payment"
            onClick={() => {
              rsProps?.addRightSectionHistory()
              setPaymentInfo?.(
                [
                  {
                    amount,
                    description: `Pay for bet code (${prediction?.odds} odds)`,
                    item: `code`,
                    itemType: 'betcode',
                    itemId: prediction?._id || '',
                    transactionType: TRANSACTIONTYPEENUM.PURCHASE,
                    title: `Bet code (${prediction?.odds} odds)`,
                    quantity: 1,
                    mutateQuantity: false
                  }
                ],
                'betcode'
              )
            }}
          />
        </div>
      </OptionItem>
      <p className="text-small text-decoration-underline mt-3 color-brand">
        Terms & conditions apply
      </p>
    </div>
  )
}

export default GetCodeOptionComponent

const OptionItem = ({
  text,
  description,
  children
}: {
  text: string
  description?: string
  children?: any
}) => {
  return (
    <div className="text-center f-row-10 cursor-pointer aic jcc flex-column w-100 rounded py-4 px-3 border">
      <h5 className="color-brand">
        <b>{text}</b>
      </h5>
      {description ? <p className="">{description}</p> : null}
      {children}
    </div>
  )
}

const InfoComponent = ({
  label,
  value
}: {
  label?: string
  value?: string | number | undefined
}) => {
  const isCode = label?.toLowerCase() === 'code'
  return (
    <div className="f-row-30 aic jcs text-left py-2">
      <p style={{ width: '100px' }} className="m-0 text-little">
        {label}
      </p>
      <p
        className="m-0 text-little"
        style={{ filter: isCode ? `blur(8px)` : '' }}
      >
        <b>{value}</b>
      </p>
    </div>
  )
}
