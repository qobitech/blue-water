import { useEffect } from 'react'
import { TypeButton } from '../../../components/utils/button'
import { IRightSection } from '../../../components/layout/right-section'
import {
  IGETCommunityForumUser,
  communityForumUserRoleEnum
} from '../../../interface/ICommunityForum'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import * as yup from 'yup'
import { useFormHook } from '../../../components/utils/hooks'
import { useUpdateCommunityForumUserRole } from '../../../api/community-forum'
// import { ResponseComponent } from '../../../api'

interface IUserRole {
  role: string
  userName: string
}

const userRoleSchame = {
  role: yup.string().required('Role is required'),
  userName: yup.string()
}

const UpdateRole = ({
  rsProps,
  refreshCFUsers
}: {
  rsProps?: IRightSection<IGETCommunityForumUser>
  refreshCFUsers: () => void
}) => {
  const onUpdateSuccess = () => {
    refreshCFUsers()
  }

  const updateCFUserRole = useUpdateCommunityForumUserRole(onUpdateSuccess)

  const roleOptions = Object.values(communityForumUserRoleEnum).map(
    (role, index) => ({
      id: index,
      label: role,
      value: role
    })
  )

  const formComponent: IFormComponent[] = [
    {
      component: 'input',
      isonlyview: true,
      id: 'userName',
      label: 'Username'
    },
    {
      component: 'select',
      initOptions: { id: 1, label: 'Select Role', value: '' },
      optionData: roleOptions,
      label: 'Role',
      placeHolder: '',
      id: 'role'
    }
  ]

  const user = rsProps?.data

  const [hookForm] = useFormHook<IUserRole>(userRoleSchame)

  useEffect(() => {
    if (user) {
      hookForm.setValue('role', user.role)
      hookForm.setValue('userName', user.user?.userName)
    }
  }, [])

  const onUpdateRole = (data: IUserRole) => {
    updateCFUserRole.mutate({
      body: {
        role: data.role,
        id: user?._id,
        communityId: user?.communityId
      }
    })
  }

  return (
    <div className="pt-4 f-column-20">
      <FormBuilder formComponent={formComponent} hookForm={hookForm} />

      <div className="f-row-20 aic py-4">
        <TypeButton
          title="Update"
          onClick={hookForm.handleSubmit(onUpdateRole)}
          load={updateCFUserRole.isLoading}
        />
        <TypeButton
          title="Close"
          buttonType="danger"
          onClick={() => rsProps?.closeSection()}
        />
      </div>
      {/* <ResponseComponent response={updateCFUserRole.response} /> */}
    </div>
  )
}

export default UpdateRole
