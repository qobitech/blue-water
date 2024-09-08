import * as yup from 'yup'
import { statusType } from '../../components/utils/reusable'
import moment from 'moment'

export const pageSectionEnum = {
  CREATEBETCHANNEL: 'Add Channel',
  PREDICTGAME: 'Predict Game',
  SELECTBETCHANNEL: 'Subscribe to Channels',
  SELECTNOTIFICATIONPREFERENCES: 'Notification Preference',
  SELECTBETCODEPREFERENCES: 'Bet Code Preference'
} as const

export type pageSectionType =
  (typeof pageSectionEnum)[keyof typeof pageSectionEnum]

export interface ICreateBetChannelSchema {
  title: string
  description: string
  numberOfPredictions: number
  frequency: string
  perPredictionCost: string
  odds: number
  subscription: 'free' | 'paid'
  isCreate: string
  tandc: boolean
}

export const createChannelErrorEnum = {
  FREE: 'You cannot create more than one (1) channel on a free plan',
  STANDARD: 'You cannot create more than two (2) channels on a standard plan',
  PREMIUM: 'You cannot create more than five (5) channel on a premium plan'
}

export const betChannelSchema = {
  title: yup
    .string()
    .required('Title is required')
    .matches(/^[A-Za-z0-9\s]+$/, 'special characters not allowed')
    .min(4, '4 minimum characters allowed')
    .max(15, '15 maximum characters allowed'),
  description: yup
    .string()
    .required('Description is required')
    .max(100, 'Max character allowed is 100'),
  numberOfPredictions: yup.string().required('Please select'),
  frequency: yup.string().required('Please select'),
  price: yup.string(),
  odds: yup.string().required('Odds is required'),
  subscription: yup.string(),
  perPredictionCost: yup
    .number()
    .test(
      'perPredictionCost',
      'must be a number and greater than zero',
      (value) => {
        return !value ? false : !isNaN(value)
      }
    ),
  tandc: yup
    .boolean()
    .oneOf([true], 'Kindly read and accept the terms and conditions')
}

export interface IBetCodeWebsitePreferenceSchema {
  betWebsites: string[]
}

export const betCodeWebsitePreferenceSchema = {
  betWebsites: yup
    .array()
    .required('Select at least 1 Bookie')
    .min(1, 'Select at least 1 Bookie')
}

export interface INotificationPreferenceSchema {
  values: {
    email: string
    sms: string
    whatsapp: string
    telegram: string
  }
}

export const notificationPreferenceSchema = {
  values: yup
    .object()
    .shape({
      email: yup.string().email('must be a valid email'),
      sms: yup.string(),
      whatsapp: yup.string(),
      telegram: yup.string()
    })
    .test(
      'Provide at least one (1)',
      'Provide at least one (1)',
      ({ email, sms, telegram, whatsapp }) => {
        return !!email || !!sms || !!telegram || !!whatsapp
      }
    )
}
export interface ISubscribeMultiBetChannelSchema {
  betChannels: number
}

export const subscribeMultiBetChannelSchema = {
  betChannels: yup
    .number()
    .required('Subscribe to at least 1 Channel')
    .min(1, 'Subscribe to at least 1 Channel')
}

const predictionItem = {
  bookie: yup.string().required('Bookie is required'),
  code: yup
    .string()
    .required('Bet Code is required')
    .matches(/^[A-Za-z0-9]+$/, 'only letters and numbers are allowed'),
  odds: yup.string().required('Odd is required'),
  startDate: yup.string().required('Start Date is required'),
  endDate: yup
    .string()
    // .required('End Date is required')
    .test(
      'endDate',
      'End date should be at least two hours after Start date',
      (value, context) => {
        // return moment(value).isAfter(context.parent.startDate)
        const startDate = context.parent.startDate // Access startDate value from the parent object
        const startMoment = moment(startDate)
        const endMoment = moment(value)
        const duration = moment.duration(endMoment.diff(startMoment))
        return duration.asHours() >= 2 // Check if duration is at least 2 hours
      }
    ),
  sportsValue: yup.string().nullable(),
  sports: yup.array().of(yup.string().required('Sports is required'))
}

