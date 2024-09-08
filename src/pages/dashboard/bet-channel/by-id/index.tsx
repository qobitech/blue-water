import { useState } from 'react'
import {
  HeaderComponent,
  PageContainer,
  TabComponent
} from '../../../../components/utils/reusable'
import BreadCrumb from '../../../../components/utils/bread-crumb'
import { pageurl } from '../../../../constants/pageurl'
import {
  BG,
  DISABLED_COLOR,
  GETISSELLER,
  getUserData
} from '../../../../constants/global'
import { useNavigate, useParams } from 'react-router-dom'
import { IMultiBetTicketResponse } from '../../../../interface/IBet'
import { DialogActivity, useCustomDialogState } from './dialog'
import {
  Loader,
  useFormHook,
  useQueryValuesHook
} from '../../../../components/utils/hooks'
import {
  IEditPredictGameSchema,
  editBetTicketSchema,
  IDropBetTicketSchema,
  dropBetTicketSchema,
  IArchiveBetTicketSchema,
  archiveBetTicketSchema,
  IDeleteBetTicketSchema,
  deleteBetTicketSchema
} from '../../../onboarding/data'
import Rating from '../../../../components/utils/rating'
import {
  ArchiveBetTicketSection,
  DeleteBetTicketSection,
  DropBetTicketSection,
  EditBetTicketSection
} from './components'
import DashboardWrapper from '../../../../components/layout/dashboard-wrapper'
import { useMultiBetTicketsQuery } from '../../../../api/multi-prediction'
import { useBetChannelQuery } from '../../../../api/channels'
import { ChannelDetails } from './data'
import { useGlobalContext } from '../../../../components/layout/context'

export const modalContent = {
  submitTicket: {
    contentDialog: {
      header: 'Submit Bet Code for Approval?',
      subHeader:
        'We will promptly review your Bet Code. Please confirm if you have indeed won this booking. It is important to note that if the Bet Code is not approved, a fine will be imposed, which will be deducted from your earnings and you will be given a strike. Additionally, accumulating three (3) strikes will result in a suspension from the platform.'
    },
    content: {
      header: 'Ticket has been submitted for approval',
      subHeader: ``
    }
  },
  deleteBetChannel: {
    contentDialog: {
      header: 'Delete Channel?',
      subHeader:
        'Are you sure you want to delete Channel? Action cannot be reversed.'
    },
    content: {
      header: 'Channel has been deleted',
      subHeader: ``
    }
  },
  editBetChannel: {
    contentDialog: {
      header: 'Edit Channel?',
      subHeader: 'Are you sure you want to edit Channel?'
    },
    content: {
      header: 'Channel Edited Successfully',
      subHeader: ``
    }
  },
  editBetTicket: {
    contentDialog: {
      header: 'Edit Bet Code?',
      subHeader: 'Are you sure you want to edit Bet Code ?'
    },
    content: {
      header: 'Bet Code Edited Successfully',
      subHeader: ``
    }
  },
  dropBetTicket: {
    contentDialog: {
      header: 'Publish Bet Code?',
      subHeader: 'Are you sure you want to edit Bet Code ?'
    },
    content: {
      header: 'Bet Code Edited Successfully',
      subHeader: ``
    }
  },
  deleteBetTicket: {
    contentDialog: {
      header: 'Delete Bet Code?',
      subHeader:
        'Are you sure you want to delete Bet Code? Action cannot be reversed.'
    },
    content: {
      header: 'Bet Code Deleted Successfully',
      subHeader: ``
    }
  }
}

export interface ITableFilterSchema {
  filter: string
  value: string
}

export enum actionEnum {
  EDIT = 'edit',
  DELETE = 'delete',
  BETTICKETEDIT = 'betticketedit',
  BETTICKETDELETE = 'betticketdelete',
  BETTICKETDROP = 'betticketdrop',
  BETTICKETARCHIVE = 'betticketarchive'
}

export enum betChannelTabEnum {
  BETSTATS = 'Stats',
  BETSCHEDULE = 'Schedule',
  BETTICKETS = 'Bet Tips',
  OVERVIEW = 'Overview'
}

