import * as yup from 'yup'

export interface IMakePaymentSchema {
  billingAddress: string
  iAccept: boolean
  email: string
  name: string
}

export const paymentSchema = {
  billingAddress: yup.string().required('billing address is required'),
  iAccept: yup
    .boolean()
    .oneOf([true], 'Kindly read and accept the terms and conditions'),
  email: yup.string().email().required('email is required'),
  name: yup.string().required('name is required')
}
