import { useFormHook } from '../../../components/utils/hooks'
import { dropBasicInfoSchema, IBasicInfoSchema } from '../data'
import { IUserResponse } from '../../../interface/IUser'
import BasicInfoForm from '../basic-info'
import { getUserData } from '../../../constants/global'
import { ISports } from '../../../interface/IOther'
import { useUser } from '../../../api/user'
import { apiFeatures } from '../../../api'

interface ISO {
  setNotificationStatus?: (notice: string, status: boolean) => void
}

interface IUU {
  id: string
  userData: { [key: string]: any }
}

export const updateUser = async ({ id, userData }: IUU) => {
  return await apiFeatures.patch<IUserResponse>('updateUser', id, userData)
}

export const createBetChannel = async (channelData: { [key: string]: any }) => {
  return await apiFeatures.post('channel', channelData)
}

export const updateBetChannel = async ({
  id,
  channelData
}: {
  id: string
  channelData: { [key: string]: any }
}) => {
  return await apiFeatures.patch('channel', id, channelData)
}

export const createBetTicket = async (predictionData: any) => {
  return await apiFeatures.post('prediction/multiple', predictionData)
}

export const getAllSports = async () => {
  return await apiFeatures.get<ISports>('sport')
}

const SellerOnboarding: React.FC<ISO> = ({ setNotificationStatus }) => {
  const [basicInfoHookForm] = useFormHook<IBasicInfoSchema>(dropBasicInfoSchema)

  const userActionProps = useUser(setNotificationStatus)

  return (
    <>
      {getUserData().user.stage === 'onboarding1' && (
        <div className="f-column-20 h-100">
          <div className="FormHeaderWrapper">
            <p>User Onboarding - 1 of 3</p>
            <h3>
              <b>Provide Some Basic Info</b>
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

export default SellerOnboarding
