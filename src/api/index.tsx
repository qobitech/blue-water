import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import {
  copyObjectsWithUniqueId,
  replaceObjects
} from '../components/utils/helper'
import { BASEURL } from '../constants/global'
import {
  MutationFunction,
  UseMutateFunction,
  useMutation,
  useQuery
} from '@tanstack/react-query'
// import TextPrompt from '../components/utils/text-prompt'
import { onSuccessType } from './sports'
import { useGlobalContext } from '../components/layout/context'
import { IComponentStateKey } from '../components/layout/global-schema'

export const getResponse = (data: any, error: any): IResponse => {
  if (!data) {
    if (error !== null) {
      const data = error?.response?.data
      return { message: data?.message || '', status: data?.status || '' }
    }
    return { message: '', status: '' }
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { message, status } = data as any
  return { message: message as string, status: status as string }
}

export interface IResponse {
  message: any
  status: string
}

export interface IResponseComponent {
  response: IResponse
  cta?: {
    text: string
    onClick?: () => void
  }
  timeout?: number
  spaceTop?: number
  spaceBottom?: number
}

// export const ResponseComponent = memo(
//   ({ response, cta, timeout, spaceTop, spaceBottom }: IResponseComponent) => {
//     const [showResponse, setShowResponse] = useState<boolean>(false)

//     const { data } = useMemoizedData(response, {
//       message: '',
//       status: ''
//     })

//     useEffect(() => {
//       let ts: NodeJS.Timeout
//       if (data.message) {
//         setShowResponse(true)
//         if (timeout) {
//           ts = setTimeout(() => {
//             setShowResponse(false)
//           }, timeout)
//         }
//       } else {
//         setShowResponse(false)
//       }

//       return () => {
//         clearTimeout(ts)
//       }
//     }, [data])

//     const marginTop = spaceTop ? spaceTop + 'px' : ''
//     const marginBottom = spaceBottom ? spaceBottom + 'px' : ''

//     return (
//       <>
//         {data.message ? (
//           <div className="f-row-20 aic">
//             {showResponse ? (
//               <div style={{ marginTop, marginBottom }}>
//                 <TextPrompt
//                   prompt={data.message}
//                   status={data.status === 'success'}
//                 />
//               </div>
//             ) : null}
//           </div>
//         ) : null}
//       </>
//     )
//   }
// )

// ResponseComponent.displayName = 'ResponseComponent'

export const pgQuery = (pgNum: number) => {
  return `?page=${pgNum}&limit=10`
}

export const getMultiDataArray = <
  T extends { [key: string]: any },
  S extends { [key: string]: any }
>(
  data: T,
  multiData: S[],
  scrollDirection: 'top' | 'bottom' | null,
  keyId: string,
  arrayKey: string
) => {
  const mb2 = data.data[arrayKey]
  if (!multiData) return mb2
  if (scrollDirection === null) return replaceObjects(mb2, multiData, keyId)
  if (scrollDirection !== 'top')
    return copyObjectsWithUniqueId([...mb2], [...multiData], keyId, 'queue')
  return copyObjectsWithUniqueId([...mb2], [...multiData], keyId, 'stack')
}

export const getNextPage = <T extends { [key: string]: any }>(
  data: T | undefined,
  scrollDirection: 'top' | 'bottom'
): number => {
  const currentPage = data?.currentPage || 0
  if (scrollDirection === 'bottom') return currentPage + 1
  return Math.max(1, currentPage - 1)
}

interface IT {
  [key: string]: any
}

export const stackData = <T extends IT>(data: T, dataArray: T[]) => {
  const temp = dataArray
  temp.unshift(data)
  return temp
}

export const queueData = <T extends IT>(data: T, dataArray: T[]) => {
  const temp = dataArray
  temp.push(data)
  return temp
}

export const removeData = <T extends IT>(
  dataArray: T[],
  startIndex: number,
  deleteCount: number
) => {
  const temp = dataArray
  temp.splice(startIndex, deleteCount)
  return temp
}

interface IApiConfig {
  route: string
  method: string
  data?: any
  headers?: { [key: string]: any }
}

export class API {
  private getReqData(data?: { [key: string]: any }) {
    let res = {}
    for (const i in data) {
      if (data[i]) res = { ...res, [i]: data[i] }
    }
    return res
  }

  private async apiConfig({ data, headers, method, route }: IApiConfig) {
    // try {
    const { data: response } = await axios({
      url: `${BASEURL}/api/v1/${route}`,
      method,
      // data: this.getReqData(data),
      data,
      headers: {
        'Content-type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        ...headers
      },
      withCredentials: true
    })

    return response
  }

  private async apiConfigMultiForm({ data, method, route }: IApiConfig) {
    const { data: response } = await axios({
      url: `${BASEURL}/api/v1/${route}`,
      method,
      data,
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      withCredentials: true
    })
    return response
  }

  async post<T extends {}>(
    route: string,
    props?: { [key: string]: any }
  ): Promise<T> {
    return await this.apiConfig({ route, method: 'post', data: props })
  }

  async get<T extends {}>(route: string): Promise<T> {
    return await this.apiConfig({ route, method: 'get' })
  }

  async put<T extends {}>(
    route: string,
    id: string,
    req?: {
      [key: string]: any
    }
  ): Promise<T> {
    return await this.apiConfig({
      route: route + (id ? `/${id}` : ''),
      method: 'put',
      data: req
    })
  }

  async putMedia<T extends {}>(
    route: string,
    id: string,
    req: FormData
  ): Promise<T> {
    return await this.apiConfigMultiForm({
      route: route + (id ? `/${id}` : ''),
      method: 'put',
      data: req
    })
  }

  async postMedia<T extends {}>(
    route: string,
    id: string,
    req: FormData
  ): Promise<T> {
    return await this.apiConfigMultiForm({
      route: route + (id ? `/${id}` : ''),
      method: 'post',
      data: req
    })
  }

  async patch<T extends {}>(
    route: string,
    id: string,
    req?: {
      [key: string]: any
    }
  ): Promise<T> {
    return await this.apiConfig({
      route: route + (id ? `/${id}` : ''),
      method: 'patch',
      data: req
    })
  }

  async delete(route: string, id?: string, req?: any): Promise<any> {
    return await this.apiConfig({
      route: route + (id ? `/${id}` : ''),
      method: 'delete',
      data: req
    })
  }
}

export const apiFeatures = new API()

export interface IAPIMutate<T, P> {
  mutate: UseMutateFunction<T, unknown, P, unknown>
  isLoading: boolean
  data: T | undefined
  error: any
}

interface IAPIMutateArg<T, P> {
  mutationFn: MutationFunction<T, P> | undefined
  onSuccess?: (data: any) => void
  onError?:
    | ((error: unknown, variables: P, context: unknown) => unknown)
    | undefined
}

export const useAPIMutate = <T extends {}, P extends {}>({
  mutationFn,
  onError,
  onSuccess
}: IAPIMutateArg<T, P>): IAPIMutate<T, P> => {
  const { mutate, isLoading, data, error } = useMutation({
    mutationFn,
    onSuccess,
    onError
  })

  return {
    mutate,
    isLoading,
    data,
    error
  }
}

export interface IUseAPIArg {
  query?: string
  id?: string
  body?: { [key: string]: any }
}

export interface IUseAPI<T> {
  data: T
  isLoading: boolean
  // mutate: UseMutateFunction<T, unknown, string, unknown>
  mutate: UseMutateFunction<T, unknown, IUseAPIArg, unknown>
  response: IResponse
  error: any
}

export interface IUseAPIQuery<T> {
  data: T
  isLoading: boolean
  // mutate: UseMutateFunction<T, unknown, string, unknown>
  response: IResponse
  error: any
}

interface IAPIArg<T> {
  defaultData: T
  route: string
  onSuccess?: onSuccessType<T>
  onError?:
    | ((error: unknown, variables: any, context: unknown) => unknown)
    | undefined
  noMemoize?: boolean
  key?: IComponentStateKey
}

export const useMemoizedData = <T extends {}>(
  data: T | undefined,
  defaultData: T,
  response: IResponse
) => {
  const [storedData, setStoredData] = useState<T>(defaultData)
  const { setNotification } = useGlobalContext()

  useEffect(() => {
    if (response.message)
      setNotification?.(response.message, response.status === 'success')
  }, [response.message])

  const memoizedData = useMemo(() => {
    if (!data) return storedData
    setStoredData(data)
    return data
  }, [data])

  return {
    data: memoizedData
  }
}

export interface IDefaultGETTemplate<F = undefined> {
  currentPage?: number
  hasNext?: boolean
  message?: string
  pages?: number
  result?: number
  status: string
  data: F
}

export const defaultGETDataTemplate = {
  currentPage: 0,
  hasNext: false,
  message: '',
  pages: 0,
  result: 0,
  status: 'success'
}

export type dGDTType = typeof defaultGETDataTemplate

export const defaultPATCHDataTemplate = {
  status: 'success',
  message: `transaction updated successfully`
}

export const useAPIGET = <T extends {}>({
  route,
  onError,
  onSuccess,
  defaultData,
  noMemoize,
  key
}: IAPIArg<T>): IUseAPI<T> => {
  const { global } = useGlobalContext()
  const { data, isLoading, mutate, error } = useAPIMutate({
    mutationFn: async (data: IUseAPIArg) => {
      const { query, id } = data
      return await apiFeatures.get<T>(
        `${route}${id ? '/' + id : ''}${query ? `${query}` : ''}`
      )
    },
    onError,
    onSuccess: (data) => {
      if (key) {
        global.updateState(key, data)
      }
      onSuccess?.(data)
    }
  })

  const { data: resData } = useMemoizedData<T>(
    data,
    defaultData,
    getResponse(data, error)
  )

  return {
    data: noMemoize ? (data as T) : resData,
    isLoading,
    mutate,
    response: getResponse(data, error),
    error
  }
}

interface IAPIArgQuery<T> {
  defaultData: T
  route: string
  onSuccess?: (data: T) => void
  onError?: ((err: unknown) => void) | undefined
  data?: IUseAPIArg
  queryKey?: [string]
}

export const useAPIGETQUERY = <T extends {}>({
  route,
  onError,
  onSuccess,
  defaultData,
  data,
  queryKey
}: IAPIArgQuery<T>): IUseAPIQuery<T> => {
  const { query } = data as IUseAPIArg
  const {
    data: res,
    isLoading,
    error
  } = useQuery({
    queryFn: async () =>
      await apiFeatures.get<T>(`${route}${query ? `${query}` : ''}`),
    queryKey,
    onError,
    onSuccess
    // staleTime: Infinity,
    // cacheTime: 0,
    // retry: false,
    // refetchOnWindowFocus: false
  })

  const { data: resData } = useMemoizedData<T>(
    res,
    defaultData,
    getResponse(data, error)
  )

  return {
    data: resData,
    isLoading,
    response: getResponse(data, error),
    error
  }
}

interface IAPIPostArg<T> extends IAPIArg<T> {}

export const useAPIPOST = <T extends {}>({
  route,
  onError,
  onSuccess,
  defaultData,
  noMemoize
}: IAPIPostArg<T>): IUseAPI<T> => {
  const { data, isLoading, mutate, error } = useAPIMutate({
    mutationFn: async (data: IUseAPIArg) => {
      const { query, body, id } = data
      return await apiFeatures.post<T>(
        `${route}${id ? '/' + id : ''}${query ? `${query}` : ''}`,
        body
      )
    },
    onError,
    onSuccess
  })

  const { data: resData } = useMemoizedData<T>(
    data,
    defaultData,
    getResponse(data, error)
  )

  return {
    data: noMemoize ? (data as T) : resData,
    isLoading,
    mutate,
    response: getResponse(data, error),
    error
  }
}

interface IAPIPutArg<T> extends IAPIArg<T> {}

export const useAPIPUT = <T extends {}>({
  route,
  onError,
  onSuccess,
  defaultData,
  noMemoize
}: IAPIPutArg<T>): IUseAPI<T> => {
  const { data, isLoading, mutate, error } = useAPIMutate({
    mutationFn: async (data: IUseAPIArg) => {
      const { query, id, body } = data
      return await apiFeatures.put<T>(
        `${route}${id ? '/' + id : ''}${query ? `${query}` : ''}`,
        '',
        body
      )
    },
    onError,
    onSuccess
  })

  const { data: resData } = useMemoizedData<T>(
    data,
    defaultData,
    getResponse(data, error)
  )

  return {
    data: noMemoize ? (data as T) : resData,
    isLoading,
    mutate,
    response: getResponse(data, error),
    error
  }
}

export interface IUseAPIMediaArg {
  query?: string
  id?: string
  body: FormData
}

export interface IUseAPIMedia<T> {
  data: T
  isLoading: boolean
  // mutate: UseMutateFunction<T, unknown, string, unknown>
  mutate: UseMutateFunction<T, unknown, IUseAPIMediaArg, unknown>
  response: IResponse
  error: any
}

export const useAPIPUTMEDIA = <T extends {}>({
  route,
  onError,
  onSuccess,
  defaultData,
  noMemoize
}: IAPIPutArg<T>): IUseAPIMedia<T> => {
  const { data, isLoading, mutate, error } = useAPIMutate({
    mutationFn: async (data: IUseAPIMediaArg) => {
      const { query, id, body } = data
      return await apiFeatures.putMedia<T>(
        `${route}${id ? '/' + id : ''}${query ? `${query}` : ''}`,
        '',
        body
      )
    },
    onError,
    onSuccess
  })

  const { data: resData } = useMemoizedData<T>(
    data,
    defaultData,
    getResponse(data, error)
  )

  return {
    data: noMemoize ? (data as T) : resData,
    isLoading,
    mutate,
    response: getResponse(data, error),
    error
  }
}

export const useAPIPOSTMEDIA = <T extends {}>({
  route,
  onError,
  onSuccess,
  defaultData,
  noMemoize
}: IAPIPutArg<T>): IUseAPIMedia<T> => {
  const { data, isLoading, mutate, error } = useAPIMutate({
    mutationFn: async (data: IUseAPIMediaArg) => {
      const { query, id, body } = data
      return await apiFeatures.postMedia<T>(
        `${route}${id ? '/' + id : ''}${query ? `${query}` : ''}`,
        '',
        body
      )
    },
    onError,
    onSuccess
  })

  const { data: resData } = useMemoizedData<T>(
    data,
    defaultData,
    getResponse(data, error)
  )

  return {
    data: noMemoize ? (data as T) : resData,
    isLoading,
    mutate,
    response: getResponse(data, error),
    error
  }
}

export const useAPIPATCH = <T extends {}>({
  route,
  onError,
  onSuccess,
  defaultData,
  noMemoize
}: IAPIPutArg<T>): IUseAPI<T> => {
  const { data, isLoading, mutate, error } = useAPIMutate({
    mutationFn: async (data: IUseAPIArg) => {
      const { query, id, body } = data
      return await apiFeatures.patch<T>(
        `${route}${id ? '/' + id : ''}${query ? `${query}` : ''}`,
        '',
        body
      )
    },
    onError,
    onSuccess
  })

  const { data: resData } = useMemoizedData<T>(
    data,
    defaultData,
    getResponse(data, error)
  )

  return {
    data: noMemoize ? (data as T) : resData,
    isLoading,
    mutate,
    response: getResponse(data, error),
    error
  }
}

export interface IAPIDeleteArg<T> extends IAPIArg<T> {}

export const useAPIDELETE = <T extends {}>({
  route,
  onError,
  onSuccess
}: IAPIDeleteArg<T>): IUseAPI<T> => {
  const { data, isLoading, mutate, error } = useAPIMutate({
    mutationFn: async (data: IUseAPIArg) => {
      const { query, id, body } = data
      return await apiFeatures.delete(
        `${route}${id ? '/' + id : ''}${query ? `${query}` : ''}`,
        '',
        body
      )
    },
    onError,
    onSuccess
  })

  return {
    data,
    isLoading,
    mutate,
    response: getResponse(data, error),
    error
  }
}

export interface ISendEmail {
  basicInformation: {
    name: string
    company: string
    email: string
    phone: string
    website: string
  }
  developmentExperience: {
    experience: string
    projects: string
    projectSize: string
    projectsDeveloped: string[]
  }
  projectVision: {
    estimatedBudget: string
    financingMethod: string
    proposedDevelopment: string
    waterfrontExperience: string
  }
  complianceCertification: {
    developerLicense: string
    legalIssues: string
  }
  nextSteps: {
    discoveryMeeting: string
    communicationMethod: string[]
  }
}

export const sendEmail = async (
  req: ISendEmail,
  onSuccess?: () => void,
  onFailure?: () => void
) => {
  fetch('https://api.bluewatershoresrealty.com/api/v1/send-mail', {
    // fetch('http://localhost:7100/api/v1/send-mail', {
    method: 'POST',
    body: JSON.stringify({
      ...req
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (res) => await res.json())
    .then(() => {
      onSuccess?.()
    })
    .catch(() => {
      onFailure?.()
    })
}
