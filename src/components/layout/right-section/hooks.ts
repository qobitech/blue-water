import { useState } from 'react'
import {
  actionComponent,
  actionType,
  ICallSection,
  IRightSection,
  IRightSectionHistory,
  IRSAction,
  IRsPropsCTA
} from './utils'
import { paymentStatusType } from '../../../interface/ITransaction'
import { optionType } from '../../page-components/send-feedback'

export const useRightSection = <K extends {}>(): IRightSection<K> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sectionHistories, setSectionHistories] = useState<
    IRightSectionHistory[] | null
  >(null)
  const [title, setTitle] = useState<string | JSX.Element>('')
  const [dataRequestCounter, setDataRequestCounter] = useState<number>(0)
  const [additionalAmountNeeded, setAdditionalAmountNeeded] =
    useState<string>('')
  const [openSection, setOpenSection] = useState<boolean>(() => false)
  const [mediaUrl, setMediaURL] = useState<string>(() => '')
  const [slug, setSlug] = useState<string>(() => '')
  const [status, setStatus] = useState<boolean>(() => false)
  const [onRefresh, setOnRefresh] = useState<(() => void) | undefined>(
    undefined
  )
  const [paymentStatus, setPaymentStatus] = useState<paymentStatusType | null>(
    null
  )
  const [max, setMax] = useState<boolean>(false)
  const [action, setAction] = useState<IRSAction>({
    type: null,
    component: null,
    id: null
  })
  const [data, setData] = useState<K | null | undefined>(null)
  const [dataById, setDataById] = useState<any>(null)
  const [cta, setCTA] = useState<IRsPropsCTA[]>([])
  const [audioProps, setAudioProps] = useState<boolean>(false)
  const [feedbackOption, setFeedbackOption] = useState<optionType>()

  function updateData(data: K | null) {
    setData(data)
  }

  const isView = (type: actionType, component: actionComponent) => {
    return action.type === type && action.component === component
  }

  function callSection<T>(arg: ICallSection<T>) {
    const {
      action,
      component,
      title,
      id,
      data,
      slug,
      status,
      max,
      additionalAmountNeeded,
      paymentStatus,
      onRefresh
    } = arg
    setAction({ type: action, component, id })
    setTitle(title || '')
    setOpenSection(true)
    setData((prev) => (data ? (data as unknown as K) : prev))
    setSlug((prev) => slug || prev)
    setStatus(status || false)
    setMax((prev) => max || prev)
    setAdditionalAmountNeeded((prev) => additionalAmountNeeded || prev)
    setPaymentStatus(paymentStatus || null)
    setOnRefresh((prev) => onRefresh || prev)
  }

  const addRightSectionHistory = () => {
    if (typeof title !== 'string') return
    if (!action.component) return
    setSectionHistories((prev) => {
      const sh = prev || []
      sh.push({
        action: action.type,
        component: action.component,
        title,
        id: slug || '',
        data
      })
      return sh
    })
  }

  const removeRightSectionHistory = () => {
    setSectionHistories((prev) => {
      if (!prev) return null
      const sh = prev.pop()
      setData(sh?.data as unknown as K)
      callSection({
        action: sh?.action || 'view',
        title: sh?.title || '',
        component: sh?.component || null,
        slug: sh?.id || slug || '',
        data: sh?.data
      })
      return prev
    })
  }

  const removeItemRightSectionHistory = (component: actionComponent) => {
    setSectionHistories((prev) => {
      if (!prev) return null
      return prev.filter((i) => i.component !== component)
    })
  }

  const clearRightSectionHistory = () => {
    setSectionHistories(null)
  }

  const closeSection = () => {
    setAction({ component: null, type: null, id: null })
    setOpenSection(false)
    setSectionHistories(null)
    setSlug('')
    setMediaURL('')
    setMax(false)
    setAdditionalAmountNeeded('')
    setPaymentStatus(null)
    setOnRefresh(undefined)
    setCTA([])
    setAudioProps(false)
  }

  return {
    closeSection,
    openSection,
    setAction,
    action,
    setTitle,
    title,
    callSection,
    isView,
    data,
    updateData,
    setDataRequestCounter,
    dataRequestCounter,
    addRightSectionHistory,
    removeRightSectionHistory,
    isSectionHistory: Array.isArray(sectionHistories) && !!sectionHistories[0],
    clearRightSectionHistory,
    removeItemRightSectionHistory,
    slug,
    setMediaURL,
    mediaUrl,
    setDataById,
    dataById,
    status,
    max,
    setAdditionalAmountNeeded,
    additionalAmountNeeded,
    paymentStatus,
    onRefresh,
    audioProps,
    setAudioProps,
    cta,
    setCTA,
    setFeedbackOption,
    feedbackOption
  }
}
