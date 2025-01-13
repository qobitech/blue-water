import { useEffect, useState } from 'react'
// import { HVC } from '../../utils/hvc'
import {
  createFeedbackStage,
  // IUserEmail,
  // feedbackDetailsSchema,
  // userEmailSchema,
  // IFeedbackDetails,
  // defaultEmailDetails,
  defaultFeedbackDetails,
  IFeedback,
  feedbackSchema,
  userProfileSchema,
  IUserProfile
} from './utils'
import { useGlobalContext } from '../../layout/context'
import { useFormHook } from '../../utils/hooks'
// import { UserEmail } from './email'
import {
  // useFeedbackDetailsCTA,
  useFeedbackLinkCTA,
  useUserDetailsCTA
} from './hooks'
import { FeedbackCard } from './feedback-card'
// import { FeedbackForm } from './feedback-form'
// import { Status } from './status'
import {
  cardColorGradient,
  feedbackCategory,
  IColorGradient
} from '../../../constants/global'
import './style.scss'
import NotificationModal, { useModal } from '../../utils/modal'
import { TypeButton } from '../../utils/button'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { HVC } from '../../utils/hvc'
import { Status } from './status'
import { EyeSVG } from '../../utils/svgs/f-awesome'

const CreateFeedback = () => {
  const { rsProps } = useGlobalContext()
  const [stage, setStage] = useState<createFeedbackStage>('Feedback Details')
  const [color, setColor] = useState<IColorGradient>(cardColorGradient[0])

  const [userEmailHookForm] = useFormHook<IUserProfile>(userProfileSchema)
  const [feedbackDetailsHookForm] = useFormHook<IFeedback>(feedbackSchema)

  const notificationProps = useModal()

  const handleColor = (color: IColorGradient) => {
    setColor(color)
  }

  const handleUserEmail = () => {
    setStage('Feedback Link')
    notificationProps.handleCloseModal()
  }

  const handleFeedbackDetails = () => {
    setStage('Email Address')
  }

  useUserDetailsCTA(
    rsProps,
    userEmailHookForm.handleSubmit(handleUserEmail),
    // () => {
    //   setStage('Feedback Details')
    // },
    stage
  )

  // useFeedbackDetailsCTA(
  //   rsProps,
  //   feedbackDetailsHookForm.handleSubmit(handleFeedbackDetails),
  //   () => {
  //     setStage('Email Address')
  //   },
  //   stage
  // )

  useFeedbackLinkCTA(
    rsProps,
    () => {
      feedbackDetailsHookForm.reset(defaultFeedbackDetails)
      // userEmailHookForm.reset(defaultEmailDetails)
      handleColor(cardColorGradient[0])
      setStage('Feedback Details')
      notificationProps.handleOpenModal('Tevotea')
    },
    stage
  )

  useEffect(() => {
    notificationProps.handleOpenModal('Tevotea Feedback Form')
  }, [])

  const userProfileFC: IFormComponent[] = [
    {
      label: 'Your Name',
      id: 'name',
      component: 'input',
      placeHolder: 'Enter your full name'
    },
    {
      label: 'Your Email',
      id: 'email',
      component: 'input',
      placeHolder: 'Enter your email address'
    },
    {
      label: 'Your Organization',
      id: 'company',
      component: 'input',
      placeHolder: `What's the name of your company or project?`
    },
    {
      label: 'Organization Website (Optional)',
      id: 'companyUrl',
      component: 'input',
      placeHolder: 'Enter company or project website'
    },
    {
      label: `What's your job title?`,
      id: 'jobTitle',
      component: 'input',
      placeHolder: 'e.g., Product Manager, Content Creator'
    }
  ]

  const feedbackFC: IFormComponent[] = [
    {
      label: `What's the one question you want to ask your audience?`,
      id: 'subject',
      component: 'text-area',
      placeHolder: `e.g., What's the biggest challenge you face when using our platform?`
    },
    {
      label: `Explain why this feedback is important and how you'll use it`,
      id: 'purpose',
      component: 'text-area',
      placeHolder: `e.g., We want to understand your needs better to improve our features and make the platform more user-friendly.`
    },
    {
      label: 'Feedback Category',
      id: 'category',
      component: 'select',
      initOptions: { id: 1, label: 'Select a category', value: '' },
      optionData: feedbackCategory.map((i, index) => ({
        id: index,
        label: i.name,
        value: i.name
      }))
    }
  ]

  const isFeedbackLink = stage === 'Feedback Link'

  return (
    <div className="f-column-17 w-100">
      {/* <ProgressData stage={stage} /> */}
      {/* <div className="f-row-33 flex-wrap jcsb"> */}
      <NotificationModal
        useNotificationProps={notificationProps}
        size="medium"
        disableClose
      >
        <HVC
          view={stage === 'Feedback Details'}
          removeDOM
          className="f-column-23 p-4"
        >
          <FormBuilder
            formComponent={feedbackFC}
            hookForm={feedbackDetailsHookForm}
          />
          <TypeButton
            title="Next"
            onClick={feedbackDetailsHookForm.handleSubmit(
              handleFeedbackDetails
            )}
          />
        </HVC>
        <HVC
          view={stage === 'Email Address'}
          removeDOM
          className="f-column-23 p-4"
        >
          <div className="grid-wrapper-40 gap-23">
            <FormBuilder
              formComponent={userProfileFC}
              hookForm={userEmailHookForm}
            />
          </div>
          <TypeButton
            title="Preview"
            onClick={() => notificationProps.handleCloseModal()}
            icon={<EyeSVG color="#fff" />}
          />
        </HVC>
      </NotificationModal>
      <div className="f-row-23 flex-wrap jcsb aic">
        <HVC
          view={stage === 'Feedback Link'}
          className="flex-basis-35 feedback-right-section f-row"
          style={{ flexShrink: 0 }}
        >
          <Status />
        </HVC>
        <div className={`w-100 ${isFeedbackLink ? 'flex-basis-60' : ''}`}>
          <FeedbackCard
            feedbackDetails={{
              ...feedbackDetailsHookForm.watch(),
              ...userEmailHookForm.watch()
            }}
            color={color}
            handleColor={handleColor}
            isFeedbackLink={isFeedbackLink}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateFeedback
