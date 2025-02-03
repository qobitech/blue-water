import { useEffect, useRef, useState } from 'react'
import './style.scss'
import { TypeButton } from '../../../components/utils/button'
import { Reveal } from './utils'
import { useGlobalContext } from '../../../components/layout/context'
import { AccordionPageSection } from '../faq'
import { faqdata } from './data'
import designedforyou from '../../../assets/images/Modern Minimalist Interior with Ocean View.jpeg'
import { SubReveal } from './sub-reveal'
import Lenis from 'lenis'
import {
  LocationSVG,
  OpportunitySVG,
  PartnerSVG
} from '../../../components/utils/svgs'
import { LogoSVG } from '../../../components/utils/svgs/f-awesome'
import { BRANDCOLOR } from '../../../constants/global'

const LandingPage = () => {
  const { rsProps } = useGlobalContext()

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      anchors: true,
      prevent: (node) =>
        ['right-section', 'modal-body', 'modal-body-new'].includes(node.id)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf) // Keep the scroll smooth
    }

    const frameId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy() // Clean up Lenis instance
      cancelAnimationFrame(frameId) // Cancel the animation frame to avoid memory leaks
    }
  }, [])

  const faqRef = useRef(null)

  const [openAccordion, setOpenAccordion] = useState(0)

  const createFeedback = () => {
    rsProps?.callSection({
      action: 'create',
      component: 'feedback',
      title: 'Create Feedback Link',
      max: true
    })
  }

  const keyFeatures = [
    {
      icon: <OpportunitySVG />,
      label: 'A Unique Opportunity',
      value: `With 3 hectares of land surrounded by serene waters, the
            possibilities for resorts, luxury housing, or eco-friendly
            development are endless.`
    },
    {
      icon: <LocationSVG />,
      label: 'Strategic Location',
      value: `Easily accessible and ideal for premium projects that merge beauty
            with practicality.`
    },
    {
      icon: <PartnerSVG />,
      label: 'Flexible Partnership',
      value: `We are seeking visionary developers to help bring this land’s
            potential to life.`
    }
  ]

  return (
    <div className="landing-page-wrapper bg-white">
      <section className="video-background">
        <div className="content container">
          <div className="f-column-43 text-center">
            <div className="content-text text-left px-4 f-column-33">
              <div className="f-row-17 aic">
                <p className="m-0">
                  Discover Prime Waterfront property for Visionary developers
                </p>
              </div>
              <h1>
                <span style={{ color: BRANDCOLOR, fontFamily: 'Didot' }}>
                  Your Gateway to Transformative Waterfront Development
                </span>
              </h1>
            </div>
            <Reveal className="cta-wrapper container f-row">
              <TypeButton
                title="Explore the property"
                buttonSize="large"
                buttonType="outlined"
                buttonShape="square"
                aria-label="Proceed to Sign up oor Sign in"
                onClick={createFeedback}
              />
              <TypeButton
                title="Partner with Us"
                buttonSize="large"
                buttonType="outlined"
                buttonShape="square"
                className="text-white"
                style={{ background: 'none' }}
                aria-label="Proceed to Sign up oor Sign in"
                onClick={createFeedback}
              />
            </Reveal>
          </div>
        </div>
      </section>
      <section className="grid-wrapper-30 gap-30 py-5 container">
        {keyFeatures.map((i, index) => (
          <div className="p-5 f-column-15 shadow-sm" key={index}>
            <div
              className="f-row aic jcc border-label"
              style={{
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                minWidth: '50px',
                minHeight: '50px'
              }}
            >
              {i.icon}
            </div>
            <h4
              className="m-0"
              style={{ color: BRANDCOLOR, fontFamily: 'Didot' }}
            >
              <b>{i.label}</b>
            </h4>
            <h6 className="m-0" style={{ lineHeight: '1.7rem' }}>
              {i.value}
            </h6>
          </div>
        ))}
      </section>
      <section className="py-5 f-column-33 px-3 mb-5">
        <div className="section-text text-center header-text-content">
          <div className="text-center">
            <LogoSVG />
          </div>
          <h2 style={{ color: BRANDCOLOR, fontFamily: 'Didot' }}>
            Why Choose Us?
          </h2>
        </div>
        <SubReveal
          className="container grid-wrapper-40 gap-33 mt-3 rounded-25"
          hidden={{ opacity: 0, x: '-50%' }}
          visible={{ opacity: 1, x: 0 }}
        >
          <img
            src={designedforyou}
            alt="Designed for you"
            style={{ width: '100%', borderRadius: '20px' }}
          />
          <div className="f-column-55 jcc">
            <div className="f-column-23 designed-for-you">
              <h2 className="m-0">
                <span
                  className="fancy-underline"
                  style={{ color: BRANDCOLOR, fontFamily: 'Didot' }}
                >
                  BlueWater Shores
                </span>{' '}
                is your trusted partner in sustainable and innovative land
                development with clear, transparent processes and support from
                start to finish
              </h2>
              <p className="m-0" style={{ lineHeight: '1.69rem' }}>
                Take the first step toward transforming this unique property.
                Let’s build something extraordinary together
              </p>
            </div>
            <Reveal className="cta-wrapper container p-0">
              <TypeButton
                buttonSize="large"
                buttonType="bold"
                buttonShape="square"
                title="Explore the property"
                aria-label="Collect Audio Feedback"
                onClick={createFeedback}
              />
              <TypeButton
                buttonSize="large"
                buttonType="outlined"
                buttonShape="square"
                title="Partner with Us"
                aria-label="Collect Audio Feedback"
                onClick={createFeedback}
              />
            </Reveal>
          </div>
        </SubReveal>
      </section>
      <section className="faq section-text" ref={faqRef}>
        <div className="container f-column-40">
          <div className="container text-center">
            <div className="text-center">
              <LogoSVG />
            </div>
            <h2 style={{ color: BRANDCOLOR, fontFamily: 'Didot' }}>
              Frequently asked <br />
              questions
            </h2>
          </div>
          <div className="content border-0">
            <div className="AccordionSection bg-white">
              {faqdata.map((i, index) => (
                <AccordionPageSection
                  answer={i.answer}
                  header={i.header}
                  id={i.id}
                  key={i.id}
                  index={index + 1}
                  noborder={index === faqdata.length - 1 ? 'true' : 'false'}
                  setOpenAccordion={setOpenAccordion}
                  openAccordion={openAccordion}
                />
              ))}
            </div>
          </div>
          <Reveal className="cta-wrapper container p-0 jcc">
            <TypeButton
              buttonSize="large"
              buttonType="bold"
              buttonShape="square"
              title="Explore the property"
              aria-label="Collect Audio Feedback"
              onClick={createFeedback}
            />
            <TypeButton
              buttonSize="large"
              buttonType="outlined"
              buttonShape="square"
              title="Partner with Us"
              aria-label="Collect Audio Feedback"
              onClick={createFeedback}
            />
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
