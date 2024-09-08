import { useEffect, useState } from 'react'
import Rating from '../../../components/utils/rating'
import {
  ArrowLeftSVG,
  ArrowRightSVG,
  QuoteSVG
} from '../../../components/utils/svgs'
import './style.scss'
import { useGetPublicFeedback } from '../../../api/feedback'
import { getUserRole, typeRoleId } from '../../../constants/global'
import { HVC } from '../../../components/utils/hvc'
import { _isMobile } from '../../../components/utils/helper'
import { Reveal } from './utils'
import { useNavigate } from 'react-router-dom'
import { TypeButton } from '../../../components/utils/button'
import { pageurl } from '../../../constants/pageurl'

const Testimonials = ({
  handleSubscription
}: {
  handleSubscription: () => void
}) => {
  //   const [xflow, setXflow] = useState<number>(0)

  const feedbackProps = useGetPublicFeedback()

  useEffect(() => {
    feedbackProps.mutate({})
  }, [])

  const feedbacks = feedbackProps.data?.data?.feedbacks || []

  const [nav, setNav] = useState(0) // Current navigation index

  const n = feedbacks?.length || 0

  // Function to calculate visible items based on the current nav index
  const getVisibleItems = (navIndex: number) => {
    const start = (navIndex - 1 + n) % n // Start index (navIndex - 1)

    // Create an array of indices
    const visibleItems = []

    if (_isMobile()) {
      // Mobile: show only one item
      visibleItems.push(navIndex)
    } else {
      // Desktop: show three items
      for (let i = 0; i < 3; i++) {
        visibleItems.push((start + i) % n)
      }
    }

    return visibleItems
  }

  // Get the items to display
  const visibleItems = getVisibleItems(nav)

  // Handlers for navigation buttons
  const handleNext = () => {
    setNav((nav + 1) % n) // Move to the next item
  }

  const handlePrev = () => {
    setNav((nav - 1 + n) % n) // Move to the previous item, wrapping around
  }

  return (
    <div className="position-relative pt-5 slider-container mt-3 container">
      <div
        className="f-row-20 position-absolute pr-5"
        style={{ top: 0, right: _isMobile() ? 0 : 140 }}
      >
        <div
          style={{
            borderRadius: '50px',
            width: '80px',
            height: '80px',
            background: '#02835b'
          }}
          className=" f-row aic jcc cursor-pointer shadow"
          onClick={handlePrev}
        >
          <ArrowLeftSVG fill="#fff" />
        </div>
        <div
          style={{ borderRadius: '50px', width: '80px', height: '80px' }}
          className="border-label f-row aic jcc bg-white cursor-pointer shadow-sm"
          onClick={handleNext}
        >
          <ArrowRightSVG />
        </div>
      </div>
      <div className="f-row ais jcc slider">
        {visibleItems?.map((i, index) => (
          <TestimonialItem
            feedback={feedbacks[i]?.feedback}
            rating={feedbacks[i]?.rating}
            role={
              feedbacks[i]?.user
                ? getUserRole(feedbacks[i]?.user?.role as typeRoleId)
                : 'visitor'
            }
            userName={feedbacks[i]?.user?.userName || 'user'}
            key={index}
            isSelected={index === (_isMobile() ? 0 : 1)}
            handleSubscription={handleSubscription}
          />
        ))}
      </div>
    </div>
  )
}

export default Testimonials

interface ITestimonialItem {
  feedback: string
  userName: string
  role: string
  rating: number
  isSelected: boolean
  handleSubscription: () => void
}

export const TestimonialItem: React.FC<ITestimonialItem> = ({
  feedback,
  userName,
  rating,
  role,
  isSelected,
  handleSubscription
}) => {
  const navigate = useNavigate()
  return (
    <div
      className="f-column-53"
      style={{
        maxWidth: !isSelected ? '400px' : '700px',
        width: _isMobile() ? '95%' : '100%',
        flexShrink: 0
      }}
    >
      <div
        className={`mx-auto p-2 text-left h-100 slider-item ${
          isSelected ? 'selected' : ''
        } f-column-${
          isSelected ? '33 rounded-25' : '20 rounded'
        } p-5 h-100 w-100 shadow-sm`}
        style={{
          background: isSelected ? '#0e5050' : '#fff'
          // background: isSelected
          //   ? 'linear-gradient(to right, #d8ecf2, #ffffff)'
          //   : '#fff'
        }}
      >
        {/* user */}
        {/* feedback */}
        <div className={`f-column-${isSelected ? '15' : '7'}`}>
          <QuoteSVG sm={!isSelected} />
          <div className={`f-column-${isSelected ? '17' : '7'} pl-3`}>
            <div className="text-left">
              <HVC removeDOM view={isSelected}>
                <h2
                  style={{
                    lineHeight: '2.5rem',
                    color: isSelected ? '#fff' : ''
                  }}
                  className="m-0"
                >
                  {feedback}
                </h2>
              </HVC>
              <HVC removeDOM view={!isSelected}>
                <h6 style={{ lineHeight: '2.3rem' }} className="m-0">
                  {feedback}
                </h6>
              </HVC>
            </div>
            <div>
              <Rating rating={rating} />
            </div>
          </div>
        </div>
        <div
          className={`text-left f-row-20 aic ${
            !isSelected ? 'text-little' : ''
          }`}
        >
          <p
            className="m-0 text-small"
            style={{
              color: isSelected ? '#fff' : ''
            }}
          >
            {userName}
          </p>
        </div>
      </div>
      <HVC removeDOM view={isSelected}>
        <Reveal className="cta-wrapper">
          <TypeButton
            buttonSize="large"
            buttonType="black"
            title="Subscribe for $2/Month"
            aria-label="Navigate to free bet tips page"
            onClick={handleSubscription}
          />
          <TypeButton
            buttonSize="large"
            buttonType="outlined"
            title="Explore free bet tips"
            aria-label="Navigate to free bet tips page"
            onClick={() => navigate(pageurl.BETTICKETS)}
          />
        </Reveal>
      </HVC>
    </div>
  )
}
