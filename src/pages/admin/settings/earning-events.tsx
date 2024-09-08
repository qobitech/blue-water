import { useState } from 'react'
import { IEarningEvents } from '../../../interface/IOther'
import MainComponent from './main-component'
import {
  addSchemaType3,
  formComponentType3,
  getStatus,
  typeAction
} from './data'
import { UseFormReturn } from 'react-hook-form'
import { TypeSelect } from '../../../components/utils/select'
import { roleIdEnum } from '../../auth/register/data'

const EarningEvents = () => {
  const getMainData = (data: IEarningEvents) => data?.data?.earningEvents

  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    setSelectedRole(value || null)
  }

  const query = selectedRole ? `?role=${selectedRole}` : ''

  const roleOptions = [
    {
      id: 1,
      label: 'Admin',
      value: roleIdEnum.ADMIN
    },
    {
      id: 2,
      label: 'Buyer',
      value: roleIdEnum.BUYER
    },
    {
      id: 3,
      label: 'Seller',
      value: roleIdEnum.SELLER
    }
  ]

  return (
    <div>
      <div className="mb-5">
        <TypeSelect
          initoption={{ label: 'Select role', value: '' }}
          optionsdata={roleOptions}
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
          initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
            hookForm.setValue('title', data?.title)
            hookForm.setValue('description', data?.description)
            hookForm.setValue('role', data?.role)
          }}
          querystring="earning-events"
          route={`earning-events`}
          schema={addSchemaType3}
          title="Earning Events"
          updateCreateHookForm={[{ role: selectedRole }]}
          updateProps={[
            {
              id: 'title',
              placeHolder: 'Enter title',
              component: 'input'
            },
            {
              id: 'role',
              placeHolder: '',
              component: 'select',
              initOptions: { label: 'Select Role', value: '', id: 1 },
              optionData: roleOptions
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
            role: hookForm.getValues('role'),
            status: actionType === 'status' ? getStatus(status) : status
          })}
          query={query}
        />
      ) : null}
    </div>
  )
}

export default EarningEvents
