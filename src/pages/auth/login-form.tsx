import { useEffect } from 'react'
import { pageurl } from '../../constants/pageurl'
import { UseFormReturn } from 'react-hook-form'
import { ILoginSchema } from './login/data'
import { roleType, getUserData } from '../../constants/global'
import {
  IResponse
  // ResponseComponent
} from '../../api'
import { TypeButton } from '../../components/utils/button'
import { GoogleSVG } from '../../components/utils/svgs'
import { TypeInput } from '../../components/utils/input'
import { TypePassword } from '../../components/utils/password'

interface LPChild {
  hookForm: UseFormReturn<ILoginSchema, any>
  handleLogin: (data: ILoginSchema) => void
  load: boolean
  isModal?: boolean
  isSessionTimeout?: boolean
  response: IResponse
  userRole?: roleType
}

const LoginForm: React.FC<LPChild> = ({
  hookForm,
  handleLogin,
  // error,
  response,
  load,
  isModal,
  isSessionTimeout,
  userRole
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = hookForm

  useEffect(() => {
    if (isSessionTimeout) {
      hookForm.setValue('email', getUserData().user.email)
    }
  }, [])

  const showComponent = !isModal && userRole !== 'admin'

  const onGoogleAuth = () => {}

  return (
    <>
      <div className="mx-auto w-100 bg-white py-5 rounded f-column-35">
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
          onSubmit={handleSubmit(handleLogin)}
          className="mx-auto mx-auto w-100 f-column-35"
        >
          <TypeInput
            {...register('email')}
            placeholder="Enter Email here"
            label={isSessionTimeout ? '' : 'Email Address'}
            error={errors.email?.message || ''}
            customwidth={'100%'}
            isonlyview={isSessionTimeout}
            disabled={isSessionTimeout}
          />

          <TypePassword
            {...register('password')}
            placeholder="Enter Password here"
            label="Password"
            error={errors.password?.message || ''}
            customwidth={'100%'}
          />
          {showComponent ? (
            <>
              <div className="f-row jcs w-100 aic">
                <p
                  className="text-small m-0 ml-auto cursor-pointer cta-text"
                  onClick={() => window.open(pageurl.FORGOTPASSWORD, '_self')}
                >
                  Forgot Password
                </p>
              </div>
            </>
          ) : null}
          {/* <ResponseComponent response={response} /> */}
          <div className="cta-wrapper">
            <TypeButton
              title="Login"
              load={load}
              className="w-100"
              buttonSize="large"
            />
          </div>
          {showComponent ? (
            <div className="mx-auto f-row-30 aic">
              <p className="text-small m-0">Not registered yet ?</p>
              <p
                className="text-small m-0 cursor-pointer cta-text"
                onClick={() => window.open(pageurl.REGISTER, '_self')}
              >
                <b>Create an Account</b>
              </p>
            </div>
          ) : null}
        </form>
      </div>
    </>
  )
}

export default LoginForm
