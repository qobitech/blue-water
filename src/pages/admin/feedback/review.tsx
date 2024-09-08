import { useState } from 'react'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import { getCountry, getUserRole, typeRoleId } from '../../../constants/global'
import moment from 'moment'
import {
  CardItems,
  OverViewHeader
} from '../../dashboard/bet-channel/by-id/data'
import {
  ActionComponent,
  IOptionAction
} from '../../../components/utils/reusable'
import RequestStatus from '../../../components/utils/request-status'
import { TypeButton } from '../../../components/utils/button'
// import { ResponseComponent } from '../../../api'
import { TypeTextArea } from '../../../components/utils/text-area'
import { HVC } from '../../../components/utils/hvc'
import { feedbackStatusEnum, IGetFeedback } from '../../../interface/IFeedback'
import { useUpdateFeedbackStatus } from '../../../api/feedback'
import Rating from '../../../components/utils/rating'

const ViewFeedback = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  const { data } = rsProps?.data as {
    data: IGetFeedback
  }

  const [message, sendMessage] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')

  const user = data.user

  const dataArray = [
    {
      label: 'Category',
      value: data.category
    },
    {
      label: 'Submitted',
      value: moment(data.createdAt).fromNow()
    },
    {
      label: 'Status',
      value: data.status
    }
  ]

  const userDataArray = [
    {
      label: 'Name',
      value: user?.firstName + ' ' + user?.lastName
    },
    {
      label: 'Country of Residence',
      value: getCountry(user?.country)
    },
    {
      label: 'Joined',
      value: moment(user?.createdAt).fromNow()
    },
    {
      label: 'Role',
      value: getUserRole(user?.role as typeRoleId)
    }
  ]

  const onSuccess = () => {
    setSuccess(true)
    rsProps?.onRefresh?.()
  }

  const feedbackProps = useUpdateFeedbackStatus(onSuccess)

  const actions: IOptionAction[] = [
    {
      label: data.status === 'private' ? 'Publish' : 'Set to private',
      action: () => {
        feedbackProps.mutate({
          query: `?id=${data._id}`,
          body: {
            status:
              data.status === 'private'
                ? feedbackStatusEnum.PUBLIC
                : feedbackStatusEnum.PRIVATE
          }
        })
      }
    },
    {
      label: 'Send a message',
      action: () => {
        sendMessage(true)
      }
    }
  ]

  const onSendMessage = () => {}

  const onCancelReject = () => {
    sendMessage(false)
  }

  const onClose = () => {
    setSuccess(false)
    sendMessage(false)
    setComment('')
    rsProps?.closeSection()
  }

  const onHandleComment = ({
    target
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target
    setComment(value)
  }

  return (
    <div className="pt-4">
      {/* review details section */}
      <HVC view={!success} className="f-column-33">
        <HVC view={!message} className="f-column-33">
          {/* comment */}
          <CardItems title="Feedback " value={data.feedback} />
          {/* review details */}
          <div className="grid-wrapper-45 gap-25 border rounded p-3">
            {dataArray.map((i, index) => (
              <CardItems key={index} title={i.label} value={i.value} />
            ))}
            <div>
              <OverViewHeader title="Rating" />
              <Rating rating={data.rating} />
            </div>
          </div>
          <HVC removeDOM view={!!user}>
            <p>User</p>
            <div className="grid-wrapper-45 gap-25 border rounded p-3">
              {userDataArray?.map((i, index) => (
                <CardItems key={index} title={i.label} value={i.value} />
              ))}
            </div>
          </HVC>
          {/* review cta */}
          <ActionComponent
            actions={actions}
            title="Review"
            load={feedbackProps.isLoading}
          />
        </HVC>
        {/* on reject response */}
        <HVC view={message} className="f-column-33">
          <TypeTextArea
            onChange={onHandleComment}
            value={comment}
            label="Comment"
          />
          <div className="f-row-20">
            <TypeButton
              title="Reject Verification Request"
              onClick={onSendMessage}
            />
            <TypeButton
              title="Cancel"
              onClick={onCancelReject}
              buttonType="danger"
            />
          </div>
        </HVC>
        {/* review response */}
        {/* <ResponseComponent response={feedbackProps.response} /> */}
      </HVC>
      {/* success page */}
      <HVC view={success} className="f-column-50 text-center">
        <RequestStatus
          description={
            message
              ? 'Message sent'
              : data.status === 'private'
              ? 'Feedback published'
              : 'Feedback set to private'
          }
          lottie=""
          success
          title={'Feedback'}
          loop={false}
        />
        <div className="f-row jcc">
          <TypeButton title="Close" buttonType="danger" onClick={onClose} />
        </div>
      </HVC>
    </div>
  )
}

export default ViewFeedback
