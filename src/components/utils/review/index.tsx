import { FC, useState } from 'react'
import { TypeButton, TypeSmallButton } from '../button'
import TextPrompt from '../text-prompt'
import styleh from './review.module.scss'
import { StarSVG } from '../svgs/f-awesome'

interface IClass {
  feedbackContainer: any
  input: any
  label: any
  ischecked: any
  shine: any
  starwidget: any
}

const { feedbackContainer, starwidget } = styleh as unknown as IClass

export const ratingScore = {
  ONE: 'Fair',
  TWO: 'Pass',
  THREE: 'Good',
  FOUR: 'Great',
  FIVE: 'Excellent'
}

interface IR {
  onHandleSubmit?: () => void
  loading?: boolean
  setRating: (rating: number) => void
  label?: string
  error?: string
  isClear?: boolean
  rating: number
}

const Review: FC<IR> = ({
  setRating,
  onHandleSubmit,
  loading,
  label,
  error,
  isClear,
  rating
}) => {
  const isSubmit = typeof onHandleSubmit === 'function'
  const star = [
    { id: 'rate-5', forHtml: 'rate-5' },
    { id: 'rate-4', forHtml: 'rate-4' },
    { id: 'rate-3', forHtml: 'rate-3' },
    { id: 'rate-2', forHtml: 'rate-2' },
    { id: 'rate-1', forHtml: 'rate-1' }
  ]
  const [allSelected, setAllSelected] = useState(false)

  const isChecked = (index: number) => {
    if (rating === 1) return index > 3
    if (rating === 2) return index > 2
    if (rating === 3) return index > 1
    if (rating === 4) return index > 0
    return !!rating
  }

  const getSubject = () => {
    if (rating === 1) return ratingScore.ONE
    if (rating === 2) return ratingScore.TWO
    if (rating === 3) return ratingScore.THREE
    if (rating === 4) return ratingScore.FOUR
    return rating ? ratingScore.FIVE : ''
  }

  const handleSubject = (index: number) => {
    switch (index) {
      case 0:
        setRating(5)
        break
      case 1:
        setRating(4)
        break
      case 2:
        setRating(3)
        break
      case 3:
        setRating(2)
        break
      case 4:
        setRating(1)
        break
      default:
        break
    }
  }

  const setStar = (index: number) => {
    setAllSelected(index === 0)
    handleSubject(index)
  }

  const clearRating = () => {
    setAllSelected(false)
    setRating(0)
  }

  return (
    <>
      {label && (
        <label className="input-label-component" htmlFor="rating">
          {label}
        </label>
      )}
      <div className="pb-1 text-center border-label rounded">
        <div className={`${feedbackContainer}`}>
          <div className={`${starwidget} gap-18`}>
            {star.map((item, index) => (
              <StarComponent
                forHtml={item.forHtml}
                id={item.id}
                key={item.id}
                click={() => setStar(index)}
                allSelected={allSelected}
                checked={isChecked(index)}
              />
            ))}
          </div>
        </div>
        {!!getSubject() && (
          <div className="text-center w-100">
            <p className="text-small color-label fml_blue">{getSubject()}</p>
          </div>
        )}
        {isClear && !!rating ? (
          <div className="f-row jcc pt-3">
            <TypeButton
              buttonShape="curve"
              buttonSize="small"
              buttonType="danger"
              title="Clear"
              onClick={clearRating}
            />
          </div>
        ) : null}
      </div>
      {isSubmit ? (
        <div className="w-100 my-2 f-row jcc">
          <TypeSmallButton
            title="Rate"
            load={loading}
            onClick={onHandleSubmit}
            buttonType="outlined"
          />
        </div>
      ) : null}
      {!error ? null : (
        <div className="mt-2">
          <TextPrompt prompt={error} status={!error} />
        </div>
      )}
    </>
  )
}

export default Review

interface ISC {
  forHtml: string | undefined
  id: string | undefined
  click: React.MouseEventHandler<HTMLInputElement> | undefined
  allSelected: boolean
  checked: boolean
}

const StarComponent: FC<ISC> = (props) => {
  const { id, forHtml, click, checked } = props

  return (
    <>
      <input
        type="radio"
        name="rate"
        id={id}
        style={{ display: 'none' }} // Hide the radio input
        onClick={click}
        defaultChecked={checked || false}
      />
      <label htmlFor={forHtml}>
        <StarSVG filled={checked} onClick={click} />
      </label>
    </>
  )
}
