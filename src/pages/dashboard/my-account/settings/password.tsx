import { TypeButton } from '../../../../components/utils/button'
import { usePassword } from '../../../../api/user'
import FormBuilder, {
  IFormComponent
} from '../../../../components/utils/form-builder'
import { useFormHook } from '../../../../components/utils/hooks'
import { IPasswordRequest } from '../../../../interface/IUser'
import * as yup from 'yup'
// import { ResponseComponent } from '../../../api'

const formComponent: IFormComponent[] = [
  {
    id: 'passwordCurrent',
    label: 'Current Password',
    placeHolder: 'Enter current password',
    component: 'password',
    type: 'password'
  },
  {
    id: 'password',
    label: 'New Password',
    placeHolder: 'Enter new password',
    component: 'password',
    type: 'password'
  },
  {
    id: 'passwordConfirm',
    label: 'Repeat New Password',
    placeHolder: 'Re-enter new password',
    component: 'password',
    type: 'password'
  }
]

const passwordSchema = {
  passwordCurrent: yup.string().required('input required'),
  password: yup.string().required('input required'),
  passwordConfirm: yup
    .string()
    .required('input required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
}

const PasswordSettings = () => {
  const passwordProps = usePassword()
  const [hookForm] = useFormHook<IPasswordRequest>(passwordSchema)
  const handlePasswordUpdate = (data: IPasswordRequest) => {
    passwordProps.passwordUpdate(data)
  }
  return (
    <form className="form-section">
      <div className="grid-wrapper-47 gap-20">
        <FormBuilder hookForm={hookForm} formComponent={formComponent} />
      </div>
      <div className="f-row-20 pt-4">
        <TypeButton
          title="Update"
          onClick={hookForm.handleSubmit(handlePasswordUpdate)}
          load={passwordProps.isLoading}
        />
        {/* <ResponseComponent response={passwordProps.response} /> */}
      </div>
    </form>
  )
}

export default PasswordSettings
