import { useEffect, useState, FC } from 'react'
import { getUserCookies, setUserCookies } from '../../../constants/global'

const ConsentBanner: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [showPreferences, setShowPreferences] = useState<boolean>(false)
  const [preferences, setPreferences] = useState<{
    essential: boolean
    analytics: boolean
    userdata: boolean
    personalization: boolean
    marketing: boolean
  }>({
    essential: true, // Essential cookies are typically always on
    analytics: false,
    marketing: false,
    personalization: false,
    userdata: false
  })

  useEffect(() => {
    const consent = getUserCookies()
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = (): void => {
    setPreferences({
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
      userdata: true
    })
    setUserCookies(preferences)
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      wait_for_update: 500
    })
    setIsVisible(false)
  }

  const handleShowPreferences = (): void => {
    setShowPreferences(true)
  }

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

  if (!isVisible) return null

  return (
    <div style={styles.banner} className="f-column-10 py-4">
      <p style={styles.text}>
        We use cookies to enhance your experience. Please choose your
        preferences:
      </p>
      {showPreferences ? (
        <div
          style={styles.checkboxContainer}
          className="grid-wrapper-45 gap-33 aic py-4"
        >
          <label className="f-row-7">
            <input
              type="checkbox"
              name="essential"
              checked={preferences.essential}
              readOnly
            />
            Essential Cookies (required)
          </label>
          <label className="f-row-7">
            <input
              type="checkbox"
              name="analytics"
              checked={preferences.analytics}
              onChange={handleCheckboxChange}
            />
            Analytics Cookies
          </label>
          <label className="f-row-7">
            <input
              type="checkbox"
              name="marketing"
              checked={preferences.marketing}
              onChange={handleCheckboxChange}
            />
            Marketing Cookies
          </label>
          <label className="f-row-7">
            <input
              type="checkbox"
              name="personalization"
              checked={preferences.personalization}
              onChange={handleCheckboxChange}
            />
            Tailored Content Cookies
          </label>
          <label className="f-row-7">
            <input
              type="checkbox"
              name="userdata"
              checked={preferences.userdata}
              onChange={handleCheckboxChange}
            />
            User Data Cookies
          </label>
        </div>
      ) : null}
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={handleAcceptAll}
          aria-label="accept all cookies"
        >
          Accept All
        </button>
        <button
          style={styles.button}
          onClick={handleShowPreferences}
          aria-label="customize cookie preferences"
        >
          Customize Preferences
        </button>
        {showPreferences && (
          <button
            style={styles.button}
            onClick={handleAcceptPreferences}
            aria-label="save cookies"
          >
            Save Preferences
          </button>
        )}
      </div>
    </div>
  )
}

const styles = {
  banner: {
    position: 'fixed' as 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: '#141414',
    color: '#fff',
    padding: '10px',
    textAlign: 'center' as 'center',
    zIndex: 1000
  },
  text: {
    margin: '0 0 10px'
  },
  checkboxContainer: {
    textAlign: 'left' as 'left',
    margin: '10px auto',
    maxWidth: '500px'
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

export default ConsentBanner
