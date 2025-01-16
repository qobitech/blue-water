import { IToken } from '../interface/IAuth'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import jwtEncode from 'jwt-encode'
import { roleEnum } from '../pages/auth/register/data'
import { handleError } from '../components/utils/helper'
import { actionComponent } from '../components/layout/right-section/utils'
import { SNART_XER } from '../components/page-components/payment/payment-status'
import moment from 'moment'
import { pageurl } from './pageurl'

export type routeType = 'admin' | 'auth' | 'public' | 'onboarding' | 'user'

export const SINGLETIPSCONFIG = false
export const ACCUMULATEDTIPSCONFIG = true

export const USERDATACOOKIE = '_ud1234567890'
export const TOKENEXPIRATIONDATECOOKIE = '_tKEDC1234567890'
export const COOKIECONSENT = '_tKEDC0000c00wqa4301'

export type paidSubscriptionType = 'channel' | 'game' | '' | null

export type paidType = 'betcode' | 'credit-wallet' | null

export type serviceType = 'betcode'

export type purchaseType = 'betcode' | 'credit-wallet'

export type withdrawRequestType = 'withdraw-request'

export type serviceFeeType = 'service-fee'

export type transactionItemType =
  | paidSubscriptionType
  | purchaseType
  | serviceType
  | membershipType
  | withdrawRequestType
  | serviceFeeType

export const TRANSACTIONTYPEENUM = {
  SUBSCRIPTION: 'subscription',
  SUBSCRIPTIONRENEWAL: 'subscription-renewal',
  PURCHASE: 'purchase',
  DONATION: 'donation',
  PAYOUT: 'payout',
  REFUND: 'refund',
  SERVICE: 'service',
  CREDITWALLET: 'credit-wallet',
  MEMBERSHIP: 'membership',
  SERVICEFEE: 'service-fee'
} as const

export type transactionType =
  | (typeof TRANSACTIONTYPEENUM)[keyof typeof TRANSACTIONTYPEENUM]
  | null

export const getUserData = () => {
  try {
    const data = Cookies.get(USERDATACOOKIE)
    const userData: IToken = jwtDecode(data)
    if (!userData.role) throw new Error('user not logged in')
    return userData
  } catch (e) {
    // localStorage.clear()
    return {} as IToken
  }
}

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

export interface gameStatsCookieEnum {
  brandEngagements: boolean
  bannerAdImpressions: boolean
  profileVisits: boolean
  websiteVisits: boolean
  numberOfShares: boolean
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
  localStorage.removeItem(SNART_XER)
}

export const encodeData = (data: any, role: roleType) => {
  const jwt = jwtEncode(
    {
      sub: '1234567890',
      iat: 1516239022,
      exp: '30m',
      role,
      user: data
    } as IToken,
    'secret'
  )
  Cookies.set(USERDATACOOKIE, jwt)
}

export const getIsLogged = () =>
  getUserData().role === 'buyer' || getUserData().role === 'seller'

export const getIsAdminLogged = () => getUserData().role === 'admin'

export interface ICountry {
  name: string
  code: string
  currencyCode: string | null
}

