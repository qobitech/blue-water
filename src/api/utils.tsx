import {
  IDefaultGETTemplate,
  IUseAPI,
  IUseAPIMedia,
  defaultGETDataTemplate,
  defaultPATCHDataTemplate,
  useAPIDELETE,
  useAPIGET,
  useAPIPATCH,
  useAPIPOST,
  useAPIPOSTMEDIA,
  useAPIPUT,
  useAPIPUTMEDIA
} from '.'
import { IComponentStateKey } from '../components/layout/global-schema'
import { onErrorType, onSuccessType } from './sports'

export interface IDefaultResponse<T = undefined> {
  status: string
  message: string
  data?: T
}

export const usePOSTAPI = <T extends undefined | {}>(
  route: string,
  onSuccess?: onSuccessType<IDefaultResponse<T>>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse<T>> => {
  const props = useAPIPOST({
    route,
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return props
}

export const useGETAPI = <
  F extends {} | undefined,
  T extends IDefaultGETTemplate<F>
>(
  route: string,
  onSuccess?: onSuccessType<T>,
  onError?: onErrorType,
  key?: IComponentStateKey
): IUseAPI<T> => {
  const ddt = defaultGETDataTemplate as T
  const props = useAPIGET<T>({
    route,
    defaultData: { ...ddt },
    onSuccess,
    onError,
    key
  })
  return props
}

export const usePATCHAPI = <T extends {} | undefined>(
  route: string,
  onSuccess?: onSuccessType<IDefaultResponse<T>>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse<T>> => {
  const props = useAPIPATCH({
    route,
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return props
}

export const usePUTAPI = (
  route: string,
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  const props = useAPIPUT({
    route,
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return props
}

export const useDELETEAPI = (
  route: string,
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<{
  status: string
  message: string
}> => {
  const props = useAPIDELETE({
    defaultData: { ...defaultPATCHDataTemplate },
    route,
    onSuccess,
    onError
  })
  return props
}

export const usePUTAPIMEDIA = <T extends {} | undefined>(
  route: string,
  onSuccess?: onSuccessType<IDefaultResponse<T>>,
  onError?: onErrorType
): IUseAPIMedia<IDefaultResponse<T>> => {
  const props = useAPIPUTMEDIA({
    route,
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return props
}

export const usePOSTAPIMEDIA = <T extends {} | undefined>(
  route: string,
  onSuccess?: onSuccessType<IDefaultResponse<T>>,
  onError?: onErrorType
): IUseAPIMedia<IDefaultResponse<T>> => {
  const props = useAPIPOSTMEDIA({
    route,
    defaultData: { ...defaultPATCHDataTemplate },
    onSuccess,
    onError
  })
  return props
}
