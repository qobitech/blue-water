import { useRef } from 'react'
import './AutoSlider.css'

interface AutoSliderProps {
  slides: Array<{ slide: JSX.Element; title: string }>
}

const AutoSlider: React.FC<AutoSliderProps> = ({ slides }) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  return (
    <div className="slider-wrapper pt-5 pb-3 border-bottom">
      <div className="slider-content" ref={sliderRef}>
        {slides.map((slide, index) => (
          <div
            className="slide text-center f-column-10 align-items-center"
            key={index}
          >
            {slide.slide}
            <p className="text-little color-brand ff-bold">{slide.title}</p>
          </div>
        ))}
        {slides.map((slide, index) => (
          <div
            className="slide text-center f-column-10 align-items-center"
            key={index + slides.length}
          >
            {slide.slide}
            <p className="text-little color-brand ff-bold">{slide.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AutoSlider