export const countries: ICountry[] = [
  { name: 'Afghanistan', code: 'AF', currencyCode: 'AFN' },
  { name: 'land Islands', code: 'AX', currencyCode: 'EUR' },
  { name: 'Albania', code: 'AL', currencyCode: 'ALL' },
  { name: 'Algeria', code: 'DZ', currencyCode: 'DZD' },
  { name: 'American Samoa', code: 'AS', currencyCode: 'USD' },
  { name: 'AndorrA', code: 'AD', currencyCode: 'EUR' },
  { name: 'Angola', code: 'AO', currencyCode: 'AOA' },
  { name: 'Anguilla', code: 'AI', currencyCode: 'XCD' },
  { name: 'Antarctica', code: 'AQ', currencyCode: null },
  { name: 'Antigua and Barbuda', code: 'AG', currencyCode: 'XCD' },
  { name: 'Argentina', code: 'AR', currencyCode: 'ARS' },
  { name: 'Armenia', code: 'AM', currencyCode: 'AMD' },
  { name: 'Aruba', code: 'AW', currencyCode: 'AWG' },
  { name: 'Australia', code: 'AU', currencyCode: 'AUD' },
  { name: 'Austria', code: 'AT', currencyCode: 'EUR' },
  { name: 'Azerbaijan', code: 'AZ', currencyCode: 'AZN' },
  { name: 'Bahamas', code: 'BS', currencyCode: 'BSD' },
  { name: 'Bahrain', code: 'BH', currencyCode: 'BHD' },
  { name: 'Bangladesh', code: 'BD', currencyCode: 'BDT' },
  { name: 'Barbados', code: 'BB', currencyCode: 'BBD' },
  { name: 'Belarus', code: 'BY', currencyCode: 'BYN' },
  { name: 'Belgium', code: 'BE', currencyCode: 'EUR' },
  { name: 'Belize', code: 'BZ', currencyCode: 'BZD' },
  { name: 'Benin', code: 'BJ', currencyCode: 'XOF' },
  { name: 'Bermuda', code: 'BM', currencyCode: 'BMD' },
  { name: 'Bhutan', code: 'BT', currencyCode: 'BTN' },
  { name: 'Bolivia', code: 'BO', currencyCode: 'BOB' },
  { name: 'Bosnia and Herzegovina', code: 'BA', currencyCode: 'BAM' },
  { name: 'Botswana', code: 'BW', currencyCode: 'BWP' },
  { name: 'Bouvet Island', code: 'BV', currencyCode: null },
  { name: 'Brazil', code: 'BR', currencyCode: 'BRL' },
  { name: 'British Indian Ocean Territory', code: 'IO', currencyCode: 'USD' },
  { name: 'Brunei Darussalam', code: 'BN', currencyCode: 'BND' },
  { name: 'Bulgaria', code: 'BG', currencyCode: 'BGN' },
  { name: 'Burkina Faso', code: 'BF', currencyCode: 'XOF' },
  { name: 'Burundi', code: 'BI', currencyCode: 'BIF' },
  { name: 'Cambodia', code: 'KH', currencyCode: 'KHR' },
  { name: 'Cameroon', code: 'CM', currencyCode: 'XAF' },
  { name: 'Canada', code: 'CA', currencyCode: 'CAD' },
  { name: 'Cape Verde', code: 'CV', currencyCode: 'CVE' },
  { name: 'Cayman Islands', code: 'KY', currencyCode: 'KYD' },
  { name: 'Central African Republic', code: 'CF', currencyCode: 'XAF' },
  { name: 'Chad', code: 'TD', currencyCode: 'XAF' },
  { name: 'Chile', code: 'CL', currencyCode: 'CLP' },
  { name: 'China', code: 'CN', currencyCode: 'CNY' },
  { name: 'Christmas Island', code: 'CX', currencyCode: 'AUD' },
  { name: 'Cocos (Keeling) Islands', code: 'CC', currencyCode: 'AUD' },
  { name: 'Colombia', code: 'CO', currencyCode: 'COP' },
  { name: 'Comoros', code: 'KM', currencyCode: 'KMF' },
  { name: 'Congo', code: 'CG', currencyCode: 'XAF' },
  {
    name: 'Congo, The Democratic Republic of the',
    code: 'CD',
    currencyCode: 'CDF'
  },
  { name: 'Cook Islands', code: 'CK', currencyCode: 'NZD' },
  { name: 'Costa Rica', code: 'CR', currencyCode: 'CRC' },
  { name: 'Cote D"Ivoire', code: 'CI', currencyCode: 'XOF' },
  { name: 'Croatia', code: 'HR', currencyCode: 'HRK' },
  { name: 'Cuba', code: 'CU', currencyCode: 'CUP' },
  { name: 'Cyprus', code: 'CY', currencyCode: 'EUR' },
  { name: 'Czech Republic', code: 'CZ', currencyCode: 'CZK' },
  { name: 'Denmark', code: 'DK', currencyCode: 'DKK' },
  { name: 'Djibouti', code: 'DJ', currencyCode: 'DJF' },
  { name: 'Dominica', code: 'DM', currencyCode: 'XCD' },
  { name: 'Dominican Republic', code: 'DO', currencyCode: 'DOP' },
  { name: 'Ecuador', code: 'EC', currencyCode: 'USD' },
  { name: 'Egypt', code: 'EG', currencyCode: 'EGP' },
  { name: 'El Salvador', code: 'SV', currencyCode: 'USD' },
  { name: 'Equatorial Guinea', code: 'GQ', currencyCode: 'XAF' },
  { name: 'Eritrea', code: 'ER', currencyCode: 'ERN' },
  { name: 'Estonia', code: 'EE', currencyCode: 'EUR' },
  { name: 'Ethiopia', code: 'ET', currencyCode: 'ETB' },
  { name: 'Falkland Islands (Malvinas)', code: 'FK', currencyCode: 'FKP' },
  { name: 'Faroe Islands', code: 'FO', currencyCode: 'DKK' },
  { name: 'Fiji', code: 'FJ', currencyCode: 'FJD' },
  { name: 'Finland', code: 'FI', currencyCode: 'EUR' },
  { name: 'France', code: 'FR', currencyCode: 'EUR' },
  { name: 'French Guiana', code: 'GF', currencyCode: 'EUR' },
  { name: 'French Polynesia', code: 'PF', currencyCode: 'XPF' },
  { name: 'French Southern Territories', code: 'TF', currencyCode: 'EUR' },
  { name: 'Gabon', code: 'GA', currencyCode: 'XAF' },
  { name: 'Gambia', code: 'GM', currencyCode: 'GMD' },
  { name: 'Georgia', code: 'GE', currencyCode: 'GEL' },
  { name: 'Germany', code: 'DE', currencyCode: 'EUR' },
  { name: 'Ghana', code: 'GH', currencyCode: 'GHS' },
  { name: 'Gibraltar', code: 'GI', currencyCode: 'GIP' },
  { name: 'Greece', code: 'GR', currencyCode: 'EUR' },
  { name: 'Greenland', code: 'GL', currencyCode: 'DKK' },
  { name: 'Grenada', code: 'GD', currencyCode: 'XCD' },
  { name: 'Guadeloupe', code: 'GP', currencyCode: 'EUR' },
  { name: 'Guam', code: 'GU', currencyCode: 'USD' },
  { name: 'Guatemala', code: 'GT', currencyCode: 'GTQ' },
  { name: 'Guernsey', code: 'GG', currencyCode: 'GBP' },
  { name: 'Guinea', code: 'GN', currencyCode: 'GNF' },
  { name: 'Guinea-Bissau', code: 'GW', currencyCode: 'XOF' },
  { name: 'Guyana', code: 'GY', currencyCode: 'GYD' },
  { name: 'Haiti', code: 'HT', currencyCode: 'HTG' },
  {
    name: 'Heard Island and Mcdonald Islands',
    code: 'HM',
    currencyCode: 'AUD'
  },
  { name: 'Holy See (Vatican City State)', code: 'VA', currencyCode: 'EUR' },
  { name: 'Honduras', code: 'HN', currencyCode: 'HNL' },
  { name: 'Hong Kong', code: 'HK', currencyCode: 'HKD' },
  { name: 'Hungary', code: 'HU', currencyCode: 'HUF' },
  { name: 'Iceland', code: 'IS', currencyCode: 'ISK' },
  { name: 'India', code: 'IN', currencyCode: 'INR' },
  { name: 'Indonesia', code: 'ID', currencyCode: 'IDR' },
  { name: 'Iran, Islamic Republic Of', code: 'IR', currencyCode: 'IRR' },
  { name: 'Iraq', code: 'IQ', currencyCode: 'IQD' },
  { name: 'Ireland', code: 'IE', currencyCode: 'EUR' },
  { name: 'Isle of Man', code: 'IM', currencyCode: 'GBP' },
  { name: 'Israel', code: 'IL', currencyCode: 'ILS' },
  { name: 'Italy', code: 'IT', currencyCode: 'EUR' },
  { name: 'Jamaica', code: 'JM', currencyCode: 'JMD' },
  { name: 'Japan', code: 'JP', currencyCode: 'JPY' },
  { name: 'Jersey', code: 'JE', currencyCode: 'GBP' },
  { name: 'Jordan', code: 'JO', currencyCode: 'JOD' },
  { name: 'Kazakhstan', code: 'KZ', currencyCode: 'KZT' },
  { name: 'Kenya', code: 'KE', currencyCode: 'KES' },
  { name: 'Kiribati', code: 'KI', currencyCode: 'AUD' },
  {
    name: 'Korea, Democratic People"S Republic of',
    code: 'KP',
    currencyCode: 'KPW'
  },
  { name: 'Korea, Republic of', code: 'KR', currencyCode: 'KRW' },
  { name: 'Kuwait', code: 'KW', currencyCode: 'KWD' },
  { name: 'Kyrgyzstan', code: 'KG', currencyCode: 'KGS' },
  { name: 'Lao People"S Democratic Republic', code: 'LA', currencyCode: 'LAK' },
  { name: 'Latvia', code: 'LV', currencyCode: 'EUR' },
  { name: 'Lebanon', code: 'LB', currencyCode: 'LBP' },
  { name: 'Lesotho', code: 'LS', currencyCode: 'LSL' },
  { name: 'Liberia', code: 'LR', currencyCode: 'LRD' },
  { name: 'Libyan Arab Jamahiriya', code: 'LY', currencyCode: 'LYD' },
  { name: 'Liechtenstein', code: 'LI', currencyCode: 'CHF' },
  { name: 'Lithuania', code: 'LT', currencyCode: 'EUR' },
  { name: 'Luxembourg', code: 'LU', currencyCode: 'EUR' },
  { name: 'Macao', code: 'MO', currencyCode: 'MOP' },
  {
    name: 'Macedonia, The Former Yugoslav Republic of',
    code: 'MK',
    currencyCode: 'MKD'
  },
  { name: 'Madagascar', code: 'MG', currencyCode: 'MGA' },
  { name: 'Malawi', code: 'MW', currencyCode: 'MWK' },
  { name: 'Malaysia', code: 'MY', currencyCode: 'MYR' },
  { name: 'Maldives', code: 'MV', currencyCode: 'MVR' },
  { name: 'Mali', code: 'ML', currencyCode: 'XOF' },
  { name: 'Malta', code: 'MT', currencyCode: 'EUR' },
  { name: 'Marshall Islands', code: 'MH', currencyCode: 'USD' },
  { name: 'Martinique', code: 'MQ', currencyCode: 'EUR' },
  { name: 'Mauritania', code: 'MR', currencyCode: 'MRU' },
  { name: 'Mauritius', code: 'MU', currencyCode: 'MUR' },
  { name: 'Mayotte', code: 'YT', currencyCode: 'EUR' },
  { name: 'Mexico', code: 'MX', currencyCode: 'MXN' },
  { name: 'Micronesia, Federated States of', code: 'FM', currencyCode: 'USD' },
  { name: 'Moldova, Republic of', code: 'MD', currencyCode: 'MDL' },
  { name: 'Monaco', code: 'MC', currencyCode: 'EUR' },
  { name: 'Mongolia', code: 'MN', currencyCode: 'MNT' },
  { name: 'Montenegro', code: 'ME', currencyCode: 'EUR' },
  { name: 'Montserrat', code: 'MS', currencyCode: 'XCD' },
  { name: 'Morocco', code: 'MA', currencyCode: 'MAD' },
  { name: 'Mozambique', code: 'MZ', currencyCode: 'MZN' },
  { name: 'Myanmar', code: 'MM', currencyCode: 'MMK' },
  { name: 'Namibia', code: 'NA', currencyCode: 'NAD' },
  { name: 'Nauru', code: 'NR', currencyCode: 'AUD' },
  { name: 'Nepal', code: 'NP', currencyCode: 'NPR' },
  { name: 'Netherlands', code: 'NL', currencyCode: 'EUR' },
  { name: 'Netherlands Antilles', code: 'AN', currencyCode: 'ANG' },
  { name: 'New Caledonia', code: 'NC', currencyCode: 'XPF' },
  { name: 'New Zealand', code: 'NZ', currencyCode: 'NZD' },
  { name: 'Nicaragua', code: 'NI', currencyCode: 'NIO' },
  { name: 'Niger', code: 'NE', currencyCode: 'XOF' },
  { name: 'Nigeria', code: 'NG', currencyCode: 'NGN' },
  { name: 'Niue', code: 'NU', currencyCode: 'NZD' },
  { name: 'Norfolk Island', code: 'NF', currencyCode: 'AUD' },
  { name: 'Northern Mariana Islands', code: 'MP', currencyCode: 'USD' },
  { name: 'Norway', code: 'NO', currencyCode: 'NOK' },
  { name: 'Oman', code: 'OM', currencyCode: 'OMR' },
  { name: 'Pakistan', code: 'PK', currencyCode: 'PKR' },
  { name: 'Palau', code: 'PW', currencyCode: 'USD' },
  { name: 'Palestinian Territory, Occupied', code: 'PS', currencyCode: 'ILS' },
  { name: 'Panama', code: 'PA', currencyCode: 'PAB' },
  { name: 'Papua New Guinea', code: 'PG', currencyCode: 'PGK' },
  { name: 'Paraguay', code: 'PY', currencyCode: 'PYG' },
  { name: 'Peru', code: 'PE', currencyCode: 'PEN' },
  { name: 'Philippines', code: 'PH', currencyCode: 'PHP' },
  { name: 'Pitcairn', code: 'PN', currencyCode: 'NZD' },
  { name: 'Poland', code: 'PL', currencyCode: 'PLN' },
  { name: 'Portugal', code: 'PT', currencyCode: 'EUR' },
  { name: 'Puerto Rico', code: 'PR', currencyCode: 'USD' },
  { name: 'Qatar', code: 'QA', currencyCode: 'QAR' },
  { name: 'Reunion', code: 'RE', currencyCode: 'EUR' },
  { name: 'Romania', code: 'RO', currencyCode: 'RON' },
  { name: 'Russian Federation', code: 'RU', currencyCode: 'RUB' },
  { name: 'RWANDA', code: 'RW', currencyCode: 'RWF' },
  { name: 'Saint Helena', code: 'SH', currencyCode: 'SHP' },
  { name: 'Saint Kitts and Nevis', code: 'KN', currencyCode: 'XCD' },
  { name: 'Saint Lucia', code: 'LC', currencyCode: 'XCD' },
  { name: 'Saint Pierre and Miquelon', code: 'PM', currencyCode: 'EUR' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC', currencyCode: 'XCD' },
  { name: 'Samoa', code: 'WS', currencyCode: 'WST' },
  { name: 'San Marino', code: 'SM', currencyCode: 'EUR' },
  { name: 'Sao Tome and Principe', code: 'ST', currencyCode: 'STN' },
  { name: 'Saudi Arabia', code: 'SA', currencyCode: 'SAR' },
  { name: 'Senegal', code: 'SN', currencyCode: 'XOF' },
  { name: 'Serbia', code: 'RS', currencyCode: 'RSD' },
  { name: 'Seychelles', code: 'SC', currencyCode: 'SCR' },
  { name: 'Sierra Leone', code: 'SL', currencyCode: 'SLL' },
  { name: 'Singapore', code: 'SG', currencyCode: 'SGD' },
  { name: 'Slovakia', code: 'SK', currencyCode: 'EUR' },
  { name: 'Slovenia', code: 'SI', currencyCode: 'EUR' },
  { name: 'Solomon Islands', code: 'SB', currencyCode: 'SBD' },
  { name: 'Somalia', code: 'SO', currencyCode: 'SOS' },
  { name: 'South Africa', code: 'ZA', currencyCode: 'ZAR' },
  {
    name: 'South Georgia and the South Sandwich Islands',
    code: 'GS',
    currencyCode: 'GBP'
  },
  { name: 'Spain', code: 'ES', currencyCode: 'EUR' },
  { name: 'Sri Lanka', code: 'LK', currencyCode: 'LKR' },
  { name: 'Sudan', code: 'SD', currencyCode: 'SDG' },
  { name: 'Suriname', code: 'SR', currencyCode: 'SRD' },
  { name: 'Svalbard and Jan Mayen', code: 'SJ', currencyCode: 'NOK' },
  { name: 'Swaziland', code: 'SZ', currencyCode: 'SZL' },
  { name: 'Sweden', code: 'SE', currencyCode: 'SEK' },
  { name: 'Switzerland', code: 'CH', currencyCode: 'CHF' },
  { name: 'Syrian Arab Republic', code: 'SY', currencyCode: 'SYP' },
  { name: 'Taiwan, Province of China', code: 'TW', currencyCode: 'TWD' },
  { name: 'Tajikistan', code: 'TJ', currencyCode: 'TJS' },
  { name: 'Tanzania, United Republic of', code: 'TZ', currencyCode: 'TZS' },
  { name: 'Thailand', code: 'TH', currencyCode: 'THB' },
  { name: 'Timor-Leste', code: 'TL', currencyCode: 'USD' },
  { name: 'Togo', code: 'TG', currencyCode: 'XOF' },
  { name: 'Tokelau', code: 'TK', currencyCode: 'NZD' },
  { name: 'Tonga', code: 'TO', currencyCode: 'TOP' },
  { name: 'Trinidad and Tobago', code: 'TT', currencyCode: 'TTD' },
  { name: 'Tunisia', code: 'TN', currencyCode: 'TND' },
  { name: 'Turkey', code: 'TR', currencyCode: 'TRY' },
  { name: 'Turkmenistan', code: 'TM', currencyCode: 'TMT' },
  { name: 'Turks and Caicos Islands', code: 'TC', currencyCode: 'USD' },
  { name: 'Tuvalu', code: 'TV', currencyCode: 'AUD' },
  { name: 'Uganda', code: 'UG', currencyCode: 'UGX' },
  { name: 'Ukraine', code: 'UA', currencyCode: 'UAH' },
  { name: 'United Arab Emirates', code: 'AE', currencyCode: 'AED' },
  { name: 'United Kingdom', code: 'GB', currencyCode: 'GBP' },
  { name: 'United States', code: 'US', currencyCode: 'USD' },
  {
    name: 'United States Minor Outlying Islands',
    code: 'UM',
    currencyCode: 'USD'
  },
  { name: 'Uruguay', code: 'UY', currencyCode: 'UYU' },
  { name: 'Uzbekistan', code: 'UZ', currencyCode: 'UZS' },
  { name: 'Vanuatu', code: 'VU', currencyCode: 'VUV' },
  { name: 'Venezuela', code: 'VE', currencyCode: 'VES' },
  { name: 'Viet Nam', code: 'VN', currencyCode: 'VND' },
  { name: 'Virgin Islands, British', code: 'VG', currencyCode: 'USD' },
  { name: 'Virgin Islands, U.S.', code: 'VI', currencyCode: 'USD' },
  { name: 'Wallis and Futuna', code: 'WF', currencyCode: 'XPF' },
  { name: 'Western Sahara', code: 'EH', currencyCode: 'MAD' },
  { name: 'Yemen', code: 'YE', currencyCode: 'YER' },
  { name: 'Zambia', code: 'ZM', currencyCode: 'ZMW' },
  { name: 'Zimbabwe', code: 'ZW', currencyCode: 'ZWL' }
]

export const getCurrencyCode = (countryCode?: string) => {
  const userCountry = countryCode || getUserData().user.country
  const currencyCode =
    countries.filter((i) => i.code === userCountry)?.[0]?.currencyCode || ''
  return currencyCode
}

export const industries = [
  'Agriculture, Forestry, and Fishing',
  'Mining and Quarrying',
  'Construction',
  'Manufacturing',
  'Wholesale Trade',
  'Retail Trade',
  'Transportation and Warehousing',
  'Information and Communication',
  'Finance and Insurance',
  'Real Estate and Rental and Leasing',
  'Professional, Scientific, and Technical Services',
  'Management of Companies and Enterprises',
  'Administrative and Support and Waste Management and Remediation Services',
  'Educational Services',
  'Health Care and Social Assistance',
  'Arts, Entertainment, and Recreation',
  'Accommodation and Food Services',
  'Other Services (except Public Administration)',
  'Public Administration'
]

export const getCountry = (value: string): string => {
  return (
    countries.filter((i) => i.code?.toLowerCase() === value?.toLowerCase())?.[0]
      ?.name || 'unknown'
  )
}

export const UNDER_CONSTRUCTION =
  process.env.REACT_APP_UNDERCONSTRUCTION === 'true'

export const PAGE_SIZE = 10

export const OBJECTIVE = 'Make Smarter Bets with Pro Tips'

export type roleType = 'buyer' | 'seller' | 'admin'

export const getRoleId = (role: roleType) => {
  switch (role) {
    case 'admin':
      return '1'
    case 'buyer':
      return '2'
    case 'seller':
      return '3'
    default:
      return ''
  }
}

export type typeRoleId = '1' | '2' | '3' | '4'

export const getUserRole = (role: typeRoleId) => {
  switch (role) {
    case '1':
      return 'admin'
    case '2':
      return 'buyer'
    case '3':
      return 'seller'
    default:
      return ''
  }
}

export const getMotive = (role: roleType) => {
  if (role === 'buyer') return 'Buyer'
  if (role === 'seller') return 'Seller'
  return ''
}

// SUBSCRIPTION STARTS

// export const CURRENCY = '₦'
export const CURRENCY = '$'

export const getAmount = (amount?: string) => {
  const am = Number(amount || '').toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  return am
}

export const showAmount = (amount: any, money?: boolean) => {
  if (money) return `${CURRENCY} ${getAmount(amount?.toString())}`
  return `${getAmount(amount?.toString())} credit${
    parseInt(amount) === 1 ? '' : 's'
  }`
}

const BASICSUBSCRIPTION = 0
const STANDARDSUBSCRIPTION = 2
const PREMIUMSUBSCRIPTION = 5

export type membershipType = 'free' | 'standard' | 'premium'

export type adminLevel = 'king' | 'super' | 'validator'

export const SUBSCRIPTIONAMOUNTS: {
  [key in membershipType]: number
} = {
  free: BASICSUBSCRIPTION,
  standard: STANDARDSUBSCRIPTION,
  premium: PREMIUMSUBSCRIPTION
}

export enum SUBSCRIPTIONTYPE {
  FREE = 'free',
  PAID = 'paid'
}

export const VAT = 7.5

export interface ICC {
  id: number | string
  plan: membershipType
  isSubscribed: boolean
  bg: string
  benefits: Array<{
    benefit: string
    isPlan: boolean
    quantity: string | number
  }>
}

export const getSellerPlanProps = (plan: string) => {
  switch (plan.toLowerCase()) {
    case 'free':
      return {
        plan: 'free',
        bg: '#F2F2F2'
      }
    case 'standard':
      return {
        plan: 'standard',
        bg: '#FDECE0'
      }
    default:
      return {
        plan: 'premium',
        bg: '#D1EED1'
      }
  }
}

export const BASE_URL = 'https://mytipster.pro/api/v1/'

export const getIsOnboarding = () =>
  getUserData().role !== 'admin' ? getUserData()?.user?.stage === 'user' : true

const getLocalData = <T>(key: string) => {
  try {
    if (!getIsLogged()) throw new Error(`no user found`)
    const localData = localStorage.getItem(key)
    if (!localData) return
    return JSON.parse(localData) as T
  } catch (e) {
    handleError(e)
  }
}

export const BETGROUPS = getLocalData<Array<{ [key: string]: any }>>(
  'betChannel'
)?.map((i: any, index: number) => ({
  id: index,
  label: i.name,
  value: i.name
}))

export const BETPREDICTIONNUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const BETPREDICTIONPERIOD = ['day', 'week', 'month']

export const BETODDS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '20',
  '30',
  '40',
  '50',
  '100'
]

