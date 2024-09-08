import { useEffect } from 'react'
import { PageContainer } from '../../../components/utils/reusable'
import { TypeButton } from '../../../components/utils/button'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'
import { useQueryValuesHook } from '../../../components/utils/hooks'
import { IDefaultResponse } from '../../../api/utils'
import { IUser } from '../../../interface/IUser'
import {
  encodeData,
  getUserRole,
  getIsAdminLogged,
  getIsLogged,
  roleType,
  typeRoleId,
  GETDASHBOARDURL
} from '../../../constants/global'
import { useActivateUserAccount } from '../../../api/user'
// import { ResponseComponent } from '../../../api'
import { useGlobalContext } from '../../../components/layout/context'

const ActivateEmail = () => {
  const { setNotification } = useGlobalContext()
  const navigate = useNavigate()
  const { token } = useQueryValuesHook()

  const onActivateUserSuccess = (data: IDefaultResponse<{ user: IUser }>) => {
    setNotification?.('Email confirmation successful', true)
    if (getIsLogged() || getIsAdminLogged()) {
      const userData = data.data?.user
      const userRole = getUserRole(userData?.role as typeRoleId)
      encodeData(userData, userRole as roleType)
      setTimeout(() => {
        window.open(GETDASHBOARDURL(), '_self')
      }, 500)
    } else {
      setTimeout(() => {
        navigate(pageurl.LOGIN)
      }, 1500)
    }
  }

  const onError = ({ response }: any) => {
    if (!response) {
      setNotification?.('Something went wrong', false)
    } else {
      const { data } = response
      if (!data) {
        setNotification?.('Something went wrong', false)
      } else {
        setNotification?.(data.message, false)
      }
    }
  }

  const activateUserProps = useActivateUserAccount(
    onActivateUserSuccess,
    onError
  )

  useEffect(() => {
    if (!token) {
      navigate(pageurl.LOGIN)
    } else {
      activateUserProps.mutate({ query: `?token=${token}` })
    }
  }, [])

  return (
    <div className="s-p-wrapper">
      <PageContainer>
        <div className="separator-h-30" />
        <div className="f-row jcc text-center w-100">
          <h5 className="HeaderBodyLandingText">Confirm Email Address</h5>
        </div>
        <div className="separator-h-30" />
        {activateUserProps.isLoading ? (
          <div></div>
        ) : (
          <div className="f-row aic flex-column">
            {/* <ResponseComponent response={activateUserProps.response} /> */}
            <div className="separator-h-20" />
            {activateUserProps.response.status ? (
              <TypeButton
                buttonSize="large"
                title="LOGIN"
                onClick={() => navigate(pageurl.LOGIN)}
              />
            ) : null}
          </div>
        )}
      </PageContainer>
      <div className="separator-h-70" />
    </div>
  )
}

export default ActivateEmail
