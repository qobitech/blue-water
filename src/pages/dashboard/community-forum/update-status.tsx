import { useEffect } from 'react'
import { TypeButton } from '../../../components/utils/button'
import { IRightSection } from '../../../components/layout/right-section'
import {
  IGETCommunityForumUser,
  communityForumUserStatusEnum
} from '../../../interface/ICommunityForum'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import * as yup from 'yup'
import { useFormHook } from '../../../components/utils/hooks'
import { useUpdateCommunityForumUserStatus } from '../../../api/community-forum'
// import { ResponseComponent } from '../../../api'

interface IUserRole {
  status: string
  userName: string
}

const userRoleSchame = {
  status: yup.string().required('Status is required'),
  userName: yup.string()
}

const UpdateStatus = ({
  rsProps,
  refreshCFUsers
}: {
  rsProps?: IRightSection<IGETCommunityForumUser>
  refreshCFUsers: () => void
}) => {
  const onUpdateSuccess = () => {
    refreshCFUsers()
  }

  const updateCFUserStatus = useUpdateCommunityForumUserStatus(onUpdateSuccess)

  const roleOptions = Object.values(communityForumUserStatusEnum).map(
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
      initOptions: { id: 1, label: 'Select Status', value: '' },
      optionData: roleOptions,
      label: 'User Status',
      placeHolder: '',
      id: 'status'
    }
  ]

  const user = rsProps?.data

  const [hookForm] = useFormHook<IUserRole>(userRoleSchame)

  useEffect(() => {
    if (user) {
      hookForm.setValue('status', user.status)
      hookForm.setValue('userName', user.user?.userName)
    }
  }, [])

  const onUpdateStatus = (data: IUserRole) => {
    updateCFUserStatus.mutate({
      body: {
        status: data.status,
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
          onClick={hookForm.handleSubmit(onUpdateStatus)}
          load={updateCFUserStatus.isLoading}
        />
        <TypeButton
          title="Close"
          buttonType="danger"
          onClick={() => rsProps?.closeSection()}
        />
      </div>
      {/* <ResponseComponent response={updateCFUserStatus.response} /> */}
    </div>
  )
}

export default UpdateStatus
