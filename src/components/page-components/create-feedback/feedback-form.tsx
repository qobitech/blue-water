import { FC } from 'react'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { IFeedbackFormProps } from './utils'
import { feedbackCategory } from '../../../constants/global'
export const FeedbackForm: FC<IFeedbackFormProps> = ({ hookForm }) => {
  const formComponents: IFormComponent[] = [
    {
      label: 'Full Name',
      id: 'fullName',
      component: 'input',
      placeHolder: 'Enter full name'
    },
    {
      label: 'Company',
      id: 'company',
      component: 'input',
      placeHolder: 'Enter company name'
    },
    {
      label: 'Company Website (Optional)',
      id: 'companyUrl',
      component: 'input',
      placeHolder: 'Enter company website'
    },
    {
      label: 'Job Title',
      id: 'jobTitle',
      component: 'input',
      placeHolder: 'Enter job title'
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
    },
    {
      label: 'Subject',
      id: 'subject',
      component: 'text-area',
      placeHolder: 'What do you want to talk about?'
    },
    {
      label: 'Purpose',
      id: 'purpose',
      component: 'text-area',
      placeHolder: 'What are you using the feedback for?'
    }
  ]

  return (
    <div className="f-column-13">
      <FormBuilder hookForm={hookForm} formComponent={formComponents} />
    </div>
  )
}
