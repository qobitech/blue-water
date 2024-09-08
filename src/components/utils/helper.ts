import { Location } from 'react-router-dom'
import {
  IPaymentDetails,
  VAT,
  monthEnum,
  getUserData
} from '../../constants/global'
import { IBetTicketStatus } from '../../interface/IBet'
import { statusType } from './reusable'
import moment from 'moment'
export const _handleTh = (amount: string) => {
  if (amount) {
    const toNumber = parseFloat(amount.replace(/\D/g, ''))
    const toLocale = toNumber.toLocaleString()
    return toLocale
  }
}

export const _separator = (name: string) => {
  const arr = name
    .split('')
    .map((item, index) => {
      if (index !== 0) {
        if (item === item.toUpperCase()) {
          return ' ' + item
        } else {
          return item
        }
      } else return item
    })
    .toString()
    .replace(/,/g, '')
  return arr.charAt(0).toUpperCase() + arr.slice(1).toLowerCase()
}

const joinS = (arr: string) => arr.toUpperCase()

export const _joiner = (name: string) => {
  const arr = name
    .trim()
    .split('_')
    .map((item, index) => {
      if (index !== 0) {
        if (item === item.toUpperCase()) {
          return ' ' + joinS(item)
        } else {
          return joinS(item)
        }
      } else return joinS(item)
    })
    .toString()
    .replace(/,/g, '')
  return arr
}

export function _removeHTML(data: string) {
  const regExp = /(&nbsp;|<([^>]+)>)/gi
  const wSExp = /\s{2,}/gi
  const res = data.replace(regExp, '')
  return res.replace(wSExp, ' ')
}

export const _mutateHTMLPost = (post: string) => post.replace(/&lt;/g, '<')

export const returnValue = (query: string, value: any) =>
  value ? query + '' + value : ''

export const checkReturned = (data: string) => (data ? '?' + data : '')

const getLastDigit = (rank: number) => {
  const digit = (rank + '').split('')
  return parseInt(digit[digit.length - 1])
}

export const getRanking = (rank: number) => {
  if (rank) {
    switch (getLastDigit(rank)) {
      case 3:
        return rank + 'rd'
      case 2:
        return rank + 'nd'
      case 1:
        return rank + 'st'
      default:
        return rank + 'th'
    }
  } else {
    return '...'
  }
}

