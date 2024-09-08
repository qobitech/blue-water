import { FC, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
  IPredictGameSchema,
  IPredictionItemHF,
  IPredictionItemKey,
  groupType,
  predictGameSchema
} from '../../onboarding/data'
import {
  IBetChannelResponse,
  betTicketShareOptionType
} from '../../../interface/IBet'
import { TypeSelect } from '../../../components/utils/select'
import { TypeButton, TypeSmallButton } from '../../../components/utils/button'
import TextPrompt from '../../../components/utils/text-prompt'
import { TypeInput } from '../../../components/utils/input'
import {
  ActionComponent,
  UnderConstruction,
  statusType
} from '../../../components/utils/reusable'
import { UseMutateFunction } from '@tanstack/react-query'
import { IBookie, ISport, ISports } from '../../../interface/IOther'
import { TypeCheckbox } from '../../../components/utils/checkbox'
import { useFormHook } from '../../../components/utils/hooks'
import {
  IResponse,
  // ResponseComponent,
  useAPIPOST
} from '../../../api'
import { TypeDate } from '../../../components/utils/date'
import { useGetAllChannels } from '../../../api/channels'
import { getUserData } from '../../../constants/global'
import { IGlobalRightSection } from '../../../components/layout/right-section'
import moment from 'moment'
import {
  BottomAngleSVG,
  TimesSVG,
  TopAngleSVG
} from '../../../components/utils/svgs/f-awesome'
import { CheckSVG } from '../../../components/utils/svgs'
import { useSportsQuery } from '../../../api/sports'
import { useBookiesQuery } from '../../../api/bookies'
import Skeleton from '../../../components/utils/skeleton'

export interface IAT {
  isLoading: boolean
  error: any
  data: {} | undefined
  createPredictionAction: UseMutateFunction<
    {},
    any,
    {
      [key: string]: any
    },
    unknown
  >
  hookForm: UseFormReturn<IPredictGameSchema, any>
  removeAll: () => void
  updateGroup: (group: groupType, value: any) => void
  handlePredictGame: (
    status: statusType,
    shareOption: betTicketShareOptionType
  ) => (data: IPredictGameSchema) => void
  response: IResponse
  initGroupMutation: (value: groupType) => void
  setGrouped: React.Dispatch<React.SetStateAction<groupType[]>>
  grouped: groupType[]
  removePredictionItem: (index: number) => void
  setPredictionItems: React.Dispatch<React.SetStateAction<number[]>>
  predictionsItems: number[]
  addPredictionItem: () => void
  handleGroupMutation: (
    { target }: React.ChangeEvent<HTMLInputElement>,
    id: groupType
  ) => void
}

export const useAddTicket = (
  onSuccess?: () => void,
  onError?: (data: any) => void
): IAT => {
  const [hookForm] = useFormHook<IPredictGameSchema>(predictGameSchema)

  hookForm.getValues('betChannel')

  const [predictionsItems, setPredictionItems] = useState<number[]>([
    moment().valueOf()
  ])

  const removeAll = () => {
    setPredictionItems([moment().valueOf()])
    hookForm.setValue('predictionSchema', [
      { bookie: '', code: '', odds: '', sports: [], endDate: '', startDate: '' }
    ])
  }

  const {
    mutate: createPredictionAction,
    isLoading,
    data,
    response,
    error
  } = useAPIPOST({
    route: 'prediction/multiple',
    onSuccess: () => {
      removeAll()
      onSuccess?.()
    },
    onError: ({ response }: any) => {
      const { data } = response
      onError?.(data)
    },
    defaultData: {
      status: ''
    }
  })

  const addPredictionItem = () => {
    const pi = predictionsItems
    pi.push(moment().valueOf())
    setPredictionItems([...pi])
    setTimeout(() => {
      initGroupMutation('bookie')
      initGroupMutation('sports')
      initGroupMutation('endDate')
      initGroupMutation('startDate')
    }, 500)
  }

  const updateGroup = (group: groupType, value: any) => {
    for (let i = 0; i < hookForm.getValues(`predictionSchema`).length; i++) {
      if (hookForm.getValues(`predictionSchema.${i}.${group}`) !== value) {
        hookForm.setValue(`predictionSchema.${i}.${group}`, value)
      }
    }
  }

  const removePredictionItem = (index: number) => {
    if (predictionsItems?.length > 1) {
      const pi = predictionsItems
      pi.splice(index, 1)
      setPredictionItems([...pi])
      const hk = hookForm.getValues(`predictionSchema`)
      hk.splice(index, 1)
      hookForm.setValue(`predictionSchema`, [...hk])
    }
  }

  const [grouped, setGrouped] = useState<groupType[]>([])

  const initGroupMutation = (value: groupType) => {
    if (grouped.includes(value)) {
      updateGroup(value, hookForm.getValues(`predictionSchema.${0}.${value}`))
    }
  }

  const handlePredictGame = (
    status: statusType,
    shareOption: betTicketShareOptionType
  ) => {
    return (data: IPredictGameSchema) => {
      const channelId = data.betChannel.split(',')?.[0]
      const slug = data.betChannel.split(',')?.[2]
      const predictions = data.predictionSchema.map((i) => ({
        sports: i.sports || [],
        bookie: i.bookie,
        code: i.code,
        odds: i.odds,
        shareOption,
        endDate: new Date(i.endDate).toISOString(),
        startDate: new Date(i.startDate).toISOString(),
        status,
        slug,
        channelId
      }))
      createPredictionAction({ body: predictions })
    }
  }

  const handleGroupMutation = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    id: groupType
  ) => {
    const gp = grouped
    const index = gp.indexOf(id)
    if (index < 0) {
      gp.push(id)
    } else {
      gp.splice(index, 1)
    }
    setGrouped([...gp])
    initGroupMutation(id)
  }

  return {
    data,
    error,
    isLoading,
    createPredictionAction,
    hookForm,
    removeAll,
    updateGroup,
    handlePredictGame,
    response,
    grouped,
    initGroupMutation,
    setGrouped,
    removePredictionItem,
    addPredictionItem,
    predictionsItems,
    setPredictionItems,
    handleGroupMutation
  }
}

