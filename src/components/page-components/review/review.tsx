import { useFormHook } from '../../utils/hooks'
import {
  ICreateReview,
  ICreateReviewResponse,
  reviewResult
} from '../../../interface/IReview'
import * as yup from 'yup'
import FormBuilder, { IFormComponent } from '../../utils/form-builder'
import { TypeButton } from '../../utils/button'
import { defaultPATCHDataTemplate, useAPIPOST } from '../../../api'
import Rating from '../../utils/rating'
import { useGetReview } from '../../../api/review'
import { useEffect } from 'react'
import Skeleton from '../../utils/skeleton'
import { IGlobalRightSection } from '../../layout/right-section'
import { IMultiBetTicketResponse } from '../../../interface/IBet'

interface ICreateReviewHK {
  rating: number
  comment: string
  result: string
}

const createReviewSchema = {
  rating: yup.number().required('rating is required'),
  result: yup.string().required('please select'),
  comment: yup.string()
}

const resultOptionData: Array<{
  id: number
  label: string
  value: reviewResult
}> = [
  {
    id: 1,
    label: 'Yes',
    value: 'won'
  },
  {
    id: 2,
    label: 'No',
    value: 'lost'
  }
]

const reviewFormComponents: IFormComponent[] = [
  {
    id: 'result',
    component: 'select',
    initOptions: { id: 1, label: 'Select', value: '' },
    optionData: resultOptionData,
    label: 'Did you win?'
  },
  {
    id: 'rating',
    component: 'review',
    label: 'Rate code'
  },
  {
    id: 'comment',
    component: 'text-area',
    placeHolder: 'Enter comment here',
    label: 'Add comment (optional)'
  }
]

export const CreateReview = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  const {
    mutate,
    isLoading
    // response
  } = useAPIPOST<ICreateReviewResponse>({
    defaultData: { ...defaultPATCHDataTemplate },
    route: 'review',
    onSuccess: () => {
      rsProps?.onRefresh?.()
      hookForm.resetField('comment')
      hookForm.resetField('rating')
      hookForm.resetField('result')
    }
  })
  const [hookForm] = useFormHook<ICreateReviewHK>(createReviewSchema)

  const handleSubmit = (data: ICreateReviewHK) => {
    const { betCodeData } = rsProps?.data as {
      betCodeData: IMultiBetTicketResponse
    }
    const reviewData: ICreateReview = {
      ...data,
      itemId: betCodeData._id,
      channelID: betCodeData.channelId,
      code: betCodeData.code,
      bookie: betCodeData.bookie,
      itemType: 'betcode',
      result: data.result as reviewResult
    }
    mutate({ body: reviewData })
  }

  return (
    <div className="f-column-30">
      <FormBuilder formComponent={reviewFormComponents} hookForm={hookForm} />
      <TypeButton
        title="Submit Review"
        onClick={hookForm.handleSubmit(handleSubmit)}
        load={isLoading}
      />
      {/* <ResponseComponent
        response={{
          ...response,
          message: response.message.toString().includes('exists')
            ? 'You have reviewed this code already!'
            : response.message
        }}
      /> */}
    </div>
  )
}

export const ViewReview = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext
  const reviewProps = useGetReview()

  useEffect(() => {
    reviewProps.mutate({ query: `?itemId=${rsProps?.action?.id}` })
  }, [])

  const reviews = reviewProps?.data?.data?.reviews || []

  if (!reviews?.length && reviewProps.isLoading) return <Skeleton />

  return (
    <div className="f-column-20">
      {reviews?.map((review, index) => (
        <ViewReviewItem
          key={index}
          comment={review.comment}
          date={review.modified}
          rating={review.rating}
          result={review.result}
          userName={review.user.userName}
          country={review.user.country}
        />
      ))}
    </div>
  )
}

interface IVRItem {
  userName: string
  rating: number
  comment: string
  country: string
  date: string
  result: reviewResult
}

const ViewReviewItem: React.FC<IVRItem> = ({
  comment,
  rating,
  result,
  userName,
  date,
  country
}) => {
  return (
    <div className="f-column-20 border rounded p-2">
      <div className="f-row-40 aic border-bottom pb-2">
        <div className="f-row-10 aic">
          <div className="flag-post-user">
            <p className="m-0 text-little ff-bold">
              {userName?.[0]?.toUpperCase()}
            </p>
          </div>
          <p className="m-0 color-light text-small">{userName}</p>
        </div>
        <div className="f-row ml-auto text-right">
          <p className="m-0 text-little color-light">
            {new Date(date).toDateString()}
          </p>
        </div>
      </div>
      <div className="pb-1">
        <p className="m-0">
          {comment || <span className="color-label">No comment...</span>}
        </p>
      </div>
      <div className="f-row aic">
        <p className="m-0 text-little">won game? &nbsp;&nbsp;&nbsp;{result}</p>
        <div className="ml-auto" style={{ width: '150px' }}>
          <Rating rating={rating} position="right" />
        </div>
      </div>
    </div>
  )
}
