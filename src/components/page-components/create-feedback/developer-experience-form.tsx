import { FC } from 'react'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { IDeveloperExperienceForm } from './utils'

const DeveloperExperienceForm: FC<IDeveloperExperienceForm> = ({
  hookForm
}) => {
  const registerFC: IFormComponent[] = [
    {
      label: 'Years of Experience in Real Estate Development',
      id: 'experience',
      component: 'select',
      initOptions: { id: 1, label: 'Select', value: '' },
      optionData: [
        { id: 2, label: 'Less than 3 years', value: 'Less than 3 years' },
        { id: 3, label: '3-5 years', value: '3-5 years' },
        { id: 4, label: '6-10 years', value: '6-10 years' },
        { id: 5, label: 'More than 10 years', value: 'More than 10 years' }
      ]
    },
    {
      label: 'Number of Completed Projects',
      id: 'projects',
      component: 'select',
      initOptions: { id: 1, label: 'Select', value: '' },
      optionData: [
        { id: 2, label: '0-5', value: '0-5' },
        { id: 3, label: '6-10', value: '6-10' },
        { id: 4, label: '11-20', value: '11-20' },
        { id: 5, label: '21+', value: '21+' }
      ]
    },
    {
      label: 'Type of Projects Developed',
      id: 'projectsDeveloped',
      component: 'check-box',
      checkboxGroup: [
        'Residential',
        'Commercial',
        'Mixed-use',
        'Luxury Properties',
        'Others'
      ]
    },
    {
      label: '',
      id: 'projectsDevelopedOthers',
      component: 'input',
      placeHolder: 'Enter other projects developed',
      hide: !hookForm?.watch?.('projectsDeveloped')?.includes('Others')
    },
    {
      label: 'Largest Project Size',
      id: 'projectSize',
      component: 'select',
      initOptions: { id: 1, label: 'Select', value: '' },
      optionData: [
        { id: 2, label: '$500k', value: '$500k' },
        { id: 3, label: '$500k-$2M', value: '$500k-$2M' },
        { id: 4, label: '$2M-$10M', value: '$2M-$10M' },
        { id: 5, label: 'Over $10M', value: 'Over $10M' }
      ]
    }
  ]
  return (
    <div className="f-column-23">
      <FormBuilder formComponent={registerFC} hookForm={hookForm} />
    </div>
  )
}

export default DeveloperExperienceForm