export const editBetTicketSchema = predictionItem

// export const category = [
//   {
//     id: 1,
//     label: 'Soccer',
//     value: 'soccer'
//   },
//   {
//     id: 2,
//     label: 'Tennis',
//     value: 'tennis'
//   },
//   {
//     id: 3,
//     label: 'Basket ball',
//     value: 'basketball'
//   },
//   {
//     id: 4,
//     label: 'Ice hockey',
//     value: 'icehokey'
//   }
// ]

export interface IDropBetTicketSchema {
  betTicketIds: string[]
  shareOption: string
}

export const dropBetTicketSchema = {
  betTicketIds: yup
    .array(yup.string())
    .min(1, 'Select at least one (1) bet code'),
  shareOption: yup.string().required('Share Option required')
}
export interface IArchiveBetTicketSchema {
  betTicketIds: string[]
}

export const archiveBetTicketSchema = {
  betTicketIds: yup
    .array(yup.string())
    .min(1, 'Select at least one (1) bet code')
    .required('Select at least one (1) bet code')
}
export interface IDeleteBetTicketSchema {
  betTicketIds: string[]
  status: statusType
}

export const deleteBetTicketSchema = {
  betTicketIds: yup
    .array(yup.string())
    .min(1, 'Select at least one (1) bet code')
    .required('Select at least one (1) bet code'),
  status: yup.string()
}
export interface IBasicInfoSchema {
  // country: string
  gender: string
  // dob: string
}

export const dropBasicInfoSchema = {
  // country: yup.string().required('Country is required'),
  gender: yup.string().required('Gender is required')
  // dob: yup.string().required('Date of birth is required')
  // dob: yup.string().test('dob', 'must be 18 and above', (value) => {
  //   return moment().diff(moment(value), 'years') >= 18
  // })
}

export interface IPredictionItemHF {
  code: string
  odds: string
  bookie: string
  endDate: string
  startDate: string
  sports: string[]
}

export type IPredictionItemKey =
  | 'bookie'
  | 'code'
  | 'odds'
  | 'endDate'
  | 'startDate'
  | 'sports'

export const predictionSchema = {
  code: yup.string().required('Code is required'),
  odds: yup
    .string()
    .required('Odd is required')
    .test(
      'odds',
      'Please input a number',
      (value) => !isNaN(Number(value?.toString()))
    ),
  bookie: yup.string().required('Bookie is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup
    .string()
    // .required('End date is required')
    .test(
      'endDate',
      'End date should be at least two hours after Start date',
      (value, context) => {
        // return false
        // return moment(value).isAfter(context.parent.startDate)
        const startDate = context.parent.startDate // Access startDate value from the parent object
        const startMoment = moment(startDate)
        const endMoment = moment(value)
        const duration = moment.duration(endMoment.diff(startMoment))
        return duration.asHours() >= 2 // Check if duration is at least 2 hours
      }
    ),
  sports: yup
    .array()
    .of(yup.string())
    .min(1, 'Select at least one (1) sport event')
    .required('Select at least one (1) sport event')
}

export interface IPredictGameSchema {
  betChannel: string
  predictionSchema: IPredictionItemHF[]
}

export const predictGameSchema = {
  betChannel: yup.string().required('Channel is required'),
  predictionSchema: yup
    .array()
    .of(yup.object().shape(predictionSchema))
    .min(1, 'Minimum of 1 prediction required')
    .required('must add at least one prediction')
    .test('unique', 'Only unique bet codes are allowed.', (value) => {
      const codes = value?.map((i) => i.code)
      return codes ? codes.length === new Set(codes)?.size : true
    })
}

export type groupType = 'bookie' | 'endDate' | 'startDate' | 'sports'

export interface IEditPredictGameSchema extends IPredictionItemHF {}
