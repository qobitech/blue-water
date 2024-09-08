import * as yup from 'yup'
import { IFormComponent } from '../../../components/utils/form-builder'

export interface IFormHookType1 {
  title: string
  description: string
}

export const addSchemaType1 = {
  title: yup.string().required('Titled is required'),
  description: yup.string().required('Description is required')
}

export const addSchemaType3 = {
  title: yup.string().required('Titled is required'),
  role: yup.string().required('Role is required'),
  description: yup.string().required('Description is required')
}

export const addSchemaType4 = {
  title: yup.string().required('Titled is required'),
  description: yup.string().required('Description is required'),
  itemType: yup.string().required('Report Type is required')
}

export const addSchemaType2 = {
  title: yup.string().required('title is required'),
  url: yup.string().required('url is required')
}

export const formComponentType1: IFormComponent[] = [
  {
    component: 'input',
    id: 'title',
    label: 'Title',
    placeHolder: 'Enter title',
    type: 'text'
  },
  {
    component: 'text-area',
    id: 'description',
    label: 'Description',
    placeHolder: 'Enter description',
    type: 'text'
  }
]

export const formComponentType2: IFormComponent[] = [
  {
    component: 'input',
    id: 'title',
    label: 'Title',
    placeHolder: 'Enter title',
    type: 'text'
  },
  {
    component: 'input',
    id: 'url',
    label: 'URL',
    placeHolder: 'Enter url',
    type: 'text'
  }
]

export const formComponentType3: IFormComponent[] = [
  {
    component: 'input',
    id: 'title',
    label: 'Title',
    placeHolder: 'Enter title',
    type: 'text'
  },
  {
    component: 'text-area',
    id: 'description',
    label: 'Description',
    placeHolder: 'Enter description',
    type: 'text'
  }
]

export const formComponentType4: IFormComponent[] = [
  {
    component: 'input',
    id: 'title',
    label: 'Title',
    placeHolder: 'Enter title',
    type: 'text'
  },
  {
    component: 'text-area',
    id: 'description',
    label: 'Description',
    placeHolder: 'Enter description',
    type: 'text'
  }
]

export const getReqData = (data: { [key: string]: any }) => {
  let res = {}
  for (const i in data) {
    if (data[i]) res = { ...res, [i]: data[i] }
  }
  return res
}

export const getStatus = (status: string) => {
  switch (status) {
    case 'Active':
      return 'Inactive'
    default:
      return 'Active'
  }
}

export type typeAction = 'create' | 'update' | 'delete' | 'status' | null

export type updatePropComponent = 'input' | 'text-area' | 'select'
export type propType = 'text' | 'number' | 'date'