interface ICBG {
  grid?: number | string
  isQuery?: boolean
  skip?: {
    show: boolean
    action: () => void
    load: boolean
  }
}

const AddBetTicket = ({
  globalContext,
  isQuery,
  grid,
  skip
}: IGlobalRightSection & ICBG) => {
  if (!globalContext) return <></>
  const { rsProps, global } = globalContext

  const getMyChannelProps = useGetAllChannels()

  const onAddTicketSuccess = () => {
    rsProps?.onRefresh?.()
  }

  const addTicketProps = useAddTicket(onAddTicketSuccess)

  const {
    hookForm,
    isLoading: load,
    handlePredictGame: handleSubmit
  } = addTicketProps

  const handleChannels = (page?: number) => {
    getMyChannelProps.mutate({
      query: `?userId=${getUserData()?.user?._id}&limit=10&page=${page || 1}`
    })
  }

  const sportsQuery = useSportsQuery()
  const bookiesProps = useBookiesQuery()

  useEffect(() => {
    handleChannels()
    sportsQuery.mutate({})
    bookiesProps.mutate({})
  }, [])

  const allBetChannels = getMyChannelProps?.data?.data?.channels || []

  const allSports = global.state.getSports

  const allBookies = global.state.getBookies.data.bookies

  const predictionError = hookForm.formState.errors.predictionSchema?.message

  const [type, setType] = useState<'Single' | 'Multiple' | null>(null)

  const isData =
    allSports?.data?.sports?.length +
      allBookies?.length +
      allBetChannels.length >
    0
  const isLoad =
    sportsQuery.isLoading ||
    bookiesProps.isLoading ||
    getMyChannelProps.isLoading

  if (!isData && isLoad) return <Skeleton />

  return (
    <div className="mx-auto w-100 bg-white f-column-33 h-100 ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto w-100 f-column-30"
      >
        <BetChannelComponents
          allBetChannels={allBetChannels}
          hookForm={hookForm}
          isQuery={isQuery || false}
          setType={setType}
          type={type}
        />
        <div className="border-label rounded p-3">
          {hookForm.watch().betChannel && type === 'Multiple' ? (
            <div className="grid-wrapper-100 gap-20">
              <PredictionGroup
                allBookies={allBookies}
                allSports={allSports}
                addTicketProps={addTicketProps}
              />
            </div>
          ) : null}
        </div>
      </form>
      <div className="mx-auto w-100 mw-800 f-column-15">
        <div className="f-row w-100 jcc">
          {hookForm.watch().betChannel && type === 'Single' && (
            <div className="text-center w-100 pt-3">
              <UnderConstruction />
            </div>
          )}
        </div>
        {predictionError ? (
          <div className="f-row jcc mb-5">
            <TextPrompt prompt={predictionError || ''} />
          </div>
        ) : null}
        {hookForm.watch().betChannel && type === 'Multiple' ? (
          <CTAS
            onDraft={hookForm.handleSubmit(handleSubmit('Pending', 'Private'))}
            onPublishToAll={hookForm.handleSubmit(
              handleSubmit('Published', 'All')
            )}
            onPublishToSubscribers={hookForm.handleSubmit(
              handleSubmit('Published', 'Private')
            )}
            load={load}
          />
        ) : null}
        {/* <ResponseComponent response={response} timeout={1000} /> */}
      </div>
      {skip?.show && (
        <div className="px-4">
          <TypeButton
            title="Do this later"
            buttonType="outlined"
            className="border-0 text-decoration-underline"
            onClick={() => skip?.action?.()}
            load={skip?.load}
          />
        </div>
      )}
    </div>
  )
}

