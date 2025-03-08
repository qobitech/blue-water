import { FC } from 'react'
import { TypeButton } from '../../../components/utils/button'
import { Reveal } from './reveal'
import { IInvestmentOpportunity } from './utils'

export const InvestmentOpportunity: FC<IInvestmentOpportunity> = ({
  faqRef,
  createFeedback
}) => {
  return (
    <section className="f-column-33 px-3 py-5 opportunity" ref={faqRef}>
      <div className="section-text text-center header-text-content pt-4">
        {/* <NoticeSVG color="black" /> */}
        <h2 className="header-txt-landing m-0 mt-3">
          New Investment Opportunity
        </h2>
      </div>
      <div className="text-center container">
        <p
          className="mx-auto font-18"
          style={{ maxWidth: '600px', lineHeight: '2.75rem' }}
        >
          10,000 square metres of prime property, surrounded by breathtaking
          water views, making it perfect for investors looking to maximize
          returns while creating a legacy
        </p>
      </div>
      <Reveal className="cta-wrapper container p-0 jcc pb-5">
        <TypeButton
          buttonSize="large"
          buttonType="bold"
          buttonShape="square"
          title="Explore The Property"
          aria-label="Explore The Property - BlueWater Shores"
          onClick={() => createFeedback('Explore The Property')}
        />
        <TypeButton
          buttonSize="large"
          buttonType="outlined"
          buttonShape="square"
          className="border-0"
          title="Partner with Us"
          aria-label="Partner with Us - BlueWater Shores"
          onClick={() => createFeedback('Partner with Us')}
        />
      </Reveal>
    </section>
  )
}
