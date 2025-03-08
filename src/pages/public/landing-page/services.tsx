import { FC } from 'react'
import { TypeButton } from '../../../components/utils/button'
import {
  ConsultingSVG,
  DevelopmentSVG,
  OpportunitySVG
} from '../../../components/utils/svgs'
import { Reveal } from './reveal'
import { IServices } from './utils'

export const Services: FC<IServices> = ({ createFeedback }) => {
  const keyFeatures = [
    {
      icon: <OpportunitySVG />,
      label: 'Property Investing',
      value: `At Bluewater Shores Realty, we help you grow your wealth by finding the perfect land to invest in. We guide you every step of the way to make smart, profitable decisions.`
    },
    {
      icon: <ConsultingSVG />,
      label: 'Property Consulting',
      value: `Need expert advice on buying, selling, or developing land? Our team provides honest, straightforward guidance to help you navigate the real estate market with confidence.`
    },
    {
      icon: <DevelopmentSVG />,
      label: 'Property Development',
      value: `We turn land into possibilities. From planning to partnerships, we help bring your ideas to life and make sure the development process is smooth and rewarding.`
    }
  ]

  return (
    <section className="f-column-13 px-3 py-5 services">
      <div className="section-text text-center header-text-content pt-5">
        <h2 className="header-txt-landing">Services We Offer</h2>
      </div>
      <div className="grid-wrapper-30 gap-16 container">
        {keyFeatures.map((i, index) => (
          <div className="p-5 f-column-23 service-item" key={index}>
            <div className="f-row aic jcc icon-card-container">{i.icon}</div>
            <h4 className="m-0 header-txt-landing">{i.label}</h4>
            <h6
              className="m-0 font-18"
              style={{ lineHeight: '2rem', color: '#2f2f2f' }}
            >
              {i.value}
            </h6>
          </div>
        ))}
      </div>
      <Reveal className="cta-wrapper container p-0 jcc pt-3 pb-5">
        <TypeButton
          buttonSize="large"
          buttonType="bold"
          buttonShape="square"
          title="Contact Us"
          aria-label="Explore The Property - BlueWater Shores"
          onClick={() => createFeedback('Explore The Property')}
        />
        <TypeButton
          buttonSize="large"
          buttonType="outlined"
          buttonShape="square"
          title="Partner with Us"
          className="border-0"
          aria-label="Partner with Us - BlueWater Shores"
          onClick={() => createFeedback('Partner with Us')}
        />
      </Reveal>
    </section>
  )
}
