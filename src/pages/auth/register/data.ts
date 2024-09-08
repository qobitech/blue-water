import * as yup from 'yup'
import { roleType, membershipType } from '../../../constants/global'

export const roleEnum: { [K in roleType]: roleType } = {
  buyer: 'buyer',
  seller: 'seller',
  admin: 'admin'
} as const

export const roleIdEnum = {
  ADMIN: '1',
  BUYER: '2',
  SELLER: '3'
} as const

export type roleIdType = (typeof roleIdEnum)[keyof typeof roleIdEnum]

export const pageSectionEnum = {
  BASICINFO: 'Basic Info',
  SELECTPLAN: 'Select Plan',
  PAYMENT: 'Setup Payment'
} as const

export type pageSectionType =
  (typeof pageSectionEnum)[keyof typeof pageSectionEnum]

export interface ICreateUserSchema {
  userName: string
  email: string
  password: string
  role: roleType
}

export const userSchema = {
  userName: yup
    .string()
    .required('User Name is required')
    .matches(/^[A-Za-z0-9]+$/, 'only letters and numbers are allowed')
    .min(3, '3 minimum characters allowed')
    .max(15, '15 maximum characters allowed'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role is required'),
  tandc: yup
    .boolean()
    .oneOf([true], 'Kindly read and accept the terms and conditions'),
  ofage: yup
    .boolean()
    .oneOf([true], 'Kindly read and accept the terms and conditions'),
  emailupdates: yup
    .boolean()
    .oneOf([true], 'Kindly read and accept the terms and conditions')
}

export interface ISelectPlanSchema {
  subscription: membershipType
}

export const selectPlanSchema = {
  subscription: yup.string().required('Please select a plan')
}

export const makePaymentSchema = {
  billingAddress: yup.string().required('Billing address required'),
  iAccept: yup.boolean().oneOf([true], 'Check is required')
}

export type paymentType = 'basic' | 'standard' | 'premium'

export interface IMakePaymentSchema {
  billingAddress: membershipType
  iAccept: boolean
}

// export const paymentSchema = {
//   paymentGateway: yup.string().required('Please select payment type')
// }
