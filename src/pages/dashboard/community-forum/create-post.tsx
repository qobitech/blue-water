import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import * as yup from 'yup'
import { useFormHook } from '../../../components/utils/hooks'
import { TypeButton } from '../../../components/utils/button'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import { useCreateCommunityForumPost } from '../../../api/community-forum'
import {
  communityForumPostStatusEnum,
  IGETCommunityForumUser
} from '../../../interface/ICommunityForum'

interface ICreateCF {
  post: string
}

const formComponents: IFormComponent[] = [
  {
    component: 'wysiwyg',
    id: 'post',
    label: 'Add Post',
    placeHolder: `What's on your mind?`
  }
]

const createPostSchema = {
  post: yup.string().required('Post is required')
}

const CreateCommunityPost = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  const { communityForumUser } = rsProps?.data as {
    communityForumUser: IGETCommunityForumUser
  }

  const [hookForm] = useFormHook<ICreateCF>(createPostSchema)

  const onSuccess = () => {
    hookForm.reset({ post: '' })
    rsProps?.onRefresh?.()
  }

  const cfPostProps = useCreateCommunityForumPost(onSuccess)

  const createPost = (data: ICreateCF, status: string) => {
    cfPostProps.mutate({
      body: {
        communityId: communityForumUser?.communityId,
        communityUserId: communityForumUser?._id,
        post: data.post,
        status
      }
    })
  }

  const onCreatePost = (data: ICreateCF) => {
    createPost(data, communityForumPostStatusEnum.PUBLISHED)
  }

  // const onCreateDraft = (data: ICreateCF) => {
  //   createPost(data, communityForumPostStatusEnum.DRAFT)
  // }

  const onClose = () => {
    rsProps?.closeSection()
  }

  return (
    <div className="pt-3 f-column-33">
      <div className="f-column-20">
        <FormBuilder
          formComponent={formComponents}
          hookForm={hookForm}
          // key={refreshForm}
        />
      </div>
      <div className="f-row-20 flex-wrap pb-4 aic">
        <TypeButton
          title="Post"
          onClick={hookForm.handleSubmit(onCreatePost)}
          load={cfPostProps.isLoading}
        />
        <TypeButton title="Close" onClick={onClose} buttonType="danger" />
      </div>
      {/* <ResponseComponent response={cfPostProps.response} /> */}
    </div>
  )
}

export default CreateCommunityPost
