import SellerOnboarding from './seller'
import BuyerOnboarding from './buyer'
import {
  COLOR_YELLOW,
  ISBETA,
  MINHEIGHT,
  getUserData
} from '../../constants/global'
import { PageContainer } from '../../components/utils/reusable'
import { SuccessSVG } from '../../components/utils/svgs'
import { gallery } from '../../assets'
import { useGlobalContext } from '../../components/layout/context'

const UserOnboardingPage = () => {
  const { setNotification } = useGlobalContext()

  const sellerOnboarding = [
    {
      step: 1,
      isSelected: getUserData().user?.stage === 'onboarding1',
      title: 'Provide Some Basic Info',
      isCompleted: getUserData().user?.stage !== 'onboarding1'
    },
    {
      step: 2,
      isSelected: getUserData().user?.stage === 'onboarding2',
      title: 'Create a Channel',
      isCompleted:
        getUserData().user?.stage !== 'onboarding2' &&
        getUserData().user?.stage !== 'onboarding1'
    }
  ]

  const buyeronboarding = [
    {
      step: 1,
      isSelected: getUserData().user?.stage === 'onboarding1',
      isCompleted: getUserData().user?.stage !== 'onboarding1',
      title: 'Provide Some Basic Info'
    }
  ]

  return (
    <div style={{ minHeight: MINHEIGHT }} className="py-5">
      <PageContainer>
        <div className="f-row aistretch w-100">
          <div
            className="BGComponent position-sticky"
            style={{
              flexBasis: '30%',
              maxHeight: '550px',
              minHeight: '580px',
              top: 70
            }}
          >
            <div className="shader-8" />
            <div
              className="position-relative px-4 py-4 f-column jcc w-100 h-100 text-white"
              style={{ zIndex: 2 }}
            >
              <div>
                <h1
                  style={{
                    lineHeight: '40px',
                    fontSize: '30px'
                  }}
                  className="text-white text-left"
                >
                  Congratulations on joining{' '}
                  <span
                    style={{
                      color: COLOR_YELLOW
                    }}
                  >
                    MyTipster.pro
                  </span>
                </h1>
              </div>

              <div className="my-auto h-100 f-column jcc">
                <p className="text-little">NEXT STEP - ONBOARDING</p>
                <div>
                  {getUserData().role === 'seller' &&
                    sellerOnboarding.map((i, index) => (
                      <OnboardingSteps key={index} {...i} />
                    ))}
                  {getUserData().role === 'buyer' &&
                    buyeronboarding.map((i, index) => (
                      <OnboardingSteps key={index} {...i} />
                    ))}
                </div>
              </div>
              <BrandComponent />
            </div>
          </div>
          <div className="OnboardingContentWrapper">
            {getUserData().role === 'seller' && (
              <>
                <SellerOnboarding setNotificationStatus={setNotification} />
              </>
            )}
            {getUserData().role === 'buyer' && (
              <>
                <BuyerOnboarding setNotificationStatus={setNotification} />
              </>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default UserOnboardingPage

const OnboardingSteps = ({
  step,
  title,
  isSelected,
  isCompleted
}: {
  step: number
  title: string
  isSelected: boolean
  isCompleted?: boolean
}) => {
  return (
    <div className="f-row-10 aic mb-3">
      <div
        style={{
          borderRadius: '50%',
          border: `1px solid ${isSelected ? '#fff' : '#5c5c5c'}`,
          width: '25px',
          height: '25px'
        }}
        className="f-row aic jcc"
      >
        {isCompleted ? (
          <SuccessSVG />
        ) : (
          <p
            className="m-0 text-little"
            style={{ color: isSelected ? '#fff' : '#5c5c5c' }}
          >
            {step}
          </p>
        )}
      </div>
      <h5
        className="m-0"
        style={{ color: isSelected ? '#fff' : '#5c5c5c', fontSize: '16px' }}
      >
        {title}
      </h5>
    </div>
  )
}

export const BrandComponent = () => {
  return (
    <div
      className="mt-auto position-relative f-column jce w-100 text-white"
      style={{ zIndex: 2 }}
    >
      <div className="f-row aic text-white">
        <img
          src={gallery.logoTextWhite.src}
          alt="mytipster.pro logo"
          style={{ width: '170px' }}
          className="mb-2"
        />
        {ISBETA && <p className="m-0 text-little">BETA</p>}
      </div>
      <p className="text-small m-0">Make Smarter Bets with Pro Tips</p>
    </div>
  )
}
