import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import {
  GETDASHBOARDURL,
  getIsAdminLogged,
  getIsLogged
} from '../constants/global'
import DataWrapper from '../components/layout/data-wrapper'
import { IRouteProps } from './auth-route'

const PublicRoute: FC<IRouteProps> = ({ element: Component, global }) => {
  if (getIsLogged() || getIsAdminLogged()) {
    return <Navigate to={GETDASHBOARDURL()} />
  }
  return (
    <DataWrapper route="public" global={global}>
      <Component />
    </DataWrapper>
  )
}

export default PublicRoute
