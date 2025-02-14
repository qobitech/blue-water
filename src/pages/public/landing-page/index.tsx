import { useEffect, useRef, useState } from 'react'
import './style.scss'
import { TypeButton } from '../../../components/utils/button'
import { Reveal } from './utils'
import { useGlobalContext } from '../../../components/layout/context'
import { AccordionPageSection } from '../faq'
import { faqdata } from './data'
import designedforyou from '../../../assets/images/pexels-zachtheshoota-1838640 2.webp'
import opportunity from '../../../assets/images/pexels-jess-vide-4602249 2.webp'
import { SubReveal } from './sub-reveal'
import Lenis from 'lenis'
import {
  DevelopmentSVG,
  OpportunitySVG,
  ConsultingSVG,
  NoticeSVG
} from '../../../components/utils/svgs'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'

const LandingPage = () => {
  const navigate = useNavigate()
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

  const faqRef = useRef<HTMLDivElement>(null)

  const handleScrollRightSection = () => {
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="landing-page-wrapper bg-white f-column gap-65">
      <section className="video-background">
        <div className="content container">
          <div className="f-column-43 text-center">
            <div className="content-text text-left px-4 f-column-33">
              <div className="f-row-17 aic">
                <p className="m-0">
                  Discover Opportunities with{' '}
                  <b className="header-txt-color">Bluewater Shores Realty</b>
                </p>
              </div>
              <h1 className="header-txt-landing">
                Your Trusted Partner in Real Estate Investment
              </h1>
            </div>
            <Reveal className="cta-wrapper container f-row">
              <TypeButton
                title="Partner With Us"
                buttonSize="large"
                buttonType="outlined"
                className="border-0"
                buttonShape="square"
                aria-label="Explore the Property - BlueWater Shores"
                onClick={() => createFeedback('Explore the Property')}
              />
              <TypeButton
                title="Investment Opportunity"
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
      <section className="mt-5 py-5 f-column-33 px-3 mb-5">
        <div className="section-text text-center header-text-content">
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
              maxHeight: '500px',
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
                is your trusted partner in sustainable and innovative real
                estate investment with clear, transparent processes and support
                from start to finish
              </h3>
              <p className="m-0" style={{ lineHeight: '1.69rem' }}>
                Take the first step. Let’s build something extraordinary
                together
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

      <section
        className="f-column-33 px-3 py-5"
        style={{ background: '#BCE8F4' }}
        ref={faqRef}
      >
        <div className="section-text text-center header-text-content pt-5">
          <NoticeSVG color="black" />
          <h2 className="header-txt-landing m-0 mt-3">
            New Investment Opportunity
          </h2>
        </div>
        <div className="text-center container">
          <p className="font-16 m-0">
            Discover 10,000 Square Metres of Potential
          </p>
        </div>
        <div>
          <img
            src={opportunity}
            alt=""
            style={{ height: '350px', objectFit: 'cover' }}
            className="w-100 rounded"
          />
        </div>
        <div className="text-center container pt-3">
          <p
            className="mx-auto font-23"
            style={{ maxWidth: '600px', lineHeight: '2.75rem' }}
          >
            Imagine owning 10,000 square metres of prime property, surrounded by
            breathtaking water views in a strategic location, making it perfect
            for investors looking to maximize returns while creating a legacy.
          </p>
        </div>
        <Reveal className="cta-wrapper container p-0 jcc pt-3 pb-5">
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

      <section className="f-column-33 px-3">
        <div className="section-text text-center header-text-content pt-5">
          <h2 className="header-txt-landing">Services We Offer</h2>
        </div>
        <div className="grid-wrapper-30 gap-21 container">
          {keyFeatures.map((i, index) => (
            <div className="p-5 f-column-23" key={index}>
              <div className="f-row aic jcc icon-card-container">{i.icon}</div>
              <h4 className="m-0 header-txt-landing">{i.label}</h4>
              <h6
                className="m-0 font-14"
                style={{ lineHeight: '1.7rem', color: '#2f2f2f' }}
              >
                {i.value}
              </h6>
            </div>
          ))}
        </div>
      </section>
      <section className="faq section-text">
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
              onClick={() => createFeedback('Partner with Us')}
            />
          </Reveal>
        </div>
      </section>
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
            className="text-white mx-auto my-0 font-17"
            style={{ maxWidth: '600px', lineHeight: '2.5rem' }}
          >
            Find the perfect property or partner with us to shape the future of
            real estate development. Contact Us Today to take the first step
            toward securing your future with Bluewater Shores Realty. Together,
            we’ll turn opportunities into success.
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
    </div>
  )
}

export default LandingPage
