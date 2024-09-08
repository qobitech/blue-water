import { useState } from 'react'
import MainComponent from './main-component'
import {
  addSchemaType4,
  formComponentType3,
  getStatus,
  typeAction
} from './data'
import { UseFormReturn } from 'react-hook-form'
import { TypeSelect } from '../../../components/utils/select'
import { reportType } from '../../../interface/IReport'
import { IReportCategories } from '../../../interface/IReportCategory'

const ReportCategory = () => {
  const getMainData = (data: IReportCategories) => data?.data?.reportCategories

  const [selectedItemType, setSelectedItemType] = useState<string | null>(null)

  const handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    setSelectedItemType(value || null)
  }

  const query = selectedItemType ? `?itemType=${selectedItemType}` : ''

  const reportTypeOptions: Array<{
    id: number
    label: string
    value: reportType
  }> = [
    {
      id: 1,
      label: 'Bet Code',
      value: 'betcode'
    }
  ]

  return (
    <div>
      <div className="mb-5">
        <TypeSelect
          initoption={{ label: 'Select Report Type', value: '' }}
          optionsdata={reportTypeOptions}
          customwidth={'100%'}
          onChange={handleSelect}
          value={selectedItemType || ''}
        />
      </div>
      {selectedItemType ? (
        <MainComponent
          key={selectedItemType}
          formComponent={formComponentType3}
          getMainData={getMainData}
          updateCreateHookForm={[{ itemType: selectedItemType }]}
          initUpdateFn={(hookForm: UseFormReturn<any, any>, data: any) => {
            hookForm.setValue('title', data?.title)
            hookForm.setValue('description', data?.description)
            hookForm.setValue('itemType', data?.itemType)
          }}
          querystring="report-category"
          route={`report-category`}
          schema={addSchemaType4}
          title="Report Category"
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
            },
            {
              id: 'itemType',
              placeHolder: '',
              type: 'text',
              component: 'select',
              initOptions: { label: 'Select Report Type', value: '', id: 1 },
              optionData: reportTypeOptions
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
            itemType: hookForm.getValues('itemType'),
            status: actionType === 'status' ? getStatus(status) : status
          })}
          query={query}
        />
      ) : null}
    </div>
  )
}

export default ReportCategory
