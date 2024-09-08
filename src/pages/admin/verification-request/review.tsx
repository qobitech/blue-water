import { useState } from 'react'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import { IVerificationRequest } from '../../../interface/IVerificationRequest'
import { getCountry } from '../../../constants/global'
import moment from 'moment'
import { CardItems } from '../../dashboard/bet-channel/by-id/data'
import {
  ActionComponent,
  IOptionAction
} from '../../../components/utils/reusable'
import RequestStatus from '../../../components/utils/request-status'
import { useReviewVerificationRequest } from '../../../api/verification-request'
import { TypeButton } from '../../../components/utils/button'
// import { ResponseComponent } from '../../../api'
import { TypeTextArea } from '../../../components/utils/text-area'
import { HVC } from '../../../components/utils/hvc'

const ReviewVerificationRequest = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  const { data } = rsProps?.data as {
    data: IVerificationRequest
  }

  const [reject, setReject] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')

  const dataArray = [
    {
      label: 'Name',
      value: data.firstName + ' ' + data.lastName
    },
    {
      label: 'Country of Residence',
      value: getCountry(data.countryOfResidence)
    },
    {
      label: 'Date',
      value: moment(data.modified).fromNow()
    },
    {
      label: 'ID Type',
      value: data.governmentIDNumber.idType
    },
    {
      label: 'ID Number',
      value: data.governmentIDNumber.id
    }
  ]

  const onSuccess = () => {
    setSuccess(true)
    rsProps?.onRefresh?.()
  }

  const reviewVerificationRequestProps = useReviewVerificationRequest(onSuccess)

  const actions: IOptionAction[] = [
    {
      label: 'Approve',
      action: () => {
        reviewVerificationRequestProps.mutate({
          query: `?id=${data._id}`,
          body: {
            review: 'approve'
          }
        })
      }
    },
    {
      label: 'Reject',
      action: () => {
        setReject(true)
      }
    }
  ]

  const onReject = () => {
    reviewVerificationRequestProps.mutate({
      query: `?id=${data._id}`,
      body: {
        review: 'reject',
        status: 'rejected',
        comment
      }
    })
  }

  const onCancelReject = () => {
    setReject(false)
  }

  const onClose = () => {
    setSuccess(false)
    setReject(false)
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
        <HVC view={!reject} className="f-column-33">
          {/* review details */}
          <div className="grid-wrapper-45 gap-25 border rounded p-3">
            {dataArray.map((i, index) => (
              <CardItems key={index} title={i.label} value={i.value} />
            ))}
          </div>
          {/* review cta */}
          <ActionComponent
            actions={actions}
            title="Review"
            load={reviewVerificationRequestProps.isLoading}
          />
        </HVC>
        {/* on reject response */}
        <HVC view={reject} className="f-column-33">
          <TypeTextArea
            onChange={onHandleComment}
            value={comment}
            label="Comment"
          />
          <div className="f-row-20">
            <TypeButton
              title="Reject Verification Request"
              onClick={onReject}
            />
            <TypeButton
              title="Cancel"
              onClick={onCancelReject}
              buttonType="danger"
            />
          </div>
        </HVC>
        {/* review response */}
        {/* <ResponseComponent response={reviewVerificationRequestProps.response} /> */}
      </HVC>
      {/* success page */}
      <HVC view={success} className="f-column-50 text-center">
        <RequestStatus
          description={`Verification ${
            reject ? 'rejected' : 'approved'
          } successfully`}
          lottie=""
          success
          title={'User Verification Request'}
          loop={false}
        />
        <div className="f-row jcc">
          <TypeButton title="Close" buttonType="danger" onClick={onClose} />
        </div>
      </HVC>
    </div>
  )
}

export default ReviewVerificationRequest
