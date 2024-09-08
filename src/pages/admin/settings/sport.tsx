import { UseFormReturn } from 'react-hook-form'
import MainComponent from './main-component'
import { ISports } from '../../../interface/IOther'
import {
  addSchemaType1,
  formComponentType1,
  getStatus,
  typeAction
} from './data'

const Sport = () => {
  const getMainData = (data: ISports) => data?.data?.sports

  return (
    <MainComponent
      formComponent={formComponentType1}
      getMainData={getMainData}
      initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
        hookForm.setValue('title', data?.title)
        hookForm.setValue('description', data?.description)
      }}
      querystring="allmembership"
      route="sport"
      schema={addSchemaType1}
      title="Sport"
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
    />
  )
}

export default Sport
