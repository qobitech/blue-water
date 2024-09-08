import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import {
  GETISUSERLOGGED,
  GETISUSERSUSPENDED,
  getIsLogged,
  getIsOnboarding,
  getUserData,
  onLogout
} from '../constants/global'
import { pageurl } from '../constants/pageurl'
import DataWrapper from '../components/layout/data-wrapper'
import { IRouteProps } from './auth-route'

const GeneralRoute: FC<IRouteProps & { noWrapper?: boolean }> = ({
  element: Component,
  path,
  noWrapper,
  global
}) => {
  if (!getIsLogged()) {
    onLogout()
  }

  const isUserOnboarding = () => getIsLogged() && !getIsOnboarding()

  if (GETISUSERSUSPENDED()) {
    return <Navigate to={pageurl.SUSPENDED} />
  }

  if (isUserOnboarding()) {
    return (
      <Navigate to={`${pageurl.ONBOARDING}/${getUserData()?.user?.userName}`} />
    )
  }
  return (
    <DataWrapper
      route={GETISUSERLOGGED() ? 'user' : 'public'}
      noWrapper={noWrapper}
      global={global}
    >
      <Component />
    </DataWrapper>
  )
}

export default GeneralRoute
