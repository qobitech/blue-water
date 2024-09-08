import { IMemberSubscriptionServices } from '../../../interface/IOther'
import {
  addSchemaType1,
  formComponentType1,
  getStatus,
  typeAction
} from './data'
import { UseFormReturn } from 'react-hook-form'
import MainComponent from './main-component'

const MemberSubscriptionService = () => {
  const getMainData = (data: IMemberSubscriptionServices) =>
    data?.data?.memberSubscriptionServices

  return (
    <MainComponent
      formComponent={formComponentType1}
      getMainData={getMainData}
      initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
        hookForm.setValue('title', data?.title)
        hookForm.setValue('description', data?.description)
      }}
      querystring="all-member-subscription-service"
      route="member-subscription-service"
      schema={addSchemaType1}
      title="Member Subscription Service"
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

export default MemberSubscriptionService
