import { IChannelSubscriptionThresholds } from '../../../interface/IOther'
import MainComponent from './main-component'
import { getStatus, typeAction } from './data'
import { UseFormReturn } from 'react-hook-form'
import { IFormComponent } from '../../../components/utils/form-builder'
import { useUserTier } from '../../../api/user'
import * as yup from 'yup'
import { roleIdEnum } from '../../auth/register/data'

const ChannelSubscriptionThreshold = () => {
  const { data } = useUserTier(`?role=${roleIdEnum.SELLER}`)

  const userTiers = data?.data.userTiers

  const userTierOptionData = userTiers
    ?.filter((i) => i.status === 'Active')
    .map((i, index) => ({
      id: index,
      label: i.title,
      value: i._id
    }))

  const formComponent: IFormComponent[] = [
    {
      component: 'select',
      id: 'levelId',
      label: 'Level',
      placeHolder: '',
      type: 'text',
      initOptions: { id: 1, label: 'Select Level', value: '' },
      optionData: userTierOptionData
    },
    {
      component: 'input',
      id: 'maxAmount',
      label: 'Max Amount',
      placeHolder: 'Enter amount',
      type: 'text'
    }
  ]

  const schema = {
    levelId: yup.string().required('Level is required'),
    maxAmount: yup.string().required('Max Amount is required')
  }

  const getMainData = (data: IChannelSubscriptionThresholds) =>
    data?.data?.channelSubscriptionThresholds

  const getTitle = (value: string) => {
    return userTiers?.filter((i) => i._id === value)?.[0]?.title || ''
  }

  return (
    <MainComponent
      formComponent={formComponent}
      getMainData={getMainData}
      initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
        hookForm.setValue('levelId', data?.levelId)
        hookForm.setValue('maxAmount', data?.maxAmount)
      }}
      querystring="channel-subcription-threshold"
      route="channel-subscription-threshold"
      schema={schema}
      title="Channel Subscription Threshold"
      updateProps={[
        {
          id: 'levelId',
          placeHolder: '',
          component: 'select',
          initOptions: { label: 'Select Level', value: '', id: 1 },
          optionData: userTierOptionData
        },
        {
          id: 'maxAmount',
          placeHolder: 'Enter maxAmount',
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
        levelId: hookForm.getValues('levelId'),
        maxAmount: hookForm.getValues('maxAmount'),
        status: actionType === 'status' ? getStatus(status) : status
      })}
      showId="levelId"
      getTitle={getTitle}
    />
  )
}

export default ChannelSubscriptionThreshold
