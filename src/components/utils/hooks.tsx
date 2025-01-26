import {
  FC,
  RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { PRIMARY_COLOR, PRIMARY_COLOR_LIGHT } from '../../constants/global'

import {
  FieldValues,
  Path,
  PathValue,
  useForm,
  UseFormReturn,
  UseFormSetError,
  UseFormSetValue
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import Lottie from 'react-lottie'
// import wave from '../../assets/animation/audio.json'

import axios from 'axios'
import { HVC, HVCLoad } from './hvc'
import TabToggler, { IUseTabToggler } from './tab-toggler'
import { isAdmin } from '../../constants/pageurl'
import { SeparatorComponent } from './reusable'
import {
  LogoNoWaveSVG,
  PreviewSVG,
  RefreshSVG,
  RemoveSVG,
  UploadSVG,
  WaveSVG
} from './svgs'
import { formatBytes } from './helper'
import { TypeButton } from './button'
import TextPrompt from './text-prompt'
import { IOptionsData, TypeSelect } from './select'
import moment from 'moment'

export const useLocationHook = () => {
  const location = useLocation()
  const { search } = location
  const values = queryString.parse(search)
  const { p } = values || {}
  return [p]
}

export const useQueryValuesHook = () => {
  const location = useLocation()
  const { search } = location
  const values = queryString.parse(search) as { [key: string]: string }
  return values
}

type dragType = React.DragEvent<HTMLInputElement>

export const useUploadFileHook = <T extends HTMLElement, S extends FieldValues>(
  setError: UseFormSetError<S>,
  setValue: UseFormSetValue<S>,
  fileName: Path<S>,
  fileType: string,
  fileSize: number
): [
  onDragEnter: (e: dragType) => void,
  onDragLeave: (e: dragType) => void,
  onDrop: (e: dragType) => void,
  onFileChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void,
  imgRef: React.RefObject<T>,
  isFileAdd: boolean,
  addedFileName: string
] => {
  const imgRef = useRef<T>(null)

  const [isFileAdd, setIsFileAdd] = useState<boolean>(false)
  const [addedFileName, setAddedFileName] = useState<string>('')

  const onDragEnter = (e: dragType) => {
    e.preventDefault()
    e.stopPropagation()
    if (imgRef.current) {
      imgRef.current.style.backgroundColor = PRIMARY_COLOR_LIGHT
      setIsFileAdd(true)
    }
  }

  const onDragLeave = (e: dragType) => {
    e.preventDefault()
    e.stopPropagation()
    if (imgRef.current) {
      imgRef.current.style.backgroundColor = '#fff'
      setIsFileAdd(false)
    }
  }

  const onDrop = (e: dragType) => {
    const errorMessage = verifyInputFile(e?.dataTransfer?.files[0])
    setError(fileName, { message: errorMessage })
    if (!errorMessage)
      setValue(fileName, e?.dataTransfer?.files[0] as PathValue<S, Path<S>>)
    if (imgRef.current) {
      imgRef.current.style.backgroundColor = '#fff'
      setIsFileAdd(false)
    }
  }

  const onFileChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target
    if (files) {
      const errorMessage = verifyInputFile(files[0])
      setError(fileName, { message: errorMessage })
      if (!errorMessage) setValue(fileName, files[0] as PathValue<S, Path<S>>)
    }
  }

  const verifyInputFile = (file: File) => {
    const { type, size, name } = file
    if (!type.includes(fileType)) {
      return `Must be ${fileType}`
    }

    if (size > fileSize) {
      return 'File size not allowed'
    }
    setAddedFileName(name)
  }

  return [
    onDragEnter,
    onDragLeave,
    onDrop,
    onFileChange,
    imgRef,
    isFileAdd,
    addedFileName
  ]
}

export const useFormHook = <T extends {}>(objSchema: {}): [
  UseFormReturn<T, any>
] => {
  const schema = yup.object().shape(objSchema)
  const formMethods = useForm<T>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  return [formMethods]
}

export const Loader = ({ loader }: { loader: boolean }) => {
  return (
    <>
      {loader && (
        <div
          style={{
            position: 'fixed',
            zIndex: 6,
            background: '#fff',
            top: 0,
            left: 0,
            opacity: 0.9,
            color: PRIMARY_COLOR
          }}
          className="w-100 h-100 f-row aic jcc"
        >
          <div
            style={{ maxWidth: '150px', width: '90%' }}
            className="mx-auto text-center f-column aic"
          >
            <LogoAnimated />
          </div>
        </div>
      )}
    </>
  )
}

export const LogoAnimated = () => {
  return (
    <div className="mx-auto text-center position-relative hw-mx">
      <div
        className="m-auto hw-mx position-absolute"
        style={{ top: '-33px', left: '-2.1px' }}
      >
        <WaveSVG />
      </div>
      <div className="svg-wrapper hw-mx">
        <LogoNoWaveSVG />
      </div>
    </div>
  )
}

export const Loader2 = ({ loader }: { loader: boolean }) => {
  return <HVCLoad removeDOM load={loader} />
}

export const useToggler = (defaultCategory: string) => {
  const [category, setCategory] = useState<string>(defaultCategory)

  const handleCategory = (category: string) => {
    setCategory(category)
  }

  return { category, handleCategory }
}

export interface IModalProps {
  openModal: boolean
  title: string
  url: string
  description: string
  closeFunction: () => void
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setUrl: React.Dispatch<React.SetStateAction<string>>
  medium: boolean
  size?: 'medium' | 'wide' | undefined
}

export const useShare = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const modalProps: IModalProps = {
    openModal: modal,
    title,
    url,
    description,
    setDescription,
    setTitle,
    setUrl,
    closeFunction: () => {
      setModal(false)
    },
    setOpenModal: setModal,
    medium: true,
    size: 'medium'
  }
  return { modalProps }
}

