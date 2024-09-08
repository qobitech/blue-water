import { IUseAPI, defaultGETDataTemplate, useAPIGET } from '.'
import { INotificationResponses } from '../interface/INotification'
import { onErrorType, onSuccessType } from './sports'

export const useNotificationQuery = (
  onSuccess?: onSuccessType<INotificationResponses>,
  onError?: onErrorType
): IUseAPI<INotificationResponses> => {
  const notificationProps = useAPIGET<INotificationResponses>({
    route: 'notification',
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        notifications: []
      }
    },
    onSuccess,
    onError
  })

  return notificationProps
}

export const useDisappearingCodeNotificationQuery = (
  onSuccess?: onSuccessType<INotificationResponses>,
  onError?: onErrorType
): IUseAPI<INotificationResponses> => {
  const notificationProps = useAPIGET<INotificationResponses>({
    route: 'notification/bet-codes',
    defaultData: {
      ...defaultGETDataTemplate,
      data: {
        notifications: []
      }
    },
    onError,
    onSuccess
  })

  return notificationProps
}