const BetChannelComponents = ({
  allBetChannels,
  hookForm,
  isQuery,
  setType,
  type
}: {
  allBetChannels: IBetChannelResponse[] | undefined
  hookForm: UseFormReturn<IPredictGameSchema, any>
  isQuery: boolean
  setType: React.Dispatch<React.SetStateAction<'Single' | 'Multiple' | null>>
  type: 'Single' | 'Multiple' | null
}) => {
  return (
    <div className="grid-wrapper-35 gap-30">
      <TypeSelect
        label="Channel"
        initoption={{ label: 'Select Channel', value: '' }}
        optionsdata={allBetChannels?.map((i, index) => ({
          id: index,
          label: i.title + ' (' + i.subscription + ') ',
          value: i._id + ',' + i.title + ',' + i.slug + ',' + i.odds
        }))}
        customwidth={'100%'}
        value={hookForm.watch().betChannel}
        {...hookForm.register('betChannel')}
        error={hookForm.formState.errors.betChannel?.message as string}
        disabled={isQuery}
      />
      {hookForm.watch().betChannel && (
        <>
          <TypeSelect
            label="Type"
            initoption={{ label: 'Select Type', value: '' }}
            optionsdata={[
              {
                id: 1,
                label: 'Single',
                value: 'Single'
              },
              {
                id: 2,
                label: 'Multiple',
                value: 'Multiple'
              }
            ]}
            customwidth={'100%'}
            onChange={({ target }) => {
              const { value } = target
              setType(value as 'Single' | 'Multiple')
            }}
            value={type || ''}
          />
        </>
      )}
    </div>
  )
}

interface ICTAS {
  onPublishToSubscribers?: () => void
  onPublishToAll?: () => void
  onDraft?: () => void
  load?: boolean
}

const CTAS: FC<ICTAS> = ({
  onPublishToSubscribers,
  onPublishToAll,
  onDraft,
  load
}) => {
  const [btnClicked, setBtnClicked] = useState<number>(0)
  return (
    <div className="w-100 f-row-20 flex-wrap jcc mb-5 mb-lg-2">
      <div className="dropdown text-center f-row-20 aic jcc">
        <ActionComponent
          actions={[
            {
              label: 'For free',
              action: () => {
                onPublishToAll?.()
                setBtnClicked(1)
              }
            },
            {
              label: 'Pay per tip',
              action: () => {
                onPublishToSubscribers?.()
                setBtnClicked(1)
              },
              disabled: getUserData()?.user?.verificationRequest !== 'approved'
            }
          ]}
          title={btnClicked === 1 && load ? 'Publishing...' : 'Publish'}
        />
        <TypeButton
          title={
            btnClicked === 2 && load ? 'Adding to draft...' : 'Add to draft'
          }
          buttonType="outlined"
          onClick={() => {
            onDraft?.()
            setBtnClicked(2)
          }}
        />
      </div>
    </div>
  )
}

export default AddBetTicket

const TagItem = ({
  text,
  onClickTablet
}: {
  text: string
  onClickTablet?: () => void
}) => {
  return (
    <div
      className="rounded-20 text-light px-2 py-1 cursor-pointer hw-mx f-row-7 aic jcc"
      onClick={onClickTablet}
      style={{ background: '#006d6e' }}
    >
      <p className="text-little m-0 f-row aic" style={{ paddingBottom: '2px' }}>
        {text}
      </p>
      <div className="hw-mx d-flex aic jcc" style={{ height: '15px' }}>
        <TimesSVG color="#fff" />
      </div>
    </div>
  )
}

