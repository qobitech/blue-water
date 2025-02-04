import { FC } from 'react'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { IComplianceCertificationForm } from './utils'

const ComplianceCertificationForm: FC<IComplianceCertificationForm> = ({
  hookForm
}) => {
  const registerFC: IFormComponent[] = [
    {
      label: 'Do You Hold Relevant Licenses for Property Development?',
      id: 'developerLicense',
      component: 'select',
      initOptions: { id: 1, label: 'Select', value: '' },
      optionData: [
        { id: 2, label: 'Yes', value: 'Yes' },
        { id: 3, label: 'No', value: 'No' }
      ]
    },
    {
      label: 'Have You Faced Any Legal Issues in Past Projects?',
      id: 'legalIssues',
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

export default ComplianceCertificationForm