export enum betTicketFilterEnum {
  BETWEBSITE = 'Bookies',
  ODDS = 'Bet Odds',
  STATUS = 'Bet Code Status',
  DATE = 'End Date'
}

export enum betTicketStatusEnum {
  PENDING = 'Pending',
  SUCCESSFUL = 'Success'
}

// export enum betTicketDateEnum {
//   TIME24 = 'Last 24 hours',
//   TIME7 = 'Last 7 days',
//   TIME30 = 'Last 30 days',
//   CUSTOM = 'Custom Range'
// }

// export const PUNTERSCATEGORY = [
//   {
//     id: 1,
//     title: 'Risk Takers',
//     odds: ['500']
//   },
//   {
//     id: 2,
//     title: 'Conservationists',
//     odds: ['5', '2']
//   }
// ]

export const MINHEIGHT = '86vh'

export const SUBSCRIBERS = 0

export const GETISSELLER = () => getUserData().role === roleEnum.seller
export const GETISBUYER = () => getUserData().role === roleEnum.buyer
export const GETISADMIN = () => getUserData().role === roleEnum.admin

export const GETISUSERLOGGED = () =>
  GETISSELLER() || GETISBUYER() || GETISADMIN()

export const GETDASHBOARDURL = () => {
  switch (true) {
    case getIsAdminLogged():
      return pageurl.ADMINDASHBOARD
    default:
      return pageurl.DASHBOARD
  }
}

