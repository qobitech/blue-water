import { IUseAPI } from '.'
import { getIsLogged } from '../constants/global'
import { IBookie, IBookies } from '../interface/IOther'
import { onErrorType, onSuccessType } from './sports'
import { useGETAPI } from './utils'

export const isPublic = getIsLogged() ? '' : '/public'

export const useBookiesQuery = (
  onSuccess?: onSuccessType<IBookies>,
  onError?: onErrorType
): IUseAPI<IBookies> => {
  return useGETAPI<{ bookies: IBookie[] }, IBookies>(
    `bookie${isPublic}`,
    onSuccess,
    onError,
    'getBookies'
  )
}
