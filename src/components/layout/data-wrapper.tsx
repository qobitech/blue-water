import { cloneElement } from 'react'
import Dashboard from '.'
import { HVC } from '../utils/hvc'
import { routeType } from '../../constants/global'
import { IUSH } from './state-hook'
import { IComponentState } from './global-schema'

interface IDataWrapper {
  route: routeType
  children: any
  props?: any
  noWrapper?: boolean
  global: IUSH<IComponentState>
}

const DataWrapper: React.FC<IDataWrapper> = ({
  children,
  route,
  noWrapper,
  global
}) => {
  return (
    <>
      <HVC removeDOM view={noWrapper || false}>
        {cloneElement(children)}
      </HVC>
      <HVC removeDOM view={!noWrapper}>
        <Dashboard route={route} global={global}>
          {cloneElement(children)}
        </Dashboard>
      </HVC>
    </>
  )
}

export default DataWrapper
