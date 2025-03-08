import { FC } from 'react'
import { TypeButton } from '../../../components/utils/button'
import { Reveal } from './reveal'
import { IConclusion } from './utils'

export const Conclucision: FC<IConclusion> = ({ createFeedback }) => {
  return (
    <section
      className="section-text py-5 f-column-33 aic"
      style={{ background: '#0f4485' }}
    >
      <div className="section-text text-center header-text-content pt-5">
        <h2 className="header-txt-landing text-white">
          Ready to Explore the Possibilities?
        </h2>
      </div>
      <div className="text-center mb-4 container">
        <h4
          className="text-white mx-auto my-0 font-18"
          style={{ maxWidth: '600px', lineHeight: '2.5rem' }}
        >
          Find the perfect property or partner with us to shape the future of
          real estate development. Contact Us Today to take the first step
          toward securing your future with Bluewater Shores Realty. Together,
          we&apos;ll turn opportunities into success.
        </h4>
      </div>
      <Reveal className="cta-wrapper jcc container pb-5">
        <TypeButton
          buttonSize="large"
          buttonType="outlined"
          buttonShape="square"
          title="Contact Us"
          aria-label="Contact Us - BlueWater Shores"
          onClick={() => createFeedback('Contact Us')}
        />
        <TypeButton
          buttonSize="large"
          buttonType="outlined"
          buttonShape="square"
          title="Partner with Us"
          aria-label="Partner with Us - BlueWater Shores"
          style={{ background: 'none' }}
          className="text-white"
          onClick={() => createFeedback('Partner with Us')}
        />
      </Reveal>
    </section>
  )
}
