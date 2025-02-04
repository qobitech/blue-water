import { FC } from 'react'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { INextStepsForm } from './utils'

const NextStepsForm: FC<INextStepsForm> = ({ hookForm }) => {
  const registerFC: IFormComponent[] = [
    {
      label: 'Are You Available for a Discovery Meeting?',
      id: 'discoveryMeeting',
      component: 'select',
      initOptions: { id: 1, label: 'Select', value: '' },
      optionData: [
        { id: 2, label: 'Yes', value: 'Yes' },
        { id: 3, label: 'No', value: 'No' }
      ]
    },
    {
      label: 'Preferred Communication Method',
      id: 'communicationMethod',
      component: 'check-box',
      checkboxGroup: ['Email', 'Phone', 'In-person']
    }
  ]
  return (
    <div className="f-column-23">
      <FormBuilder formComponent={registerFC} hookForm={hookForm} />
    </div>
  )
}

export default NextStepsForm
