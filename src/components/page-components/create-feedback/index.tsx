import { useEffect, useState } from 'react'
import {
  createFeedbackStage,
  defaultFeedbackDetails,
  IFeedbackCampaign,
  feedbackCampaignSchema,
  userProfileSchema,
  IUserProfile
} from './utils'
// import { useGlobalContext } from '../../layout/context'
import { useFormHook } from '../../utils/hooks'
// import { useGenerateFeedbackLinkCTA } from './hooks'
import { FeedBackCard } from './feedback-card'
import {
  cardColorGradient,
  getIsLogged,
  IColorGradient
} from '../../../constants/global'
import './style.scss'
import NotificationModal, { useModal } from '../../utils/modal'
import { HVC } from '../../utils/hvc'
import { Status } from './status'
import { FeedbackForm } from './feedback-form'
import RegisterForm from './register-form'
import { ColorSelection } from './color-selection'
import { useGlobalContext } from '../../layout/context'

const CreateFeedback = () => {
  const { rsProps } = useGlobalContext()
  const [stage, setStage] = useState<createFeedbackStage>('Feedback Campaign')
  const [color, setColor] = useState<IColorGradient>(cardColorGradient[0])
  const [isFeedbackLink, setIsFeedbackLink] = useState<boolean>(false)

  const [userProfileHookForm] = useFormHook<IUserProfile>(userProfileSchema)
  const [feedbackCampaignHookForm] = useFormHook<IFeedbackCampaign>(
    feedbackCampaignSchema
  )

  const notificationProps = useModal()

  const handleColor = (color: IColorGradient) => {
    setColor(color)
  }

  const saveFeedbackCampaignToDraft = () => {
    notificationProps.handleCloseModal(() => {
      setStage('Preview')
    })
  }

  const handleRegistration = () => {
    saveFeedbackCampaignToDraft()
  }

  const handleFeedbackCampaign = () => {
    if (!getIsLogged()) setStage('Authentication')
    else saveFeedbackCampaignToDraft()
  }

  const onNewFeedback = () => {
    feedbackCampaignHookForm.reset(defaultFeedbackDetails)
    handleColor(cardColorGradient[0])
    setStage('Feedback Campaign')
    setIsFeedbackLink(false)
    notificationProps.handleOpenModal(`${stage} - Tevotea`)
  }

  const onEditFeedback = () => {
    setStage('Feedback Campaign')
    notificationProps.handleOpenModal(`${stage} - Tevotea`)
  }

  const onGenerateFeedbackLink = () => {
    setIsFeedbackLink(true)
  }

  // useGenerateFeedbackLinkCTA(
  //   rsProps,
  //   onGenerateFeedbackLink,
  //   stage,
  //   isFeedbackLink,
  //   onNewFeedback
  // )

  useEffect(() => {
    if (stage !== 'Preview')
      notificationProps.handleOpenModal(`${stage} - Tevotea`)
  }, [stage])

  const feedbackCampaign = feedbackCampaignHookForm.watch()
  const userProfile = userProfileHookForm.watch()

  return (
    <div className="f-column-17 w-100">
      <NotificationModal
        useNotificationProps={notificationProps}
        size="medium"
        disableClose
      >
        <HVC view={stage === 'Feedback Campaign'} removeDOM>
          <FeedbackForm
            hookForm={feedbackCampaignHookForm}
            handleFeedback={handleFeedbackCampaign}
          />
        </HVC>
        <HVC view={stage === 'Authentication'} removeDOM>
          <RegisterForm
            hookForm={userProfileHookForm}
            handleRegister={handleRegistration}
            btnTitle="Create Account"
          />
        </HVC>
      </NotificationModal>
      <HVC view={stage === 'Preview'} className="f-row-13 flex-wrap jcsb aic">
        {isFeedbackLink ? (
          <div
            className="flex-basis-35 feedback-right-section f-row"
            style={{ flexShrink: 0 }}
          >
            <Status />
          </div>
        ) : null}
        <div
          className={`w-100 ${
            isFeedbackLink ? 'flex-basis-63' : 'f-column-11 aic w-100'
          }`}
        >
          <div className="f-column-27">
            {!isFeedbackLink ? (
              <div className="f-column-7 aic">
                <label className="text-little color-label">
                  Choose Background color
                </label>
                <ColorSelection
                  handleColor={handleColor}
                  selectedColor={color}
                />
              </div>
            ) : null}
          </div>
          <FeedBackCard
            subject={feedbackCampaign.subject}
            requester={userProfile.name}
            company={userProfile.company}
            category={feedbackCampaign.category}
            onGenerateLink={onGenerateFeedbackLink}
            color={color}
            companyWebsite={userProfile.companyUrl}
            onNewFeedback={onNewFeedback}
            isFeedbackLink={isFeedbackLink}
            onEdit={onEditFeedback}
            onClose={() => rsProps?.closeSection()}
          />
        </div>
      </HVC>
    </div>
  )
}

export default CreateFeedback
