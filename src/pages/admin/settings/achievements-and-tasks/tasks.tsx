import { useState } from 'react'
import { TypeSelect } from '../../../../components/utils/select'
import MainComponent from '../main-component'
import { UseFormReturn } from 'react-hook-form'
import { getStatus, typeAction } from '../data'
import { IUserTasks } from '../../../../interface/IOther'
import { IFormComponent } from '../../../../components/utils/form-builder'
import * as yup from 'yup'
import { useUserTierQuery } from '../../../../api/user'
import { roleIdEnum } from '../../../auth/register/data'
import { HVC } from '../../../../components/utils/hvc'
import { SubHeaderTips } from '../../../dashboard/my-account/wallet/data'

export const taskSchema = {
  task: yup.string().required('Task is required'),
  description: yup.string().required('Description is required'),
  taskOrder: yup.string().required('Task Order is required'),
  subTasks: yup.string().required('Sub Tasks is required'),
  reward: yup.string().required('Reward is required'),
  level: yup.string().required('Level is required')
}

const UserTaskSettings = () => {
  const getMainData = (data: IUserTasks) => data?.data?.userTasks

  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [query, setQuery] = useState<string>('')

  const userTierProps = useUserTierQuery()

  const handleUserTier = (query?: string) => {
    userTierProps.mutate({ query })
  }

  const handleSelectRole = ({
    target
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    setSelectedRole(value || null)
    setSelectedTier(null)

    const q = value ? `?role=${value}` : ''
    handleUserTier(q)
    setQuery(q)
  }

  const handleSelectTier = ({
    target
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    setSelectedTier(value || null)

    const qr = `?role=${selectedRole}`
    const q = value ? `${qr}&level=${value}` : qr
    setQuery(q)
  }

  const userLevelOptData = userTierProps.data.data.userTiers.map(
    (ut, index) => ({
      id: index,
      label: ut.title,
      value: ut._id
    })
  )

  const roleOptData = [
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
  ]

  const taskComponent: IFormComponent[] = [
    {
      component: 'input',
      id: 'task',
      label: 'Task',
      placeHolder: 'Enter task',
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
      component: 'input',
      id: 'subTasks',
      label: 'Number of tasks',
      placeHolder: 'Enter number of tasks',
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
      id: 'taskOrder',
      label: 'Order Number',
      placeHolder: 'Enter order number',
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
        <div className="f-column-12">
          <TypeSelect
            initoption={{ label: 'Select role', value: '' }}
            optionsdata={roleOptData}
            customwidth={'100%'}
            onChange={handleSelectRole}
            value={selectedRole || ''}
          />
          <HVC view={!!selectedRole}>
            <TypeSelect
              initoption={{ label: 'Select level', value: '' }}
              optionsdata={userLevelOptData}
              customwidth={'100%'}
              onChange={handleSelectTier}
              value={selectedTier || ''}
            />
          </HVC>
        </div>
      </div>
      {selectedRole ? (
        <MainComponent
          key={query}
          showId="task"
          formComponent={taskComponent}
          getMainData={getMainData}
          updateCreateHookForm={[{ role: selectedRole }]}
          initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
            hookForm.setValue('task', data?.task)
            hookForm.setValue('description', data?.description)
            hookForm.setValue('subTasks', data?.subTasks)
            hookForm.setValue('taskOrder', data?.taskOrder)
            hookForm.setValue('reward', data?.reward)
            hookForm.setValue('level', data?.level)
            hookForm.setValue('role', data?.role)
          }}
          querystring="user-task"
          route={`user-task`}
          schema={taskSchema}
          title="User Task"
          updateProps={[
            {
              id: 'task',
              placeHolder: 'Enter task',
              component: 'input'
            },
            {
              id: 'description',
              placeHolder: 'Enter description',
              component: 'text-area'
            },
            {
              id: 'subTasks',
              placeHolder: 'Enter number of tasks',
              component: 'input'
            },
            {
              id: 'taskOrder',
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
            task: hookForm.getValues('task'),
            description: hookForm.getValues('description'),
            subTasks: hookForm.getValues('subTasks'),
            taskOrder: hookForm.getValues('taskOrder'),
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

export default UserTaskSettings
