import RightSection from '../layout/right-section'
import { useGlobalContext } from './context'
import Share from '../utils/share'
import ExclusiveAdRights from '../page-components/exclusive-ad-rights'
import Reason from '../page-components/reason'
import VerificationRequest from '../page-components/verification-request'
import UserLevelInfo from '../page-components/user-level-info'
import { CreateReview, ViewReview } from '../page-components/review/review'
import { CreateReport } from '../page-components/report/report'
import FeedbackRS from './feed-back/rs'
import SendFeedback from '../page-components/send-feedback'
import CreateFeedback from '../page-components/create-feedback'

const GlobalRightSection = () => {
  const globalContext = useGlobalContext()

  if (!globalContext) return <></>

  const rsProps = globalContext.rsProps

  if (!rsProps) return <></>

  return (
    <>
      <RightSection rsProps={rsProps} globalContext={globalContext}>
        {rsProps.isView('create', 'feedback') ? <CreateFeedback /> : null}
        {rsProps.isView('view', 'exclusive-ad-rights') ? (
          <ExclusiveAdRights />
        ) : null}

        {rsProps.isView('view', 'user-tier') ? <UserLevelInfo /> : null}

        {rsProps.isView('view', 'reason') ? <Reason /> : null}
        {rsProps.isView('view', 'share') ? <Share /> : null}

        {rsProps.isView('view', 'send-feedback') ? <SendFeedback /> : null}

        {rsProps.isView('create', 'feed-back') ? <FeedbackRS /> : null}
        {rsProps.isView('view', 'review') ? <ViewReview /> : null}

        {rsProps.isView('create', 'report') ? <CreateReport /> : null}

        {rsProps.isView('create', 'review') ? <CreateReview /> : null}

        {rsProps.isView('view', 'tipster-indentification') && (
          <VerificationRequest />
        )}

        {rsProps.isView('view', 'register') ? <>register</> : null}
      </RightSection>
    </>
  )
}

export default GlobalRightSection
