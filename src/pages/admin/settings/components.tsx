import { FC, useEffect } from 'react'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import { UseFormReturn } from 'react-hook-form'
import { TypeSmallButton } from '../../../components/utils/button'
import { TypeInput } from '../../../components/utils/input'
import { useFormHook } from '../../../components/utils/hooks'
import {
  IResponse
  // ResponseComponent
} from '../../../api'
import { typeAction, updatePropComponent, propType } from './data'

interface ICC {
  hookForm: UseFormReturn<any, any>
  formComponent: IFormComponent[]
  response: IResponse
  handleSubmit: (data: any) => void
  isLoading: boolean
  onClose: () => void
}

export const CreateItem: FC<ICC> = ({
  hookForm,
  formComponent,
  response,
  handleSubmit,
  isLoading,
  onClose
}) => {
  return (
    <div>
      <div className="admin-settings-sports-form">
        <FormBuilder hookForm={hookForm} formComponent={formComponent} />
      </div>
      {/* <ResponseComponent response={response} /> */}
      {response.message ? <div className="separator-h-5" /> : null}
      <div className="admin-settings-sports-form-cta">
        <TypeSmallButton
          title="Add"
          onClick={hookForm.handleSubmit(handleSubmit)}
          load={isLoading}
        />
        <TypeSmallButton title="" close onClick={onClose} buttonType="danger" />
      </div>
    </div>
  )
}

export interface IUpdateProps {
  component: updatePropComponent
  type: propType
  id: string
  placeholder: string
  initOption?: { label: string; value: string }
  optionsData?: Array<{ id: string; label: string; value: string }>
}

export const EditItem = ({
  id,
  setActionType,
  actionType,
  setIsSelected,
  isSelected,
  isLoading,
  response,
  status,
  initUpdateFn,
  handleForm,
  updateProps,
  schema,
  data,
  showId,
  getTitle
}: {
  id: string
  status: 'Active' | 'Inactive'
  setActionType: React.Dispatch<React.SetStateAction<typeAction>>
  actionType: typeAction
  setIsSelected: React.Dispatch<React.SetStateAction<string>>
  isSelected: string
  isLoading: boolean
  response: IResponse
  initUpdateFn: (hookForm: UseFormReturn<any, any>, data?: any) => void
  handleForm: (hookForm: UseFormReturn<any, any>) => void
  updateProps: IFormComponent[]
  schema: object
  data: any
  showId?: string
  getTitle?: (value: string) => string
}) => {
  const [hookForm] = useFormHook<any>(schema)

  useEffect(() => {
    initUpdateFn(hookForm, data)
  }, [])

  const isSectionSelected = isSelected === id
  const isDelete = isSectionSelected && actionType === 'delete'
  const isUpdate = isSectionSelected && actionType === 'update'
  const isStatus = isSectionSelected && actionType === 'status'

  const getStatusText = (status: 'Active' | 'Inactive') => {
    if (status === 'Active') return 'Deactivate'
    return 'Activate'
  }

  return (
    <div
      className={`border-bottom pt-${isUpdate ? 4 : 2} pb-2 f-column gap-20`}
    >
      <div className="f-row aic jcsb">
        {isDelete || isStatus ? (
          <p>
            Are you sure you want to{' '}
            {isDelete ? 'delete' : getStatusText(status).toLowerCase()}{' '}
            {hookForm.watch('title')} ?
          </p>
        ) : (
          <>
            {!isUpdate ? (
              <TypeInput
                onFocus={() => {
                  setActionType('update')
                  setIsSelected(id)
                }}
                isonlyview
                customwidth={'100%'}
                autoFocus={isSectionSelected}
                value={
                  getTitle?.(hookForm.watch(showId || 'title')) ||
                  hookForm.watch(showId || 'title')
                }
                style={{ fontSize: '13px' }}
              />
            ) : null}
          </>
        )}
        <EditCTA
          isDelete={isDelete}
          isEdit={isUpdate}
          isStatus={isStatus}
          setActionType={setActionType}
          show={!isSectionSelected}
          handleForm={() => handleForm(hookForm)}
          handleSelected={(value) => {
            setIsSelected(typeof value === 'string' ? value : id)
          }}
          isLoading={isLoading}
          status={getStatusText(status)}
        />
      </div>
      {isUpdate ? (
        <>
          <div className="f-column-13">
            <FormBuilder hookForm={hookForm} formComponent={updateProps} />
          </div>
          {/* <ResponseComponent response={response} /> */}
          {response.message ? <div className="separator-h-5" /> : null}
        </>
      ) : null}

      <EditCTA
        isDelete={isDelete}
        isEdit={isUpdate}
        isStatus={isStatus}
        setActionType={setActionType}
        show={isSectionSelected}
        handleForm={() => handleForm(hookForm)}
        handleSelected={(value) => {
          setIsSelected(typeof value === 'string' ? value : id)
        }}
        isLoading={isLoading}
        status={getStatusText(status)}
      />
      {isSectionSelected && <div className="separator-h-5" />}
    </div>
  )
}

export const EditCTA = ({
  show,
  setActionType,
  isEdit,
  isDelete,
  status,
  isStatus,
  handleForm,
  handleSelected,
  isLoading
}: {
  show: boolean
  isEdit: boolean
  isDelete: boolean
  isStatus: boolean
  status: 'Deactivate' | 'Activate'
  setActionType: React.Dispatch<React.SetStateAction<typeAction>>
  handleForm: () => void
  handleSelected?: (value?: string) => void
  isLoading: boolean
}) => {
  return (
    <>
      {show ? (
        <div className="f-row-20 aic">
          {!isStatus ? (
            <TypeSmallButton
              title={isDelete ? 'Delete' : isEdit ? 'Save' : 'Edit'}
              onClick={() => {
                handleSelected?.()
                if (isEdit || isDelete) {
                  handleForm()
                } else if (!isEdit) {
                  setActionType('update')
                }
              }}
              buttonType={isDelete ? 'danger' : 'bold'}
              load={(isEdit || isDelete) && isLoading}
            />
          ) : null}
          {!isEdit && !isDelete ? (
            <TypeSmallButton
              title={status}
              buttonType={status === 'Activate' ? 'bold' : 'danger'}
              active={status === 'Activate'}
              onClick={() => {
                if (isStatus) {
                  handleForm()
                } else {
                  handleSelected?.()
                  setActionType('status')
                }
              }}
              load={isStatus && isLoading}
            />
          ) : null}
          <TypeSmallButton
            title=""
            close
            buttonType="danger"
            onClick={() => {
              if (isEdit || isDelete || isStatus) {
                handleSelected?.('')
                setActionType(null)
              } else {
                handleSelected?.()
                setActionType('delete')
              }
            }}
          />
        </div>
      ) : null}
    </>
  )
}
