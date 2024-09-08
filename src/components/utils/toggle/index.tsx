import { useState, useEffect } from 'react'
import './toggle.scss'

interface IToggleButton {
  toggleTextOff?: string
  toggleTextOn?: string
  isActive?: boolean
  handleClick: (status: boolean) => void
  title?: string
  isLoad?: boolean
}

export const ToggleButton: React.FC<IToggleButton> = ({
  toggleTextOff,
  toggleTextOn,
  isActive,
  handleClick,
  title,
  isLoad
}) => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    setToggle(isActive || false)
    // eslint-disable-next-line
  }, [isActive])

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setToggle(!toggle)
    handleClick(!toggle)
  }

  return (
    <div className="f-column aic jcc">
      {title && title.length > 0 && (
        <p
          className="mb-2"
          style={{
            color: !toggle ? '#c1c1c1' : 'var(--fml-blue)',
            transition: '.4s ease',
            fontSize: '13px'
          }}
        >
          {title}
        </p>
      )}
      <div className="f-row aic jcc" style={{ width: 'max-content' }}>
        <div className="ToggleTextContainer">
          <p className={`ToggleText ${!toggle ? 'isactive' : ''}`}>
            {toggleTextOff || 'Off'}
          </p>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleOnChange}
            checked={toggle || false}
            disabled={isLoad}
          />
          <span className="slider" />
        </label>
        <div className="ToggleTextContainer">
          <p className={`ToggleText ${toggle ? 'isactive' : ''}`}>
            {toggleTextOn || 'On'}
          </p>
        </div>
      </div>
    </div>
  )
}
