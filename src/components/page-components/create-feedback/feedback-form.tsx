import { FC, useState } from 'react'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { IFeedbackCampaignFormProps } from './utils'
import { feedbackCategory } from '../../../constants/global'
import { TypeButton } from '../../utils/button'

export const FeedbackForm: FC<IFeedbackCampaignFormProps> = ({
  hookForm,
  handleFeedback
}) => {
  const labels = [
    `What's the one question you want to ask your audience?`,
    `Explain why this feedback is important and how you'll use it`,
    'Feedback Category',
    `Add a Video or Demo Link (Optional)`
  ]
  const placeholder = [
    `e.g., What's the biggest challenge you face when using our platform?`,
    `e.g., We want to understand your needs better to improve our features and make the platform more user-friendly.`,
    'Choose a category from the options below',
    `Share a video or demo link to help your audience better understand your feedback campaign. This could be a quick walkthrough, a product demo, or a message directly from you.`
  ]
  const formComponents: IFormComponent[] = [
    {
      id: 'subject',
      component: 'text-area',
      placeHolder: `Ask here...`,
      autoresize: true
    },
    {
      id: 'purpose',
      component: 'text-area',
      placeHolder: `Reply here...`,
      autoresize: true
    },
    {
      id: 'category',
      component: 'card-list',
      cardLists: feedbackCategory.map((i) => ({
        title: i.name,
        description: i.description,
        value: i.name,
        action: () => {},
        isSelected: hookForm.watch('category') === i.name
      }))
    },
    {
      id: 'demoPresentation',
      component: 'text-area',
      autoresize: true,
      placeHolder: `Enter video link here...`
    }
  ]

  const [formIndex, setFormIndex] = useState<number>(0)

  const isLast = formIndex + 1 === formComponents.length

  const handleNext = () => {
    if (!isLast) {
      setFormIndex(Math.min(formIndex + 1, formComponents.length - 1))
    } else {
      handleFeedback()
    }
  }

  const handlePrev = () => {
    setFormIndex(Math.max(formIndex - 1, 0))
  }

  return (
    <div className="f-column-33 py-4">
      <div className="text-center">
        <p className="m-0 text-little color-label">
          {formIndex + 1} of {formComponents.length}
        </p>
      </div>
      <div className="f-column-27">
        <h4 className="m-0">{labels[formIndex]}</h4>
        <div className="rounded p-3 bg-light">
          <p className="m-0 text-small">{placeholder[formIndex]}</p>
        </div>
        <FormBuilder
          hookForm={hookForm}
          formComponent={[formComponents[formIndex]]}
        />
      </div>
      <div className="f-column-7">
        <TypeButton
          title={isLast ? 'Submit' : 'Next'}
          onClick={handleNext}
          buttonSize="large"
        />
        {formIndex && !isLast ? (
          <TypeButton
            title="Previous"
            buttonType="outlined"
            onClick={handlePrev}
            className="border-0 p-0"
          />
        ) : null}
      </div>
    </div>
  )
}
