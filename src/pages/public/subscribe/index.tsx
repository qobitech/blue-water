import { useEffect, useMemo, useState } from 'react'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import { useFormHook } from '../../../components/utils/hooks'
import * as yup from 'yup'
import { TypeButton, TypeSmallButton } from '../../../components/utils/button'
import { useCreateWaitingList } from '../../../api/waiting-list'
import RequestStatus from '../../../components/utils/request-status'
// import { ResponseComponent } from '../../../api'
import { _isMobile } from '../../../components/utils/helper'
import TermsAndConditions from '../../../components/utils/tandc'
import { HVC } from '../../../components/utils/hvc'
import { useSportsQuery } from '../../../api/sports'
import { useBookiesQuery } from '../../../api/bookies'
// lottie
import Lottie from 'react-lottie'
import football from '../../../assets/animation/17378-soccer-loading.json'
import BoxCheck from '../../../components/utils/box-check'
import { gallery } from '../../../assets'
import { CheckSVG, SettingsDarkSVG } from '../../../components/utils/svgs'
import { COLOR_YELLOW } from '../../../constants/global'

interface ICPM {
  setIsVisible: (visible: boolean) => void
  isVisible: boolean
}

const countData = [
  {
    id: 1,
    label: 'once',
    value: '1'
  },
  {
    id: 2,
    label: 'twice',
    value: '2'
  },
  {
    id: 3,
    label: 'three times',
    value: '3'
  },
  {
    id: 4,
    label: 'four times',
    value: '4'
  }
]

const schema = {
  email: yup.string().required('Email is required'),
  sports: yup.string().required('Sports is required'),
  bookies: yup.string().required('Bookies is required'),
  count: yup.string().required('Count is required'),
  interval: yup.string().required('Interval is required')
}

export interface ICreateWaitingList {
  email: string
  sports: string[]
  bookies: string[]
  interval: string
  count: string
}

