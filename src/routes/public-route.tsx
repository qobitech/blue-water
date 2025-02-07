import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import DataWrapper from '../components/layout/data-wrapper'
import { IComponentState } from '../components/layout/global-schema'
import { IUSH } from '../components/layout/state-hook'

const PublicRoute: FC<{ global: IUSH<IComponentState> }> = ({ global }) => {
  return (
    <DataWrapper global={global}>
      <Outlet />
    </DataWrapper>
  )
}

export default PublicRoute
