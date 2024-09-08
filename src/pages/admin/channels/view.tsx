import { useEffect } from 'react'
import { IRightSection } from '../../../components/layout/right-section'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import { useFormHook } from '../../../components/utils/hooks'
import * as yup from 'yup'
import { _separator } from '../../../components/utils/helper'
import { IBetChannelResponse } from '../../../interface/IBet'

export const viewChannelSchema = {
  title: yup.string(),
  description: yup.string(),
  frequency: yup.string(),
  numberOfPredictions: yup.string(),
  odds: yup.string(),
  subscription: yup.string(),
  perPredictionCost: yup.string(),
  subscriptionCount: yup.string()
} as const

export interface IViewChannel {
  title: string
  description: string
  frequency: string
  numberOfPredictions: string
  odds: string
  subscription: string
  perPredictionCost: string
  subscriptionCount: string
}

export type viewChannelType = keyof IViewChannel

export const viewChannelFormComponents: IFormComponent[] = Object.keys(
  viewChannelSchema
).map((i) => ({
  id: i,
  component: 'input',
  label: _separator(i),
  placeHolder: '',
  type: 'text',
  isonlyview: true
}))

export const getValue = (key: viewChannelType, value: string): string => {
  return value
}

const ViewChannel = ({
  rsProps
}: {
  rsProps?: IRightSection<IBetChannelResponse>
}) => {
  return <ViewChannelComponent channel={rsProps?.data as IBetChannelResponse} />
}

export const ViewChannelComponent = ({
  channel
}: {
  channel?: IBetChannelResponse | null
}) => {
  const data: { [key: string]: any } | null | undefined = channel

  const [hookForm] = useFormHook<IViewChannel>(viewChannelSchema)

  useEffect(() => {
    Object.keys(viewChannelSchema).forEach((i) => {
      hookForm.setValue(
        `${i}` as viewChannelType,
        getValue(i as viewChannelType, data?.[i]) || '...'
      )
    })
  }, [])

  return (
    <div>
      <div className="grid-wrapper-40 gap-30">
        <FormBuilder
          hookForm={hookForm}
          formComponent={viewChannelFormComponents}
        />
      </div>
    </div>
  )
}

export default ViewChannel