const mobileOptions = {
  loop: true,
  autoplay: true,
  animationData: football,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const SubscribeModal: React.FC<ICPM> = ({ isVisible, setIsVisible }) => {
  const sportsQuery = useSportsQuery()
  const bookieQuery = useBookiesQuery()

  useEffect(() => {
    sportsQuery.mutate({})
    bookieQuery.mutate({})
  }, [])

  const [hookForm] = useFormHook<ICreateWaitingList>(schema)
  const [success, setSuccess] = useState<boolean>(false)
  const [isManagePreferences, setManagePreferences] = useState<boolean>(false)

  const isSportsBookmakerSelected = useMemo(() => {
    const bookiesNumber = hookForm.watch('bookies')?.length
    const sportsNumber = hookForm.watch('sports')?.length
    return !!bookiesNumber && !!sportsNumber
  }, [hookForm.watch('bookies'), hookForm.watch('sports')])

  const waitingListProps = useCreateWaitingList(() => {
    setSuccess(true)
  })

  const onClose = () => {
    hookForm.reset()
    setSuccess(false)
    setIsVisible(false)
  }

  if (!isVisible) return null

  const onSportsSelect = (value: string | number) => {
    let sports = hookForm.watch('sports') || []
    if (sports?.includes(value as string)) {
      sports = sports.filter((item) => item !== value)
    } else {
      sports.push(value as string)
    }
    hookForm.setValue('sports', sports)
  }

  const onBookieskCheckSelect = (value: string | number) => {
    let bookies = hookForm.watch('bookies') || []
    if (bookies.includes(value as string)) {
      bookies = bookies.filter((item) => item !== value)
    } else {
      bookies.push(value as string)
    }
    hookForm.setValue('bookies', bookies)
  }

  const fc: IFormComponent[] = [
    {
      id: 'email',
      component: 'input',
      hide: isManagePreferences,
      label: 'Email Address',
      placeHolder: 'Enter email address'
    },
    {
      id: 'count',
      label: 'How frequently would you like to receive tips each month?',
      component: 'select',
      hide: isManagePreferences,
      initOptions: { label: 'Click to select', value: '', id: 1 },
      optionData: countData
    }
  ]

  const count = parseInt(hookForm.watch('count') || '0')
  const discount = 7.5

  const price = count === 1 || !count ? 2 : count + 1

  const discountPrice = (price - (discount / 100) * price).toFixed(2)

  const handleSubmit = (data: ICreateWaitingList) => {}

  return (
    <>
      <div className="back-drop" />
      <div style={styles.modal} className="f-row shadow">
        <div style={styles.left} className="gap-63 jcc">
          <h1 className="ff-bold">
            &quot;You were born to win, but to be a winner, you must plan to
            win, prepare to win and expect to win&quot;
          </h1>
          <p className="text-little">~ ZIG ZIGLAR</p>
        </div>
        <div className="f-column-10 position-relative" style={styles.right}>
          <div className="position-absolute" style={{ right: 60 }}>
            <TypeSmallButton
              title="Close"
              close
              onClick={onClose}
              style={{ background: 'none' }}
            />
          </div>
          <HVC removeDOM view={!success} className="f-column-10">
            {/* header start */}
            {/* lottie */}
            <div className="lottie-ball">
              <Lottie options={mobileOptions} />
            </div>
            <div className="pb-3 f-column-10">
              <h3 className="m-0 ff-bold">
                Subscribe Monthly To Receive Bet Tips
              </h3>
              <p
                className="text-little m-0 rounded py-2 px-3"
                style={{ background: COLOR_YELLOW }}
              >
                Early Bird Offer - <b>Get a 7.5% discount</b>
              </p>
              <p className="text-tiny color-label m-0">
                <i>Offer expires September 30th</i>
              </p>
            </div>
            {/* header end */}
            {/* body start */}
            <HVC removeDOM view={!isManagePreferences} className="f-column-10">
              <form
                style={styles.checkboxContainer}
                className="f-column-20 pt-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <FormBuilder formComponent={fc} hookForm={hookForm} />
                <div
                  className={`text-right${
                    isSportsBookmakerSelected ? '' : 'pt-4 mt-auto '
                  }`}
                >
                  <TypeButton
                    title="Manage Sports and Bookmaker Preferences"
                    buttonType="outlined"
                    onClick={() => setManagePreferences((prev) => !prev)}
                    className="border-0 px-0"
                    icon={<SettingsDarkSVG />}
                  />
                </div>
              </form>
              {/* cta */}
              <HVC
                removeDOM
                view={isSportsBookmakerSelected}
                className="pt-3 f-column-12"
              >
                <TermsAndConditions />
                <div
                  style={styles.buttonContainer}
                  className=" jce mt-auto pt-4"
                >
                  <TypeButton
                    title={`Subscribe for $${discountPrice}/Month`}
                    innerTitle={`<p style="margin:0;">Subscribe for <span style="text-decoration:line-through;">$${price.toFixed(
                      2
                    )}</span>&nbsp;$${discountPrice}/Month</p>`}
                    buttonShape="curve"
                    buttonType="black"
                    buttonSize="large"
                    className="w-100"
                    load={waitingListProps.isLoading}
                    onClick={hookForm.handleSubmit(handleSubmit)}
                  />
                </div>
              </HVC>
            </HVC>
            {/* manage preferences */}
            <HVC removeDOM view={isManagePreferences} className="f-column-20">
              <BoxCheck
                onSelect={onSportsSelect}
                label="Sports Preference"
                options={sportsQuery.data.data.sports.map((i, index) => ({
                  label: i.title.toLowerCase(),
                  selected: hookForm
                    .watch('sports')
                    ?.includes(i.title.toLowerCase()),
                  value: i.title.toLowerCase()
                }))}
              />
              <BoxCheck
                onSelect={onBookieskCheckSelect}
                label="Bookmaker Preference"
                options={bookieQuery.data.data.bookies.map((i, index) => ({
                  label: i.title.toLowerCase(),
                  selected: hookForm
                    .watch('bookies')
                    ?.includes(i.title.toLowerCase()),
                  value: i.title.toLowerCase()
                }))}
              />
              <div className="pt-4 mt-auto">
                <TypeButton
                  title="Done"
                  onClick={() => setManagePreferences(false)}
                  buttonType="black"
                  icon={<CheckSVG color="white" />}
                />
              </div>
            </HVC>
            {/* body end */}
          </HVC>
          <HVC
            removeDOM
            view={success}
            className="f-column-70 text-center mt-4 pt-4"
          >
            <RequestStatus
              description={`Congratulations on joining the waiting list. you will be notified when we launch
          `}
              success
              lottie=""
              title={'Waiting List Joined Successfully'}
              loop={false}
            />
            <div>
              <TypeButton title="Close" onClick={onClose} buttonType="danger" />
            </div>
          </HVC>
        </div>
      </div>
    </>
  )
}

const styles = {
  modal: {
    position: 'fixed' as 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    zIndex: 1000,
    overflow: 'hidden',
    maxHeight: '98vh',
    maxWidth: '1200px',
    width: '100%',
    borderRadius: '15px'
  },
  left: {
    flexShrink: 0,
    width: '45%',
    background: '#222222',
    padding: '30px 50px 80px',
    display: _isMobile() ? 'none' : 'flex',
    flexDirection: 'column' as 'column',
    color: '#222222',
    backgroundImage: `url(${gallery.conclusion.src})`,
    objectFit: 'contain' as 'contain'
  },
  right: {
    flexShrink: 0,
    width: _isMobile() ? '100%' : '55%',
    textAlign: 'left' as 'left',
    padding: _isMobile() ? '50px 35px 80px' : '30px 73px 80px'
  },
  text: {
    margin: '0 0 10px'
  },
  checkboxContainer: {
    textAlign: 'left' as 'left',
    margin: '10px auto',
    width: '100%',
    overflow: 'auto',
    height: '100%',
    maxHeight: '85vh'
  },
  buttonContainer: {
    display: 'flex' as 'flex',
    justifyContent: 'flex-end' as 'flex-end',
    gap: '10px'
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px'
  }
}

export default SubscribeModal
