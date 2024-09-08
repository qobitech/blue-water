import { pageurl } from '../../../constants/pageurl'
import { forgotPasswordSchema, IForgotPasswordSchema } from './data'
import { useFormHook } from '../../../components/utils/hooks'
import {
  HeaderComponent,
  PageContainer
} from '../../../components/utils/reusable'
import { TypeInput } from '../../../components/utils/input'
import { TypeButton } from '../../../components/utils/button'
import { useMutation } from '@tanstack/react-query'
import TextPrompt from '../../../components/utils/text-prompt'
import { apiFeatures } from '../../../api'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../../components/layout/context'

const forgotPassword = async (userProps: { email: string }) => {
  return await apiFeatures.post('forgotPassword', userProps)
}

export const getResponse = (data: any, error: any) => {
  if (!data) {
    if (error !== null) {
      const { response } = error
      const { data } = response
      return { message: data.message, status: false }
    }
    return { message: '', status: false }
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { message } = data as any
  return { message: message as string, status: true }
}

const ForgotPasswordPage = () => {
  const { setNotification } = useGlobalContext()
  const [hookForm] = useFormHook<IForgotPasswordSchema>(forgotPasswordSchema)

  const { mutate, isLoading, error, data } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setNotification?.('Token sent to email!', true)
      hookForm.reset()
    },
    onError: ({ response }: any) => {
      const { data } = response
      setNotification?.(data.message, false)
    }
  })

  const response = getResponse(data, error)

  const handleForgotPassword = (data: IForgotPasswordSchema) => {
    mutate({ email: data.email })
  }

  return (
    <div className="s-p-wrapper">
      <PageContainer>
        <div className="separator-h-30" />
        <HeaderComponent title="Forgot Password" />
        <div className="separator-h-30" />
        <div className="bg-white rounded py-4 py-lg-5">
          <form
            onSubmit={hookForm.handleSubmit(handleForgotPassword)}
            className="mx-auto f-column-33"
            style={{ maxWidth: '450px' }}
          >
            <TypeInput
              {...hookForm.register('email')}
              placeholder="Enter your email address"
              label="Email"
              error={hookForm.formState.errors.email?.message || ''}
              customwidth={'100%'}
            />
            {response.message ? (
              <>
                <div className="separator-h-25" />
                <TextPrompt
                  prompt={response.message}
                  status={response.status}
                />
              </>
            ) : null}
            <TypeButton title="Send OTP" load={isLoading} className="w-100" />
          </form>
          <div className="separator-h-40" />
          <div className="mx-auto f-row aic jcsb" style={{ maxWidth: '450px' }}>
            <Link
              to={pageurl.REGISTER}
              style={{ textDecoration: 'underline' }}
              className="LinkContainer"
            >
              <p className="text-small m-0">
                <b>Create an Account</b>
              </p>
            </Link>
            <Link
              to={pageurl.LOGIN}
              className="LinkContainer"
              style={{ textDecoration: 'underline' }}
            >
              <p className="text-small m-0">
                <b>Login</b>
              </p>
            </Link>
          </div>
        </div>
        <div className="separator-h-70" />
      </PageContainer>
    </div>
  )
}

export default ForgotPasswordPage
