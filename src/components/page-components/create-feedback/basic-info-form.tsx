import { FC } from 'react'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { IBasicInformationForm } from './utils'

const BasicInformationForm: FC<IBasicInformationForm> = ({ hookForm }) => {
  const registerFC: IFormComponent[] = [
    {
      label: 'Full Name',
      id: 'name',
      component: 'input',
      placeHolder: 'Enter your full name'
    },
    {
      label: 'Company Name',
      id: 'company',
      component: 'input',
      placeHolder: 'Enter company name'
    },
    {
      label: 'Email Address',
      id: 'email',
      component: 'input',
      placeHolder: 'Enter your email address'
    },
    {
      label: 'Phone Number',
      id: 'phone',
      component: 'input',
      placeHolder: `Enter your phone number`
    },
    {
      label: 'Website/Portfolio (Optional)',
      id: 'website',
      component: 'input',
      placeHolder: 'Enter url'
    }
  ]
  return (
    <div className="f-column-23">
      <FormBuilder formComponent={registerFC} hookForm={hookForm} />
    </div>
  )
}

export default BasicInformationForm
