import { IUseAPI } from '.'
import {
  //   IPayPerTipSchedule,
  IPayPerTipScheduleResponse
} from '../interface/IOther'
import { onErrorType, onSuccessType } from './sports'
import { useGETAPI } from './utils'

export const useGetEarnings = (
  onSuccess?: onSuccessType<IPayPerTipScheduleResponse>,
  onError?: onErrorType
): IUseAPI<IPayPerTipScheduleResponse> => {
  return useGETAPI('schedule/pay-per-tip', onSuccess, onError)
}
