import { FC } from 'react'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { IUserEmailProps } from './utils'
import TermsAndConditions from '../../utils/tandc'

export const UserEmail: FC<IUserEmailProps> = ({ hookForm }) => {
  const formComponents: IFormComponent[] = [
    {
      label: 'Email',
      id: 'email',
      component: 'input',
      placeHolder: 'Enter email address'
    }
  ]

  const onClickTC = () => {
    hookForm.setValue('tandc', !hookForm.watch('tandc'))
  }

  return (
    <div className="f-column-33">
      <FormBuilder hookForm={hookForm} formComponent={formComponents} />
      <TermsAndConditions
        hookForm={hookForm}
        id="tandc"
        onClickTC={onClickTC}
      />
    </div>
  )
}
