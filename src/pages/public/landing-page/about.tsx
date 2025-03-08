import { useNavigate } from 'react-router-dom'
import { TypeButton } from '../../../components/utils/button'
import { pageurl } from '../../../constants/pageurl'
import { Reveal } from './reveal'
import { SubReveal } from './sub-reveal'
import designedforyou from '../../../assets/images/pexels-zachtheshoota-1838640+2_batcheditor_fotor.webp'
import { FC } from 'react'
import { IAbout } from './utils'

export const About: FC<IAbout> = ({ createFeedback }) => {
  const navigate = useNavigate()
  return (
    <section className="py-5 f-column-33 px-3 mb-5">
      <div className="section-text text-center header-text-content mt-5">
        <h2 className="header-txt-landing">Why Choose Us?</h2>
      </div>
      <SubReveal
        className="container grid-wrapper-40 gap-53 mt-3 rounded-25"
        hidden={{ opacity: 0, x: '-50%' }}
        visible={{ opacity: 1, x: 0 }}
      >
        <img
          src={designedforyou}
          alt="Designed for you"
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '20px'
          }}
          className=""
        />
        <div className="f-column-65 jcc">
          <div className="f-column-27 designed-for-you">
            <h3 className="m-0">
              <span className="fancy-underline header-txt-landing">
                BlueWater Shores Realty
              </span>{' '}
              is your trusted partner in sustainable and innovative real estate
              investment with clear, transparent processes and support from
              start to finish
            </h3>
            <p className="m-0 font-18" style={{ lineHeight: '1.69rem' }}>
              Take the first step. Let’s build something extraordinary together
            </p>
          </div>
          <Reveal className="cta-wrapper container p-0">
            <TypeButton
              buttonSize="large"
              buttonType="bold"
              buttonShape="square"
              title="About Us"
              aria-label="About Us - BlueWater Shores"
              onClick={() => navigate(pageurl.ABOUT)}
            />
            <TypeButton
              buttonSize="large"
              buttonType="outlined"
              buttonShape="square"
              title="Partner with Us"
              aria-label="Partner with Us - BlueWater Shores"
              onClick={() => createFeedback('Partner with Us')}
            />
          </Reveal>
        </div>
      </SubReveal>
    </section>
  )
}
