import { UseFormReturn } from 'react-hook-form'
import { IBasicInfoSchema } from './data'
import { TypeButton } from '../../components/utils/button'
import FormBuilder, {
  IFormComponent
} from '../../components/utils/form-builder'

interface ISMBG {
  hookForm: UseFormReturn<IBasicInfoSchema, any>
  handleState: (data: IBasicInfoSchema) => void
  load: boolean
}

const fc: IFormComponent[] = [
  {
    id: 'gender',
    component: 'select',
    label: 'Gender',
    initOptions: { id: 1, label: 'Select Gender', value: '' },
    optionData: [
      {
        id: 1,
        label: 'Male',
        value: 'Male'
      },
      {
        id: 2,
        label: 'Female',
        value: 'Female'
      }
    ]
  }
  // {
  //   id: 'country',
  //   component: 'select',
  //   label: 'Country',
  //   initOptions: { id: 1, label: 'Select Country', value: '' },
  //   optionData: countries.map((i, index) => ({
  //     id: index,
  //     label: i.name,
  //     value: i.code
  //   }))
  // }
]

const BasicInfoForm: React.FC<ISMBG> = ({ hookForm, handleState, load }) => {
  return (
    <div className="mx-auto w-100 bg-white h-100 pt-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto w-100 f-column-33 px-4 pb-4 bg-white h-100"
      >
        <FormBuilder hookForm={hookForm} formComponent={fc} />
        {/* <TypeSelect
          label="Gender"
          initoption={{ label: 'Select Gender', value: '' }}
          optionsdata={[
            {
              id: 1,
              label: 'Male',
              value: 'Male'
            },
            {
              id: 2,
              label: 'Female',
              value: 'Female'
            }
          ]}
          customwidth={'100%'}
          {...hookForm.register('gender')}
          error={hookForm.formState.errors.gender?.message}
        /> */}
        {/* <TypeSelect
          label="Country"
          initoption={{ label: 'Select Country', value: '' }}
          optionsdata={countries.map((i, index) => ({
            id: index,
            label: i.name,
            value: i.code
          }))}
          customwidth={'100%'}
          {...hookForm.register('country')}
          error={hookForm.formState.errors.country?.message}
        /> */}
        {/* <TypeInput
          label="Date of birth"
          customwidth={'100%'}
          type="date"
          {...hookForm.register('dob')}
          error={hookForm.formState.errors.dob?.message}
        /> */}
        <div>
          <TypeButton
            title="Next"
            onClick={hookForm.handleSubmit(handleState)}
            load={load}
          />
        </div>
      </form>
    </div>
  )
}

export default BasicInfoForm
