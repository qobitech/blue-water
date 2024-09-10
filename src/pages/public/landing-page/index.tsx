import { FC, useEffect, useRef, useState } from 'react'
import './style.scss'
import { TypeButton } from '../../../components/utils/button'

// framer motion
import { motion, useAnimation, useInView } from 'framer-motion'

// lottie
import Lottie from 'react-lottie'
import wave from '../../../assets/animation/audio.json'
// import stadium from '../../../assets/animation/stadium.json'

// tab hook
import { TabSection, useTabSection } from '../../../components/utils/reusable'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'
import Testimonials from './testimonial'
// import { CheckSquareSVG } from '../../../components/utils/svgs/f-awesome'
import { BUTTON_PRIMARY } from '../../../constants/global'
import {
  FeedbackMGSVG,
  LogoNoWaveSVG,
  LogoSVG
} from '../../../components/utils/svgs'
import { Reveal } from './utils'
import { useGlobalContext } from '../../../components/layout/context'
import { AccordionPageSection } from '../faq'
import CustomizedSearch from '../customized-search'
import { HVC } from '../../../components/utils/hvc'
import Channel from '../channel'
import { content, faqdata, IFeedBack } from './data'
import { LogoAnimated } from '../../../components/utils/hooks'

const LandingPage = () => {
  const { setJoinWaitingList, rsProps } = useGlobalContext()

  const handleSubscription = () => {
    setJoinWaitingList?.(true)
  }

  const howItWorksList = [
    'Create a Voice Link',
    `Share with Your Audience`,
    `Receive Authentic Responses`,
    `Analyze and Act`
  ]
  // how it works tabs and lists ends

  const navigate = useNavigate()

  const howitworksRef = useRef(null)
  const faqRef = useRef(null)

  const [openAccordion, setOpenAccordion] = useState(0)

  const mobileOptions = {
    loop: true,
    autoplay: true,
    animationData: wave,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  // const desktopOptions = {
  //   loop: false,
  //   autoplay: true,
  //   animationData: stadium,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice'
  //   }
  // }

  const benefits = [
    `Authentic and Unfiltered Feedback.`,
    `Simplified Process for Collectors and Respondents.`,
    `Real-Time Feedback Collection.`
  ]

  const enums = {
    BETTIPS: 'FREE PREDICTIONS',
    CHANNELS: 'CHANNELS'
  }

  const tipChannelTabs = useTabSection(enums.BETTIPS, enums)

  const onFeedback = (slug: string | undefined) => () => {
    if (!slug) return
    rsProps?.callSection({
      action: 'view',
      component: 'send-feedback',
      title: 'Send Feedback',
      slug,
      max: true
    })
  }

  return (
    <div className="landing-page-wrapper bg-white">
      {/* jumbotron */}
      <section className="video-background">
        <div className="content container">
          <Reveal className="f-column-53">
            {/* lottie */}
            <div className="content-text text-center">
              <LogoAnimated />
              <h1>Capture the Feedback that matters most</h1>
              <h2>
                Create a voice link. Share with Your Audience. Receive Authentic
                Responses. <br />
                Anytime, Anywhere
              </h2>
            </div>
            {/* button */}
            <div className="f-row-30 jcc flex-wrap content-cta cta-wrapper">
              <TypeButton
                title="Start Collecting Feedback"
                buttonSize="large"
                aria-label="Proceed to Sign up oor Sign in"
                onClick={() => navigate(pageurl.REGISTER)}
                icon={<LogoNoWaveSVG color="#fff" />}
                className="hw-mx mx-auto"
              />
            </div>
          </Reveal>
        </div>
      </section>
      {/* feedback cards */}
      <section
        className="container f-row-23 ais py-5"
        style={{ overflow: 'auto' }}
      >
        {content.map((i, index) => (
          <FeedBackCard
            subject={i.subject}
            requester={i.requester}
            title={i.title}
            company={i.company}
            key={index}
            createdAt={i.createdAt}
            totalFeedback={i.totalFeedback}
            onFeedback={onFeedback(i.slug)}
            location={i.location}
            purpose={i.purpose}
            category={i.category}
          />
        ))}
      </section>
      {/* solution */}
      <section className="py-5 f-column-53 px-3">
        <div className="section-text text-center f-column-20 header-text-content">
          <LogoAnimated />
          <h2>The Unstructured Voice Feedback</h2>
          <p>
            We believe in empowering your audience to speak freely, sharing
            their genuine thoughts and experiences without the constraints of
            traditional surveys.
          </p>
        </div>
        <SubReveal
          className="container grid-wrapper-30 gap-43 p-5 mt-5 rounded-25 bg-lighter-blue"
          hidden={{ opacity: 0, x: '-50%' }}
          visible={{ opacity: 1, x: 0 }}
        >
          {benefits.map((i, index) => (
            <div className="f-row-23 ais py-2" key={index}>
              <div
                style={{
                  width: '20px',
                  minWidth: '20px',
                  height: '20px',
                  minHeight: '20px'
                }}
              >
                <LogoSVG color={BUTTON_PRIMARY} />
              </div>
              <h4 className="m-0 ff-bold">{i}</h4>
            </div>
          ))}
        </SubReveal>
        {/* <Reveal className="cta-wrapper container jcc">
          <TypeButton
            buttonSize="large"
            buttonType="outlined"
            title="Explore free bet tips"
            aria-label="Navigate to free bet tips page"
            onClick={() => navigate(pageurl.BETTICKETS)}
          />
        </Reveal> */}
      </section>
      <section className="container d-none">
        <div className="border-label rounded-20">
          <TabSection
            tabProps={tipChannelTabs.tabProps}
            position="center"
            tabGap="10"
            type="block"
          />
        </div>
        <HVC removeDOM view={tipChannelTabs.isTab(enums.BETTIPS)}>
          <CustomizedSearch />
        </HVC>
        <HVC removeDOM view={tipChannelTabs.isTab(enums.CHANNELS)}>
          <Channel />
        </HVC>
      </section>
      {/* testimonial */}
      <section className="one-section testimonial d-none">
        <div className="lottie-ball mx-auto">
          <Lottie options={mobileOptions} />
        </div>
        <div className="section-text text-center f-column-20">
          <h2>What customers are saying</h2>
          <p>
            <FeedbackMGSVG /> &nbsp;Leave a feedback and get featured
          </p>
        </div>
        <Testimonials handleSubscription={handleSubscription} />
      </section>
      {/* how it works */}
      <section
        className="three-section how-it-works pt-0 mt-0"
        ref={howitworksRef}
      >
        <div className="f-column-30 m-0">
          {/* text and tab section */}
          <div className="section-text text-center f-column-40 container header-text-content">
            <LogoAnimated />
            {/* text */}
            <h2>
              Hear directly from your audience in their own words, anytime,
              anywhere.
            </h2>
            <p>
              Hear directly from your audience in their own words, anytime,
              anywhere.
            </p>
          </div>
          {/* list-media */}
          <div className="list-media container">
            <div className="list-container f-column-70 border-top border-bottom rounded-50 p-5">
              {/* list */}
              <ol className="p-0 m-0 px-4 pt-3">
                {howItWorksList.map((i, index) => (
                  <li key={index}>{i}</li>
                ))}
              </ol>
              <div className="f-row-20 flex-wrap cta-wrapper pb-4">
                <TypeButton
                  buttonSize="large"
                  buttonType="bold"
                  title="Start Collecting Feedback"
                  icon={<LogoNoWaveSVG color="#fff" />}
                  aria-label="Subscribe for $2/Month"
                  onClick={handleSubscription}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* faq */}
      <section className="faq section-text" ref={faqRef}>
        <div className="container f-column-40">
          <div className="container text-center">
            <LogoAnimated />
            <h2>
              Frequently asked <br />
              questions
            </h2>
          </div>
          <div className="content border-0 border-top border-bottom rounded-50">
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
        </div>
      </section>
    </div>
  )
}

