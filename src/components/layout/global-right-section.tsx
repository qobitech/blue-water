import { Children } from 'react'
import RightSection, { IGlobalRightSection } from '../layout/right-section'
import { useGlobalContext } from './context'
import OrderSummary from '../page-components/payment/order-summary'
import CheckoutPage from '../page-components/payment/check-out'
import Share from '../utils/share'
import BetStats from '../../pages/dashboard/bet-channel/stats'
import BetTicketsRightSection from '../../pages/dashboard/bet-codes/right-section'
import PublicBetTicketRightSection from '../../pages/dashboard/bet-codes/public-right-section'
import CreateCommunityForum from '../../pages/dashboard/community-forum/create-forum'
import ViewCommunityForumPost from '../../pages/dashboard/community-forum/view-community-forum-post'
import CreateCommunityPost from '../../pages/dashboard/community-forum/create-post'
import JoinCommunityForum from '../../pages/dashboard/community-forum/join-community-forum'
import ViewCommunityUserData from '../../pages/dashboard/community-forum/view-community-user-data'
import AddBetTicket from '../../pages/dashboard/bet-codes/add-bet-ticket'
import CreateBetChannel from '../../pages/dashboard/bet-channel/create-bet-channel'
import PostPayment from '../page-components/payment/post-payment'
import ExclusiveAdRights from '../page-components/exclusive-ad-rights'
import Reason from '../page-components/reason'
import VerificationRequest from '../page-components/verification-request'
import ReviewVerificationRequest from '../../pages/admin/verification-request/review'
import SuspendUser from '../../pages/admin/users/suspend'
import ViewUser from '../../pages/admin/users/view'
import CreateUser from '../../pages/admin/users/create'
import UserLevelInfo from '../page-components/user-level-info'
import ViewFeedback from '../../pages/admin/feedback/review'
import Navigation from '../../pages/dashboard/overview/navigation'
import Avatars from '../../pages/dashboard/overview/view-avatar-profile'
import { LoginFormComponent } from '../../pages/auth/login/form-component'
import GetCodeOptionComponent from '../../pages/dashboard/bet-codes/code-options'
import { CreateReview, ViewReview } from '../page-components/review/review'
import { CreateReport, ViewReport } from '../page-components/report/report'
import ViewChannel from '../../pages/admin/channels/view'
import { ReportDetails } from '../../pages/admin/tips'
import ViewBetChannel from '../../pages/dashboard/bet-channel/view-channel'
import ServiceTransaction from '../../pages/dashboard/my-account/wallet/view-service-transaction'
import PurchaseTransaction from '../../pages/dashboard/my-account/wallet/view-purchase-transaction'
import PurchasePrediction from '../../pages/dashboard/my-account/wallet/view-purchased-prediction'
import WithdrawRequestTransaction from '../../pages/dashboard/my-account/wallet/withdraw-request-transaction'
import ViewTournament from '../../pages/dashboard/my-account/wallet/view-torunament'
import WithDrawRequest from '../../pages/dashboard/my-account/wallet/withdraw-request'
import FundWallet from '../../pages/dashboard/my-account/wallet/fund-wallet'
import FeedbackRS from './feed-back/rs'
import BetCodeFilter from '../../pages/dashboard/bet-codes/filter'
import BetStatsInstruction from '../../pages/dashboard/bet-channel/stats/instruction'
import SendFeedback from '../page-components/send-feedback'

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

        {rsProps.isView('view', 'service-transaction') ? (
          <ServiceTransaction />
        ) : null}

        {rsProps.isView('view', 'purchase-transaction') ? (
          <PurchaseTransaction />
        ) : null}

        {rsProps.isView('view', 'purchased-prediction') ? (
          <PurchasePrediction />
        ) : null}

        {rsProps.isView('view', 'withdraw-request-transaction') ? (
          <WithdrawRequestTransaction />
        ) : null}

        {rsProps.isView('view', 'exclusive-ad-rights') ? (
          <ExclusiveAdRights />
        ) : null}

        {rsProps.isView('view', 'post-payment') ? <PostPayment /> : null}

        {rsProps.isView('view', 'tournament') ? <ViewTournament /> : null}

        {rsProps.isView('view', 'user-tier') ? <UserLevelInfo /> : null}

        {rsProps?.isView('view', 'withdraw-funds') ? <WithDrawRequest /> : null}

        {rsProps.isView('view', 'reason') ? <Reason /> : null}

        {rsProps.isView('view', 'avatars') ? <Avatars /> : null}

        {rsProps.isView('view', 'order-summary') ? <OrderSummary /> : null}

        {rsProps.isView('view', 'share') ? <Share /> : null}

        {rsProps.isView('view', 'send-feedback') ? <SendFeedback /> : null}

        {rsProps.isView('view', 'bet-stats') ? <BetStats /> : null}

        {rsProps.isView('create', 'feed-back') ? <FeedbackRS /> : null}

        {rsProps.isView('view', 'predictions') ? (
          <BetTicketsRightSection />
        ) : null}

        {rsProps.isView('view', 'public-predictions') ? (
          <PublicBetTicketRightSection />
        ) : null}

        {rsProps.isView('view', 'checkout') ? <CheckoutPage /> : null}

        {rsProps.isView('view', 'login') ? <LoginFormComponent /> : null}

        {rsProps.isView('create', 'community-forum') ? (
          <CreateCommunityForum />
        ) : null}

        {rsProps.isView('update', 'community-forum') ? (
          <CreateCommunityForum />
        ) : null}

        {rsProps.isView('create', 'community-forum-post') ? (
          <CreateCommunityPost />
        ) : null}

        {rsProps.isView('create', 'community-forum-join') ? (
          <JoinCommunityForum />
        ) : null}

        {rsProps.isView('view', 'get-code-option') ? (
          <GetCodeOptionComponent />
        ) : null}

        {rsProps.isView('view', 'community-forum-user-data') ? (
          <ViewCommunityUserData />
        ) : null}

        {rsProps.isView('view', 'review-verification-request') ? (
          <ReviewVerificationRequest />
        ) : null}

        {rsProps.isView('view', 'report') ? (
          <ViewReport>
            <ReportDetails />
          </ViewReport>
        ) : null}

        {rsProps.isView('view', 'channel') ? <ViewChannel /> : null}

        {rsProps.isView('view', 'review') ? <ViewReview /> : null}

        {rsProps.isView('create', 'report') ? <CreateReport /> : null}

        {rsProps.isView('create', 'review') ? <CreateReview /> : null}

        {rsProps.isView('create', 'predictions') && <AddBetTicket />}

        {rsProps.isView('view', 'tipster-indentification') && (
          <VerificationRequest />
        )}

        {rsProps.isView('view', 'feed-back') && <ViewFeedback />}

        {rsProps.isView('view', 'quick-nav') && <Navigation />}

        {rsProps.isView('update', 'channel') && <CreateBetChannel />}

        {rsProps.isView('update', 'bet-code-filter') && <BetCodeFilter />}

        {rsProps.isView('view', 'bet-stats-instruction') && (
          <BetStatsInstruction />
        )}

        <CompDisplay isView={rsProps.isView('view', 'bet-channel-item')}>
          <ViewBetChannel />
        </CompDisplay>

        {rsProps.isView('view', 'community-forum') && (
          <ViewCommunityForumPost />
        )}

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
