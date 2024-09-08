import { useState } from 'react'
import NotificationModal, {
  IUseNotificationModal,
  useModal
} from '../../../../components/utils/modal'
import {
  AlertSVG,
  NotificationSuccessSVG
} from '../../../../components/utils/svgs'
import { TypeButton } from '../../../../components/utils/button'

export const CustomDialog = ({
  children,
  openModalDialog,
  setOpenModalDialog,
  content
}: {
  children?: any
  setOpenModalDialog?: React.Dispatch<React.SetStateAction<boolean>>
  openModalDialog?: boolean
  content: {
    header: string
    subHeader: string
  }
}) => {
  const useNotificationProps = useModal()
  return (
    <>
      <NotificationModal useNotificationProps={useNotificationProps}>
        <div className="f-row-10 text-center flex-column aic pb-4">
          <div className="f-row-15 aic jcc">
            <AlertSVG />
            <h4 className="PageHeader m-0">{content?.header}</h4>
          </div>
          {content?.subHeader && (
            <div className="w-100 mt-2 mx-wdt-dialog">
              <p className="text-small color-label">{content?.subHeader}</p>
            </div>
          )}
          {children}
        </div>
      </NotificationModal>
    </>
  )
}

export const CustomBlank = ({
  children,
  openModalBlank,
  setOpenModalBlank,
  content,
  useNotificationProps
}: {
  children?: any
  setOpenModalBlank?: React.Dispatch<React.SetStateAction<boolean>>
  openModalBlank?: boolean
  content: {
    header: string
    subHeader: string
  }
  useNotificationProps: IUseNotificationModal
}) => {
  return (
    <>
      <NotificationModal useNotificationProps={useNotificationProps}>
        <div className="f-row-20 text-center flex-column aic pb-4">
          <div className="f-row-15 aic jcc">
            <AlertSVG />
            <h4 className="PageHeader m-0">{content?.header}</h4>
          </div>
          {content?.subHeader && (
            <div className="w-100 mt-2 mx-wdt-dialog">
              <p className="text-small color-label">{content?.subHeader}</p>
            </div>
          )}
          {children}
        </div>
      </NotificationModal>
    </>
  )
}

export const CustomNotification = ({
  children,
  openModal,
  setOpenModal,
  content,
  useNotificationProps
}: {
  children?: any
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
  openModal?: boolean
  content: {
    header: string
    subHeader: string
  }
  useNotificationProps: IUseNotificationModal
}) => {
  return (
    <>
      <NotificationModal useNotificationProps={useNotificationProps}>
        <div className="f-row-20 text-center flex-column aic pb-4">
          <NotificationSuccessSVG />
          <div className="f-row aic jcc pl-10">
            <h4 className="PageHeader m-0">{content?.header}</h4>
          </div>
          <div className="w-100 mt-2 mx-wdt-dialog">
            <p className="text-small color-label">{content?.subHeader}</p>
          </div>
          {children}
        </div>
      </NotificationModal>
    </>
  )
}

export interface ICTA {
  text: string
  buttonType: 'outlined' | 'bold' | 'disabled' | undefined
  action: () => void
  load?: boolean
}

interface IDW {
  modalContent?: {
    content: {
      header: string
      subHeader: string
    }
    contentDialog: {
      header: string
      subHeader: string
    }
  }
  cancelDialogCta?: ICTA
  conformDialogCta?: ICTA
  notificationCta?: ICTA
  setOpenModalDialog?: React.Dispatch<React.SetStateAction<boolean>>
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
  setOpenModalBlank?: React.Dispatch<React.SetStateAction<boolean>>
  openModal?: boolean
  openModalDialog?: boolean
  openModalBlank?: boolean
  blankContent?: JSX.Element
}

export const DialogActivity: React.FC<IDW> = ({
  modalContent,
  openModalDialog,
  setOpenModalDialog,
  cancelDialogCta,
  conformDialogCta,
  openModal,
  setOpenModal,
  notificationCta,
  openModalBlank,
  setOpenModalBlank,
  blankContent
}) => {
  const useNotificationProps = useModal()
  return (
    <>
      <CustomDialog
        content={modalContent?.contentDialog || { header: '', subHeader: '' }}
        openModalDialog={openModalDialog}
        setOpenModalDialog={setOpenModalDialog}
      >
        <div className="w-100 mx-wdt-dialog-400">
          <div className="grid-wrapper-47 gap-20">
            <TypeButton
              title={conformDialogCta?.text || 'Confirm'}
              buttonType={conformDialogCta?.buttonType || 'bold'}
              onClick={() => {
                conformDialogCta?.action?.()
              }}
              load={conformDialogCta?.load || false}
              className="w-100"
            />
            <TypeButton
              title={cancelDialogCta?.text || 'Cancel'}
              onClick={() => {
                cancelDialogCta?.action?.()
              }}
              buttonType={cancelDialogCta?.buttonType || 'outlined'}
              className="w-100"
              load={cancelDialogCta?.load || false}
            />
          </div>
        </div>
      </CustomDialog>

      <CustomNotification
        content={modalContent?.content || { header: '', subHeader: '' }}
        openModal={openModal}
        setOpenModal={setOpenModal}
        useNotificationProps={useNotificationProps}
      >
        <TypeButton
          title={notificationCta?.text || 'Done'}
          onClick={() => {
            notificationCta?.action?.()
          }}
          buttonType={notificationCta?.buttonType || 'bold'}
          load={notificationCta?.load || false}
          className="btm-wdt-175"
        />
      </CustomNotification>

      <CustomBlank
        content={modalContent?.content || { header: '', subHeader: '' }}
        openModalBlank={openModalBlank}
        setOpenModalBlank={setOpenModalBlank}
        useNotificationProps={useNotificationProps}
      >
        {blankContent}
      </CustomBlank>
    </>
  )
}

export interface IModalContent {
  contentDialog: {
    header: string
    subHeader: string
  }
  content: {
    header: string
    subHeader: string
  }
}

export const initModalContent = {
  contentDialog: {
    header: '',
    subHeader: ''
  },
  content: {
    header: '',
    subHeader: ''
  }
}

export interface IDialogState {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setOpenModalDialog: React.Dispatch<React.SetStateAction<boolean>>
  openModalDialog: boolean
  setLoad: React.Dispatch<React.SetStateAction<boolean>>
  load: boolean
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent>>
  modalContent: IModalContent
  setOpenModalBlank: React.Dispatch<React.SetStateAction<boolean>>
  openModalBlank: boolean
  setMessage: React.Dispatch<any>
  message: any
}

export const useCustomDialogState = (): IDialogState[] => {
  const [openModalDialog, setOpenModalDialog] = useState<boolean>(false)
  const [modalContent, setModalContent] =
    useState<IModalContent>(initModalContent)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openModalBlank, setOpenModalBlank] = useState<boolean>(false)
  const [load, setLoad] = useState<boolean>(false)
  const [message, setMessage] = useState<any>()

  return [
    {
      openModalDialog,
      openModal,
      setOpenModalDialog,
      setOpenModal,
      setLoad,
      load,
      setModalContent,
      modalContent,
      setOpenModalBlank,
      openModalBlank,
      setMessage,
      message
    }
  ]
}
