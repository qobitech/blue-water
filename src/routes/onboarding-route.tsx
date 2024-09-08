import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import {
  GETDASHBOARDURL,
  GETISUSERSUSPENDED,
  getIsLogged,
  getIsOnboarding
} from '../constants/global'
import { pageurl } from '../constants/pageurl'
import DataWrapper from '../components/layout/data-wrapper'
import { IRouteProps } from './auth-route'

const OnboardingRoute: FC<IRouteProps> = ({
  element: Component,
  path,
  global
}) => {
  const isUserLogged = () => getIsLogged()
  const isUserOnboarding = () => isUserLogged() && !getIsOnboarding()

  if (GETISUSERSUSPENDED()) {
    return <Navigate to={pageurl.SUSPENDED} />
  }

  if (!isUserOnboarding()) {
    return <Navigate to={GETDASHBOARDURL()} />
  }
  return (
    <DataWrapper route="onboarding" global={global}>
      <Component />
    </DataWrapper>
  )
}

export default OnboardingRoute
