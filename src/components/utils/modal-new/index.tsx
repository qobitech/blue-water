/* eslint-disable @typescript-eslint/no-base-to-string */
import { useState } from 'react'
import styleh from './style.module.scss'

interface IModal {
  children?: any
  openModal: boolean
  // eslint-disable-next-line no-unused-vars
  handleModal: (title?: string) => void
  onClose?: () => void
  title: string
}

export interface IUM {
  title: string
  // eslint-disable-next-line no-unused-vars
  handleModal: (title?: string) => void
  // eslint-disable-next-line no-unused-vars
  handleResponse: (title: string) => void
  openModal: boolean
  response: string
}

export const useModal = (): IUM => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const handleResponse = (response: string) => {
    setResponse(response)
  }
  const handleModal = (title?: string) => {
    setOpenModal(!openModal)
    setTitle(title || '')
  }

  return {
    title,
    handleModal,
    openModal,
    response,
    handleResponse
  }
}

const ModalCustom: React.FC<IModal> = ({
  children,
  openModal,
  handleModal,
  title,
  onClose
}) => {
  const {
    modal,
    open,
    modalmain,
    modalheader,
    title: modaltitle,
    close,
    modalbody
  } = styleh as unknown as {
    modal: string
    open: string
    modalmain: string
    modalheader: string
    title: string
    close: string
    modalbody: string
  }
  return (
    <div className={`${modal} ${openModal ? open : ''}`}>
      <div className={`${modalmain} ${openModal ? open : ''}`}>
        <div className={modalheader}>
          <p className={modaltitle}>{title}</p>
          <p
            className={close}
            onClick={() => {
              onClose?.()
              handleModal()
            }}
          >
            Close
          </p>
        </div>
        <div className={modalbody}>{children}</div>
      </div>
    </div>
  )
}

export default ModalCustom