export const ISBETA = false

export const multiTipCategoryEnum = {
  ALLODDS: 'ALL',
  FIVEBIGODDS: '5 ODDS',
  TENBIGODDS: '10 ODDS',
  TWENTYSUREODDS: '20 ODDS',
  MEGAODDS: 'MEGA ODDS'
}

export const paymentStatusEnum = {
  PROCESSING: 'Processing',
  SUCCESSFUL: 'Successful',
  FAILED: 'Failed',
  REVERSED: 'Reversed'
} as const

export type paymentStatusType =
  (typeof paymentStatusEnum)[keyof typeof paymentStatusEnum]

export const subscriptionTypeEnum = {
  CHANNEL: 'channel',
  SELLERPREMIUMMEMBERSHIP: 'seller Premium membership',
  SELLERSTANDARDMEMBERSHIP: 'seller Standard membership'
} as const

export type subscriptionType =
  (typeof subscriptionTypeEnum)[keyof typeof subscriptionTypeEnum]

export const BASEURL = process.env.REACT_APP_BASEURL
export const BASEURLFE = process.env.REACT_APP_BASEURLFE

export const getTxRef = () => localStorage.getItem(SNART_XER) as string

export const BG = 'bg-mytipster'

export const ISWELCOME = getUserData()?.user?.welcome

