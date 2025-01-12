import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormHook } from '../../utils/hooks'
import {
  feedbackCategoryEnum,
  feedbackCategoryType
} from '../../../interface/IFeedback'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { TypeButton, TypeSmallButton } from '../../utils/button'
import { HVC } from '../../utils/hvc'
import { getUserData } from '../../../constants/global'
import { IGlobalRightSection } from '../../layout/right-section/utils'
import { useCreateFeedback } from '../../../api/feedback'
import RequestStatus from '../../utils/request-status'

interface IFK {
  email: string
  feedback: string
  category: feedbackCategoryType
  rating: number
}

const schema = {
  email: yup.string().email().required('Email address is required'),
  feedback: yup.string().required('Feedback is required'),
  rating: yup.number().required('Rating is required')
}

const fc: IFormComponent[] = [
  {
    id: 'category',
    component: 'select',
    label: 'What do you want to talk about?',
    initOptions: { id: 1, label: 'Select', value: '' },
    optionData: Object.values(feedbackCategoryEnum).map((i, index) => ({
      id: index,
      label: i,
      value: i
    }))
  },
  {
    id: 'feedback',
    component: 'text-area',
    label: 'Feedback',
    placeHolder: 'Enter your feedback'
  },
  {
    id: 'rating',
    component: 'review',
    label: 'Rating'
  }
]

const FeedbackRS = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps } = globalContext
  const [hookForm] = useFormHook<IFK>(schema)

  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    hookForm.setValue('email', getUserData()?.user?.email)
  }, [])

  const onFeedbackSuccess = () => {
    setSuccess(true)
  }

  const feedbackProps = useCreateFeedback(onFeedbackSuccess)

  const onSubmit = (data: IFK) => {
    feedbackProps.mutate({
      body: {
        email: data.email,
        feedback: data.feedback,
        rating: data.rating,
        userId: getUserData()?.user?._id,
        category: data.category
      }
    })
  }

  const onClose = () => {
    rsProps?.closeSection()
  }

  return (
    <>
      <HVC removeDOM view={!success}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="f-column-33 border-label rounded p-4"
        >
          <FormBuilder formComponent={fc} hookForm={hookForm} />
          <TypeButton
            title="Submit Feedback"
            type="submit"
            onClick={hookForm.handleSubmit(onSubmit)}
            load={feedbackProps.isLoading}
          />
        </form>
      </HVC>
      <HVC
        removeDOM
        view={success}
        className="f-column-70 text-center mt-4 pt-4"
      >
        <RequestStatus
          description={`We are truly grateful and we value your feeback. Please feel free to leave more as it will help us serve you better`}
          success
          lottie=""
          title={'Feedback Submitted Successfully'}
          loop={false}
        />
        <TypeSmallButton title="Close" onClick={onClose} buttonType="danger" />
      </HVC>
    </>
  )
}

export default FeedbackRS
