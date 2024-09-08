import { useState } from 'react'
import { ICreateUserSchema, userSchema } from './data'
import { useFormHook } from '../../../components/utils/hooks'
import {
  HeaderComponent,
  PageContainer
} from '../../../components/utils/reusable'
import { BrandComponent } from '../../onboarding'
import { useMutation } from '@tanstack/react-query'
import { getRoleId, roleType } from '../../../constants/global'
import { IRegister } from '../../../interface/IAuth'
import { apiFeatures } from '../../../api'
import { gallery } from '../../../assets'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import TermsAndConditions from '../../../components/utils/tandc'
import TextPrompt from '../../../components/utils/text-prompt'
import { TypeButton } from '../../../components/utils/button'
import { pageurl } from '../../../constants/pageurl'
import { Link } from 'react-router-dom'
import { GoogleSVG } from '../../../components/utils/svgs'
import { useGlobalContext } from '../../../components/layout/context'

const register = async (dataProps: any) => {
  return await apiFeatures.post<IRegister>('signup', dataProps)
}

const optionsData: Array<{ id: number; label: string; value: roleType }> = [
  {
    id: 1,
    label: 'I want bet tips',
    value: 'buyer'
  },
  {
    id: 2,
    label: 'I provide bet tips',
    value: 'seller'
  }
]

const formComponent: IFormComponent[] = [
  {
    id: 'role',
    component: 'select',
    initOptions: { label: 'Click to select', value: '', id: 1 },
    optionData: optionsData,
    label: 'Select one'
  },
  {
    id: 'userName',
    component: 'input',
    placeHolder: 'Enter Username',
    label: 'Username'
  },
  {
    id: 'email',
    component: 'input',
    placeHolder: 'email@domain.com',
    label: 'Email'
  },
  {
    id: 'password',
    component: 'password',
    label: 'Password'
  }
]

const RegisterPage = () => {
  const { setNotification } = useGlobalContext()

  const [userHookForm] = useFormHook<ICreateUserSchema>(userSchema)
  const [message, setMessage] = useState<string>('')

  const { mutate, isLoading, error } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setNotification?.('Registration Successful', true)
      setMessage(
        'Activate your account by clicking the link sent to your email'
      )
      userHookForm.reset()
    },
    onError: ({ response }: any) => {
      const { data } = response
      setNotification?.(data.message, false)
    }
  })

  const getMessage = () => {
    if (error !== null) {
      const { response } = error
      if (!response) return ''
      const { data } = response
      return data.message
    }
    return ''
  }

  const handleBasicInfo = (data: ICreateUserSchema) => {
    setMessage('')
    const dataProps = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      passwordConfirm: data.password,
      role: getRoleId(data.role)
    }
    mutate(dataProps)
  }

  const onGoogleAuth = () => {}

  return (
    <div className="s-p-wrapper">
      <PageContainer>
        <div className="separator-h-30" />
        <div className="f-row jcsb w-100">
          <HeaderComponent title="Sign Up" />
        </div>

        <div className="separator-h-30" />
        <div className="grid-wrapper-50">
          <div
            className="BGComponent"
            style={{ backgroundImage: `url(${gallery.login.src})` }}
          >
            <div className="shader-7" />
            <div className="pl-5 pb-5 w-100 h-100 f-row">
              <BrandComponent />
            </div>
          </div>
          <div className="mx-auto w-100 bg-white px-2 px-lg-5 py-5 rounded f-column-35">
            <div className="f-column-33 d-none">
              <div className="cta-wrapper">
                <TypeButton
                  title="Continue with Google"
                  className="w-100"
                  buttonSize="large"
                  buttonType="outlined"
                  icon={<GoogleSVG />}
                  onClick={onGoogleAuth}
                />
              </div>
              <div className="text-center">
                <p className="m-0 text-small ff-bold">OR</p>
              </div>
            </div>
            <form
              onSubmit={userHookForm.handleSubmit(handleBasicInfo)}
              className="mx-auto w-100 f-column-35"
            >
              <FormBuilder
                hookForm={userHookForm}
                formComponent={formComponent}
              />
              <div className="f-column-7">
                <TermsAndConditions id="tandc" hookForm={userHookForm} />
                <TermsAndConditions
                  id="ofage"
                  text="I confirm that I am 18 years or older."
                  hookForm={userHookForm}
                />
                <TermsAndConditions
                  id="emailupdates"
                  text="I agree to receive email updates, including newsletters and promotional content."
                  hookForm={userHookForm}
                />
              </div>
              {getMessage() && (
                <TextPrompt prompt={getMessage()} status={false} />
              )}
              {message && <TextPrompt prompt={message} status />}
              <div className="cta-wrapper">
                <TypeButton
                  title="Create Account"
                  load={isLoading}
                  className="w-100"
                  buttonSize="large"
                />
              </div>
              <div className="mx-auto f-row-16 aic w-100 text-center jcc">
                <p className="text-small m-0">Already a member ?</p>
                <Link
                  to={pageurl.LOGIN}
                  className="LinkContainer text-decoration-underline"
                >
                  <p className="text-small m-0">
                    <b>Log in</b>
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </PageContainer>
      <div className="separator-h-70" />
    </div>
  )
}

export default RegisterPage
