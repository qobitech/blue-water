import * as yup from 'yup'

export interface IForgotPasswordSchema {
  email: string
}

export const forgotPasswordSchema = {
  email: yup.string().required('Email is required')
}
