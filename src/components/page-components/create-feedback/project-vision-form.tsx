import { FC } from 'react'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { IProjectVisionForm } from './utils'

const ProjectVisionForm: FC<IProjectVisionForm> = ({ hookForm }) => {
  const registerFC: IFormComponent[] = [
    {
      label: 'Estimated Budget for Upcoming Project',
      id: 'estimatedBudget',
      component: 'select',
      initOptions: { id: 1, label: 'Select', value: '' },
      optionData: [
        { id: 2, label: 'Less than $1M', value: 'Less than $1M' },
        { id: 3, label: '$1M-$5M', value: '$1M-$5M' },
        { id: 4, label: '$5M-$10M', value: '$5M-$10M' },
        { id: 5, label: '$10M+', value: '$10M+' }
      ]
    },
    {
      label: 'Preferred Financing Method',
      id: 'financingMethod',
      component: 'select',
      initOptions: { id: 1, label: 'Select', value: '' },
      optionData: [
        { id: 2, label: 'Self-funded', value: 'Self-funded' },
        { id: 3, label: 'Investor-backed', value: 'Investor-backed' },
        { id: 4, label: 'Bank Financing', value: 'Bank Financing' },
        { id: 5, label: 'Joint Venture', value: 'Joint Venture' }
      ]
    },
    {
      label: 'Proposed Development Type',
      id: 'proposedDevelopment',
      component: 'select',
      initOptions: { id: 1, label: 'Select', value: '' },
      optionData: [
        { id: 2, label: 'Residential Villas', value: 'Residential Villas' },
        {
          id: 3,
          label: 'Waterfront Apartments',
          value: 'Waterfront Apartments'
        },
        { id: 4, label: 'Commercial Spaces', value: 'Commercial Spaces' },
        { id: 5, label: 'Others', value: 'Others' }
      ]
    },
    {
      label: '',
      id: 'proposedDevelopmentOther',
      component: 'input',
      placeHolder: 'Enter proposed development',
      hide: hookForm.watch('proposedDevelopment') !== 'Others'
    },
    {
      label: 'Do You Have Experience Developing Waterfront Properties?',
      id: 'waterfrontExperience',
      component: 'select',
      initOptions: { id: 1, label: 'Select', value: '' },
      optionData: [
        { id: 2, label: 'Yes', value: 'Yes' },
        { id: 3, label: 'No', value: 'No' }
      ]
    }
  ]
  return (
    <div className="f-column-23">
      <FormBuilder formComponent={registerFC} hookForm={hookForm} />
    </div>
  )
}

export default ProjectVisionForm