export const TagComponent = ({
  tags,
  removeSportEvent
}: {
  tags: string[]
  removeSportEvent: (id: string) => void
}) => {
  return (
    <div className="w-100 f-row-7 aic flex-wrap h-xm">
      {tags?.map((i, index) => (
        <TagItem
          onClickTablet={() => removeSportEvent(i)}
          text={i}
          key={index}
        />
      ))}
    </div>
  )
}

export const TagInputComponent = ({
  tags,
  sportsError,
  mutateSportEvent,
  allSports
}: {
  tags: string[]
  sportsError: string
  mutateSportEvent: (action: 'add' | 'remove') => (value: string) => void
  allSports: ISports | undefined
}) => {
  const [openTags, setOpenTags] = useState<boolean>(true)

  const handleOpenTags = () => {
    setOpenTags(!openTags)
  }

  const hideLabel = allSports?.data?.sports?.length === tags?.length

  return (
    <div className="w-100 pt-1 pb-3 f-column-5">
      <TagComponent removeSportEvent={mutateSportEvent('remove')} tags={tags} />
      {!hideLabel ? (
        <p
          className={`text-little m-0 mt-3 mb-1 cursor-pointer w-mx op-07`}
          onClick={handleOpenTags}
        >
          {openTags
            ? 'Select sport event below (Click here to hide)'
            : 'Click here to select sport event'}
        </p>
      ) : null}
      {openTags ? (
        <TagInputSuggestions
          allSports={allSports}
          selectedSuggestions={tags}
          onSelect={(id) => {
            mutateSportEvent('add')(id)
          }}
        />
      ) : null}
      {!tags?.length ? (
        <TextPrompt prompt={sportsError} status={false} />
      ) : null}
    </div>
  )
}

const TagInputSuggestions = ({
  allSports,
  onSelect,
  selectedSuggestions
}: {
  allSports: ISports | undefined
  onSelect?: (id: string) => void
  selectedSuggestions: string[]
}) => {
  const filterSelected = (i: ISport) => {
    return !selectedSuggestions?.includes(i.title)
  }
  const suggestions = allSports?.data?.sports?.filter?.(filterSelected)
  return (
    <div className="sports-filter-suggestions">
      {suggestions?.map((i) => (
        <p
          key={i._id}
          onClick={() => onSelect?.(i.title)}
          className="text-small color-light"
        >
          {i.title}
        </p>
      ))}
    </div>
  )
}

