import { INotificationPreferences } from '../../../interface/IOther'
import MainComponent from './main-component'
import {
  addSchemaType1,
  formComponentType1,
  getStatus,
  typeAction
} from './data'
import { UseFormReturn } from 'react-hook-form'

const NotificationPreferenceSettings = () => {
  const getMainData = (data: INotificationPreferences) =>
    data?.data?.notificationPreference

  return (
    <MainComponent
      formComponent={formComponentType1}
      getMainData={getMainData}
      initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
        hookForm.setValue('title', data?.title)
        hookForm.setValue('description', data?.description)
      }}
      querystring="allnotification-preference"
      route="notification-preference"
      schema={addSchemaType1}
      title="Notification Preference"
      updateProps={[
        {
          id: 'title',
          placeHolder: 'Enter title',
          component: 'input'
        },
        {
          id: 'description',
          placeHolder: 'Enter description',
          component: 'text-area'
        }
      ]}
      getFormData={(
        hookForm: UseFormReturn<any, any>,
        id: string,
        actionType: typeAction,
        status: 'Inactive' | 'Active'
      ) => ({
        id,
        title: hookForm.getValues('title'),
        description: hookForm.getValues('description'),
        status: actionType === 'status' ? getStatus(status) : status
      })}
    />
  )
}

export default NotificationPreferenceSettings
