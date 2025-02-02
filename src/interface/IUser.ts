import { membershipType, roleType, adminLevel } from '../constants/global'
import { IGetDatasType } from './IOther'
import { verificationRequestEnumType } from './IVerificationRequest'

export interface IUserLegacy {
  id?: string
  email: string
  userName: string
  createdAt: string
  role: roleType
  country: string | null
  gender: string | null
  dob: string | null
  welcome?: boolean
  tutorial?: boolean
  wallet: string
}

export interface IAdmin extends IUserLegacy {
  level: adminLevel
}

export interface ISeller extends IUserLegacy {
  subscribersPaid: number
  subscribersFree: number
  betchannels: number
  betTickets: number
  earnings: number
  rank: number
  membership: membershipType
  stage: 'onboarding1' | 'onboarding2' | 'onboarding3' | 'onboarding4' | 'user'
  betTicketsWon: number
}

export interface IBuyer extends IUserLegacy {
  subscriptions: {
    free: Array<{ id: string; date: string }> | null
    paid: Array<{ id: string; date: string }> | null
  }
  rank: number
  membership: membershipType
  stage: 'onboarding1' | 'onboarding2' | 'onboarding3' | 'onboarding4' | 'user'
  betCodeWebsites: string[] | null
  notificationPreference: {
    email: string | null
    sms: string | null
    telegram: string | null
    whatsapp: string | null
  } | null
}

export interface ISubscribed {
  email: string
}

export interface ISubscriber {
  email: string
}

export type typeStage =
  | 'onboarding1'
  | 'onboarding2'
  | 'onboarding3'
  | 'onboarding4'
  | 'user'

export type userlevelType =
  | 'Intermediate'
  | 'Junior'
  | 'Master'
  | 'Novice'
  | 'Senior'

export interface IUserLevel {
  _id: string
  createdAt: string
  modified: string
  title: userlevelType
  role: string
  description: string
  status: string
}

export type userStatusType = 'active' | 'suspended'

export interface IUser {
  membership: membershipType
  stage: typeStage
  notificationPreference: Array<{ title: string; value: string }>
  gender: string
  welcome: boolean
  tutorial: boolean
  _id: string
  userName: string
  email: string
  emailConfirmed: boolean
  role: string
  createdAt: string
  country: string
  countryOfResidence: string
  dob: string
  wallet: string
  levelId: string
  level: IUserLevel[]
  lastLogin: string
  firstName: string
  lastName: string
  phoneNumber: string
  bvn: string | null
  nin: string | null
  governmentIDNumber: {
    idType: string
    id: string
  } | null
  verificationRequest?: verificationRequestEnumType
  status: userStatusType
  twitter: string
  instagram: string
  linkedin: string
  facebook: string
  tiktok: string
}

export interface IUserResponse {
  status: string
  message: string
  data: {
    user: IUser
  }
}

export interface IPasswordResponse {
  status: string
  data: {
    user: IUser
  }
}
export interface IPasswordRequest {
  passwordCurrent: string
  password: string
  passwordConfirm: string
}

export interface IUsers extends IGetDatasType {
  data: {
    users: IUser[]
  }
}
