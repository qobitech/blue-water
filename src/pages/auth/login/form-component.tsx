import { FC } from 'react'
import * as yup from 'yup'
import { defaultPATCHDataTemplate, useAPIPOST } from '../../../api'
import { ILoginResponse } from '../../../interface/IAuth'
import { IUser } from '../../../interface/IUser'
import {
  encodeData,
  getUserRole,
  roleType,
  setTokenExpiryDate,
  typeRoleId,
  GETDASHBOARDURL
} from '../../../constants/global'
import { useLogout } from '../../../api/logout'
import { useFormHook } from '../../../components/utils/hooks'

import { TypeSmallButton } from '../../../components/utils/button'
import TextPrompt from '../../../components/utils/text-prompt'
import LoginForm from '../login-form'
import { useGlobalContext } from '../../../components/layout/context'

export interface ILoginSchema {
  email: string
  password: string
  // rememberMe: boolean
}

const userSchema = {
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required')
}

export const LoginFormComponent = ({
  title,
  isModal,
  isSessionTimeout,
  userRole
}: {
  title?: string
  isModal?: boolean
  isSessionTimeout?: boolean
  userRole?: roleType
}) => {
  const { setNotification, closeSessionHandle } = useGlobalContext()
  const [loginHookForm] = useFormHook<ILoginSchema>(userSchema)

  const { mutate, isLoading, data, response } = useAPIPOST<ILoginResponse>({
    route: 'login',
    defaultData: { ...defaultPATCHDataTemplate, data: { user: {} as IUser } },
    noMemoize: true,
    onSuccess: (data) => {
      setTokenExpiryDate()
      setNotification?.('Login Successful', true)
      loginHookForm.reset()
      const userData = data.data.user
      const userRole = getUserRole(userData.role as typeRoleId)
      encodeData(userData, userRole as roleType)
      if (!isModal) {
        window.open(GETDASHBOARDURL(), '_self')
      } else {
        setTimeout(() => {
          closeSessionHandle?.()
        }, 500)
      }
    },
    onError: ({ response }: any) => {
      const { data } = response
      setNotification?.(data.message, false, true)
    }
  })

  const { logout, logoutLoad } = useLogout()

  const handleLogin = (data: ILoginSchema) => {
    mutate({ body: { email: data.email, password: data.password } })
  }

  const isLoginSuccess = data?.status === 'success'

  return (
    <div>
      {title ? (
        <LoginHeaderSection
          load={logoutLoad}
          onLogout={() => {
            logout()
          }}
          success={isLoginSuccess}
          title={title}
        />
      ) : null}
      {!title || !isLoginSuccess ? (
        <LoginForm
          hookForm={loginHookForm}
          response={response}
          handleLogin={handleLogin}
          load={isLoading}
          isModal={isModal}
          isSessionTimeout={isSessionTimeout}
          userRole={userRole}
        />
      ) : (
        <div className="f-row aic jcc mt-5 mb-4">
          <TypeSmallButton
            title="Close"
            buttonType="danger"
            onClick={closeSessionHandle}
          />
        </div>
      )}
    </div>
  )
}

interface ILHS {
  success: boolean
  title: string
  load: boolean
  onLogout: () => void
}

const LoginHeaderSection: FC<ILHS> = ({ success, title, load, onLogout }) => {
  return (
    <div className="text-center">
      <div className="f-row jcc">
        <TextPrompt
          prompt={`Session ${success ? 'restored' : 'expired'}`}
          status={success}
        />
      </div>
      {!success ? (
        <div className="f-column-13">
          <div className="f-row-10 flex-wrap aic jcc pt-4">
            <TypeSmallButton
              buttonType="danger"
              title="Logout & continue later"
              onClick={onLogout}
              load={load}
            />
            <TypeSmallButton
              buttonType="danger"
              title="Login as a different user"
              onClick={onLogout}
              load={load}
            />
          </div>
          <p className="m-0">or</p>
          <h4 className="m-0">{title}</h4>
        </div>
      ) : null}
    </div>
  )
}
