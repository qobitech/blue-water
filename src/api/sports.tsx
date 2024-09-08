import { IUseAPI } from '.'
import { ISport, ISports } from '../interface/IOther'
import { isPublic } from './bookies'
import { useGETAPI } from './utils'

export interface IUseAPIArg<T> {
  onSuccess?: (data: T) => void
  onError?: (error: unknown, variables: any, context: unknown) => unknown
}

export type onSuccessType<T = undefined> = (data: T) => void

export type onErrorType = (
  error: unknown,
  variables: any,
  context: unknown
) => unknown

export const useSportsQuery = (
  onSuccess?: onSuccessType<ISports>,
  onError?: onErrorType
): IUseAPI<ISports> => {
  return useGETAPI<{ sports: ISport[] }, ISports>(
    `sport${isPublic}`,
    onSuccess,
    onError,
    'getSports'
  )
}
