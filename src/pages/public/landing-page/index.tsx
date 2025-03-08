import { JumboTron } from './jumbotron'
import { About } from './about'
import { InvestmentOpportunity } from './investment-opportunity'
import { Services } from './services'
import { FAQ } from './faq'
import { Conclucision } from './conclusion'
import './style.scss'
import { useLandingPageHooks } from './hooks'

const LandingPage = () => {
  const { handleScrollRightSection, createFeedback, faqRef } =
    useLandingPageHooks()

  return (
    <div className="landing-page-wrapper bg-white f-column">
      <JumboTron
        handleScrollRightSection={handleScrollRightSection}
        createFeedback={createFeedback}
      />
      <About createFeedback={createFeedback} />

      <InvestmentOpportunity faqRef={faqRef} createFeedback={createFeedback} />

      <Services createFeedback={createFeedback} />

      <FAQ createFeedback={createFeedback} />

      <Conclucision createFeedback={createFeedback} />
    </div>
  )
}

export default LandingPage
