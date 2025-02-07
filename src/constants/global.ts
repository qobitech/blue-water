import Cookies from 'js-cookie'
import { actionComponent } from '../components/layout/right-section/utils'
import moment from 'moment'

export const USERDATACOOKIE = '_ud1234567890'
export const TOKENEXPIRATIONDATECOOKIE = '_tKEDC1234567890'
export const COOKIECONSENT = '_tKEDC0000c00wqa4301'

const expiryDate = Cookies.get(TOKENEXPIRATIONDATECOOKIE)

export const setTokenExpiryDate = () => {
  const expireTimeInMinutes = moment().valueOf() + 1800 * 1000
  Cookies.set(TOKENEXPIRATIONDATECOOKIE, JSON.stringify(expireTimeInMinutes))
}

export const setUserCookies = (data: { [key: string]: any }) => {
  Cookies.set(COOKIECONSENT, JSON.stringify(data))
}

export const getUserCookies = () => {
  return Cookies.get(COOKIECONSENT)
}

export const RIGHTSECTIONHISTORY = 'bul123sa__'

export interface IRightSectionHistory {
  component: actionComponent
  title: string
}

export const getAllRightSectionHistory = () => {
  const rightSectionHistory = Cookies.get(RIGHTSECTIONHISTORY)
  if (rightSectionHistory)
    return JSON.parse(rightSectionHistory) as IRightSectionHistory[]
  return [] as IRightSectionHistory[]
}

export const monthEnum = {
  JAN: 'January',
  FEB: 'February',
  MARCH: 'March',
  APRIL: 'April',
  MAY: 'May',
  JUNE: 'June',
  JULY: 'July',
  AUG: 'August',
  SEPT: 'September',
  OCT: 'October',
  NOV: 'November',
  DEC: 'December'
}

export const TOKENEXPIRED = expiryDate
  ? JSON.parse(expiryDate) <= moment().valueOf()
  : false

export const onLogout = () => {
  Cookies.remove(USERDATACOOKIE)
  Cookies.remove(TOKENEXPIRATIONDATECOOKIE)
}

export const UNDER_CONSTRUCTION =
  process.env.REACT_APP_UNDERCONSTRUCTION === 'true'

export const MINHEIGHT = '86vh'

export const ISBETA = false

export const BASEURL = process.env.REACT_APP_BASEURL
export const BASEURLFE = process.env.REACT_APP_BASEURLFE

export const BG = 'bg-mytipster'

export const BRANDCOLOR = '#05254C'

export const PRIMARY_COLOR = '#EB5640'
export const PRIMARY_COLOR_LIGHT = '#F1F1F1'
export const SECONDARY_COLOR = '#919191'
export const DISABLED_COLOR = '#c2c2c2'
export const BORDER_COLOR = '#e4e4e4'
export const INACTIVE_COLOR = '#eCeCeC'
export const BACKGROUND_COLOR = '#f5f5f7'
export const LABEL_COLOR = '#616161'
export const BUTTON_PRIMARY = '#02835B'
export const BUTTON_PRIMARY_LIGHT = '#C8E5DC'
export const COLOR_RATING = '#FFD700'
export const COLOR_YELLOW = '#F9c626'

export type themeType = 'dark' | 'light'

export type filterQueryType = 'tip' | 'channel'