const BetChannelPage = () => {
  const { setShareProps } = useGlobalContext()
  const { t } = useQueryValuesHook()
  const { id } = useParams()

  const { data: betChannels, isLoading } = useBetChannelQuery(`?slug=${id}`)

  const multiBetProps = useMultiBetTicketsQuery()

  const [editBetTicketHookForm] =
    useFormHook<IEditPredictGameSchema>(editBetTicketSchema)

  const [dropBetTicketHookForm] =
    useFormHook<IDropBetTicketSchema>(dropBetTicketSchema)

  const [archiveBetTicketHookForm] = useFormHook<IArchiveBetTicketSchema>(
    archiveBetTicketSchema
  )

  const [deleteBetTicketHookForm] = useFormHook<IDeleteBetTicketSchema>(
    deleteBetTicketSchema
  )

  const [dialogState] = useCustomDialogState()

  const betChannel = betChannels?.data.channels?.[0]

  const pageTitle = betChannel?.title || '...'

  const navigate = useNavigate()

  const [action, setAction] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setEdit] = useState<string>('')
  const isEdit = action === actionEnum.EDIT
  const isBetTicketEdit = action === actionEnum.BETTICKETEDIT
  const isDelete =
    action === actionEnum.DELETE || action === actionEnum.BETTICKETDELETE
  const isBetTicketDelete = action === actionEnum.BETTICKETDELETE
  const isBetTicketDrop = action === actionEnum.BETTICKETDROP
  const isBetTicketArchive = action === actionEnum.BETTICKETARCHIVE

  const submitEditedBetTicket = (data: IEditPredictGameSchema) => {
    dialogState.setLoad(true)
  }

  const getDefaultTab = (tabQuery: string) => {
    switch (tabQuery?.toLowerCase()) {
      case betChannelTabEnum.BETSTATS.toLowerCase():
        return betChannelTabEnum.BETSTATS
      case betChannelTabEnum.BETSCHEDULE.toLowerCase():
        return betChannelTabEnum.BETSCHEDULE
      case betChannelTabEnum.BETTICKETS.toLowerCase():
        return betChannelTabEnum.BETTICKETS
      default:
        return betChannelTabEnum.BETTICKETS
    }
  }

  const defaultTab = getDefaultTab(t?.toLowerCase())

  const [tab, setTab] = useState<string>(defaultTab)

  const isBS = tab === betChannelTabEnum.BETSTATS
  const isBSC = tab === betChannelTabEnum.BETSCHEDULE
  const isBT = tab === betChannelTabEnum.BETTICKETS

  const onArchive = (data: IArchiveBetTicketSchema) => {
    // let selectedBetTickets = getSelectedBetTickets(data.betTicketIds)
    // selectedBetTickets = selectedBetTickets.map((i) => ({
    //   ...i,
    //   status: 'Archived',
    //   modified: new Date().toISOString()
    // }))
    // dialogState.setLoad(true)
    // updateData(selectedBetTickets, 'Archived')
  }

  const onDrop = (data: IDropBetTicketSchema) => {
    // let selectedBetTickets = getSelectedBetTickets(data.betTicketIds)
    // selectedBetTickets = selectedBetTickets.map((i) => ({
    //   ...i,
    //   status: 'Published',
    //   modified: new Date().toISOString(),
    //   shareOption: data?.shareOption as betTicketShareOptionType
    // }))
    // dialogState.setLoad(true)
    // updateData(selectedBetTickets, 'Published')
  }

  const onDelete = (data: IDeleteBetTicketSchema) => {
    // const selectedBetTickets = betTickets.filter((i) =>
    //   data?.betTicketIds.map((j) => j).includes(i.code + '')
    // )
    // dialogState.setLoad(true)
    // deleteBatchData<IBetTicket>(
    //   'bet-predictions',
    //   selectedBetTickets,
    //   'id'
    // ).then(() => {
    //   // updateBetChannelAfterTableAction(selectedBetTickets?.length, 'Deleted')
    // })
  }

  const isOwner =
    GETISSELLER() && getUserData()?.user?._id === betChannel?.userId

  const onTabClick = (tab: string) => navigate(`?t=${tab.toLowerCase()}`)

  // const modalFormProps = useModalNew()

  // useEffect(() => {
  //   if (sub) {
  //     navigate('?')
  //     modalFormProps.handleModal('Subscribe')
  //   }
  // }, [sub])

  return (
    <div className={`PageWrapper ${BG}`}>
      {/* <ModalCustom {...modalFormProps}>
        {modalFormProps.openModal ? (
          <SubscriptionForm
            modalProps={modalFormProps}
            betChannelId={betChannel?._id + ''}
            betChannelName={betChannel?.title || '...'}
            subscriptionType={betChannel?.subscription || 'free'}
          />
        ) : null}
      </ModalCustom> */}
      <Loader loader={isLoading} />

      <DialogActivity
        {...dialogState}
        cancelDialogCta={{
          text: '',
          action: () => {
            dialogState.setOpenModalDialog(false)
          },
          buttonType: 'outlined'
        }}
        conformDialogCta={{
          text: isDelete || isBetTicketDelete ? 'Delete' : 'Submit Ticket',
          action: () => {
            if (isDelete) {
              return null
            }
          },
          buttonType: 'bold',
          load: dialogState.load
        }}
        notificationCta={{
          text: 'Done',
          action: () => {
            dialogState.setOpenModal(false)
            isEdit && setAction('')
            navigate(0)
          },
          buttonType: 'bold',
          load: false
        }}
        blankContent={
          isBetTicketEdit ? (
            <EditBetTicketSection
              dialogState={dialogState}
              editBetTicketHookForm={editBetTicketHookForm}
              submitEditedBetTicket={submitEditedBetTicket}
            />
          ) : isBetTicketDelete ? (
            <DeleteBetTicketSection
              dialogState={dialogState}
              betTickets={
                multiBetProps.data?.data
                  .multiplePredictions as IMultiBetTicketResponse[]
              }
              hookform={deleteBetTicketHookForm}
              onDelete={onDelete}
            />
          ) : isBetTicketDrop ? (
            <DropBetTicketSection
              dialogState={dialogState}
              betTickets={
                multiBetProps.data?.data
                  .multiplePredictions as IMultiBetTicketResponse[]
              }
              onDrop={onDrop}
              hookform={dropBetTicketHookForm}
            />
          ) : isBetTicketArchive ? (
            <ArchiveBetTicketSection
              dialogState={dialogState}
              betTickets={
                multiBetProps.data?.data
                  .multiplePredictions as IMultiBetTicketResponse[]
              }
              onArchive={onArchive}
              hookform={archiveBetTicketHookForm}
            />
          ) : (
            <></>
          )
        }
      />
      <PageContainer>
        <div className="bread-crumb-section">
          <BreadCrumb
            crumbs={[
              { title: 'Channels', url: `${pageurl.BETCHANNEL}/all` },
              { title: pageTitle, url: '' }
            ]}
          />
        </div>
        <DashboardWrapper>
          <div className="bg-white rounded">
            <div className="px-4 pt-4 pb-2">
              <HeaderComponent
                title={pageTitle}
                icon=""
                ctas={[
                  {
                    ctaTxt: 'Add Bet code',
                    ctaIcon: '',
                    ctaType: 'outlined',
                    ctaAction: () => {
                      navigate(
                        `${pageurl.BETCHANNEL}/${betChannel?.slug}/add-bet-tip`
                      )
                    },
                    ctaHide: !isOwner || isEdit
                  },
                  {
                    ctaTxt: isEdit ? 'Save' : 'Edit',
                    ctaIcon: '',
                    ctaType: 'outlined',
                    ctaLoad: dialogState.load,
                    ctaAction: () => {
                      if (isEdit) {
                        dialogState.setLoad(true)
                      } else {
                        navigate(
                          `?t=${betChannelTabEnum.OVERVIEW.toLowerCase()}`
                        )
                        setTab(betChannelTabEnum.OVERVIEW)
                        setAction(actionEnum.EDIT)
                        setEdit(betChannel?.description || '')
                      }
                    },
                    ctaHide: !isOwner
                  },
                  {
                    ctaTxt: isEdit ? 'Cancel' : 'Delete',
                    ctaIcon: '',
                    ctaType: 'outlined',
                    ctaAction: () => {
                      if (isEdit) {
                        setAction('')
                      } else {
                        setAction(actionEnum.DELETE)
                        dialogState.setModalContent(
                          modalContent.deleteBetChannel
                        )
                        dialogState.setOpenModalDialog(true)
                      }
                    },
                    ctaHide: !isEdit
                  },
                  {
                    ctaHide: GETISSELLER(),
                    ctaLoad: false
                  },
                  {
                    ctaTxt: 'Share',
                    ctaIcon: '',
                    ctaAction: () => {
                      setShareProps?.({
                        title: 'Channel',
                        url: `${pageurl.BETCHANNEL}/${betChannel?.slug}`,
                        description: `Checkout this prediction Channel "${betChannel?.title}" on MyTipster.pro, they have amazing bet odds`,
                        category: 'bet tips'
                      })
                    },
                    ctaHide: isOwner
                  }
                ]}
              >
                <div className="ResponsiveDivLeft mt-1 mb-2 mb-lg-0 pt-3 pt-lg-0">
                  <div className="my-2">
                    <p
                      className="m-0 text-little color-light"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <b>ROI - 0%</b>
                    </p>
                  </div>
                  <div
                    className="mx-3"
                    style={{
                      background: DISABLED_COLOR,
                      width: '1px',
                      height: '16px'
                    }}
                  />
                  <div className="d-none d-lg-flex">
                    <Rating rating={betChannel?.rating || 0} position="left" />
                  </div>
                  <div className="f-row d-lg-none">
                    <Rating
                      rating={betChannel?.rating || 0}
                      position="center"
                    />
                  </div>
                </div>
              </HeaderComponent>
            </div>
            <ChannelDetails betChannel={betChannel} />
            <div
              className="f-row-25 aic w-100 px-4 pt-2"
              style={{ overflow: 'auto' }}
            >
              <TabComponent
                isSelected={isBS}
                setTab={setTab}
                title={betChannelTabEnum.BETSTATS}
                onSetTab={() => onTabClick(betChannelTabEnum.BETSTATS)}
              />
              <TabComponent
                isSelected={isBT}
                setTab={setTab}
                title={betChannelTabEnum.BETTICKETS}
                onSetTab={() => onTabClick(betChannelTabEnum.BETTICKETS)}
              />

              {isOwner && (
                <>
                  <TabComponent
                    isSelected={isBSC}
                    setTab={setTab}
                    title={betChannelTabEnum.BETSCHEDULE}
                    onSetTab={() => onTabClick(betChannelTabEnum.BETSCHEDULE)}
                  />
                </>
              )}
            </div>
          </div>
        </DashboardWrapper>
      </PageContainer>
      <div className="py-5" />
    </div>
  )
}

export default BetChannelPage