export interface ICopyProps {
  copySuccess: boolean
  copy: (text: string) => void
  setAction: React.Dispatch<React.SetStateAction<string>>
  action: string
}

export const useCopy = (): ICopyProps => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(() => false)
        setAction('')
      }, 700)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [copySuccess])

  function copyToClipboard(text: string) {
    // Create a new ClipboardItem object with the text
    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([text], { type: 'text/plain' })
    })

    // Use the Clipboard API to write the ClipboardItem to the clipboard
    navigator.clipboard.write([clipboardItem]).then(
      () => {
        setCopySuccess(true)
      },
      () => {
        setCopySuccess(false)
      }
    )
  }

  return {
    copySuccess,
    copy: copyToClipboard,
    setAction,
    action
  }
}

export const useOnLoadImages = (ref: RefObject<HTMLElement>) => {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (!ref?.current) return
    const isBackgroundImg = ref.current.style.backgroundImage.length !== 0
    const updateStatus = (images: HTMLImageElement[]) => {
      setStatus(
        images.map((image) => image.complete).every((item) => item) &&
          isBackgroundImg
      )
    }

    const imagesLoaded = Array.from(ref.current.querySelectorAll('img'))

    if (imagesLoaded.length === 0 && !isBackgroundImg) {
      setStatus(true)
      return
    }

    imagesLoaded.forEach((image) => {
      image.addEventListener('load', () => updateStatus(imagesLoaded), {
        once: true
      })
      image.addEventListener('error', () => updateStatus(imagesLoaded), {
        once: true
      })
    })
  }, [ref])

  return status
}

export const reducer = <T extends {}, A extends keyof T>(
  state: T,
  action: { type: A; payload: any }
) => {
  if (action.type in state) {
    if (state[action.type] === action.payload) return state
    return { ...state, [action.type]: action.payload }
  }
  return state
}

export const useStateHook = <
  T extends { [key: string]: any },
  A extends keyof T
>(
  initState: T
): [T, (type: A, payload: any) => void] => {
  const [state, dispatch] = useReducer(reducer<T, A>, initState)

  const updateState = (type: A, payload: any) => {
    dispatch({ type, payload })
  }

  return [state, updateState]
}

export const useInfiniteScroll = (
  load: boolean,
  hasmore: boolean,
  getData?: () => void
): [elementRef: (node: any) => void] => {
  const observer = useRef<IntersectionObserver | null>(null)
  const elementRef = useCallback(
    (node: any) => {
      if (load) return
      if (observer?.current) observer?.current?.disconnect?.()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasmore) {
          getData?.()
        }
      })
      if (node) observer?.current?.observe(node)
    },
    [load, getData, hasmore]
  )

  useEffect(() => {
    return () => {
      observer?.current?.disconnect()
    }
  }, [])

  return [elementRef]
}

export const useCheckImageLoading = (url: string) => {
  const [loading, setLoading] = useState<boolean>(true)
  const img = new Image()

  img.onload = () => {
    setLoading(false)
  }

  img.onerror = () => {
    console.error('Error loading image')
  }

  img.src = url

  return loading
}

export interface IImgSize {
  width: number
  height: number
}

// Function to get image dimensions
const getImageSize = async (url: string): Promise<IImgSize> => {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject
    img.src = url
  })
}

// Function to get image file size
const getFileSize = async (url: string): Promise<number | null> => {
  try {
    const response = await axios.head(url)
    const contentLength = response.headers['content-length']
    return contentLength ? parseInt(contentLength, 10) : null
  } catch (error) {
    console.error('Error getting file size:', error)
    return null
  }
}

