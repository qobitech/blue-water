import {
  HeaderComponent,
  PageContainer
} from '../../../components/utils/reusable'
import { BrandComponent } from '../../onboarding'
import NotificationModal, {
  IUseNotificationModal
} from '../../../components/utils/modal'
import { ILoginResponse } from '../../../interface/IAuth'
import { apiFeatures } from '../../../api'
import { gallery } from '../../../assets'
import { LoginFormComponent } from './form-component'

export const login = async (userProps: {
  email: string
  password: string
}): Promise<ILoginResponse> => {
  return await apiFeatures.post<ILoginResponse>('login', userProps)
}

const LoginPage = () => {
  return (
    <div className="s-p-wrapper">
      <PageContainer>
        <div className="separator-h-30" />
        <HeaderComponent title="Login" />
        <div className="separator-h-30" />
        <div className="grid-wrapper-50 bg-white">
          <div
            className="BGComponent"
            style={{ backgroundImage: `url(${gallery.signin.src})` }}
          >
            <div className="shader-7" />
            <div className="pl-5 pb-5 w-100 h-100 f-row">
              <BrandComponent />
            </div>
          </div>
          <div className="px-2 px-lg-5">
            <LoginFormComponent />
          </div>
        </div>
        <div className="separator-h-70" />
      </PageContainer>
    </div>
  )
}

export const LoginModalForm = ({
  useNotificationProps
}: {
  useNotificationProps: IUseNotificationModal
}) => {
  return (
    <NotificationModal
      useNotificationProps={useNotificationProps}
      size="medium"
      disableClose
    >
      <LoginFormComponent
        title="Login to continue your session"
        isModal
        isSessionTimeout
      />
    </NotificationModal>
  )
}

export default LoginPage
