import { useEffect } from 'react'
import { IRightSection } from '../../../components/layout/right-section'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import { useFormHook } from '../../../components/utils/hooks'
import { IUser } from '../../../interface/IUser'
import * as yup from 'yup'
import { getCountry, getUserRole, typeRoleId } from '../../../constants/global'
import { _separator } from '../../../components/utils/helper'

const userSchema = {
  userName: yup.string(),
  email: yup.string(),
  country: yup.string(),
  gender: yup.string(),
  membership: yup.string(),
  role: yup.string(),
  dob: yup.string(),
  createdAt: yup.string()
} as const

interface IVU {
  userName: string
  email: string
  country: string
  gender: string
  membership: string
  role: string
  dob: string
  createdAt: string
}

type userType = keyof IVU

const ViewUser = ({ rsProps }: { rsProps?: IRightSection<IUser> }) => {
  const data: { [key: string]: any } | null | undefined = rsProps?.data

  const formComponents: IFormComponent[] = Object.keys(userSchema).map((i) => ({
    id: i,
    component: 'input',
    label: _separator(i),
    placeHolder: '',
    type: 'text',
    isonlyview: true
  }))

  const [hookForm] = useFormHook<IVU>(userSchema)

  const getValue = (key: userType, value: string): string => {
    if (key === 'role') return getUserRole(value as typeRoleId)
    if (key === 'createdAt') return new Date(value).toDateString()
    if (key === 'country') return getCountry(value)
    return value
  }

  useEffect(() => {
    Object.keys(userSchema).forEach((i) => {
      hookForm.setValue(
        `${i}` as userType,
        getValue(i as userType, data?.[i]) || '...'
      )
    })
  }, [])

  return (
    <div>
      <div className="grid-wrapper-40 gap-30">
        <FormBuilder hookForm={hookForm} formComponent={formComponents} />
      </div>
    </div>
  )
}

export default ViewUser
