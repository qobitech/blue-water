import { useEffect, useState } from 'react'
import { getUserCookies, setUserCookies } from '../../../constants/global'
import { TypeButton } from '../../../components/utils/button'

interface ICPM {
  setIsVisible: (visible: boolean) => void
  isVisible: boolean
}

interface IConsent {
  essential: boolean
  analytics: boolean
  userdata: boolean
  personalization: boolean
  marketing: boolean
}

const CookiePreferencesModal: React.FC<ICPM> = ({
  isVisible,
  setIsVisible
}) => {
  const [preferences, setPreferences] = useState<IConsent>({
    essential: true, // Essential cookies are typically always on
    analytics: false,
    marketing: false,
    personalization: false,
    userdata: false
  })

  const handleAcceptPreferences = (): void => {
    setUserCookies(preferences)
    window.gtag('consent', 'update', {
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_user_data: preferences.userdata ? 'granted' : 'denied',
      ad_personalization: preferences.personalization ? 'granted' : 'denied',
      wait_for_update: 500
    })
    setIsVisible(false)
  }

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, checked } = event.target
    setPreferences((prev) => ({ ...prev, [name]: checked }))
  }

  useEffect(() => {
    const consent = getUserCookies()
    if (consent) {
      const userConsent: IConsent = JSON.parse(consent)
      setPreferences(userConsent)
    }
  }, [])

  if (!isVisible) return null

  const onClose = () => {
    handleAcceptPreferences()
    setIsVisible(false)
  }

  return (
    <>
      <div className="back-drop" />
      <div style={styles.modal} className="f-column-10 py-3 shadow">
        <h2>Manage Cookie Preferences</h2>
        <div style={styles.checkboxContainer} className="f-column-23 py-2">
          <div className="border-label rounded p-3 f-column-7">
            <label className="f-row-7">
              <input
                type="checkbox"
                name="essential"
                checked={preferences.essential}
                readOnly
              />
              Essential Cookies (required)
            </label>
            <div>
              <p className="color-label text-little m-0">
                These cookies are necessary for the basic functionality of the
                website, enabling essential features such as page navigation and
                access to secure areas. Without these cookies, the website
                cannot function properly.
              </p>
            </div>
          </div>
          <div className="border-label rounded p-3 f-column-7">
            <label className="f-row-7">
              <input
                type="checkbox"
                name="analytics"
                checked={preferences.analytics}
                onChange={handleCheckboxChange}
              />
              Analytics Cookies
            </label>
            <div>
              <p className="color-label text-little m-0">
                Analytics cookies collect information about how visitors use the
                website, helping us understand user behavior and improve site
                performance. They track metrics such as page visits, time spent
                on the site, and user interactions.
              </p>
            </div>
          </div>
          <div className="border-label rounded p-3 f-column-7">
            <label className="f-row-7">
              <input
                type="checkbox"
                name="marketing"
                checked={preferences.marketing}
                onChange={handleCheckboxChange}
              />
              Marketing Cookies
            </label>
            <div>
              <p className="color-label text-little m-0">
                Marketing cookies are used to deliver advertisements that are
                relevant to you and your interests. They help us measure the
                effectiveness of our marketing campaigns and provide insights
                into user engagement with promotional content.
              </p>
            </div>
          </div>
          <div className="border-label rounded p-3 f-column-7">
            <label className="f-row-7">
              <input
                type="checkbox"
                name="personalization"
                checked={preferences.personalization}
                onChange={handleCheckboxChange}
              />
              Tailored Content Cookies
            </label>
            <div>
              <p className="color-label text-little m-0">
                Tailored content cookies allow us to personalize your experience
                by delivering content that matches your preferences and
                interests. They help create a more engaging and relevant
                browsing experience based on your interactions.
              </p>
            </div>
          </div>
          <div className="border-label rounded p-3 f-column-7">
            <label className="f-row-7">
              <input
                type="checkbox"
                name="userdata"
                checked={preferences.userdata}
                onChange={handleCheckboxChange}
              />
              User Data Cookies
            </label>
            <div>
              <p className="color-label text-little m-0">
                User data cookies store information about your preferences and
                interactions with the website. They help us provide a customized
                experience by remembering your settings and choices, making your
                visits more seamless and enjoyable.
              </p>
            </div>
          </div>
        </div>
        <div style={styles.buttonContainer}>
          <TypeButton
            title="Save Preferences"
            onClick={handleAcceptPreferences}
            buttonShape="curve"
          />
          <TypeButton
            title="Close"
            buttonType="danger"
            buttonShape="curve"
            onClick={onClose}
          />
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
    padding: '20px',
    zIndex: 1000,
    textAlign: 'center' as 'center',
    height: '95vh',
    maxWidth: '1000px',
    width: '100%',
    borderRadius: '15px'
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
    justifyContent: 'center' as 'center',
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

export default CookiePreferencesModal
