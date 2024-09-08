import { useEffect, useState } from 'react'
import { useFormHook } from '../../../components/utils/hooks'
import { useMutation } from '@tanstack/react-query'
import { TypeSmallButton } from '../../../components/utils/button'
import TextPrompt from '../../../components/utils/text-prompt'
import { CreateItem, EditItem } from './components'
import { UseFormReturn } from 'react-hook-form'
import { IFormComponent } from '../../../components/utils/form-builder'
import { apiFeatures, getResponse, useAPIGET } from '../../../api'
import { RefreshComponent } from '../../../components/utils/reusable'

type typeAction = 'create' | 'update' | 'delete' | 'status' | null

const MainComponent = <
  T extends { [key: string]: any },
  L extends { [key: string]: any }
>({
  getMainData,
  title,
  querystring,
  route,
  initUpdateFn,
  updateProps,
  schema,
  formComponent,
  getFormData,
  query,
  showId,
  getTitle,
  updateCreateHookForm
}: {
  getMainData: (data: any) => T[]
  title: string
  querystring: string
  route: string
  getFormData: (
    hookForm: UseFormReturn<any, any>,
    id: string,
    actionType: typeAction,
    status: 'Inactive' | 'Active'
  ) => object
  initUpdateFn: (hookForm: UseFormReturn<any, any>, data: any) => void
  updateProps: IFormComponent[]
  schema: object
  formComponent: IFormComponent[]
  query?: string
  showId?: string
  getTitle?: (value: string) => string
  updateCreateHookForm?: Array<{ [key: string]: any }>
}) => {
  const [actionType, setActionType] = useState<typeAction>(null)
  const [isSelected, setIsSelected] = useState<string>('')
  const getAction = async (data: any) => {
    switch (actionType) {
      case 'create':
        return await apiFeatures.post(route, data)
      case 'update':
      case 'status':
        return await apiFeatures.put(route, data.id, data)
      default:
        return await apiFeatures.delete(route, undefined, { ids: data })
    }
  }

  const [createhookForm] = useFormHook<any>(schema)

  const getDataProps = useAPIGET<L>({
    route,
    defaultData: {} as L
  })

  const handeGetData = () => {
    getDataProps.mutate({ query })
  }

  useEffect(() => {
    handeGetData()
  }, [])

  const allData = getMainData(getDataProps.data)
  const { mutate, isLoading, error, data, reset } = useMutation({
    mutationFn: getAction,
    onSuccess: () => {
      handeGetData()
      createhookForm.reset()
      if (actionType === 'update' || actionType === 'status') {
        setActionType(null)
        setIsSelected('')
      }
      if (actionType !== 'create') {
        reset()
      }
    }
  })

  const handleForm = (status: 'Inactive' | 'Active', id: string) => {
    return (hookForm: UseFormReturn<any, any>) => {
      if (actionType === 'update' || actionType === 'status') {
        mutate(getFormData(hookForm, id, actionType, status))
      }
      if (actionType === 'delete') {
        mutate([id])
      }
    }
  }

  const handleAddItem = (data: any) => {
    setActionType('create')
    mutate(data)
  }

  const response = getResponse(data, error)

  const sortAllData = (a: T, b: T) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  }

  useEffect(() => {
    if (actionType !== null)
      if (Array.isArray(updateCreateHookForm)) {
        updateCreateHookForm.forEach((i) => {
          const key = Object.keys(i)?.[0]
          const value = Object.values(i)?.[0]
          createhookForm.setValue(key, value)
        })
      }
  }, [actionType])

  if (actionType === 'create')
    return (
      <CreateItem
        formComponent={formComponent}
        handleSubmit={handleAddItem}
        hookForm={createhookForm}
        isLoading={actionType === 'create' && isLoading}
        onClose={() => {
          setActionType(null)
          reset()
          createhookForm.reset()
        }}
        response={response}
      />
    )

  return (
    <div>
      <div>
        <TypeSmallButton
          title={`Add ${title}`}
          buttonType="outlined"
          onClick={() => setActionType('create')}
        />
      </div>

      <div className="pt-4">
        {allData?.[0] ? (
          allData
            ?.sort(sortAllData)
            ?.map((i) => (
              <EditItem
                id={i._id}
                actionType={actionType}
                status={i.status}
                setActionType={setActionType}
                key={i._id}
                setIsSelected={setIsSelected}
                isSelected={isSelected}
                isLoading={isLoading}
                response={response}
                handleForm={handleForm(i.status, i._id)}
                initUpdateFn={initUpdateFn}
                schema={schema}
                updateProps={updateProps}
                data={i}
                showId={showId}
                getTitle={getTitle}
              />
            ))
        ) : (
          <div className="f-row-13 aic">
            {!getDataProps.isLoading ? (
              <TextPrompt prompt="No data" status={false} />
            ) : null}
            <RefreshComponent
              load={getDataProps.isLoading}
              onRefresh={handeGetData}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default MainComponent
