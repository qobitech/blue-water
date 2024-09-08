import * as yup from 'yup'

export interface ILoginSchema {
  email: string
  password: string
  // rememberMe: boolean
}

export const userSchema = {
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required')
  // rememberMe: yup.boolean().oneOf([true], 'Check is required')
}
