import { FC } from 'react'
import { TypeButton } from '../../utils/button'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { IRegisterForm } from './utils'

const RegisterForm: FC<IRegisterForm> = ({
  hookForm,
  handleRegister,
  btnTitle
}) => {
  const registerFC: IFormComponent[] = [
    {
      label: 'Your Name',
      id: 'name',
      component: 'input',
      placeHolder: 'Enter your full name'
    },
    {
      label: 'Your Email',
      id: 'email',
      component: 'input',
      placeHolder: 'Enter your email address'
    },
    {
      label: 'Phone',
      id: 'phone',
      component: 'input',
      placeHolder: `Enter your phone number`
    },
    {
      label: 'Message',
      id: 'message',
      component: 'text-area',
      placeHolder: `Enter message here`
    }
    // {
    //   label: 'Organization Website (Optional)',
    //   id: 'companyUrl',
    //   component: 'input',
    //   placeHolder: 'Enter company or project website'
    // },
    // {
    //   label: `What's your job title?`,
    //   id: 'jobTitle',
    //   component: 'input',
    //   placeHolder: 'e.g., Product Manager, Content Creator'
    // }
  ]
  return (
    <div className="f-column-33 py-4">
      <div className="text-center d-none">
        <p className="m-0 p-0 text-small">
          <span className="color-label">Already have an account?</span>
          &nbsp;&nbsp;
          <span className="text-decoration-underline cursor-pointer">
            Login to continue
          </span>
        </p>
      </div>
      <div className="text-center d-none">
        <p className="m-0">OR</p>
      </div>
      <div className="f-column-23">
        <FormBuilder formComponent={registerFC} hookForm={hookForm} />
      </div>
      <TypeButton
        title={btnTitle}
        onClick={handleRegister}
        buttonSize="large"
        buttonShape="square"
      />
    </div>
  )
}

export default RegisterForm
