import { IRewards } from '../../../interface/IOther'
import MainComponent from './main-component'
import {
  addSchemaType1,
  formComponentType3,
  getStatus,
  typeAction
} from './data'
import { UseFormReturn } from 'react-hook-form'

const RewardSettings = () => {
  const getMainData = (data: IRewards) => data?.data?.rewards

  return (
    <div>
      <MainComponent
        formComponent={formComponentType3}
        getMainData={getMainData}
        // updateCreateHookForm={[{ role: selectedRole }]}
        initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
          hookForm.setValue('title', data?.title)
          hookForm.setValue('description', data?.description)
        }}
        querystring="reward"
        route={`reward`}
        schema={addSchemaType1}
        title="Reward"
        updateProps={[
          {
            id: 'title',
            placeHolder: 'Enter title',
            type: 'text',
            component: 'input'
          },
          {
            id: 'description',
            placeHolder: 'Enter description',
            type: 'text',
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
        query={''}
      />
    </div>
  )
}

export default RewardSettings