export const GETISUSERSUSPENDED = () =>
  getUserData()?.user?.status === 'suspended'

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

export const PAYMENTMETHOD = {
  CARD: 'card',
  WALLET: 'wallet'
} as const

export type paymentMethodType =
  (typeof PAYMENTMETHOD)[keyof typeof PAYMENTMETHOD]

export interface IPaymentDetails {
  amount: number
  item: string
  itemType: transactionItemType
  description: string
  itemId: string
  transactionType: transactionType
  title: string
  quantity: number
  mutateQuantity: boolean
}

export interface IOrderSummaryProps {
  subAmount: string
  totalAmount: string
  serviceFee: string
}

export const betTipsTabEnum = {
  ALL: 'All',
  PAID: 'Purchased',
  MY: 'My Bet tips'
}

export const betChannelTabEnum = {
  ALL: 'All',
  SUBSCRIBED: 'Following'
}

export interface IPaymentDetailsResponse {
  amount: string
  redirect_url: string
  title: string
  itemId: string
  transactionType: transactionType
  billingAddress: string
  iAccept: boolean
  email: string
  name: string
}

const user = getUserData()?.user

export const isPersonalDetails =
  !!user?.firstName && !!user?.lastName && !!user?.phoneNumber

export const cardColors = ['#F2FBFE', '#FDF3F0', '#FCF1FE']