export default LandingPage

interface IReveal
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: any
  className?: string | undefined
  hidden?: any
  visible?: any
}

const SubReveal: FC<IReveal> = ({ children, className, hidden, visible }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const mainControls = useAnimation()
  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    }
  }, [isInView])
  return (
    <motion.div
      variants={{
        hidden: hidden || { opacity: 0, y: 75 },
        visible: visible || { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.25 }}
      className={className}
      ref={ref}
    >
      {children}
    </motion.div>
  )
}

const FeedBackCard = ({
  subject,
  requester,
  company,
  category,
  title,
  totalFeedback,
  onCompany,
  onFeedback,
  location
}: IFeedBack) => {
  return (
    <div
      className="border-label rounded-23 p-4 f-column-33"
      style={{ maxWidth: '350px', flexShrink: 0 }}
    >
      <div className="f-column-23">
        <h5 className="m-0 font-19" onClick={onFeedback}>
          {subject}
        </h5>
        <div className="f-column">
          <div className="f-row-20 aic pb-1 jcsb">
            <p className="m-0 text-small">{requester}</p>
            <p className="m-0 text-tiniest color-label">{category}</p>
          </div>
          <p className="text-tiny color-label m-0">
            {title} at{' '}
            <span
              className="text-decoration-underline cursor-pointer"
              onClick={onCompany}
            >
              {company}
            </span>
          </p>
        </div>
      </div>
      <div className="f-row-10 aic jcsb border-label-top pt-3 mt-auto">
        <p className="m-0 color-label text-tiny">
          {totalFeedback.toLocaleString()} feedback
          {totalFeedback > 1 ? 's' : ''}
        </p>
        <div className="f-row-10 aic hw-mx cursor-pointer" onClick={onFeedback}>
          <LogoSVG />
        </div>
      </div>
    </div>
  )
}

// const FeedBackCardLegacy = ({
//   subject,
//   requester,
//   company,
//   createdAt,
//   title,
//   totalFeedback,
//   onCompany,
//   onFeedback
// }: IFeedBack) => {
//   return (
//     <div
//       className="border-label rounded-23 p-4 f-column-33"
//       style={{ maxWidth: '350px', flexShrink: 0 }}
//     >
//       <div className="f-column-23">
//         <div className="f-column">
//           <div className="f-row-20 aic pb-1 jcsb">
//             <p className="m-0 text-tiny">{requester}</p>
//             <p className="m-0 text-tiniest color-label">{createdAt}</p>
//           </div>
//           <p className="text-tiniest color-label m-0">
//             {title} at{' '}
//             <span
//               className="text-decoration-underline cursor-pointer"
//               onClick={onCompany}
//             >
//               {company}
//             </span>
//           </p>
//         </div>
//         <h5 className="m-0 multiline-ellipsis-3">{subject}</h5>
//       </div>
//       <div className="f-row-10 aic jcsb border-label-top pt-3 mt-auto">
//         <p className="m-0 color-label text-tiny">
//           {totalFeedback.toLocaleString()} feedback
//           {totalFeedback > 1 ? 's' : ''}
//         </p>
//         <div className="f-row-10 aic hw-mx cursor-pointer" onClick={onFeedback}>
//           <LogoSVG />
//         </div>
//       </div>
//     </div>
//   )
// }
