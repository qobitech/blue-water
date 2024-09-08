import { useEffect } from 'react'
import { countries, getUserData } from '../../../../constants/global'
import { TypeButton } from '../../../../components/utils/button'
import { useUserProfile } from '../../../../api/user'
import FormBuilder, {
  IFormComponent
} from '../../../../components/utils/form-builder'
import { useFormHook } from '../../../../components/utils/hooks'
import * as yup from 'yup'
// import { ResponseComponent } from '../../../api'

interface IUserProfile {
  userName: string
  gender: 'male' | 'female'
  country: string
  membership: 'free' | 'standard' | 'premium'
  twitter: string
  linkedin: string
  facebook: string
  instagram: string
  tiktok: string
}

const formSchema = {
  userName: yup.string(),
  gender: yup.string(),
  country: yup.string(),
  membership: yup.string(),
  twitter: yup.string(),
  linkedin: yup.string(),
  facebook: yup.string(),
  instagram: yup.string(),
  tiktok: yup.string()
}

const formComponent: IFormComponent[] = [
  {
    id: 'userName',
    label: 'User Name',
    placeHolder: 'Enter user name',
    component: 'input',
    type: 'text'
  },
  {
    id: 'gender',
    label: 'Gender',
    placeHolder: '',
    component: 'select',
    type: 'text',
    initOptions: { label: 'Select Gender', value: '', id: 1 },
    optionData: [
      {
        id: 1,
        label: 'Male',
        value: 'male'
      },
      {
        id: 2,
        label: 'Female',
        value: 'female'
      }
    ]
  },
  {
    id: 'country',
    label: 'Country',
    placeHolder: '',
    component: 'select',
    type: 'text',
    initOptions: { label: 'Select Country', value: '', id: 1 },
    optionData: countries.map((i, index) => ({
      id: index,
      label: i.name,
      value: i.code
    }))
  },
  {
    id: 'membership',
    label: 'Membership',
    placeHolder: '',
    component: 'input',
    type: 'text',
    isonlyview: true
  },
  {
    id: 'twitter',
    label: 'Twitter',
    placeHolder: 'Enter twitter url',
    component: 'input',
    type: 'text'
  },
  {
    id: 'linkedin',
    label: 'Linkedim',
    placeHolder: 'Enter linkedin url',
    component: 'input',
    type: 'text'
  },
  {
    id: 'faebook',
    label: 'Facebook',
    placeHolder: 'Enter facebook url',
    component: 'input',
    type: 'text'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    placeHolder: 'Enter instagram url',
    component: 'input',
    type: 'text'
  },
  {
    id: 'tiktok',
    label: 'Tiktok',
    placeHolder: 'Enter tiktok url',
    component: 'input',
    type: 'text'
  }
]

const ProfileSettings = () => {
  const userProps = useUserProfile()
  const [hookForm] = useFormHook<IUserProfile>(formSchema)

  useEffect(() => {
    hookForm.setValue('userName', getUserData().user.userName)
    hookForm.setValue('gender', getUserData().user.gender as 'male' | 'female')
    hookForm.setValue('country', getUserData().user.country)
    hookForm.setValue('membership', getUserData().user.membership)
    hookForm.setValue('twitter', getUserData().user.twitter)
    hookForm.setValue('linkedin', getUserData().user.linkedin)
    hookForm.setValue('facebook', getUserData().user.facebook)
    hookForm.setValue('instagram', getUserData().user.instagram)
    hookForm.setValue('tiktok', getUserData().user.tiktok)
  }, [])

  const handleUserUpdate = (data: IUserProfile) => {
    userProps.handleUpdateUser({ ...getUserData().user, ...data })
  }

  return (
    <form className="form-section" onSubmit={(e) => e.preventDefault()}>
      <div className="grid-wrapper-47 gap-20">
        <FormBuilder hookForm={hookForm} formComponent={formComponent} />
      </div>
      <div className="f-row py-4">
        <TypeButton
          title="Update"
          onClick={hookForm.handleSubmit(handleUserUpdate)}
          load={userProps.isLoading}
        />
      </div>
      {/* <ResponseComponent response={userProps.response} /> */}
    </form>
  )
}

export default ProfileSettings
