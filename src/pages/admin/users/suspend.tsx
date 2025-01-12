import { useState } from 'react'
import { IGlobalRightSection } from '../../../components/layout/right-section/utils'
import { TypeSmallButton } from '../../../components/utils/button'
import { IUser } from '../../../interface/IUser'
import { useUpdateUserStatus } from '../../../api/user'
import RequestStatus from '../../../components/utils/request-status'
import { HVC } from '../../../components/utils/hvc'

const SuspendUser = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>no data</>

  const [success, setSuccess] = useState<boolean>(false)

  const { rsProps } = globalContext

  const { data } = rsProps?.data as {
    data: IUser
  }

  const isSuspended = data.status === 'suspended'

  const onCancel = () => {
    rsProps?.closeSection()
  }

  const onUpdateSuccess = () => {
    rsProps?.onRefresh?.()
    setSuccess(true)
  }

  const updateStatusProps = useUpdateUserStatus(onUpdateSuccess)

  const onSuspend = () => {
    updateStatusProps.mutate({
      body: {
        _id: data._id,
        status: isSuspended ? 'active' : 'suspended'
      }
    })
  }

  return (
    <div className="m-0 border rounded p-5 mt-4">
      <HVC removeDOM view={!success}>
        <div className="f-column-60">
          <h3 className="m-0">
            Are you sure you want to {isSuspended ? 'reinstate' : 'Suspend'}{' '}
            <b>{data.userName}</b>?
          </h3>
          <div className="f-row-20">
            <TypeSmallButton
              title={isSuspended ? 'Reinstate' : 'Suspend'}
              buttonType="bold"
              onClick={onSuspend}
              load={updateStatusProps.isLoading}
            />
            <TypeSmallButton
              title="Cancel"
              buttonType="danger"
              onClick={onCancel}
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
            title={`User ${data.userName} has been ${
              isSuspended ? 'reinstated' : 'suspended'
            }`}
            loop={false}
          />
          <TypeSmallButton
            title="Close"
            buttonType="danger"
            onClick={onCancel}
          />
        </div>
      </HVC>
    </div>
  )
}

export default SuspendUser
