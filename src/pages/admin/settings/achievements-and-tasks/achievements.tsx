import { useEffect, useState } from 'react'
import { TypeSelect } from '../../../../components/utils/select'
import MainComponent from '../main-component'
import { UseFormReturn } from 'react-hook-form'
import { getStatus, typeAction } from '../data'
import { IAchievements } from '../../../../interface/IOther'
import { IFormComponent } from '../../../../components/utils/form-builder'
import * as yup from 'yup'
import { useUserTierQuery } from '../../../../api/user'
import { roleIdEnum } from '../../../auth/register/data'
import { SubHeaderTips } from '../../../dashboard/my-account/wallet/data'

export const taskSchema = {
  achievement: yup.string().required('Achievement is required'),
  description: yup.string().required('Description is required'),
  achievementOrder: yup.string().required('Achievement Order is required'),
  reward: yup.string().required('Reward is required'),
  level: yup.string().required('Level is required')
}

const AchievementSettings = () => {
  const getMainData = (data: IAchievements) => data?.data?.achievements

  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    setSelectedRole(value || null)
  }

  const query = selectedRole ? `?role=${selectedRole}` : ''

  const userTierProps = useUserTierQuery()

  useEffect(() => {
    if (selectedRole) userTierProps.mutate({ query: `?role=${selectedRole}` })
  }, [selectedRole])

  const userLevelOptData = userTierProps.data.data.userTiers.map(
    (ut, index) => ({
      id: index,
      label: ut.title,
      value: ut._id
    })
  )

  const taskComponent: IFormComponent[] = [
    {
      component: 'input',
      id: 'achievement',
      label: 'Achievement',
      placeHolder: 'Enter achievement',
      type: 'text'
    },
    {
      component: 'text-area',
      id: 'description',
      label: 'Description',
      placeHolder: 'Enter description',
      type: 'text'
    },
    {
      component: 'input',
      id: 'achievementOrder',
      label: 'Order Number',
      placeHolder: 'Enter order number',
      type: 'text'
    },
    {
      component: 'input',
      id: 'reward',
      label: 'Reward',
      placeHolder: 'Enter reward',
      type: 'text'
    },
    {
      component: 'select',
      id: 'level',
      label: 'Level',
      placeHolder: 'Enter level',
      type: 'text',
      initOptions: { id: 1, label: 'Select Level', value: '' },
      optionData: userLevelOptData
    }
  ]

  return (
    <div>
      <div className="mb-5 pt-3">
        <SubHeaderTips title="Tasks" description="" />
        <TypeSelect
          initoption={{ label: 'Select role', value: '' }}
          optionsdata={[
            {
              id: '1',
              label: 'Buyer',
              value: roleIdEnum.BUYER
            },
            {
              id: '2',
              label: 'Seller',
              value: roleIdEnum.SELLER
            }
          ]}
          customwidth={'100%'}
          onChange={handleSelect}
          value={selectedRole || ''}
        />
      </div>
      {selectedRole ? (
        <MainComponent
          key={selectedRole}
          showId="achievement"
          formComponent={taskComponent}
          getMainData={getMainData}
          updateCreateHookForm={[{ role: selectedRole }]}
          initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
            hookForm.setValue('achievement', data?.achievement)
            hookForm.setValue('description', data?.description)
            hookForm.setValue('achievementOrder', data?.achievementOrder)
            hookForm.setValue('reward', data?.reward)
            hookForm.setValue('level', data?.level)
            hookForm.setValue('role', data?.role)
          }}
          querystring="achievement"
          route={`achievement`}
          schema={taskSchema}
          title="Achievement"
          updateProps={[
            {
              id: 'achievement',
              placeHolder: 'Enter achievement',
              component: 'input'
            },
            {
              id: 'description',
              placeHolder: 'Enter description',
              component: 'text-area'
            },
            {
              id: 'achievementOrder',
              placeHolder: 'Enter task order number',
              component: 'input'
            },
            {
              id: 'reward',
              placeHolder: 'Enter reward',
              component: 'input'
            },
            {
              id: 'level',
              placeHolder: '',
              component: 'select',
              initOptions: { label: 'Select Level', value: '', id: 1 },
              optionData: userLevelOptData
            },
            {
              id: 'role',
              placeHolder: '',
              component: 'select',
              initOptions: { label: 'Select Role', value: '', id: 1 },
              optionData: [
                {
                  id: 1,
                  label: 'Buyer',
                  value: roleIdEnum.BUYER
                },
                {
                  id: 2,
                  label: 'Seller',
                  value: roleIdEnum.SELLER
                }
              ]
            }
          ]}
          getFormData={(
            hookForm: UseFormReturn<any, any>,
            id: string,
            actionType: typeAction,
            status: 'Inactive' | 'Active'
          ) => ({
            id,
            achievement: hookForm.getValues('achievement'),
            description: hookForm.getValues('description'),
            achievementOrder: hookForm.getValues('achievementOrder'),
            reward: hookForm.getValues('reward'),
            level: hookForm.getValues('level'),
            role: hookForm.getValues('role'),
            status: actionType === 'status' ? getStatus(status) : status
          })}
          query={query}
        />
      ) : null}
    </div>
  )
}

export default AchievementSettings
