export const verificationRequestEnum = {
  INPROGRESS: 'in progress',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  NOTREVIEWED: 'not-reviewed'
} as const

export type verificationRequestEnumType =
  (typeof verificationRequestEnum)[keyof typeof verificationRequestEnum]

export interface IVerificationRequest {
  governmentIDNumber: {
    idType: string
    id: string
  }
  _id: string
  userId: string
  firstName: string
  lastName: string
  phoneNumber: string
  countryOfResidence: string
  createdAt: string
  modified: string
  status: verificationRequestEnumType
}

export interface IVerificationRequests {
  status: string
  data: {
    idVerificationRequest: IVerificationRequest[]
  }
}
