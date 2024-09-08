import { useEffect, useState } from 'react'
import {
  ICreateBetChannelSchema,
  betChannelSchema
} from '../../onboarding/data'
import {
  BETODDS,
  BETPREDICTIONNUMBERS,
  BETPREDICTIONPERIOD,
  SUBSCRIPTIONTYPE,
  showAmount,
  getUserData
} from '../../../constants/global'
import { TypeSelect } from '../../../components/utils/select'
import { TypeInput } from '../../../components/utils/input'
import { TypeTextArea } from '../../../components/utils/text-area'
import { TypeButton } from '../../../components/utils/button'
import TermsAndConditions from '../../../components/utils/tandc'
import { useFormHook } from '../../../components/utils/hooks'
import { UseMutateFunction } from '@tanstack/react-query'
import { getSlug } from '../../../components/utils/helper'
import { IUserResponse } from '../../../interface/IUser'
import { IBetChannelResponse } from '../../../interface/IBet'
import {
  useChannelSubscriptionThresholdQuery,
  useCreateBetChannel,
  useUpdateBetChannel
} from '../../../api/channels'
// import { ResponseComponent } from '../../../api'
import TextPrompt from '../../../components/utils/text-prompt'
import { useGlobalContext } from '../../../components/layout/context'

const CreateBetChannel = ({
  updateUserAction
}: {
  updateUserAction?: UseMutateFunction<
    IUserResponse,
    any,
    {
      [key: string]: any
    },
    unknown
  >
}) => {
  const { rsProps, setNotification } = useGlobalContext()

  const onCreateChannelSuccess = () => {
    setNotification?.('Bet Channel created successfully', true)
    if (getUserData().user.stage === 'onboarding2') {
      updateUserAction?.({ stage: 'user' })
    }
  }
  const onUpdateChannelSuccess = () => {
    setNotification?.('Channel Updated Successfully', true)
  }
  const onCreateChannelError = () => {
    setNotification?.('Something went wrong', false)
  }
  const onUpdateChannelError = () => {
    setNotification?.('Something went wrong', false)
  }

  const createBetChannelProps = useCreateBetChannel(
    onCreateChannelSuccess,
    onCreateChannelError
  )
  const updateChannelProps = useUpdateBetChannel(
    onUpdateChannelSuccess,
    onUpdateChannelError
  )

  const handleCreateBetChannel = (data: ICreateBetChannelSchema) => {
    createBetChannelProps.mutate({
      body: {
        title: data.title,
        description: data.description,
        frequency: data.frequency,
        numberOfPredictions: data.numberOfPredictions,
        perPredictionCost: data.perPredictionCost || 0,
        slug: getSlug(data.title),
        userId: getUserData().user._id,
        odds: data.odds,
        subscription: data.subscription || 'free',
        tandc: data.tandc
      }
    })
  }

  const handleUpdateBetChannel = (
    data: ICreateBetChannelSchema,
    id: string
  ) => {
    updateChannelProps.mutate({
      body: {
        id,
        title: data.title,
        description: data.description,
        frequency: data.frequency,
        numberOfPredictions: data.numberOfPredictions,
        perPredictionCost: data.perPredictionCost || 0,
        slug: getSlug(data.title),
        userId: getUserData().user._id,
        odds: data.odds,
        subscription: data.subscription || 'free',
        tandc: data.tandc
      }
    })
  }

  const data = rsProps?.data as IBetChannelResponse

  const isUpdate = rsProps?.isView('update', 'channel')

  const [hookForm] = useFormHook<ICreateBetChannelSchema>(betChannelSchema)

  const [maxAmountError, setMaxAmountError] = useState<string>('')

  const channelSubThresholdProps = useChannelSubscriptionThresholdQuery()

  useEffect(() => {
    channelSubThresholdProps.mutate({
      query: `?levelId=${getUserData().user.levelId}`
    })
  }, [])

  const userLevel = getUserData()?.user?.level?.[0]?.title

  const threshold = parseFloat(
    channelSubThresholdProps.data?.data.channelSubscriptionThresholds?.[0]
      ?.maxAmount || '0'
  )

  const handlePredictionCost = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    const predictionCost = parseFloat(value) || 0.1

    if (predictionCost <= threshold) {
      setMaxAmountError('')
    } else {
      setMaxAmountError(
        `Monthly earning should not exceed ${showAmount(threshold)}`
      )
    }
    hookForm.setValue('perPredictionCost', value)
  }

  useEffect(() => {
    if (isUpdate) {
      hookForm.setValue('title', data?.title || '')
      hookForm.setValue('description', data?.description || '')
      hookForm.setValue('numberOfPredictions', data?.numberOfPredictions || 0)
      hookForm.setValue('frequency', data?.frequency || '')
      hookForm.setValue('odds', data?.odds || 0)
      hookForm.setValue('subscription', data?.subscription || 'free')
      hookForm.setValue(
        'perPredictionCost',
        (data?.perPredictionCost || 0.1) + ''
      )
    }
  }, [isUpdate])

  const load = createBetChannelProps.isLoading || updateChannelProps.isLoading
  // const response = isUpdate
  //   ? createBetChannelProps.response
  //   : updateChannelProps.response

  return (
    <>
      <form
        onSubmit={
          !maxAmountError
            ? !isUpdate
              ? hookForm.handleSubmit(handleCreateBetChannel)
              : (e) => {
                  e.preventDefault()
                  handleUpdateBetChannel(hookForm.watch(), data?._id || '')
                }
            : undefined
        }
        className="mx-auto w-100 bg-white py-2 f-column-30"
      >
        <TypeInput
          label="Channel Name"
          placeholder="Enter channel name"
          customwidth={'100%'}
          {...hookForm.register('title')}
          error={hookForm.formState.errors.title?.message as string}
          disabled={isUpdate}
        />
        <TypeTextArea
          label="About"
          moreInfo="Eg: 'we provide premium odds, carefully put together to give you the best chance at winning'."
          {...hookForm.register('description')}
          error={hookForm.formState.errors.description?.message as string}
        />
        <div className="grid-wrapper-45 gap-20">
          <TypeSelect
            initoption={{ label: 'Select', value: '' }}
            label="Frequency"
            optionsdata={BETPREDICTIONPERIOD.map((i, index) => ({
              id: index + 1,
              label: 'per ' + i,
              value: i + ''
            }))}
            onChange={({ target }) => {
              const { value } = target
              hookForm.setValue('frequency', value)
              hookForm.setValue('perPredictionCost', '0.1')
              if (value === 'day') {
                hookForm.setValue('numberOfPredictions', 1)
              }
            }}
            value={hookForm.watch('frequency')}
            customwidth={'100%'}
            error={hookForm.formState.errors.frequency?.message as string}
            disabled={isUpdate}
          />
          <TypeSelect
            initoption={{ label: 'Select', value: '' }}
            label="Number of Predictions"
            optionsdata={BETPREDICTIONNUMBERS.map((i) => ({
              id: i,
              label: i + ` prediction${i === 1 ? '' : 's'}`,
              value: i + '',
              hide: hookForm.watch('frequency') === 'day' ? i > 2 : false
            }))}
            onChange={({ target }) => {
              const { value } = target
              hookForm.setValue('numberOfPredictions', parseInt(value))
              hookForm.setValue('perPredictionCost', '0.1')
            }}
            value={hookForm.watch('numberOfPredictions')}
            customwidth={'100%'}
            error={
              hookForm.formState.errors.numberOfPredictions?.message as string
            }
            disabled={isUpdate}
          />
        </div>
        <div className="grid-wrapper-45 gap-20">
          <TypeSelect
            initoption={{ label: 'Select', value: '' }}
            label="Minimum Odds (per prediction)"
            optionsdata={BETODDS.map((i, index) => ({
              id: index + 1,
              label: i + ` odd${i === '1' ? '' : 's'}`,
              value: i + ''
            }))}
            {...hookForm.register('odds')}
            customwidth={'100%'}
            error={hookForm.formState.errors.odds?.message as string}
          />
          <TypeSelect
            initoption={{
              label: 'Select',
              value: ''
            }}
            label="Odds Type"
            optionsdata={[
              {
                id: 1,
                label: 'Free Odds',
                value: SUBSCRIPTIONTYPE.FREE
              },
              {
                id: 2,
                label: 'Paid Odds',
                value: SUBSCRIPTIONTYPE.PAID
              }
            ]}
            onChange={({ target }) => {
              const { value } = target
              hookForm.setValue('subscription', value as 'free' | 'paid')
              hookForm.setValue('perPredictionCost', '0.1')
            }}
            value={hookForm.getValues('subscription')}
            customwidth={'100%'}
            error={hookForm.formState.errors.subscription?.message as string}
          />
        </div>
        <div
          className={`grid-wrapper-45 gap-20 ${
            hookForm.watch().subscription === 'paid' ? '' : 'd-none'
          }`}
        >
          <div className="gap-10">
            <TypeInput
              label="What is the price ($) for each prediction?"
              placeholder="Enter amount"
              customwidth={'100%'}
              onChange={handlePredictionCost}
              value={hookForm.watch('perPredictionCost')}
              error={hookForm.formState.errors.perPredictionCost?.message}
              type="number"
              min={0}
              step="any"
            />
            <div className="f-row-7 aic mt-3">
              <TextPrompt
                prompt={`You're currently at the ${
                  userLevel || 'Novice'
                } level and can charge up to ${showAmount(
                  threshold
                )} per prediction. You will have the opportunity to update your pricing once you advance to the next level.`}
                noStatus
              />
            </div>
          </div>
        </div>
        {!isUpdate ? (
          <TermsAndConditions
            id="tandc"
            hookForm={hookForm}
            disabled={!!maxAmountError}
          />
        ) : null}
        <TypeButton
          title={`${isUpdate ? 'Update' : 'Add'} Channel`}
          load={load}
          buttonType={maxAmountError ? 'disabled' : 'bold'}
          disabled={!!maxAmountError}
        />
        {/* <ResponseComponent response={response} /> */}
      </form>
    </>
  )
}

export default CreateBetChannel
