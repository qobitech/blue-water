import { useState } from 'react'
import { HVC } from '../../utils/hvc'
import {
  createFeedbackStage,
  IUserEmail,
  feedbackDetailsSchema,
  userEmailSchema,
  IFeedbackDetails,
  defaultEmailDetails,
  defaultFeedbackDetails
} from './utils'
import { useGlobalContext } from '../../layout/context'
import { useFormHook } from '../../utils/hooks'
import { UserEmail } from './email'
import { ProgressData } from './progress-data'
import {
  useFeedbackDetailsCTA,
  useFeedbackLinkCTA,
  useUserDetailsCTA
} from './hooks'
import { FeedbackCard } from './feedback-card'
import { FeedbackForm } from './feedback-form'
import { Status } from './status'
import { cardColorGradient, IColorGradient } from '../../../constants/global'

const CreateFeedback = () => {
  const { rsProps } = useGlobalContext()
  const [stage, setStage] = useState<createFeedbackStage>('Feedback Details')
  const [color, setColor] = useState<IColorGradient>(cardColorGradient[0])

  const [userEmailHookForm] = useFormHook<IUserEmail>(userEmailSchema)
  const [feedbackDetailsHookForm] = useFormHook<IFeedbackDetails>(
    feedbackDetailsSchema
  )

  const handleColor = (color: IColorGradient) => {
    setColor(color)
  }

  const handleUserEmail = () => {
    setStage('Feedback Link')
  }

  const handleFeedbackDetails = () => {
    setStage('Email Address')
  }

  useUserDetailsCTA(
    rsProps,
    userEmailHookForm.handleSubmit(handleUserEmail),
    () => {
      setStage('Feedback Details')
    },
    stage
  )

  useFeedbackDetailsCTA(
    rsProps,
    feedbackDetailsHookForm.handleSubmit(handleFeedbackDetails),
    () => {
      setStage('Email Address')
    },
    stage
  )

  useFeedbackLinkCTA(
    rsProps,
    () => {
      feedbackDetailsHookForm.reset(defaultFeedbackDetails)
      userEmailHookForm.reset(defaultEmailDetails)
      handleColor(cardColorGradient[0])
      setStage('Feedback Details')
    },
    stage
  )

  return (
    <div className="f-column-17">
      <ProgressData stage={stage} />
      <div className="f-row-33 flex-wrap jcsb" style={{ height: '50vh' }}>
        <div className="flex-basis-60">
          <FeedbackCard
            feedbackDetails={feedbackDetailsHookForm.watch()}
            color={color}
            handleColor={handleColor}
          />
        </div>
        <div
          className="flex-basis-35 border-label p-4 rounded"
          style={{ overflow: 'auto', height: '55vh' }}
        >
          <HVC view={stage === 'Feedback Details'} removeDOM>
            <FeedbackForm hookForm={feedbackDetailsHookForm} />
          </HVC>
          <HVC view={stage === 'Email Address'} removeDOM>
            <UserEmail hookForm={userEmailHookForm} />
          </HVC>
          <HVC view={stage === 'Feedback Link'}>
            <Status />
          </HVC>
        </div>
      </div>
    </div>
  )
}

export default CreateFeedback
