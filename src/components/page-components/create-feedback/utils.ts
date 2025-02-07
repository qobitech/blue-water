import * as yup from 'yup'
import { UseFormReturn } from 'react-hook-form'

export type createFeedbackStage =
  | 'Basic Information'
  | 'Developer Experience'
  | 'Project Vision'
  | 'Compliance & Certification'
  | 'Next Steps'

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

export const feedbackCampaignSchema = {
  category: yup.string().required('Category is required'),
  subject: yup.string().required('Subject is required'),
  purpose: yup.string().required('Purpose is required'),
  demoPresentation: yup.string()
}

export interface IBasicInformation {
  name: string
  company: string
  email: string
  phone: string
  website: string
}

export interface IDeveloperExperience {
  experience: string
  projects: string
  projectsDeveloped: string[]
  projectSize: string
  projectsDevelopedOthers: string
}

export interface IProjectVision {
  estimatedBudget: string
  financingMethod: string
  proposedDevelopment: string
  proposedDevelopmentOther: string
  waterfrontExperience: string
}

export interface IComplianceCertification {
  developerLicense: string
  legalIssues: string
}

export interface INextSteps {
  discoveryMeeting: string
  communicationMethod: string[]
}

export const nextStepsSchema = {
  discoveryMeeting: yup.string().required('input is required'),
  communicationMethod: yup.array().of(yup.string()).min(1, 'input is required')
}

export const complianceCertificationSchema = {
  developerLicense: yup.string().required('input is required'),
  legalIssues: yup.string().required('input is required')
}

export const projectVisionSchema = {
  estimatedBudget: yup.string().required('Estimated Budget is required'),
  financingMethod: yup
    .string()
    .required('Preferred Financing Method is required'),
  proposedDevelopment: yup
    .string()
    .required('Proposed Development Type is required'),
  waterfrontExperience: yup.string().required('input is required')
}

export const basicInfoSchema = {
  name: yup.string().required('Name is required'),
  company: yup.string().required('Company is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().required('Phone is required'),
  website: yup.string()
}

export const developerExperienceSchema = {
  experience: yup.string().required('Experience is required'),
  projects: yup.string().required('Projects is required'),
  projectsDeveloped: yup
    .array()
    .of(yup.string())
    .min(1, 'input is required')
    .required('input is required'),
  projectSize: yup.string().required('Project Size is required')
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

export interface IBasicInformationForm {
  hookForm: UseFormReturn<IBasicInformation, any>
}
export interface IDeveloperExperienceForm {
  hookForm: UseFormReturn<IDeveloperExperience, any>
}
export interface IProjectVisionForm {
  hookForm: UseFormReturn<IProjectVision, any>
}
export interface IComplianceCertificationForm {
  hookForm: UseFormReturn<IComplianceCertification, any>
}
export interface INextStepsForm {
  hookForm: UseFormReturn<INextSteps, any>
}

export const stages: createFeedbackStage[] = [
  'Basic Information',
  'Developer Experience',
  'Project Vision',
  'Compliance & Certification',
  'Next Steps'
]
