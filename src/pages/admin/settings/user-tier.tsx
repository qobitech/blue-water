import { useState } from 'react'
import { IUserTiers } from '../../../interface/IOther'
import MainComponent from './main-component'
import { UseFormReturn } from 'react-hook-form'
import { TypeSelect } from '../../../components/utils/select'
import { roleIdEnum } from '../../auth/register/data'
import {
  addSchemaType3,
  formComponentType3,
  getStatus,
  typeAction
} from './data'

const UserTier = () => {
  const getMainData = (data: IUserTiers) => data?.data?.userTiers

  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    setSelectedRole(value || null)
  }

  const query = selectedRole ? `?role=${selectedRole}` : ''

  return (
    <div>
      <div className="mb-5 mt-2">
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
            },
            {
              id: '3',
              label: 'Admin',
              value: roleIdEnum.ADMIN
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
          formComponent={formComponentType3}
          getMainData={getMainData}
          updateCreateHookForm={[{ role: selectedRole }]}
          initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
            hookForm.setValue('title', data?.title)
            hookForm.setValue('description', data?.description)
            hookForm.setValue('role', data?.role)
          }}
          querystring="user-tier"
          route={`user-tier`}
          schema={addSchemaType3}
          title="User Tier"
          updateProps={[
            {
              id: 'title',
              placeHolder: 'Enter title',
              type: 'text',
              component: 'input'
            },
            {
              id: 'role',
              placeHolder: '',
              type: 'text',
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
                },
                {
                  id: 3,
                  label: 'Admin',
                  value: roleIdEnum.ADMIN
                }
              ]
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
            role: hookForm.getValues('role'),
            status: actionType === 'status' ? getStatus(status) : status
          })}
          query={query}
        />
      ) : null}
    </div>
  )
}

export default UserTier