export const useImageSize = (
  imageUrl: string
): IImgSize & { size: number | null } => {
  const [imageProps, setImageProps] = useState<
    IImgSize & { size: number | null }
  >({ width: 0, height: 0, size: 0 })

  useEffect(() => {
    getImageSize(imageUrl)
      .then((size) => {
        setImageProps((prev) => ({
          ...prev,
          width: size.width,
          height: size.height
        }))
      })
      .catch((error) => {
        console.error('Error loading image:', error)
      })

    getFileSize(imageUrl)
      .then((size) => {
        setImageProps((prev) => ({
          ...prev,
          size
        }))
      })
      .catch((error) => {
        console.error('Error getting file size:', error)
      })
  }, [imageUrl])

  return imageProps
}

interface IHTS {
  isView: boolean
  eventNumber?: number
  tabTogglerProps: IUseTabToggler
  load?: boolean
  onRefresh?: () => void
}

export const HeaderToggleSection: FC<IHTS> = ({
  isView,
  eventNumber,
  tabTogglerProps,
  load,
  onRefresh
}) => {
  const isMgmt = isAdmin
  const isRefresh = typeof onRefresh === 'function'
  return (
    <>
      {isView ? (
        <div className="f-row-30 aic jcs" style={{ height: '45px' }}>
          {eventNumber ? (
            <p className="text-small m-0 color-label">{eventNumber} Events</p>
          ) : null}
          {isMgmt ? (
            <>
              <SeparatorComponent />
              <TabToggler tabTogglerProps={tabTogglerProps} />
            </>
          ) : null}
          <HVCLoad
            removeDOM
            view={isRefresh}
            load={load}
            className="mx-wh-fit cursor-pointer"
            onClick={onRefresh}
          >
            <RefreshSVG />
          </HVCLoad>
        </div>
      ) : null}
    </>
  )
}

export interface IMUC {
  title: string
  onUpload: (file: File) => void
  url?: string
  fileName: string
  load: boolean
  preview?: boolean
  onPreview?: (url: string) => void
}

export const MediaUploadComponent: FC<IMUC> = ({
  title,
  onUpload,
  url,
  fileName,
  load,
  preview,
  onPreview
}) => {
  const imgSize = useImageSize(url || '')
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')
  const validateFile = (file: File) => {
    setFileError('')
    setFile(null)
    // is image
    if (!file.type.includes('image')) {
      setFileError('Use png / jpg / jpeg format for this activity.')
      return false
    }
    if (file.size > 2000000) {
      setFileError('File size should be 2mb or less')
      return false
    }
    return true
  }
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target
    if (files?.length) {
      if (validateFile(files[0])) {
        setFile(files[0])
      }
    }
  }

  const onSave = () => {
    if (file) onUpload(file)
  }

  const fileUrl = file ? URL.createObjectURL(file) : ''

  return (
    <div className="w-100">
      <HVC
        removeDOM
        view={!file && !url}
        className="position-relative rounded f-row aic jcc w-100 mb-1"
        style={{ border: '1px dotted #d5d5d5' }}
      >
        <input
          type="file"
          className="position-absolute w-100 h-100 border-0 w-100 cursor-pointer"
          onChange={handleOnChange}
          ref={inputRef}
        />
        <div className="f-row-10 aic jcc py-4 w-100 h-100">
          <UploadSVG />
          <p className="m-0 text-small">{title}</p>
        </div>
      </HVC>
      <HVC removeDOM view={!!url || !!file}>
        <div
          className="w-100 rounded position-relative"
          style={{ height: '300px', overflow: 'hidden' }}
        >
          <img
            src={fileUrl || url}
            alt="upload file"
            style={{ objectFit: 'contain' }}
            className="w-100 h-100"
          />
          <input
            type="file"
            className="position-absolute w-100 h-100 border-0 w-100 cursor-pointer"
            onChange={handleOnChange}
            style={{ zIndex: 2, left: 0 }}
            ref={inputRef}
          />
          <div
            className="position-absolute w-100 h-100 f-row aic jcc"
            style={{
              zIndex: 1,
              left: 0,
              top: 0,
              background: 'rgba(0,0,0,0.2)'
            }}
          >
            <UploadSVG color="#fff" />
          </div>
        </div>
        <HVC removeDOM view={!!url} className="f-row-20 aic pt-3">
          <p className="text-tiny m-0 color-label">
            {imgSize.width} &nbsp;&nbsp;X&nbsp;&nbsp; {imgSize.height}
          </p>
          <SeparatorComponent />
          <p className="text-tiny m-0 color-label">
            {formatBytes(imgSize.size || 0)}
          </p>
        </HVC>
        <HVC removeDOM view={!!file} className="w-100 h-100 pt-4">
          <TypeButton
            title={`Upload ${fileName}`}
            buttonSize="large"
            buttonShape="curve"
            onClick={onSave}
            load={load}
            className="w-100"
          />
        </HVC>
        <div className="text-center py-3 f-row-30 aic jcc">
          <p className="m-0 text-tiny color-label">{fileName}</p>
          <HVC
            removeDOM
            view={preview || false}
            className="text-center py-3 f-row-30 aic jcc"
          >
            <SeparatorComponent />
            <div
              className="f-row-10 aic jcc mx-wh-fit cursor-pointer"
              onClick={() => onPreview?.(url || fileUrl)}
            >
              <p className="m-0 text-tiny color-label">Preview</p>
              <PreviewSVG />
            </div>
          </HVC>
        </div>
      </HVC>
      {fileError ? <TextPrompt prompt={fileError} status={false} /> : null}
    </div>
  )
}

