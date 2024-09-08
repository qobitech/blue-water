import Jumbotron from './jumbotron'
import AboutSection from './about'
import CommunitySection from './community'
import CollaborateSection from './collaborate'
import ContinueSection from './continue'
import PositivitySection from './positivity'
import ConclusionSection from './conclusion'

const VendorPage = () => {
  return (
    <div className="w-100 m-0 p-0">
      <Jumbotron />
      <AboutSection />
      <CommunitySection />
      <CollaborateSection />
      <ContinueSection />
      <PositivitySection />
      <ConclusionSection />
    </div>
  )
}

export default VendorPage
