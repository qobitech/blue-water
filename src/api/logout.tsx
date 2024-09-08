import { defaultPATCHDataTemplate, useAPIPOST } from '.'
import { useGlobalContext } from '../components/layout/context'
import { getUserData, onLogout } from '../constants/global'
import { pageurl } from '../constants/pageurl'

export interface ILogout {
  logout: () => void
  logoutLoad: boolean
}

export const useLogout = (): ILogout => {
  const { setNotification } = useGlobalContext()
  const { mutate, isLoading: logoutLoad } = useAPIPOST({
    route: 'logout',
    defaultData: { ...defaultPATCHDataTemplate },
    noMemoize: true,
    onSuccess: () => {
      onLogout()
      window.open(pageurl.LOGIN, '_self')
    },
    onError: ({ response }: any) => {
      const { data } = response
      setNotification?.(data.message, false)
    }
  })

  const logout = () => {
    mutate({ id: getUserData()?.user?._id })
  }

  return {
    logout,
    logoutLoad
  }
}
