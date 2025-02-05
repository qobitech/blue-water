import { useEffect, useRef, useState } from 'react'
import './style.scss'
import { TypeButton } from '../../../components/utils/button'
import { Reveal } from './utils'
import { useGlobalContext } from '../../../components/layout/context'
import { AccordionPageSection } from '../faq'
import { faqdata } from './data'
import designedforyou from '../../../assets/images/Modern Minimalist Interior with Ocean View.webp'
import { SubReveal } from './sub-reveal'
import Lenis from 'lenis'
import {
  LocationSVG,
  OpportunitySVG,
  PartnerSVG
} from '../../../components/utils/svgs'

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

  const [openAccordion, setOpenAccordion] = useState(0)

  const createFeedback = (title: string) => {
    rsProps?.callSection({
      action: 'create',
      component: 'feedback',
      title,
      max: true
    })
  }

  const keyFeatures = [
    {
      icon: <OpportunitySVG />,
      label: 'A Unique Opportunity',
      value: `With 10,000 square metres of land surrounded by serene waters, the
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

  const faqRef = useRef<HTMLDivElement>(null)

  const handleScrollRightSection = () => {
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
              <h1 className="header-txt-landing">
                Your Gateway to Transformative Waterfront Development
              </h1>
            </div>
            <Reveal className="cta-wrapper container f-row">
              <TypeButton
                title="Explore the property"
                buttonSize="large"
                buttonType="outlined"
                className="border-0"
                buttonShape="square"
                aria-label="Explore the Property - BlueWater Shores"
                onClick={() => createFeedback('Explore the Property')}
              />
              <TypeButton
                title="Read FAQ"
                buttonSize="large"
                buttonType="outlined"
                buttonShape="square"
                className="text-white"
                style={{ background: 'none' }}
                aria-label="Read FAQ - BlueWater Shores"
                onClick={handleScrollRightSection}
              />
            </Reveal>
          </div>
        </div>
      </section>
      <section className="grid-wrapper-30 gap-30 py-5 container">
        {keyFeatures.map((i, index) => (
          <div className="p-5 f-column-17 shadow-sm" key={index}>
            <div className="f-row aic jcc icon-card-container">{i.icon}</div>
            <h4 className="m-0 header-txt-landing">{i.label}</h4>
            <h6 className="m-0" style={{ lineHeight: '1.7rem' }}>
              {i.value}
            </h6>
          </div>
        ))}
      </section>
      <section className="py-5 f-column-33 px-3 mb-5">
        <div className="section-text text-center header-text-content">
          <h2 className="header-txt-landing">Why Choose Us?</h2>
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
                <span className="fancy-underline header-txt-landing">
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
                aria-label="Explore the Property - BlueWater Shores"
                onClick={() => createFeedback('Explore the Property')}
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
      <section className="faq section-text" ref={faqRef}>
        <div className="container f-column-40">
          <div className="container text-center">
            <h2 className="header-txt-landing">
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
              aria-label="Explore the Property - BlueWater Shores"
              onClick={() => createFeedback('Explore the Property')}
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
      </section>
    </div>
  )
}

export default LandingPage
