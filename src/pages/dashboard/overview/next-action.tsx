import { memo, useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { TypeButton } from '../../../components/utils/button'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { pageurl } from '../../../constants/pageurl'
import {
  AchievementsRewardsSVG,
  CommunitySVG,
  ExploreSVG,
  FeedbackMGSVG,
  LeadershipBoardSVG,
  TipMenuSVG,
  UserSVG
} from '../../../components/utils/svgs'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useUserTaskQuery } from '../../../api/user'
import { SeparatorComponent } from '../../../components/utils/reusable'
import { getUserData } from '../../../constants/global'
import { HVC } from '../../../components/utils/hvc'
import {
  LeftAngleSVG,
  RightAngleSVG
} from '../../../components/utils/svgs/f-awesome'
import Skeleton from '../../../components/utils/skeleton'
import { useGlobalContext } from '../../../components/layout/context'

// Define the structure of each action item

interface IActionArray {
  title: string
  subTitle: string
  action: () => void
  priority: 1 | 2
  role: 'buyer' | 'seller' | 'all'
  class: string
  completed: boolean
  icon: JSX.Element
}

// Define the structure of the return value of useNextAction hook
interface IUseNextAction {
  action: IActionArray
  handleNext: () => void
  handlePrev: () => void
  selectedIndex: number
  isNav: boolean
}

// Custom hook to manage the next action logic
const useNextAction = (initialActions: IActionArray[]): IUseNextAction => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  // filter out the actions that are not completed
  const filteredArray = useMemo(
    () => initialActions.filter((i) => !i.completed),
    [initialActions]
  )

  // Handle the previous action
  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      const isThreshold = prev === 0
      const lastIndex = filteredArray.length - 1
      return Math.max(0, isThreshold ? lastIndex : prev - 1)
    })
  }, [filteredArray.length])

  // Handle the next action
  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      const isThreshold = prev === filteredArray.length - 1
      return Math.min(filteredArray.length - 1, isThreshold ? 0 : prev + 1)
    })
  }, [filteredArray.length])

  // memoize the current action
  const action = useMemo(
    () => filteredArray[selectedIndex],
    [filteredArray, selectedIndex]
  )

  const isNav = useMemo(() => filteredArray.length > 1, [filteredArray.length])

  return {
    action,
    handleNext,
    handlePrev,
    selectedIndex,
    isNav
  }
}

