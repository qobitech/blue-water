import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {
  GETISUSERSUSPENDED,
  getIsAdminLogged,
  getIsLogged,
  getIsOnboarding,
  getUserData
} from '../constants/global'
import { pageurl } from '../constants/pageurl'
import { IRouteProps } from './auth-route'
import DataWrapper from '../components/layout/data-wrapper'
import { _isUrl } from '../components/utils/helper'
import { IUSH } from '../components/layout/state-hook'
import { IComponentState } from '../components/layout/global-schema'

const UserRoute: FC<IRouteProps> = ({ element, path, global }) => {
  // if user is not logged in
  const userNotLogged = () => !getIsLogged() && !getIsAdminLogged()

  if (userNotLogged()) {
    // localStorage.clear()
    return <Navigate to={pageurl.HOME} />
  }

  if (GETISUSERSUSPENDED()) {
    return <Navigate to={pageurl.SUSPENDED} />
  }

  if (getIsLogged())
    return (
      <User>
        <PageRoute element={element} global={global} />
      </User>
    )

  return <PageRoute element={element} global={global} />
}

const PageRoute = ({
  element: Component,
  global
}: {
  element: React.ElementType<any>
  global: IUSH<IComponentState>
}) => {
  return (
    <DataWrapper route={getIsAdminLogged() ? 'admin' : 'user'} global={global}>
      <Component />
    </DataWrapper>
  )
}

export default UserRoute

const User = ({ children }: { children?: ReactNode }) => {
  const location = useLocation()

  if (!getIsOnboarding()) {
    return (
      <Navigate to={`${pageurl.ONBOARDING}/${getUserData()?.user?.userName}`} />
    )
  }
  if (!getUserData().user.welcome && !_isUrl(pageurl.WELCOME, location)) {
    return <Navigate to={pageurl.WELCOME} />
  }

  return <>{children}</>
}