const PredictionItem = ({
  allBookies,
  allSports,
  onRemove,
  addPredictionItem,
  allPredictions,
  index,
  hookForm,
  updateGroup,
  grouped
}: {
  allBookies: IBookie[]
  allSports?: ISports
  onRemove?: () => void
  addPredictionItem: () => void
  index: number
  allPredictions: number
  hookForm: UseFormReturn<IPredictGameSchema, any>
  updateGroup: (group: groupType, value: any) => void
  grouped: groupType[]
}) => {
  const mutateSportEvent = (action: 'add' | 'remove') => (value: string) => {
    const sports = hookForm.getValues(`predictionSchema.${index}.sports`) || []

    if (action === 'add') {
      sports.push(value)
    }
    if (action === 'remove') {
      if (sports?.length > 1) {
        const index = sports.indexOf(value)
        sports.splice(index, 1)
      }
    }
    if (grouped.includes('sports')) {
      updateGroup('sports', [...sports])
    } else {
      hookForm.setValue(`predictionSchema.${index}.sports`, sports)
    }
  }

  const tags = hookForm.watch(`predictionSchema.${index}.sports`)

  const isFirst = index === 0 && allPredictions < 2
  const isLast = allPredictions === index + 1

  const getError = (index: number, key: IPredictionItemKey) => {
    const error = hookForm?.formState?.errors?.predictionSchema
    if (error?.[index]) {
      const e = error[index]
      return e ? e[key]?.message : ''
    }
    return ''
  }

  const isFormValid = (data: IPredictionItemHF) => {
    return (
      !!data?.bookie &&
      !!data?.code &&
      !!data?.odds &&
      !!data?.sports?.[0] &&
      !!data?.endDate &&
      !hookForm.formState.errors.predictionSchema?.[index]?.endDate
    )
  }

  const formValid = isFormValid(hookForm.watch(`predictionSchema.${index}`))

  const isDuplicateBetCode = () => {
    if (hookForm.watch(`predictionSchema`)?.length < 2) return false
    const betCodes = hookForm.watch(`predictionSchema`)
    const betCode = hookForm.watch(`predictionSchema.${index}.code`)
    if (!betCode) return false
    return betCodes.reduce<boolean>((t, i, inx) => {
      if (inx !== index) {
        t = i.code === betCode || t
      }
      return t
    }, false)
  }

  const duplicateCode = isDuplicateBetCode() ? 'duplicate code' : ''

  const handleBookieGroup = ({
    target
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    updateGroup('bookie', value)
  }
  const handleEndDateGroup = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    updateGroup('endDate', value)
  }
  const handleStartDateGroup = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    updateGroup('startDate', value)
  }

  const [hidePrediction, setHidePrediction] = useState<boolean>(false)

  const currentDate = new Date().toISOString().slice(0, -8)

  const odds = parseFloat(hookForm.getValues('betChannel').split(',')[3])

  const handleOddsError = (value: string, index: number) => {
    let message = ''
    if (!value) {
      message = `Odds is required`
    } else if (parseFloat(value) < odds) {
      message = `Odds should be greater or equal to ${odds}`
    } else if (isNaN(Number(value))) {
      message = `Odds should be a number`
    } else {
      message = ''
    }
    hookForm.setError(`predictionSchema.${index}.odds`, {
      message
    })
  }

  const handleOdds = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = target
    handleOddsError(value, index)
    hookForm.setValue(`predictionSchema.${index}.odds`, value)
  }

  return (
    <>
      <div className="text-right f-row-15 aic jce mb-4">
        <div
          className={
            duplicateCode
              ? 'bg-danger cont-wrapper'
              : formValid
              ? 'bg-success cont-wrapper'
              : ''
          }
        />
        <p
          className={`${
            duplicateCode ? 'text-danger' : formValid ? 'text-success' : ''
          } text-little m-0 cursor-pointer f-row-7 aic`}
          onClick={() => {
            // if (hookForm.getValues().predictionSchema.length > 1)
            setHidePrediction(!hidePrediction)
          }}
        >
          {formValid || duplicateCode ? (
            <span>
              <CheckSVG />
            </span>
          ) : null}
          <b>Prediction #{index + 1}</b>&nbsp;&nbsp;
          <span>{hidePrediction ? <TopAngleSVG /> : <BottomAngleSVG />}</span>
        </p>

        {!isFirst ? (
          <>
            <p
              className="text-little m-0"
              onClick={() => setHidePrediction(!hidePrediction)}
            >
              <span className="text-little cursor-pointer spani">
                {!hidePrediction ? 'Hide' : 'Show'}
              </span>
            </p>
            <p className="text-little m-0" onClick={onRemove}>
              <span className="text-danger text-little cursor-pointer">
                &nbsp;&nbsp;
                <TimesSVG />
                &nbsp;&nbsp; Remove
              </span>
            </p>
          </>
        ) : null}
      </div>
      {!hidePrediction ? (
        <>
          <div className="grid-wrapper-25 gap-20 mb-2">
            <TypeInput
              label="Bet Code"
              placeholder="Enter Bet Code"
              customwidth={'100%'}
              {...hookForm.register(`predictionSchema.${index}.code`)}
              error={duplicateCode || getError(index, 'code')}
            />
            <TypeInput
              label="Odd"
              placeholder="Eg: 12.54"
              customwidth={'100%'}
              {...hookForm.register(`predictionSchema.${index}.odds`)}
              onChange={(e) => handleOdds(e, index)}
              onBlur={({ currentTarget }) => {
                const { value } = currentTarget
                handleOddsError(value, index)
              }}
              error={getError(index, 'odds')}
            />
            <TypeSelect
              label="Bookie"
              initoption={{ label: 'Select Bookie', value: '' }}
              optionsdata={allBookies.map((i) => ({
                id: i._id,
                label: i.title,
                value: i.title
              }))}
              customwidth={'100%'}
              {...hookForm.register(`predictionSchema.${index}.bookie`)}
              onChange={
                grouped.includes('bookie')
                  ? handleBookieGroup
                  : hookForm.register(`predictionSchema.${index}.bookie`)
                      .onChange
              }
              error={getError(index, 'bookie')}
            />
            <TypeDate
              label="Start Date"
              type="datetime-local"
              customwidth={'100%'}
              {...hookForm.register(`predictionSchema.${index}.startDate`)}
              onChange={
                grouped.includes('startDate')
                  ? handleStartDateGroup
                  : hookForm.register(`predictionSchema.${index}.startDate`)
                      .onChange
              }
              error={getError(index, 'startDate')}
              min={currentDate}
              onKeyDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            />
            <TypeDate
              label="End Date"
              customwidth={'100%'}
              {...hookForm.register(`predictionSchema.${index}.endDate`)}
              onChange={
                grouped.includes('endDate')
                  ? handleEndDateGroup
                  : hookForm.register(`predictionSchema.${index}.endDate`)
                      .onChange
              }
              error={getError(index, 'endDate')}
              min={currentDate}
              onKeyDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            />
          </div>
          <TagInputComponent
            mutateSportEvent={mutateSportEvent}
            allSports={allSports}
            sportsError={getError(index, 'sports') || ''}
            tags={tags}
          />
        </>
      ) : null}
      {isLast ? (
        <div className="text-center py-4">
          <TypeSmallButton
            title="Add another bet code"
            onClick={
              duplicateCode
                ? undefined
                : hookForm.handleSubmit(addPredictionItem)
            }
            disabled={!!duplicateCode}
          />
        </div>
      ) : null}
    </>
  )
}

