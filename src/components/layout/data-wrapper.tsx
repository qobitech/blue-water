import { cloneElement } from 'react'
import Dashboard from '.'
import { HVC } from '../utils/hvc'
import { IUSH } from './state-hook'
import { IComponentState } from './global-schema'

interface IDataWrapper {
  children: any
  props?: any
  noWrapper?: boolean
  global: IUSH<IComponentState>
}

const DataWrapper: React.FC<IDataWrapper> = ({
  children,

  noWrapper,
  global
}) => {
  return (
    <>
      <HVC removeDOM view={noWrapper || false}>
        {cloneElement(children)}
      </HVC>
      <HVC removeDOM view={!noWrapper}>
        <Dashboard global={global}>{cloneElement(children)}</Dashboard>
      </HVC>
    </>
  )
}

export default DataWrapper