export interface IPillData {
  label: string
  filterValue: string
}

interface IPill {
  pills: IPillData[]
  filterValues: string[]
  onClickPill: (filterValue: string) => void
}

export const PillComponent: FC<IPill> = ({
  pills,
  filterValues,
  onClickPill
}) => {
  const isSelected = (value: string) =>
    filterValues.includes(value) ? 'selected' : ''

  return (
    <div className="f-row-13 flex-wrap">
      {pills.map((pill, index) => (
        <div
          key={index}
          className={`game-event-pill ${isSelected(pill.filterValue)}`}
          onClick={() => onClickPill(pill.filterValue)}
        >
          <p className="text-tiny m-0">{pill.label}</p>
        </div>
      ))}
    </div>
  )
}

export interface IFilterComponent {
  optionsDataRepository: Array<{ id: string; optionsData: IOptionsData[] }>
  optionsDataManager: IOptionsData[]
  onFilterChange: (id: string, value: string) => void
}

export const FilterComponent: FC<IFilterComponent> = ({
  optionsDataRepository,
  optionsDataManager,
  onFilterChange
}) => {
  const [optionsDataId, setOptionsDataId] = useState<string | null>(null)
  const [optionsData, setOptionsData] = useState<IOptionsData[] | null>(null)
  const [optionsDataValue, setOptionsDataValue] = useState<string>('')
  const [optionsDataKey, setOptionsDataKey] = useState<string>('')
  const getOptionsData = (id: string) => {
    return optionsDataRepository.filter((i) => i.id === id)[0].optionsData
  }
  const onChangeFilterOption = ({
    target
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    setOptionsDataKey(value)
    setOptionsData(!value ? null : getOptionsData(value))
    setOptionsDataId(!value ? null : value)
    setOptionsDataValue('')
    onFilterChange(value, '')
  }

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    onFilterChange(optionsDataId || '', value)
    setOptionsDataValue(value)
  }

  const onReset = () => {
    setOptionsDataId(null)
    setOptionsData(null)
    setOptionsDataValue('')
    onFilterChange('', '')
    setOptionsDataKey('')
  }

  return (
    <div className="f-row-7 aic">
      <TypeSelect
        initoption={{ label: 'Filter by', value: '' }}
        style={{ height: '30px', fontSize: '11px' }}
        optionsdata={optionsDataManager}
        onChange={onChangeFilterOption}
        value={optionsDataKey}
      />
      {optionsData ? (
        <TypeSelect
          initoption={{ label: 'Select', value: '' }}
          style={{ height: '30px', fontSize: '11px' }}
          optionsdata={optionsData}
          onChange={handleOnChange}
          value={optionsDataValue}
        />
      ) : null}
      {optionsData && optionsDataValue ? (
        <div className="hw-mx cursor-pointer" onClick={onReset}>
          <RemoveSVG color="#f56e9d" />
        </div>
      ) : null}
    </div>
  )
}

export const getShareUserName = (
  ...data: Array<{ key: string; value: string }>
) => {
  const filteredData = data.filter((i) => i.value)
  return filteredData.reduce((t, i, index) => {
    const coma = filteredData.length - 1 === index ? '' : ','
    t += `@${i.value} on ${i.key} ${coma}`
    return t
  }, '')
}

export const getGameTime = (gameDate: string) => {
  const time = moment(gameDate).fromNow()
  const isPast = time.includes('ago')
  const pre = isPast ? 'Started' : 'Starts'
  return `${pre} ${time}`
}

export const isGamePast = (gameDate: string) => {
  const time = moment(gameDate).fromNow()
  return time.includes('ago')
}

export const useCountDown = (startTime?: number): number => {
  const [timeLeft, setTimeLeft] = useState<number>(startTime || 10)

  const calculateTimeLeft = () => {
    if (timeLeft > 0) {
      return timeLeft - 1
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return timeLeft
}
