import { IUseAPI } from '.'
import { ICompetition, ICompetitions } from '../interface/ICompetition'
import { onErrorType, onSuccessType } from './sports'
import { useGETAPI } from './utils'

export const useGetCompetition = (
  onSuccess?: onSuccessType<ICompetitions>,
  onError?: onErrorType
): IUseAPI<ICompetitions> => {
  return useGETAPI<{ competitions: ICompetition[] }, ICompetitions>(
    'competition',
    onSuccess,
    onError
  )
}
