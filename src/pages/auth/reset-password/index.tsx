import { useEffect } from 'react'
import { pageurl } from '../../../constants/pageurl'
import { IResetPasswordSchema, resetPasswordSchema } from './data'
import {
  useFormHook,
  useQueryValuesHook
} from '../../../components/utils/hooks'
import {
  HeaderComponent,
  PageContainer
} from '../../../components/utils/reusable'
import { TypeInput } from '../../../components/utils/input'
import { TypeButton } from '../../../components/utils/button'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { getResponse } from '../forgot-password'
import TextPrompt from '../../../components/utils/text-prompt'
import { apiFeatures } from '../../../api'
import { useGlobalContext } from '../../../components/layout/context'

const resetPassword = (token: string) => {
  return async (resetData: { password: string; passwordConfirm: string }) => {
    return await apiFeatures.patch(
      `resetPassword?token=${token}`,
      '',
      resetData
    )
  }
}

const ResetPasswordPage = () => {
  const [hookForm] = useFormHook<IResetPasswordSchema>(resetPasswordSchema)
  const navigate = useNavigate()
  const { token } = useQueryValuesHook()
  const { setNotification } = useGlobalContext()

  useEffect(() => {
    if (!token) {
      navigate(pageurl.LOGIN)
    }
  }, [])

  const { data, isLoading, mutate, error } = useMutation({
    mutationFn: resetPassword(token),
    onSuccess: () => {
      hookForm.reset()
      setNotification?.('Password reset successful', true)
      setTimeout(() => {
        navigate(pageurl.LOGIN)
      }, 3500)
    },
    onError: ({ response }: any) => {
      const { data } = response
      if (!data) {
        setNotification?.('Something went wrong', false)
      } else {
        setNotification?.(data.message, false)
      }
    }
  })

  const response = getResponse(data, error)

  const handleForgotPassword = (data: IResetPasswordSchema) => {
    mutate({ password: data.password, passwordConfirm: data.passwordConfirm })
  }

  return (
    <div className="s-p-wrapper">
      <PageContainer>
        <div className="separator-h-30" />
        <HeaderComponent title="Reset Password" />
        <div className="separator-h-30" />
        <div className="bg-white rounded py-4 py-lg-5">
          <form
            onSubmit={hookForm.handleSubmit(handleForgotPassword)}
            className="mx-auto f-column-33"
            style={{ maxWidth: '450px' }}
          >
            <TypeInput
              {...hookForm.register('password')}
              placeholder="Enter new password"
              label="Password"
              error={hookForm.formState.errors.password?.message || ''}
              customwidth={'100%'}
            />
            <TypeInput
              {...hookForm.register('passwordConfirm')}
              placeholder="Re-enter your password"
              label="Confirm Password"
              error={hookForm.formState.errors.passwordConfirm?.message || ''}
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
            <TypeButton
              title="Reset Password"
              load={isLoading}
              className="w-100"
            />
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
              style={{ textDecoration: 'underline' }}
              className="LinkContainer"
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

export default ResetPasswordPage
