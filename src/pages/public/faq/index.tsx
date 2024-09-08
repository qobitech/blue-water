import { useState, FC } from 'react'
import {
  HeaderComponent,
  PageContainer,
  startSubscription
} from '../../../components/utils/reusable'
import DashboardWrapper from '../../../components/layout/dashboard-wrapper'
import { BG, showAmount } from '../../../constants/global'
import { TypeInput } from '../../../components/utils/input'
import { MinusSVG, PlusSVG } from '../../../components/utils/svgs'
import './style.scss'

export const PAGE_SIZE = 10

interface IFAQ {
  ye?: any
}

const FAQPage: FC<IFAQ> = () => {
  const instructiondata = [
    {
      id: 1,
      header: 'How to Subscribe ?',
      answer: 'no content'
    },
    {
      id: 2,
      header: 'How to Register ?',
      answer: 'no content'
    },
    {
      id: 3,
      header: 'How to Get Subscribers ?',
      answer: 'no content'
    },
    {
      id: 4,
      header: 'What is a Bet Stat ?',
      answer: 'no content'
    },
    {
      id: 5,
      header: 'What is a Channel ?',
      answer: 'no content'
    },
    {
      id: 6,
      header: 'What is a Bet Tag ?',
      answer: 'no content'
    }
  ]

  const [openAccordion, setOpenAccordion] = useState(0)

  return (
    <>
      <div className={`PageWrapper ${BG}`}>
        <PageContainer>
          <div className="py-3" />
          <DashboardWrapper>
            <HeaderComponent title="FAQ">
              <div className="ResponsiveDivLeft py-2">
                <p className="m-0 text-small">Need answers, find them here</p>
              </div>
            </HeaderComponent>
            <div className="py-2" />
            <div className="bg-white accordion-section">
              {instructiondata.map((i, index) => (
                <AccordionPageSection
                  answer={i.answer}
                  header={i.header}
                  id={i.id}
                  key={i.id}
                  index={index + 1}
                  noborder={
                    index === instructiondata.length - 1 ? 'true' : 'false'
                  }
                  setOpenAccordion={setOpenAccordion}
                  openAccordion={openAccordion}
                />
              ))}
            </div>
            <div className="py-3" />
            <div className="ResponsiveDivLeft pt-3 pb-1">
              <p className="text-little m-0 color-light">
                Couldn&apos;t find what you&apos;re looking for?
              </p>
            </div>
            <div className="ResponsiveDivLeft">
              <p>
                Write to us at{' '}
                <span className="color-brand">contact@mytipster.pro</span>
              </p>
            </div>
          </DashboardWrapper>
        </PageContainer>
      </div>
    </>
  )
}

export default FAQPage

export const AccordionPageSection = ({
  id,
  header,
  answer,
  noborder,
  openAccordion,
  setOpenAccordion,
  index
}: {
  id: number
  header: string
  answer: string
  noborder: 'true' | 'false'
  setOpenAccordion: React.Dispatch<React.SetStateAction<number>>
  openAccordion: number
  index: number
}) => {
  const isId = openAccordion === id
  return (
    <div className={`accordion-row ${noborder === 'true' ? 'no-border' : ''}`}>
      <div
        className="accordion-row-header"
        onClick={() => setOpenAccordion(isId ? 0 : id)}
      >
        <div className="f-row aic">
          <h1 className="accordion-header-text">{header}</h1>
        </div>
        {isId ? <MinusSVG /> : <PlusSVG />}
      </div>
      {isId && (
        <div className="accordion-row-body">
          <p className="m-0 ff-regular" style={{ fontSize: '14px' }}>
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

export const AccordionCartItems = ({
  id,
  label,
  amount,
  itemInfo,
  noborder,
  openAccordion,
  setOpenAccordion,
  onMutateQuantity,
  mutateQuantity,
  quantity
}: // onRemove,
// load
{
  id: number
  label: string
  amount: string
  itemInfo: JSX.Element
  noborder: 'true' | 'false'
  setOpenAccordion: React.Dispatch<React.SetStateAction<number>>
  openAccordion: number
  onMutateQuantity: (quantity: number) => void
  mutateQuantity: boolean
  quantity: number
}) => {
  const isId = openAccordion === id

  return (
    <div className={`accordion-row no-border`} style={{ padding: '2px' }}>
      <div className="cursor-default accordion-row-header">
        <div className="f-row aic">
          <div
            onClick={() => setOpenAccordion(isId ? -1 : id)}
            className="accordion-header-text f-row-10 aic"
          >
            {isId ? <MinusSVG color="#777777" /> : <PlusSVG />}
            {label}
          </div>
        </div>
        <div className="text-right f-row-15 aic jce" style={{ flex: 1 }}>
          <div className="accordion-header-text">{showAmount(amount)}</div>
        </div>
      </div>
      {isId ? <div className="accordion-row-body">{itemInfo}</div> : null}
      {mutateQuantity ? (
        <Renewal onMutateQuantity={onMutateQuantity} quantity={quantity} />
      ) : null}
    </div>
  )
}

const Renewal = ({
  onMutateQuantity,
  quantity
}: {
  onMutateQuantity: (quantity: number) => void
  quantity: number
}) => {
  const [inputValue, setInputValue] = useState<number>(quantity || 1)

  const increaseMonths = () => {
    const value = Math.min(12, inputValue + 1)
    setInputValue(value)
    onMutateQuantity(value)
  }
  const decreaseMonths = () => {
    const value = Math.max(1, inputValue - 1)
    setInputValue(Math.max(1, inputValue - 1))
    onMutateQuantity(value)
  }

  const sub = startSubscription(inputValue)

  return (
    <>
      <div className="f-row aic jcsb w-100 pt-3">
        <div className="f-row">
          <div style={{ width: '32px' }} />
          <p className="text-small">Number of months</p>
        </div>
        <div className="f-row-20 jce aic">
          <div
            style={{ width: 'max-content', height: 'auto' }}
            className="cursor-pointer"
            onClick={decreaseMonths}
          >
            <MinusSVG />
          </div>
          <TypeInput
            type="number"
            className="text-center pr-2"
            style={{ height: '35px', width: '60px' }}
            value={inputValue}
            autoFocus
            disabled
          />
          <div
            style={{ width: 'max-content', height: 'auto' }}
            className="cursor-pointer"
            onClick={increaseMonths}
          >
            <PlusSVG />
          </div>
        </div>
      </div>
      <div className="w-100 pt-4 text-right">
        <p className="text-little color-label">
          Expires on{' '}
          <span className="medium">{sub.endDate.toDateString()}</span>
        </p>
      </div>
    </>
  )
}
