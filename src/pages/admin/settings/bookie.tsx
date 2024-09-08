import { IBookies } from '../../../interface/IOther'
import {
  addSchemaType2,
  formComponentType2,
  getStatus,
  typeAction
} from './data'
import { UseFormReturn } from 'react-hook-form'
import MainComponent from './main-component'

const Bookie = () => {
  const getMainData = (data: IBookies) => data?.data?.bookies

  return (
    <MainComponent
      formComponent={formComponentType2}
      getMainData={getMainData}
      initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
        hookForm.setValue('title', data?.title)
        hookForm.setValue('url', data?.url)
      }}
      querystring="allbookies"
      route="bookie"
      schema={addSchemaType2}
      title="Bookie"
      updateProps={[
        {
          id: 'title',
          placeHolder: 'Enter title',
          component: 'input'
        },
        {
          id: 'url',
          placeHolder: 'Enter url',
          component: 'input'
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
        url: hookForm.getValues('url'),
        status: actionType === 'status' ? getStatus(status) : status
      })}
    />
  )
}

export default Bookie
