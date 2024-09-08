import { StarSVG } from '../svgs/f-awesome'

type typePosition = 'left' | 'right' | 'center'

const Rating = ({
  rating,
  position
}: {
  rating: number
  position?: typePosition
}) => {
  return (
    <div
      className={`f-row-20 ${
        position === 'right' ? 'jce' : position === 'center' ? 'jcc' : ''
      }`}
    >
      {new Array(5).fill('').map((i, index) => (
        <StarSVG filled={index + 1 <= rating} onClick="" key={index} />
      ))}
    </div>
  )
}

export default Rating
