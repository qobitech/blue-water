import { useState } from 'react'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import { roleIdEnum } from '../../auth/register/data'
import { useFormHook } from '../../../components/utils/hooks'
import * as yup from 'yup'
import { TypeButton, TypeSmallButton } from '../../../components/utils/button'
import { IGlobalRightSection } from '../../../components/layout/right-section/utils'
import { useAdminCreateUser } from '../../../api/user'
import RequestStatus from '../../../components/utils/request-status'
// import { ResponseComponent } from '../../../api'
import { HVC } from '../../../components/utils/hvc'

interface IHF {
  email: string
  userName: string
  role: string
}

const schema = {
  email: yup.string().required('Email required'),
  userName: yup.string().required('Username required'),
  role: yup.string().required('Role required')
}

const fc: IFormComponent[] = [
  {
    id: 'email',
    component: 'input',
    label: 'Email Address'
  },
  {
    id: 'userName',
    component: 'input',
    label: 'Username'
  },
  {
    id: 'role',
    component: 'select',
    label: 'Select Role',
    initOptions: { id: 1, label: 'Select Role', value: '' },
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
  }
]

const CreateUser = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>
  const { rsProps } = globalContext

  const [hookForm] = useFormHook<IHF>(schema)
  const [success, setSuccess] = useState<boolean>(false)

  const onCancel = () => {
    rsProps?.closeSection()
  }

  const onCreateSuccess = () => {
    setSuccess(true)
    rsProps?.onRefresh?.()
    hookForm.resetField('email')
    hookForm.resetField('role')
    hookForm.resetField('userName')
  }

  const createUserProps = useAdminCreateUser(onCreateSuccess)

  const onCreate = (data: IHF) => {
    createUserProps.mutate({
      body: data
    })
  }

  return (
    <>
      <HVC removeDOM view={!success}>
        <div className="f-column-30 mt-4">
          <FormBuilder formComponent={fc} hookForm={hookForm} />
          {/* <ResponseComponent response={createUserProps.response} /> */}
          <div className="mt-4">
            <TypeButton
              title="Create"
              onClick={hookForm.handleSubmit(onCreate)}
              buttonShape="curve"
              className="w-100"
              load={createUserProps.isLoading}
            />
          </div>
        </div>
      </HVC>
      <HVC removeDOM view={success}>
        <div className="f-column-50 text-center">
          <RequestStatus
            description={''}
            lottie=""
            success
            title="User created successfully"
            loop={false}
          />
          <div className="f-row-20 jcc flex-wrap">
            <TypeSmallButton
              title="Back"
              buttonType="outlined"
              onClick={() => setSuccess(false)}
            />
            <TypeSmallButton
              title="Close"
              buttonType="danger"
              onClick={onCancel}
            />
          </div>
        </div>
      </HVC>
    </>
  )
}

export default CreateUser
