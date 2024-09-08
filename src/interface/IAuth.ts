import { roleType } from '../constants/global'
import { IUser } from './IUser'

export interface IToken {
  sub: string
  iat: number
  exp: any
  role: roleType
  user: IUser
}

export interface ILogin {
  isSuccess: boolean
  status: number
  message: string
  token: IToken
}

export interface ILoginResponse {
  status: string
  data: {
    user: IUser
  }
}

export interface IRegister {
  status: string
  token: string
  data: {
    user: {
      active: boolean
      membership: string
      stage: string
      notificationPreference: []
      createdAt: string
      modified: string
      gender: string
      welcome: boolean
      tutorial: boolean
      _id: string
      userName: string
      email: string
      role: string
      device: string
      __v: number
    }
  }
}
