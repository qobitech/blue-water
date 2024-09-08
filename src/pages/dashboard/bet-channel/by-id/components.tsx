import { ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { IDialogState } from './dialog'
import { IModalProps } from '../../../../components/utils/hooks'
import { IMultiBetTicketResponse } from '../../../../interface/IBet'
import {
  IArchiveBetTicketSchema,
  IDeleteBetTicketSchema,
  IDropBetTicketSchema,
  IEditPredictGameSchema
} from '../../../onboarding/data'
import EditBetTicket from '../../bet-codes/edit-bet-ticket'
import { TypeButton } from '../../../../components/utils/button'
import { TypeSelect } from '../../../../components/utils/select'
import TypeInputSelect from '../../../../components/utils/input-select'
import TextPrompt from '../../../../components/utils/text-prompt'
import ResultTable from '../../../../components/table/ranking'
import { IUseBetMultiBetTicket } from '../../../../api/multi-prediction'
import { ICellAction, ITableRecord } from '../../../../components/table/utils'

export interface IBetTicketSection {
  isOwner: boolean
  dialogState?: IDialogState
  modalProps?: IModalProps
  slug?: string
  updateEditBetTicketFormValues?: (data: IMultiBetTicketResponse) => void
  setAction?: React.Dispatch<React.SetStateAction<string>>
  publishBookingNumber?: (id: string) => void
  archiveBookingNumber?: (id: string) => void
  deleteBookingNumber?: (id: string) => void
  statusQuery?: string
  typeQuery?: string
  categoryQuery?: string
  tabQuery?: string
  tableType?: 'rightsection' | 'non-owners' | 'owners'
  multiBetProps: IUseBetMultiBetTicket
}
interface IEditBTS {
  dialogState: IDialogState
  editBetTicketHookForm: UseFormReturn<IEditPredictGameSchema, any>
  submitEditedBetTicket: (data: IEditPredictGameSchema) => void
}

export const EditBetTicketSection: React.FC<IEditBTS> = ({
  dialogState,
  editBetTicketHookForm,
  submitEditedBetTicket
}) => {
  return (
    <div className="w-100">
      <EditBetTicket hookForm={editBetTicketHookForm} />
      <div className="separator-h-10" />
      <div className="px-3">
        <div className="grid-wrapper-47 gap-20">
          <TypeButton
            title="Submit"
            style={{ width: '100%' }}
            onClick={editBetTicketHookForm.handleSubmit(submitEditedBetTicket)}
            load={dialogState.load}
          />
          <TypeButton
            title="Close"
            buttonType="outlined"
            style={{ width: '100%' }}
            onClick={() => dialogState.setOpenModalBlank(false)}
          />
        </div>
      </div>
    </div>
  )
}

interface IDropBTS {
  dialogState: IDialogState
  betTickets: IMultiBetTicketResponse[]
  onDrop: (data: IDropBetTicketSchema) => void
  hookform: UseFormReturn<IDropBetTicketSchema, any>
}
interface IArchiveBTS {
  dialogState: IDialogState
  betTickets: IMultiBetTicketResponse[]
  onArchive: (data: IArchiveBetTicketSchema) => void
  hookform: UseFormReturn<IArchiveBetTicketSchema, any>
}
interface IDeleteBTS {
  dialogState: IDialogState
  betTickets: IMultiBetTicketResponse[]
  onDelete: (data: IDeleteBetTicketSchema) => void
  hookform: UseFormReturn<IDeleteBetTicketSchema, any>
}

export const DropBetTicketSection: React.FC<IDropBTS> = ({
  dialogState,
  betTickets,
  onDrop,
  hookform
}) => {
  const filterBetTickets = (isSelected: boolean) => {
    return betTickets
      .filter((i) => i.status === 'Pending')
      .filter((i) =>
        !isSelected
          ? !hookform.getValues('betTicketIds')?.includes(i.code)
          : hookform.getValues('betTicketIds')?.includes(i.code)
      )
  }

  const mapNonFiltered = (i: IMultiBetTicketResponse) => ({
    id: i.code,
    label: i.code
  })

  const handleSelectOption = (betCode: string | number) => {
    const temp = hookform.getValues('betTicketIds') || []
    const index = temp.findIndex((i) => i === betCode)
    if (index === -1) {
      temp.push(betTickets?.filter((i) => i?.code === betCode)?.[0]?.code)
    } else {
      temp.splice(index, 1)
    }
    hookform.setValue('betTicketIds', [...temp])
  }

  const mapFiltered = (i: IMultiBetTicketResponse) => [i.code, i.odds, i.bookie]

  return (
    <div className="w-100 px-2">
      <BulkActionComponent
        error="Select at least one (1) bet code to archive"
        filterBetTickets={filterBetTickets}
        handleSelectOption={handleSelectOption}
        isBetCode={!!hookform.watch().betTicketIds?.[0]}
        label="Select Bet Code"
        placeholder="Click to select"
        mapFiltered={mapFiltered}
        mapNonFiltered={mapNonFiltered}
        selectedHeaders={['Bet Code', 'Odds', 'Bookie', 'Action']}
      >
        <div className="separator-h-20" />
        <TypeSelect
          label="Share With"
          initoption={{ label: 'Select', value: '' }}
          optionsdata={[
            {
              id: 1,
              label: 'Public (All)',
              value: 'All'
            },
            {
              id: 2,
              label: 'Subscribers',
              value: 'Subscribers'
            }
          ]}
          {...hookform.register('shareOption')}
          customwidth={'100%'}
          error={hookform.formState.errors.shareOption?.message}
        />
      </BulkActionComponent>
      <>
        <div className="separator-h-20" />
        <div className="grid-wrapper-47 gap-20">
          <TypeButton
            title="Publish"
            onClick={hookform.handleSubmit(onDrop)}
            load={dialogState.load}
          />
          <TypeButton
            title=""
            close
            buttonType="danger"
            style={{ width: '100%' }}
            onClick={() => dialogState.setOpenModalBlank(false)}
          />
        </div>
      </>
    </div>
  )
}

export const ArchiveBetTicketSection: React.FC<IArchiveBTS> = ({
  dialogState,
  betTickets,
  onArchive,
  hookform
}) => {
  const filterBetTickets = (isSelected: boolean) => {
    return betTickets
      .filter((i) => i.status === 'Published')
      .filter((i) =>
        !isSelected
          ? !hookform.getValues('betTicketIds').includes(i.code)
          : hookform.getValues('betTicketIds').includes(i.code)
      )
  }

  const mapNonFiltered = (i: IMultiBetTicketResponse) => ({
    id: i.code,
    label: i.code
  })

  const handleSelectOption = (betCode: string | number) => {
    const temp = hookform.getValues('betTicketIds') || []
    const index = temp.findIndex((i) => i === betCode)
    if (index === -1) {
      temp.push(betTickets?.filter((i) => i?.code === betCode)?.[0]?.code)
    } else {
      temp.splice(index, 1)
    }
    hookform.setValue('betTicketIds', [...temp])
  }

  const mapFiltered = (i: IMultiBetTicketResponse) => [i.code, i.odds, i.bookie]

  const isBetCode = !!hookform.watch().betTicketIds?.[0]

  return (
    <div className="w-100 px-2">
      <BulkActionComponent
        error="Select at least one (1) bet code to archive"
        filterBetTickets={filterBetTickets}
        handleSelectOption={handleSelectOption}
        isBetCode={!!hookform.watch().betTicketIds?.[0]}
        label="Select Bet Code"
        placeholder="Click to select"
        mapFiltered={mapFiltered}
        mapNonFiltered={mapNonFiltered}
        selectedHeaders={['Bet Code', 'Odds', 'Bookie', 'Action']}
      />
      <>
        <div className="separator-h-20" />
        <div className="grid-wrapper-47 gap-20">
          <TypeButton
            title="Archive"
            onClick={hookform.handleSubmit(onArchive)}
            load={dialogState.load}
            disabled={!isBetCode}
            buttonType={isBetCode ? 'bold' : 'disabled'}
          />
          <TypeButton
            title=""
            close
            buttonType="danger"
            style={{ width: '100%' }}
            onClick={() => dialogState.setOpenModalBlank(false)}
          />
        </div>
      </>
    </div>
  )
}

export const DeleteBetTicketSection: React.FC<IDeleteBTS> = ({
  dialogState,
  betTickets,
  onDelete,
  hookform
}) => {
  const getFilterByStatusOrSelected = (
    isSelected: boolean,
    type: 'status' | 'selected'
  ) => {
    return (i: IMultiBetTicketResponse) => {
      if (type === 'status') {
        if (!isSelected) {
          // on initial render, status value is undefined by default and filter returns only archive bet tickets
          // if status is changed, status value becomes a string, no longer undefined
          if (typeof hookform.watch('status') === 'string') {
            if (hookform.watch('status'))
              return i.status === hookform.watch('status')
            return true
          }
          return i.status === 'Archived'
        }
        return true
      }
      return !isSelected
        ? !hookform.getValues('betTicketIds')?.includes(i.code)
        : hookform.getValues('betTicketIds')?.includes(i.code)
    }
  }
  const filterBetTickets = (isSelected: boolean) => {
    const filterByStatus = getFilterByStatusOrSelected(isSelected, 'status')
    const filterBySelected = getFilterByStatusOrSelected(isSelected, 'selected')
    return betTickets.filter(filterByStatus).filter(filterBySelected)
  }

  const mapNonFiltered = (i: IMultiBetTicketResponse) => ({
    id: i.code,
    label: i.code
  })

  const handleSelectOption = (betCode: string | number) => {
    const temp = hookform.getValues('betTicketIds') || []
    const index = temp.findIndex((i) => i === betCode)
    if (index === -1) {
      temp.push(betTickets?.filter((i) => i?.code === betCode)?.[0]?.code)
    } else {
      temp.splice(index, 1)
    }
    hookform.setValue('betTicketIds', [...temp])
  }

  const mapFiltered = (i: IMultiBetTicketResponse) => [
    i.code,
    i.odds,
    i.bookie,
    i.status === 'Pending' ? 'Draft' : i.status
  ]

  const isBetCode = !!hookform.watch().betTicketIds?.[0]

  const statusOptData = [
    {
      id: 1,
      label: 'All',
      value: ''
    },
    {
      id: 2,
      label: 'Archived',
      value: 'Archived'
    },
    {
      id: 3,
      label: 'Published',
      value: 'Published'
    },
    {
      id: 4,
      label: 'Draft',
      value: 'Pending'
    }
  ] as Array<{ id: number; label: string; value: string }>

  return (
    <div className="w-100 px-2">
      <div className="px-2">
        <TypeSelect
          label="Select Status"
          initoption={{ label: 'Select Status', value: '' }}
          disableInit
          defaultValue={'Archived'}
          optionsdata={statusOptData}
          customwidth={'100%'}
          {...hookform.register('status')}
        />
      </div>
      <div className="separator-h-20" />
      <BulkActionComponent
        error="Select at least one (1) bet code to delete"
        filterBetTickets={filterBetTickets}
        handleSelectOption={handleSelectOption}
        isBetCode={!!hookform.watch().betTicketIds?.[0]}
        label="Select Bet Code"
        placeholder="Click to select"
        mapFiltered={mapFiltered}
        mapNonFiltered={mapNonFiltered}
        selectedHeaders={['Bet Code', 'Odds', 'Bookie', 'Status', 'Action']}
        gridPercent={15}
      />
      <>
        <div className="separator-h-20" />
        <div className="grid-wrapper-47 gap-20">
          <TypeButton
            title=""
            trash
            onClick={hookform.handleSubmit(onDelete)}
            load={dialogState.load}
            disabled={!isBetCode}
            buttonType={isBetCode ? 'danger' : 'disabled'}
            className="text-danger"
          />
          <TypeButton
            title=""
            close
            buttonType="danger"
            style={{ width: '100%' }}
            onClick={() => dialogState.setOpenModalBlank(false)}
          />
        </div>
      </>
    </div>
  )
}

interface IBulkAC<T extends {}> {
  filterBetTickets: (isSelected: boolean) => T[]
  handleSelectOption: (id: string | number) => void
  isBetCode: boolean
  mapNonFiltered: (i: T) => { id: string; label: string }
  mapFiltered: (i: T) => string[]
  // filterFilteredItems: (i: T) => boolean
  label: string
  placeholder: string
  selectedHeaders: string[]
  error: string
  children?: ReactNode
  gridPercent?: number
}

export const BulkActionComponent = <T extends {}>({
  filterBetTickets,
  handleSelectOption,
  isBetCode,
  mapNonFiltered,
  mapFiltered,
  label,
  placeholder,
  selectedHeaders,
  error,
  children,
  gridPercent
}: IBulkAC<T>) => {
  const filteredBetTickets = filterBetTickets(true).map(mapFiltered)

  const notfilteredBetTickets = filterBetTickets(false).map(mapNonFiltered)

  const topRankData: ITableRecord[] = filteredBetTickets.map((i, index) => ({
    id: index + 1 + '',
    row: i.map((j) => ({
      value: j,
      isLink: false,
      url: '',
      action: () => {}
    })),
    rowActions: [
      {
        value: 'Remove',
        isLink: false,
        url: ``,
        action: () => {
          handleSelectOption(i[0])
        },
        color: '#fff',
        view: 'both',
        buttonType: 'danger'
      }
    ] as ICellAction[]
  }))

  return (
    <div className="w-100 px-2">
      <form className="w-100" onSubmit={(e) => e.preventDefault()}>
        <TypeInputSelect
          label={
            label +
            (filteredBetTickets.length
              ? `  (${filteredBetTickets.length} selected)`
              : '')
          }
          placeholder={placeholder}
          options={notfilteredBetTickets}
          setSelectedOption={handleSelectOption}
        />

        {isBetCode ? (
          <>
            <div className="separator-h-20" />
            <div className="text-left w-100">
              <p className="mb-2 text-little">Selected Bet codes</p>
              <div
                className="border rounded py-2 px-3"
                style={{ overflow: 'auto' }}
              >
                <ResultTable
                  header={selectedHeaders}
                  hideNumbering
                  record={topRankData}
                  cellWidth={100 / selectedHeaders.length}
                />
              </div>
            </div>
            <div className="separator-h-10" />
          </>
        ) : (
          <div className="pt-4">
            <TextPrompt prompt={error} status={false} />
          </div>
        )}
        {children}
      </form>
    </div>
  )
}
