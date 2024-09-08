import * as yup from 'yup'

export interface IResetPasswordSchema {
  password: string
  passwordConfirm: string
}

export const resetPasswordSchema = {
  password: yup.string().required('input required'),
  passwordConfirm: yup
    .string()
    .required('input required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
}
