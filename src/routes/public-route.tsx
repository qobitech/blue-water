import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {
  GETDASHBOARDURL,
  getIsAdminLogged,
  getIsLogged
} from '../constants/global'
import DataWrapper from '../components/layout/data-wrapper'
import { IComponentState } from '../components/layout/global-schema'
import { IUSH } from '../components/layout/state-hook'

const PublicRoute: FC<{ global: IUSH<IComponentState> }> = ({ global }) => {
  if (getIsLogged() || getIsAdminLogged()) {
    return <Navigate to={GETDASHBOARDURL()} />
  }
  return (
    <DataWrapper route="public" global={global}>
      <Outlet />
    </DataWrapper>
  )
}

export default PublicRoute
