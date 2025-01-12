import * as yup from 'yup'
import { UseFormReturn } from 'react-hook-form'
import { IColorGradient } from '../../../constants/global'

export type createFeedbackStage =
  | 'Email Address'
  | 'Feedback Details'
  | 'Feedback Link'

export interface IUserEmail {
  email: string
  tandc: boolean
}
export interface IFeedbackDetails {
  fullName: string
  company: string
  companyUrl: string
  jobTitle: string
  category: string
  subject: string
  purpose: string
}

export const userEmailSchema = {
  email: yup.string().required('Email is required'),
  tandc: yup.boolean().oneOf([true], 'Check is required')
}

export const feedbackDetailsSchema = {
  fullName: yup.string().required('Full Name is required'),
  company: yup.string().required('Email is required'),
  companyUrl: yup.string(),
  jobTitle: yup.string().required('Job Title is required'),
  category: yup.string().required('Category is required'),
  subject: yup.string().required('Subject is required'),
  purpose: yup.string().required('Purpose is required')
}

export interface IFeedbackFormProps {
  hookForm: UseFormReturn<IFeedbackDetails, any>
}
export interface IFeedbackDetailsProps {
  hookForm: UseFormReturn<IFeedbackDetails, any>
}

export interface IUserEmailProps {
  hookForm: UseFormReturn<IUserEmail, any>
}

export interface IFeedbackCardProps {
  feedbackDetails: IFeedbackDetails
  color: IColorGradient
  handleColor: (color: IColorGradient) => void
}

export interface IColorSelectionProps {
  handleColor: (color: IColorGradient) => void
  selectedColor: IColorGradient
}

export interface IColorItemProps {
  color: IColorGradient
  isSelected: boolean
  handleColor: (color: IColorGradient) => void
}

export const defaultDetails: IFeedbackDetails = {
  fullName: 'Your Name',
  companyUrl: '',
  category: 'Category',
  purpose: 'What is the feedback for?',
  subject: 'What do you want to talk about?',
  jobTitle: 'Your job title',
  company: 'the Company where you work'
}

export interface IStageArray {
  stage: createFeedbackStage
  isComplete: boolean
}

export const defaultEmailDetails: IUserEmail = {
  email: '',
  tandc: false
}

export const defaultFeedbackDetails: IFeedbackDetails = {
  fullName: '',
  companyUrl: '',
  category: '',
  purpose: '',
  subject: '',
  jobTitle: '',
  company: ''
}