// Main components to display the next action
const NextAction = () => {
  const { rsProps, global } = useGlobalContext() // Access global context
  const navigate = useNavigate()

  const userTasksProps = useUserTaskQuery()

  // Memoize user tasks
  const userTasks = useMemo(
    () => global.state.getUserTasks.data.userTasks || [],
    [global.state.getUserTasks.data]
  )

  // Fetch user tasks if not available
  useEffect(() => {
    if (!userTasks.length) userTasksProps.mutate({})
  }, [])

  // Check if a task is completed
  const isTaskCompleted = useCallback(
    (task: string) => {
      const userTask = userTasks.filter((i) => i.task === task)?.[0]
      return userTask?.completed === userTask?.subTasks
    },
    [userTasks]
  )

  // Define the actions array
  const actionArray: IActionArray[] = [
    {
      title: 'Verify Your Identity',
      subTitle:
        'To charge a fee for your bet tips, we need to keep a record of your details for verification purposes.',
      action: () => {
        rsProps?.callSection({
          action: 'view',
          component: 'tipster-indentification',
          title: 'Identity Verification Request',
          onRefresh: () => {
            userTasksProps.mutate({})
          }
        })
      },
      priority: 1,
      role: 'seller',
      class: 'identify-verification',
      completed: isTaskCompleted('Verify User Identity'),
      icon: <UserSVG />
    },
    {
      title: 'Join A Community',
      subTitle: 'Connect, share, and learn with fellow members',
      action: () => {
        navigate(pageurl.COMMUNITYFORUM)
      },
      priority: 1,
      role: 'all',
      class: 'community',
      completed: isTaskCompleted('Join a Community'),
      icon: <CommunitySVG />
    },
    {
      title: 'Browse Tips',
      subTitle:
        'Explore expert tips to help you make informed betting decisions!',
      action: () => {
        navigate(pageurl.BETTICKETS)
      },
      priority: 2,
      role: 'buyer',
      class: 'bet-tips',
      completed: getUserData().role !== 'buyer',
      icon: <TipMenuSVG />
    },
    {
      title: 'Explore Bet Channels',
      subTitle:
        'Discover expert bet tips and view performance stats based on past predictions!',
      action: () => {
        navigate(`${pageurl.BETCHANNEL}/all`)
      },
      priority: 2,
      role: 'buyer',
      class: 'bet-channels',
      completed: getUserData().role !== 'buyer',
      icon: <ExploreSVG />
    },
    {
      title: 'Top Performing Channels',
      subTitle:
        'Find the highest-rated and top-performing channels based on user ratings and performance stats.',
      action: () => {
        navigate(`${pageurl.BETCHANNEL}/leadership-board`)
      },
      priority: 2,
      role: 'all',
      class: 'leadership-board',
      completed: false,
      icon: <LeadershipBoardSVG />
    },
    {
      title: 'Achievements & Rewards',
      subTitle:
        'Track your progress and view your user level as you complete in-app activities.',
      action: () => {
        navigate(pageurl.ACHIEVEMENTS)
      },
      priority: 1,
      role: 'seller',
      class: 'achievements-rewards',
      completed: getUserData().role !== 'seller',
      icon: <AchievementsRewardsSVG />
    },
    {
      title: 'Leave a Feedback',
      subTitle:
        'We value you as a customer and your feeback will help us serve you better',
      action: () => {
        rsProps?.callSection({
          action: 'create',
          component: 'feed-back',
          title: 'Feed Back'
        })
      },
      priority: 1,
      role: 'all',
      class: 'feed-back',
      completed: false,
      icon: <FeedbackMGSVG />
    }
  ]

  // use custom hook to get the next action logic
  const { action, handleNext, handlePrev, selectedIndex, isNav } =
    useNextAction(actionArray)

  return (
    <div
      className={`next-action bg-white rounded px-4 py-5 position-relative ${
        action?.class || ''
      }`}
    >
      <HVC view={userTasksProps.isLoading} removeDOM>
        <Skeleton nobg />
      </HVC>
      <HVC view={!userTasksProps.isLoading} removeDOM>
        {/* contains title, sub-title, button */}
        <ActionItem
          action={action?.action}
          subtitle={action?.subTitle}
          title={action?.title}
          icon={action?.icon}
          priority={action?.priority}
          key={selectedIndex}
        />
        {/* nav wrapper */}
        <HVC
          view={isNav}
          removeDOM
          className="position-absolute f-row-33 p-4 aic nav-wrapper"
        >
          {/* prev nav */}
          <div className="bg-white nav-item shadow-sm" onClick={handlePrev}>
            <LeftAngleSVG />
          </div>
          {/* next nav */}
          <div className="bg-white nav-item shadow-sm" onClick={handleNext}>
            <RightAngleSVG />
          </div>
        </HVC>
      </HVC>
    </div>
  )
}

// Props for the action item component
interface IActionItem {
  title: string
  subtitle: string
  action: () => void
  icon: JSX.Element
  priority: 1 | 2
}

// Memoized component to render an action item
const ActionItem = memo(
  ({ title, action, subtitle, icon, priority }: IActionItem) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const mainControls = useAnimation()

    // Start animation when the component is in view
    useEffect(() => {
      if (isInView) {
        mainControls.start('visible')
      }
    }, [isInView])
    return (
      <motion.div
        className="f-column-20 action-item"
        ref={ref}
        variants={{
          hidden: { opacity: 0, x: 75 },
          visible: { opacity: 1, x: 0 }
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="f-column-10">
          <div className="f-row-25 aic action-header-container">
            <p
              className="text-tiniest m-0 color-label"
              style={{ letterSpacing: '2px' }}
            >
              ACTIVITY
            </p>
            <HVC removeDOM view={priority === 1} className="f-row-25 aic">
              <SeparatorComponent />
              <p className="text-tiniest m-0" style={{ letterSpacing: '2px' }}>
                TOP PRIORITY
              </p>
            </HVC>
          </div>
          <div className="f-row-20 aic action-header-container">
            <h2 className="ff-bold m-0">{title}</h2>
            {icon}
          </div>
        </div>
        <p className="m-0">{subtitle}</p>
        <div className="f-row pt-4 cta-btn-wrapper">
          <TypeButton title="Proceed" onClick={action} buttonShape="curve" />
        </div>
      </motion.div>
    )
  }
)

ActionItem.displayName = 'ActionItem'

export default NextAction
