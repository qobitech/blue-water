import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import {
  getIsAdminLogged,
  getIsLogged,
  getIsOnboarding,
  getUserData
} from '../constants/global'
import { pageurl } from '../constants/pageurl'
import DataWrapper from '../components/layout/data-wrapper'
import { IComponentState } from '../components/layout/global-schema'
import { IUSH } from '../components/layout/state-hook'

export interface IRouteProps {
  element: React.ElementType
  path?: string | string[] | undefined
  global: IUSH<IComponentState>
}

const AuthRoute: FC<IRouteProps> = ({ element: Component, global }) => {
  if (getIsAdminLogged()) return <Admin />
  if (getIsLogged()) return <Auth />

  return (
    <DataWrapper route="auth" global={global}>
      <Component />
    </DataWrapper>
  )
}

export default AuthRoute

const Auth = () => {
  const url = pageurl.HOME
  return (
    <Navigate
      to={
        !getIsOnboarding()
          ? `${pageurl.ONBOARDING}/${getUserData()?.user?.userName}`
          : url
      }
    />
  )
}

const Admin = () => {
  return <Navigate to={pageurl.ADMINDASHBOARD} />
}
