import {
  IMultiBetTicketResponse,
  IMultiBetTicketResponses,
  ISellerStat,
  ISellerStats
} from '../interface/IBet'
import {
  IUseAPI,
  apiFeatures,
  defaultGETDataTemplate,
  pgQuery,
  useAPIGET
} from '.'
import { onErrorType, onSuccessType } from './sports'
import { IDefaultResponse, useDELETEAPI, useGETAPI, usePATCHAPI } from './utils'
import { GETISUSERLOGGED } from '../constants/global'

export const getMultiBetTickets = async (query?: string) => {
  const route = `prediction/multiple${query || ''}`
  return await apiFeatures.get<IMultiBetTicketResponses>(route)
}

export interface IUseBetMultiBetTicket {
  data: IMultiBetTicketResponses | undefined
  isLoading: boolean
  getMultiBets: (query: string) => void
}

export const useMultiBetTicketsQuery = (): IUseBetMultiBetTicket => {
  const { mutate, data, isLoading } = useAPIGET<IMultiBetTicketResponses>({
    route: `prediction/multiple${GETISUSERLOGGED() ? '' : '/public'}`,
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        multiplePredictions: []
      }
    }
  })

  const getMultiBets = (pageQuery: string) => {
    const pgquery = pgQuery(1)
    mutate({ query: pgquery + (pageQuery || '').replace('?', '&') })
  }

  return {
    data,
    isLoading,
    getMultiBets
  }
}

export const useGetSellerMultiPredictionStats = (
  onSuccess?: onSuccessType<ISellerStats>,
  onError?: onErrorType
): IUseAPI<ISellerStats> => {
  return useGETAPI<{ stats: ISellerStat }, ISellerStats>(
    'prediction/multiple/stats',
    onSuccess,
    onError,
    'getSellerMultiPredictionStats'
  )
}

export const useGetMyMultiPrediction = (
  onSuccess?: onSuccessType<IMultiBetTicketResponses>,
  onError?: onErrorType
): IUseAPI<IMultiBetTicketResponses> => {
  return useGETAPI<
    { multiplePredictions: IMultiBetTicketResponse[] },
    IMultiBetTicketResponses
  >(
    `prediction/multiple${GETISUSERLOGGED() ? '' : '/public'}`,
    onSuccess,
    onError,
    'getMyMultiPrediction'
  )
}
export const useGetPublicMultiPrediction = (
  onSuccess?: onSuccessType<IMultiBetTicketResponses>,
  onError?: onErrorType
): IUseAPI<IMultiBetTicketResponses> => {
  return useGETAPI<
    { multiplePredictions: IMultiBetTicketResponse[] },
    IMultiBetTicketResponses
  >(
    `prediction/multiple${GETISUSERLOGGED() ? '' : '/public'}`,
    onSuccess,
    onError,
    'getPublicMultiPrediction'
  )
}
export const useGetMultiPrediction = (
  onSuccess?: onSuccessType<IMultiBetTicketResponses>,
  onError?: onErrorType
): IUseAPI<IMultiBetTicketResponses> => {
  return useGETAPI<
    { multiplePredictions: IMultiBetTicketResponse[] },
    IMultiBetTicketResponses
  >(
    `prediction/multiple${GETISUSERLOGGED() ? '' : '/public'}`,
    onSuccess,
    onError,
    'getMultiPrediction'
  )
}
export const useGetMultiPredictionByID = (
  onSuccess?: onSuccessType<IMultiBetTicketResponses>,
  onError?: onErrorType
): IUseAPI<IMultiBetTicketResponses> => {
  return useGETAPI<
    { multiplePredictions: IMultiBetTicketResponse[] },
    IMultiBetTicketResponses
  >(
    `prediction/multiple${GETISUSERLOGGED() ? '' : '/public'}`,
    onSuccess,
    onError
  )
}

export const useUpdateMultiPrediction = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse> => {
  return usePATCHAPI('prediction/multiple', onSuccess, onError)
}

export const useDeleteMultiPrediction = (
  onSuccess?: onSuccessType<IDefaultResponse>,
  onError?: onErrorType
): IUseAPI<IDefaultResponse> => {
  return useDELETEAPI('prediction/multiple', onSuccess, onError)
}

export const useGetMultiPredictions = (
  onSuccess?: onSuccessType<IMultiBetTicketResponses>,
  onError?: onErrorType
): IUseAPI<IMultiBetTicketResponses> => {
  return useGETAPI<
    { multiplePredictions: IMultiBetTicketResponse[] },
    IMultiBetTicketResponses
  >('prediction/multiple', onSuccess, onError)
}
