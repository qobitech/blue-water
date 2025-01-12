import { Children } from 'react'
import RightSection from '../layout/right-section'
import { useGlobalContext } from './context'
import OrderSummary from '../page-components/payment/order-summary'
import CheckoutPage from '../page-components/payment/check-out'
import Share from '../utils/share'
import PostPayment from '../page-components/payment/post-payment'
import ExclusiveAdRights from '../page-components/exclusive-ad-rights'
import Reason from '../page-components/reason'
import VerificationRequest from '../page-components/verification-request'
import SuspendUser from '../../pages/admin/users/suspend'
import ViewUser from '../../pages/admin/users/view'
import CreateUser from '../../pages/admin/users/create'
import UserLevelInfo from '../page-components/user-level-info'
import ViewFeedback from '../../pages/admin/feedback/review'
import Navigation from '../../pages/dashboard/overview/navigation'
import Avatars from '../../pages/dashboard/overview/view-avatar-profile'
import { LoginFormComponent } from '../../pages/auth/login/form-component'
import { CreateReview, ViewReview } from '../page-components/review/review'
import { CreateReport, ViewReport } from '../page-components/report/report'
import ViewChannel from '../../pages/admin/channels/view'
import { ReportDetails } from '../../pages/admin/tips'
import WithdrawRequestTransaction from '../../pages/dashboard/my-account/wallet/withdraw-request-transaction'
import FundWallet from '../../pages/dashboard/my-account/wallet/fund-wallet'
import FeedbackRS from './feed-back/rs'
import SendFeedback from '../page-components/send-feedback'
import { IGlobalRightSection } from './right-section/utils'

const GlobalRightSection = () => {
  const globalContext = useGlobalContext()

  if (!globalContext) return <></>

  const rsProps = globalContext.rsProps

  if (!rsProps) return <></>

  return (
    <>
      <RightSection rsProps={rsProps} globalContext={globalContext}>
        {rsProps.isView('view', 'users') ? <ViewUser /> : null}

        {rsProps.isView('create', 'create-user') ? <CreateUser /> : null}

        {rsProps.isView('view', 'suspend-user') ? <SuspendUser /> : null}

        {rsProps.isView('view', 'withdraw-request-transaction') ? (
          <WithdrawRequestTransaction />
        ) : null}

        {rsProps.isView('view', 'exclusive-ad-rights') ? (
          <ExclusiveAdRights />
        ) : null}

        {rsProps.isView('view', 'post-payment') ? <PostPayment /> : null}

        {rsProps.isView('view', 'user-tier') ? <UserLevelInfo /> : null}

        {rsProps.isView('view', 'reason') ? <Reason /> : null}

        {rsProps.isView('view', 'avatars') ? <Avatars /> : null}

        {rsProps.isView('view', 'order-summary') ? <OrderSummary /> : null}

        {rsProps.isView('view', 'share') ? <Share /> : null}

        {rsProps.isView('view', 'send-feedback') ? <SendFeedback /> : null}

        {rsProps.isView('create', 'feed-back') ? <FeedbackRS /> : null}

        {rsProps.isView('view', 'checkout') ? <CheckoutPage /> : null}

        {rsProps.isView('view', 'login') ? <LoginFormComponent /> : null}

        {rsProps.isView('view', 'report') ? (
          <ViewReport>
            <ReportDetails />
          </ViewReport>
        ) : null}

        {rsProps.isView('view', 'channel') ? <ViewChannel /> : null}

        {rsProps.isView('view', 'review') ? <ViewReview /> : null}

        {rsProps.isView('create', 'report') ? <CreateReport /> : null}

        {rsProps.isView('create', 'review') ? <CreateReview /> : null}

        {rsProps.isView('view', 'tipster-indentification') && (
          <VerificationRequest />
        )}

        {rsProps.isView('view', 'feed-back') && <ViewFeedback />}

        {rsProps.isView('view', 'quick-nav') && <Navigation />}

        <CompDisplay isView={rsProps.isView('view', 'fund-wallet')}>
          <FundWallet />
        </CompDisplay>

        {rsProps.isView('view', 'register') ? <>register</> : null}
      </RightSection>
    </>
  )
}

const CompDisplay = ({
  children,
  isView,
  globalContext
}: IGlobalRightSection & { children?: any; isView: boolean }) => {
  const matchChild: any = Children.map(children, (child) => {
    if (child) return { ...child, props: { ...child.props, globalContext } }
    return child
  })

  return <div className={isView ? '' : 'd-none'}>{matchChild}</div>
}

export default GlobalRightSection
