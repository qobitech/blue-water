import { IUseAPI } from '.'
import { IReviewResponse, IReviewResponses } from '../interface/IReview'
import { onErrorType, onSuccessType } from './sports'
import { useGETAPI } from './utils'

export const useGetReview = (
  onSuccess?: onSuccessType<IReviewResponses>,
  onError?: onErrorType
): IUseAPI<IReviewResponses> => {
  return useGETAPI<{ reviews: IReviewResponse[] }, IReviewResponses>(
    'review',
    onSuccess,
    onError
  )
}