export function generateUUID() {
  let d = new Date().getTime()
  let d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16
    if (d > 0) {
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function _isUrl(page: string, location: Location) {
  return location.pathname.includes(page)
}

export const getSlug = (title: string) => {
  if (!title) return ''
  return title.trim().split(' ').join('-').toLowerCase()
}

export const reverseSlug = (title: string) => {
  if (!title) return ''
  return title.trim().split('-').join(' ').toLowerCase()
}

export const isSubscribed = (
  subscribers: Array<{
    id: string
    date: string
  }> | null
) => subscribers?.map((j) => j.id).includes(getUserData()?.user?._id)

export const getMonth = (date: number) => {
  switch (date) {
    case 0:
      return 'Jan'
    case 1:
      return 'Feb'
    case 2:
      return 'Mar'
    case 3:
      return 'Apr'
    case 4:
      return 'May'
    case 5:
      return 'Jun'
    case 6:
      return 'July'
    case 7:
      return 'Aug'
    case 8:
      return 'Sept'
    case 9:
      return 'Oct'
    case 10:
      return 'Nov'
    case 11:
      return 'Dec'
    default:
      return ''
  }
}

export const getMonthFull = (date: number) => {
  switch (date) {
    case 1:
      return 'January'
    case 2:
      return 'February'
    case 3:
      return 'March'
    case 4:
      return 'April'
    case 5:
      return 'May'
    case 6:
      return 'June'
    case 7:
      return 'July'
    case 8:
      return 'August'
    case 9:
      return 'September'
    case 10:
      return 'October'
    case 11:
      return 'November'
    case 12:
      return 'December'
    default:
      return ''
  }
}

export const monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

export const monthsFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const getTicketStatus = (
  betTicketStatus: IBetTicketStatus[] | null,
  status: statusType,
  datanumber?: number
) => {
  let bts = betTicketStatus || []
  const currentMonth = getMonth(new Date().getMonth())
  const currentYear = new Date().getFullYear()
  const isCurrentMonth =
    bts?.filter((i) => i.month === currentMonth && i.year === currentYear)
      ?.length > 0
  if (isCurrentMonth) {
    bts = bts.map((i) => ({
      ...i,
      status:
        i.month === currentMonth && i.year === currentYear
          ? {
              ...i.status,
              Pending:
                status === 'Pending'
                  ? i.status.Pending + (datanumber || 1)
                  : status === 'Published'
                  ? i.status.Pending - (datanumber || 1)
                  : i.status.Pending,
              Published:
                status === 'Published'
                  ? i.status.Published + (datanumber || 1)
                  : i.status.Published,
              Expired:
                status === 'Archived'
                  ? i.status.Archived + (datanumber || 1)
                  : i.status.Archived
            }
          : i.status
    }))
  } else {
    bts.push({
      month: getMonth(new Date().getMonth()),
      year: new Date().getFullYear(),
      status: {
        Published: status === 'Published' ? 1 : 0,
        Archived: status === 'Archived' ? 1 : 0,
        Pending: status === 'Pending' ? datanumber || 1 : 0
      }
    })
  }
  return bts
}

// eslint-disable-next-line n/handle-callback-err
export const handleError = (err: any) => {
  // if (process.env.NODE_ENV === 'production') return
  // console.error(err)
}

// 5/2 = 2.5
//  5
//  0 - 1 - 2 - 3 - 4
//  1               1

// 7/4 = 1.75
// 9/4 = 2.25

export const calcExpectedDropPerWeek = (drop: number, weekIndex: number) => {
  if (drop % 4 === 0) return drop / 4
  let expectedDropPerWeek = 0
  const multiple = Math.ceil(drop / 4)
  for (let j = 0; j < multiple; j++) {
    for (let i = 0; i < 4; i++) {
      if (weekIndex === i || i - 4 === weekIndex) {
        expectedDropPerWeek++
      }
      if (j * 4 + i + 1 === drop) {
        break
      }
    }
  }
  return expectedDropPerWeek
}

export const getWeeklyExpectedDrops = (
  drop: number,
  frequency: string,
  week: number
) => {
  if (frequency === 'week') return drop
  if (frequency === 'day') return drop * 7
  if (frequency === 'month') return calcExpectedDropPerWeek(drop, week)
}

export const getNumberOfTickets = (tickets?: number) => {
  if (tickets)
    switch (tickets) {
      case 1:
        return 'Once a '
      case 2:
        return 'Two times a '
      case 3:
        return 'Three times a '
      case 4:
        return 'Four times a '
      case 5:
        return 'Five times a '
      case 6:
        return 'Six times a '
      case 7:
        return 'Seven times a '
      case 8:
        return 'Eight times a '
      case 9:
        return 'Nine times a '
      case 10:
        return 'Ten times a '
      default:
        return 'More than Ten times a '
    }
  return ''
}

export const getAge = (birthday: Date) => {
  const ageDifMs = moment().valueOf() - birthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export function replaceObjects<T extends { [key: string]: any }>(
  original: T[],
  replacements: T[],
  keyId: string
) {
  return original.map((originalObj) => {
    // Find a replacement object with the same ID
    const replacementObj = replacements.find(
      (replacement) => replacement[keyId] === originalObj[keyId]
    )

    // If a replacement object is found, use it; otherwise, use the original
    return replacementObj || originalObj
  })
}

export function copyObjectsWithUniqueId<T extends { [key: string]: any }>(
  sourceArray: T[],
  destinationArray: T[],
  keyId: string,
  operationType: 'queue' | 'stack'
) {
  const destinationIds = destinationArray.map((i) => i[keyId])

  // Copy objects with unique ids based on the specified operation type
  sourceArray.forEach((obj) => {
    if (obj?.[keyId] && !destinationIds.includes(obj?.[keyId])) {
      if (operationType === 'queue') {
        destinationArray.push({ ...obj })
      } else if (operationType === 'stack') {
        destinationArray.unshift({ ...obj })
      }
    }
  })
  return destinationArray
}

const getMonthYear = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  return {
    currentYear,
    currentMonth
  }
}

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function getDaysInaMonth(month: number, year: number) {
  const leapYear = isLeapYear(year)
  switch (month) {
    case 4:
    case 6:
    case 8:
    case 11:
      return 30
    case 2:
      return leapYear ? 29 : 28
    default:
      return 31
  }
}

const getMonthNumber = (month: number) => {
  switch (month) {
    case 10:
    case 11:
    case 12:
      return month + ''
    default:
      return `0${month}`
  }
}

export const getDeadline = (week: number, month: string) => {
  const monthNumber = getMonthNum(month)
  const currentYear = getMonthYear().currentYear
  const daysInaMonth = getDaysInaMonth(monthNumber, currentYear)
  const totalWeek = week >= 4 ? daysInaMonth : 7 * week
  const firstDate = new Date(`${currentYear}-${getMonthNumber(monthNumber)}-01`)
  const scheduleDate = new Date(firstDate)
  scheduleDate.setDate(firstDate.getDate() + totalWeek - 1)
  return scheduleDate.toISOString()
}

export const getMonthNum = (date: string) => {
  switch (date) {
    case monthEnum.JAN:
      return 1
    case monthEnum.FEB:
      return 2
    case monthEnum.MARCH:
      return 3
    case monthEnum.APRIL:
      return 4
    case monthEnum.MAY:
      return 5
    case monthEnum.JUNE:
      return 6
    case monthEnum.JULY:
      return 7
    case monthEnum.AUG:
      return 8
    case monthEnum.SEPT:
      return 9
    case monthEnum.OCT:
      return 10
    case monthEnum.NOV:
      return 11
    case monthEnum.DEC:
      return 12
    default:
      return getMonthYear().currentMonth
  }
}

export const wordVariation = (
  count: number,
  word: string,
  hideCount?: boolean
) => {
  if (hideCount) return ` ${word}${count > 1 ? 's' : ''}`
  return count + ` ${word}${count > 1 ? 's' : ''}`
}

export function getNextDay(date: string) {
  const currentDate = new Date(date)
  currentDate.setDate(currentDate.getDate() + 1)
  return currentDate
}

export const getTime = (date: string) => {
  const currentDate = new Date(date)
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()
  const amPM = hours >= 12 ? 'PM' : 'AM' // Determine AM/PM

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12

  // Ensure minutes and seconds are displayed with leading zeros if less than 10
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPM}`
}

export const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
  window.scrollTo({
    top: (ref.current?.offsetTop || 0) - 40,
    left: 0,
    behavior: 'smooth'
  })
}

export const handleScrollRightSection = (
  ref: React.RefObject<HTMLDivElement>
) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function differenceInDaysWeeksMonths(
  startDate: string,
  endDate: string
): {
  differenceInDays: number
  differenceInWeeks: number
  differenceInMonths: number
} {
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = end.getTime() - start.getTime()

  // Convert milliseconds to days
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)

  // Convert days to weeks
  const differenceInWeeks = parseInt((differenceInDays / 7).toFixed(0))

  // Calculate the difference in months
  const startMonth = start.getMonth()
  const startYear = start.getFullYear()
  const endMonth = end.getMonth()
  const endYear = end.getFullYear()
  const differenceInMonths =
    endMonth + 12 * endYear - (startMonth + 12 * startYear)

  return {
    differenceInDays: differenceInDays >= 1 ? Math.floor(differenceInDays) : 1,
    differenceInWeeks,
    differenceInMonths
  }
}

export function getDate(date: string): string {
  const today = new Date(date)
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function _isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

export const getFrequencyNumber = (frequency: string) => {
  switch (frequency) {
    case 'week':
      return 4
    case 'day':
      return 28
    case 'month':
      return 1
    default:
      return 1
  }
}

export const getMonthlySubCost = (
  perPredictionCost: number,
  predictionNumber: number,
  frequency: string
) => {
  const frequencyNum = getFrequencyNumber(frequency)
  return (
    Math.round(
      (perPredictionCost || 1) * frequencyNum * predictionNumber * 10
    ) / 10
  )
}

export const getSubAmount = (i: IPaymentDetails) => i.amount * i.quantity

export const getVATAmount = (i: IPaymentDetails) =>
  getSubAmount(i) * (VAT / 100)

export const getTotalAmount = (i: IPaymentDetails) =>
  getVATAmount(i) + getSubAmount(i)

export const getDayMonth = (date: string | number | Date) =>
  new Date(date).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric'
  })

export const getMYear = (date: string | number | Date) =>
  new Date(date).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric'
  })

export const isNotObject = (value?: number) =>
  typeof value === 'number' || typeof value === 'string' ? value : undefined

export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getTimelineDate = (date: string) => {
  const data = new Date(date).toDateString().split(' ')
  data.splice(0, 1)
  data.splice(data.length - 1, 1)
  return data.join(' ')
}

export const getTimeline = (startDate: string, endDate: string) => {
  const sd = getTimelineDate(startDate)
  const ed = getTimelineDate(endDate)
  if (sd === ed) return sd
  return `${sd} - ${ed}`
}
