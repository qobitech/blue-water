import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import * as yup from 'yup'
import { TypeSmallButton } from '../../../components/utils/button'
import { UseFormReturn } from 'react-hook-form'

export interface IACF {
  comment: string
}

const formComponents: IFormComponent[] = [
  {
    component: 'wysiwyg',
    id: 'comment',
    label: 'Add Comment',
    placeHolder: `Share your thoughts`
  }
]

export const addCommentSchema = {
  comment: yup.string().required('Comment is required')
}

const AddComment = ({
  onCancel,
  onAddComment,
  isLoading,
  hookForm
}: {
  onCancel?: () => void
  onAddComment: (data: IACF) => void
  isLoading: boolean
  hookForm: UseFormReturn<IACF, any>
}) => {
  return (
    <div className="">
      <div className="f-column-20 border-label rounded p-4">
        <FormBuilder formComponent={formComponents} hookForm={hookForm} />
        <div className="f-row-20">
          <TypeSmallButton
            title="Comment"
            onClick={hookForm.handleSubmit(onAddComment)}
            buttonType="outlined"
            load={isLoading}
          />
          <TypeSmallButton
            title="Close"
            buttonType="danger"
            onClick={onCancel}
          />
        </div>
        {/* <ResponseComponent response={response} /> */}
      </div>
    </div>
  )
}

export default AddComment
