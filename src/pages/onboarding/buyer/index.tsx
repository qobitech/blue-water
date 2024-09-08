import { useEffect } from 'react'
import { useFormHook } from '../../../components/utils/hooks'
import {
  INotificationPreferenceSchema,
  notificationPreferenceSchema,
  IBasicInfoSchema,
  dropBasicInfoSchema
} from '../data'
import BasicInfoForm from '../basic-info'
import { getUserData } from '../../../constants/global'
import { useUser } from '../../../api/user'

interface IBO {
  setNotificationStatus?: (notice: string, status: boolean) => void
}

const BuyerOnboarding: React.FC<IBO> = ({ setNotificationStatus }) => {
  const userActionProps = useUser(setNotificationStatus)

  const [basicInfoHookForm] = useFormHook<IBasicInfoSchema>(dropBasicInfoSchema)
  const [notificationPreferenceHookForm] =
    useFormHook<INotificationPreferenceSchema>(notificationPreferenceSchema)

  useEffect(() => {
    if (getUserData()) {
      notificationPreferenceHookForm.setValue(
        'values.email',
        getUserData().user.email
      )
    }
  }, [getUserData()])

  return (
    <>
      {getUserData().user.stage === 'onboarding1' && (
        <div className="f-column-20">
          <div className="FormHeaderWrapper">
            <p>User Onboarding - 1 of 4</p>
            <h3>
              <b>Provide Basic Info</b>
            </h3>
          </div>
          <BasicInfoForm
            hookForm={basicInfoHookForm}
            handleState={userActionProps.handleBasicInfo}
            load={userActionProps.isLoading}
          />
        </div>
      )}
    </>
  )
}

export default BuyerOnboarding