export interface IColorGradient {
  from: string
  to: string
  name: string
  text: string
}

export const cardColorGradient: IColorGradient[] = [
  {
    from: '#FFF8E7',
    to: '#FFF5E6',
    text: '#A06917',
    name: 'Pale Beige Gradient'
  },
  {
    from: '#E9F9E9',
    to: '#E6F7E6',
    text: '#1A8B1A',
    name: 'Mint Green Gradient'
  },
  {
    from: '#EBF4FC',
    to: '#E6F1FA',
    text: '#185C94',
    name: 'Sky Blue Gradient'
  },
  {
    from: '#F7EBFC',
    to: '#F3E6FA',
    text: '#6F1F99',
    name: 'Light Lavender Gradient'
  },
  {
    from: '#FDEAEA',
    to: '#FCE6E6',
    text: '#951919',
    name: 'Blush Pink Gradient'
  },
  {
    from: '#e3fdfd',
    to: '#cbf1f5',
    text: '#188995',
    name: 'Cool Mint'
  },
  {
    from: '#ffecd2',
    to: '#fcb69f',
    text: '#A23917',
    name: 'Peach Blush'
  },
  {
    from: '#F5F5F5',
    to: '#EAEAEA',
    text: '#A92525',
    name: 'Light Gray Gradient'
  }
]

export const feedbackCategory = [
  {
    name: 'Overall Feedback',
    description: 'A general category for open-ended thoughts and insights.'
  },
  {
    name: 'Ideas & Suggestions',
    description: 'Creative input for improving content or products.'
  },
  {
    name: 'Brand Perception',
    description: 'How the audience perceives the brand identity.'
  },
  {
    name: 'Accessibility',
    description:
      'Feedback on inclusivity, such as language, design, or usability.'
  },
  {
    name: 'Event Feedback',
    description: 'Responses on live events, webinars, or product launches.'
  }
]
