import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import * as yup from 'yup'
import { useFormHook } from '../../../components/utils/hooks'
import { TypeButton } from '../../../components/utils/button'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import {
  useCreateCommunityForum,
  useUpdateCommunityForum
} from '../../../api/community-forum'
// import { ResponseComponent } from '../../../api'
import { useEffect } from 'react'
import { IGETCommunityForum } from '../../../interface/ICommunityForum'
import { _mutateHTMLPost } from '../../../components/utils/helper'

interface ICreateCF {
  title: string
  description: string
  about: string
  tag: string
  color: string
  icon: string
}

const formComponents: IFormComponent[] = [
  {
    component: 'input',
    id: 'title',
    label: 'Forum title',
    placeHolder: 'Enter forum title'
  },
  {
    component: 'wysiwyg',
    id: 'description',
    label: 'Purpose',
    placeHolder: 'Define the purpose of the forum'
  },
  {
    component: 'wysiwyg',
    id: 'about',
    label: 'About',
    placeHolder: 'Go into details...'
  },
  {
    component: 'input',
    id: 'tag',
    label: 'Tag',
    placeHolder: 'Enter tag'
  },
  {
    component: 'input',
    id: 'color',
    label: 'Color',
    placeHolder: 'Color code (HEX)'
  },
  {
    component: 'input',
    id: 'icon',
    label: 'Icon',
    placeHolder: 'Icon title'
  }
]

const createForumSchema = {
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  about: yup.string().required('About is required'),
  tag: yup.string().required('Tag is required'),
  color: yup.string().required('Color is required'),
  icon: yup.string().required('Icon is required')
}

const CreateCommunityForum = ({ globalContext }: IGlobalRightSection) => {
  if (!globalContext) return <>reload page</>

  const { rsProps } = globalContext

  const isUpdate = rsProps?.action.type === 'update'

  const [hookForm] = useFormHook<ICreateCF>(createForumSchema)

  useEffect(() => {
    if (isUpdate) {
      const { updateData } = rsProps?.data as { updateData: IGETCommunityForum }
      hookForm.setValue('title', updateData.title)
      hookForm.setValue(
        'description',
        _mutateHTMLPost(updateData.description || '')
      )
      hookForm.setValue('about', _mutateHTMLPost(updateData.about || ''))
      hookForm.setValue('tag', updateData.tag || '')
      hookForm.setValue('color', updateData.color || '')
      hookForm.setValue('icon', updateData.icon || '')
    }
  }, [isUpdate])

  const onSuccess = () => {
    hookForm.reset({
      title: '',
      description: '',
      color: '',
      tag: '',
      icon: '',
      about: ''
    })
  }

  const createForumProps = useCreateCommunityForum(onSuccess)
  const updateForumProps = useUpdateCommunityForum(onSuccess)

  const onCreate = (body: ICreateCF) => {
    if (isUpdate) {
      const { updateData } = rsProps?.data as { updateData: IGETCommunityForum }
      updateForumProps.mutate({
        body: { ...body, communityId: updateData._id },
        id: updateData._id
      })
    } else {
      createForumProps.mutate({ body })
    }
  }

  return (
    <div className="pt-3">
      <div className="f-column-20">
        <FormBuilder formComponent={formComponents} hookForm={hookForm} />
        <div className="f-row-20 pt-2">
          <TypeButton
            title={isUpdate ? 'Update' : 'Create'}
            onClick={hookForm.handleSubmit(onCreate)}
            load={createForumProps.isLoading || updateForumProps.isLoading}
          />
          <TypeButton
            title="Close"
            buttonType="danger"
            onClick={() => rsProps?.closeSection()}
          />
        </div>
        {/* {isUpdate ? (
          <ResponseComponent response={updateForumProps.response} />
        ) : (
          <ResponseComponent response={createForumProps.response} />
        )} */}
      </div>
    </div>
  )
}

export default CreateCommunityForum