const PredictionGroup = ({
  allBookies,
  allSports,
  addTicketProps
}: {
  allBookies: IBookie[]
  allSports: ISports | undefined
  addTicketProps: IAT
}) => {
  const {
    grouped,
    predictionsItems,
    removePredictionItem,
    handleGroupMutation,
    addPredictionItem,
    updateGroup,
    hookForm
  } = addTicketProps

  const predictionItemsError = hookForm.formState.errors.predictionSchema
    ?.message as string

  return (
    <div>
      <div className="pb-3">
        <div>
          <div
            className={`${
              predictionItemsError ? 'border border-danger' : ''
            } p-4 bg-white`}
          >
            <GroupByComponent
              grouped={grouped}
              handleGroupMutation={handleGroupMutation}
            />
            {predictionsItems.map((i, index) => (
              <PredictionItem
                allBookies={allBookies}
                allSports={allSports}
                key={i}
                onRemove={() => removePredictionItem(index)}
                index={index}
                addPredictionItem={addPredictionItem}
                allPredictions={predictionsItems?.length}
                hookForm={hookForm}
                updateGroup={updateGroup}
                grouped={grouped}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface IGBC {
  handleGroupMutation: (
    { target }: React.ChangeEvent<HTMLInputElement>,
    id: groupType
  ) => void
  grouped: groupType[]
}

const GroupByComponent: FC<IGBC> = ({ grouped, handleGroupMutation }) => {
  return (
    <div className="f-row-40 flex-wrap aic jce pt-3 pb-3 mb-4 border-bottom">
      <p className="m-0 text-little">
        <b>Group by</b>
      </p>
      <div className="f-row-7 aic">
        <TypeCheckbox
          onChange={(e) => {
            handleGroupMutation(e, 'bookie')
            handleGroupMutation(e, 'startDate')
            handleGroupMutation(e, 'endDate')
            handleGroupMutation(e, 'sports')
          }}
          checked={
            grouped.includes('bookie') &&
            grouped.includes('startDate') &&
            grouped.includes('endDate') &&
            grouped.includes('sports')
          }
        />
        <p className="text-little m-0">All</p>
      </div>
      <div className="f-row-7 aic">
        <TypeCheckbox
          onChange={(e) => {
            handleGroupMutation(e, 'bookie')
          }}
          checked={grouped.includes('bookie')}
        />
        <p className="text-little m-0">Bookie</p>
      </div>
      <div className="f-row-7 aic">
        <TypeCheckbox
          onChange={(e) => {
            handleGroupMutation(e, 'startDate')
          }}
          checked={grouped.includes('startDate')}
        />
        <p className="text-little m-0">Start Date</p>
      </div>
      <div className="f-row-7 aic">
        <TypeCheckbox
          onChange={(e) => {
            handleGroupMutation(e, 'endDate')
          }}
          checked={grouped.includes('endDate')}
        />
        <p className="text-little m-0">End Date</p>
      </div>
      <div className="f-row-7 aic">
        <TypeCheckbox
          onChange={(e) => {
            handleGroupMutation(e, 'sports')
          }}
          checked={grouped.includes('sports')}
        />
        <p className="text-little m-0">Sports Event</p>
      </div>
    </div>
  )
}
