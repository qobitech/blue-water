import * as yup from 'yup'
import { UseFormReturn } from 'react-hook-form'
import { IColorGradient } from '../../../constants/global'

export type createFeedbackStage = 'Contact Us' | 'Response Status'

export interface IUserEmail {
  email: string
  tandc: boolean
}
export interface IFeedbackDetails {
  name: string
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
  name: yup.string().required('Full Name is required'),
  company: yup.string().required('Email is required'),
  companyUrl: yup.string(),
  jobTitle: yup.string().required('Job Title is required'),
  category: yup.string().required('Category is required'),
  subject: yup.string().required('Subject is required'),
  purpose: yup.string().required('Purpose is required')
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
  hidePallette?: boolean
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
  name: 'Your Name',
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
  name: '',
  companyUrl: '',
  category: '',
  purpose: '',
  subject: '',
  jobTitle: '',
  company: ''
}

export const userProfileSchema = {
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required'),
  company: yup.string().required('Company / Organization is required'),
  companyUrl: yup.string(),
  jobTitle: yup.string().required('Job Title is required')
}

export const feedbackCampaignSchema = {
  category: yup.string().required('Category is required'),
  subject: yup.string().required('Subject is required'),
  purpose: yup.string().required('Purpose is required'),
  demoPresentation: yup.string()
}

export interface IUserProfile {
  name: string
  email: string
  phone: string
  message: string
  // company: string
  // companyUrl: string
  // jobTitle: string
}

export interface IFeedbackCampaign {
  category: string
  subject: string
  purpose: string
  demoPresentation: string
}

export interface IFeedbackCampaignFormProps {
  hookForm: UseFormReturn<IFeedbackCampaign, any>
  handleFeedback: () => void
}

export interface IRegisterForm {
  hookForm: UseFormReturn<IUserProfile, any>
  handleRegister: () => void
  btnTitle: string
}

export interface IFeedBackCard {
  subject: string
  requester: string
  company: string
  category: string
  onGenerateLink: () => void
  onNewFeedback: () => void
  onClose: () => void
  onEdit: () => void
  color: IColorGradient
  companyWebsite?: string
  isFeedbackLink: boolean
}
