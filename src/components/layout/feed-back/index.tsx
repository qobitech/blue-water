import { useEffect, useState } from 'react'
import './style.scss'
import { TypeButton, TypeSmallButton } from '../../utils/button'
import { HVC } from '../../utils/hvc'
import { AlertSVG, CloseSVG, FeedbackSVG } from '../../utils/svgs'
import { getUserData } from '../../../constants/global'
import { useCreateFeedback } from '../../../api/feedback'
import { TypeInput } from '../../utils/input'
import TextPrompt from '../../utils/text-prompt'
import * as yup from 'yup'
import { useFormHook } from '../../utils/hooks'
import Review from '../../utils/review'
import { useGlobalContext } from '../../layout/context'

interface IFK {
  email: string
  feedback: string
  rating: number
}

const schema = {
  email: yup.string().email().required('Email address is required'),
  feedback: yup.string().required('Feedback is required'),
  rating: yup.number().required('Rating is required')
}

const FeedbackWidget: React.FC = () => {
  const { rsProps, route } = useGlobalContext()
  const [isOpen, setIsOpen] = useState(false)
  const [success, setSuccess] = useState<boolean>(false)

  const [formHook] = useFormHook<IFK>(schema)

  const onFeedbackSuccess = () => {
    setSuccess(true)
  }

  const feedbackProps = useCreateFeedback(onFeedbackSuccess)

  const isDashboard = route !== 'auth' && route !== 'public'

  const handleToggle = () => {
    if (isDashboard) {
      rsProps?.callSection({
        action: 'create',
        component: 'feed-back',
        title: 'Leave a Feedback'
      })
    } else {
      setIsOpen(!isOpen)
      setSuccess(false)
      formHook.reset()
    }
  }

  useEffect(() => {
    if (isDashboard) {
      formHook.setValue('email', getUserData().user.email)
    }
  }, [getUserData()])

  const submitFeedback = (data: IFK) => {
    feedbackProps.mutate({
      body: {
        email: data.email,
        feedback: data.feedback,
        rating: data.rating,
        userId: isDashboard ? getUserData()?.user?._id : ''
      }
    })
  }

  return (
    <HVC removeDOM view className="feedback-widget" title="Leave feedback">
      <button
        onClick={handleToggle}
        className="feedback-button"
        aria-label="feed back widget"
      >
        <FeedbackSVG />
        {isOpen && (
          <>
            &nbsp;&nbsp;
            <CloseSVG />
          </>
        )}
      </button>
      <HVC removeDOM view={isOpen} className="feedback-form">
        <HVC removeDOM view={!success}>
          <form
            onSubmit={formHook.handleSubmit(submitFeedback)}
            className="f-column-10"
          >
            {!isDashboard && (
              <TypeInput
                placeholder="Email address"
                {...formHook.register('email')}
                error={formHook.formState.errors.email?.message}
                required
              />
            )}
            <div>
              <textarea
                {...formHook.register('feedback')}
                placeholder="Enter your feedback"
                required
              />
              <TextPrompt
                prompt={formHook.formState.errors.feedback?.message}
                status={false}
              />
            </div>
            <Review
              setRating={(rating) => {
                formHook.setValue('rating', rating)
              }}
              error={formHook.formState.errors?.rating?.message as string}
              rating={formHook.watch('rating')}
            />
            <TypeButton
              title="Submit"
              buttonShape="curve"
              load={feedbackProps.isLoading}
            />
          </form>
        </HVC>
        <HVC
          removeDOM
          view={success}
          className="p-4 f-row-10 align-items-center"
        >
          <AlertSVG />
          <p className="m-0 text-small">Thank you for your feedback</p>
          <TypeSmallButton
            title=""
            close
            buttonType="danger"
            onClick={handleToggle}
          />
        </HVC>
      </HVC>
    </HVC>
  )
}

export default FeedbackWidget
