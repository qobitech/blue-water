import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useUpdateUserLevel,
  useUserAchievementQuery,
  useUserTaskQuery
} from '../../../api/user'
import { TypeSmallButton } from '../../../components/utils/button'
import TabToggler, {
  ITabToggesOption,
  useTabToggler
} from '../../../components/utils/tab-toggler'
import {
  RefreshComponent,
  SeparatorComponent
} from '../../../components/utils/reusable'
import { getUserData } from '../../../constants/global'
import RequestStatus from '../../../components/utils/request-status'
import { gallery } from '../../../assets'
import { HVC } from '../../../components/utils/hvc'
import { CheckSVG } from '../../../components/utils/svgs'
import Skeleton from '../../../components/utils/skeleton'
import { useGlobalContext } from '../../../components/layout/context'

export const arEnum = {
  TASKS: 'Tasks',
  ACHIEVEMENT: 'Achievements'
}

const AchievementsandRewards = () => {
  const {
    refreshUserData,
    triggerConfetti,
    global: { state }
  } = useGlobalContext()
  const userTasksProps = useUserTaskQuery()
  const achievementProps = useUserAchievementQuery()

  useEffect(() => {
    userTasksProps.mutate({})
    achievementProps.mutate({})
  }, [])

  const isUnlock = useMemo(() => {
    const tasks = userTasksProps?.data?.data?.userTasks || []
    return tasks?.every((task) => task.completed === task.subTasks)
  }, [userTasksProps?.data?.data?.userTasks])

  const onHandleRequest = (category: string) => {
    switch (category) {
      case arEnum.ACHIEVEMENT:
        achievementProps.mutate({})
        break
      default:
        userTasksProps.mutate({})
        break
    }
  }

  const tabOptions: ITabToggesOption[] = [
    {
      id: '1',
      name: arEnum.TASKS,
      onClick: () => {
        onHandleRequest(arEnum.TASKS)
      }
    },
    {
      id: '2',
      name: arEnum.ACHIEVEMENT,
      onClick: () => {
        onHandleRequest(arEnum.ACHIEVEMENT)
      }
    }
  ]

  const tabTogglerProps = useTabToggler(tabOptions, tabOptions[0], 'right')

  const category = tabTogglerProps.category.name

  const isTask = category === arEnum.TASKS
  const isAchievement = category === arEnum.ACHIEVEMENT

  const onRefresh = useCallback(() => {
    onHandleRequest(category)
  }, [category])

  const load = useMemo(
    () => userTasksProps.isLoading || achievementProps.isLoading,
    [userTasksProps.isLoading, achievementProps.isLoading]
  )

  const level = useMemo(
    () => getUserData()?.user?.level?.[0]?.title || '...',
    [getUserData()?.user?.level?.[0]?.title]
  )

  const [success, setSuccess] = useState<boolean>(false)

  const closeSuccessPage = () => {
    setSuccess(false)
    triggerConfetti?.(false)
  }

  const onSuccess = () => {
    setSuccess(true)
    triggerConfetti?.(true)
    refreshUserData?.()
    onRefresh?.()
  }

  const updateUserLevelProps = useUpdateUserLevel(onSuccess)

  const unlockNextUserLevel = useCallback(() => {
    if (isUnlock) {
      updateUserLevelProps.mutate({})
    }
  }, [])

  const hiw = [
    `Evaluation Phase: Participants are given a simulated or real account with specific rules and targets. They must demonstrate their trading or betting skills over a set period.`,
    `Performance Metrics: The challenge evaluates participants based on various performance metrics, such as profitability, risk management, and consistency.`,
    `Rewards: Successful participants often receive rewards, which can include funding for a real trading or betting account, profit-sharing opportunities, or even a position within the firm.`,
    `Rules and Guidelines: Clear rules are set regarding risk limits, trading or betting strategies, and other parameters to ensure fair evaluation.`,
    `Objective: The main objective is to identify skilled individuals who can generate profits while managing risks effectively. For the participants, it’s an opportunity to showcase their abilities and potentially secure funding or a job.`
  ]

  const isData =
    state?.getUserTasks?.data?.userTasks?.length +
      state?.getUserAchievements?.data?.achievements?.length >
    0

  if (!isData && load) {
    return <Skeleton />
  }

  return (
    <>
      <HVC removeDOM view={!success}>
        <div className="bg-white pb-4 f-column-20">
          {/* header */}
          <div className="f-row-40 flex-wrap aic">
            <div className="f-row-20 flex-wrap aic">
              <TabToggler tabTogglerProps={tabTogglerProps} />
              <RefreshComponent load={load} onRefresh={onRefresh} />
            </div>
            <HVC removeDOM view={!load && level !== 'Master'}>
              <TypeSmallButton
                title="Unlock Next Level"
                buttonType={isUnlock ? 'active' : 'disabled'}
                onClick={unlockNextUserLevel}
                load={updateUserLevelProps.isLoading}
              />
            </HVC>
          </div>
          <div className="f-column gap-20 overflow-auto">
            <HVC view={isTask}>
              <HVC view={level !== 'Master'}>
                {state.getUserTasks?.data?.userTasks
                  ?.sort((a, b) => {
                    if (a.taskOrder < b.taskOrder) return -1
                    return 1
                  })
                  .map((taskItem, index) => (
                    <TaskItem
                      task={taskItem.task}
                      taskDone={taskItem.completed}
                      reward={taskItem.reward}
                      description={taskItem.description}
                      completed={taskItem.completed === taskItem.subTasks}
                      subTasks={taskItem.subTasks}
                      index={index}
                      level={level}
                      key={index}
                    />
                  ))}
              </HVC>
              <HVC view={level === 'Master'} className="f-column-33">
                <div
                  className="w-100 rounded"
                  style={{ overflow: 'hidden', height: '40vh' }}
                >
                  <img
                    src={gallery.propfirm.src}
                    alt={gallery.propfirm.alt}
                    style={{ objectFit: 'cover' }}
                    className="w-100 h-100"
                  />
                </div>
                <div className="f-column-13">
                  <div className="">
                    <h2>Prop Firm Challenge - Coming Soon</h2>
                    <p className="color-brand">
                      Are You Ready to Prove Your Skills?
                    </p>
                  </div>
                  <div className="text-small border-label-top pt-4 pb-2 border-label-bottom">
                    <p>
                      Congratulations, Tipster! You&apos;ve reached the{' '}
                      <b>master level</b>, and now it&apos;s time to take your
                      skills to the next level. The Prop Firm Challenge is on
                      the horizon, offering you the chance to demonstrate your
                      expertise and compete for incredible rewards.
                    </p>
                    <p>
                      Prepare yourself for a series of rigorous tests designed
                      to push your betting strategies to their limits. This
                      challenge will not only showcase your prowess but also
                      give you the opportunity to join the elite ranks of
                      top-performing tipsters.
                    </p>
                    <p>
                      Stay tuned for more details, and get ready for the
                      challenge of your life. Your journey to the top starts
                      here!
                    </p>
                  </div>
                  <div>
                    <p className="ff-bold">HOW IT WORKS</p>
                    <ul className="f-column-18 border-label-left">
                      {hiw.map((i, index) => (
                        <li key={index} className="text-small">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </HVC>
            </HVC>
            <HVC view={isAchievement}>
              {state?.getUserAchievements?.data?.achievements
                ?.sort((a, b) => {
                  if (a.achievementOrder < b.achievementOrder) return -1
                  return 1
                })
                .map((achievementItem, index) => (
                  <AchievementItem
                    achievement={achievementItem.achievement}
                    index={index}
                    reward={achievementItem.reward}
                    status={achievementItem.completed}
                    taskNumber={achievementItem.achievementOrder}
                    key={index}
                  />
                ))}
            </HVC>
          </div>
        </div>
      </HVC>
      <HVC removeDOM view={success}>
        <div className="f-column-50 border rounded p-5 text-center">
          <RequestStatus
            title={'New User Level Unlocked'}
            description={`Congrats on advancing to the ${level} level`}
            lottie=""
            loop={false}
            success
          />
          <TypeSmallButton
            title="Close"
            buttonType="danger"
            onClick={closeSuccessPage}
          />
        </div>
      </HVC>
    </>
  )
}

export interface ITaskItem {
  index: number
  level: string
  task: string
  completed: boolean
  subTasks: number
  reward: string
  description: string
  taskDone: number
}

const TaskItem: React.FC<ITaskItem> = (taskProps) => {
  const [isAbout, setIsAbout] = useState<boolean>(false)

  const getNextLevel = (level: string) => {
    switch (level.toLowerCase()) {
      case 'novice':
        return 'Junior'
      case 'junior':
        return 'Intermediate'
      case 'intermediate':
        return 'Senior'
      case 'senior':
        return 'Master'
      default:
        return 'User'
    }
  }

  return (
    <div className="border-bottom p-4">
      <div className="f-row jcsb w-100 mb-2">
        <p className="text-tiny color-label">Task #{taskProps.index + 1}</p>
        <div className="f-row-10 aic">
          <p className="text-tiny color-label">Next Level:</p>
          <p className="text-tiny color-label ff-bold">
            {getNextLevel(taskProps.level)}
          </p>
        </div>
      </div>
      <div>
        <h4>{taskProps.task}</h4>
      </div>
      <div className="f-row-20 aic flex-wrap">
        <p className="text-little m-0">
          <span className="color-label">Number of tasks:</span>&nbsp;&nbsp;
          {taskProps.subTasks}
        </p>
        <SeparatorComponent />
        <p className="text-little m-0">
          <span className="color-label">Status:</span>&nbsp;&nbsp;
          <span
            className={taskProps.completed ? 'text-success' : 'color-label'}
          >
            {taskProps.completed ? 'Completed' : `${taskProps.taskDone} done`}
            &nbsp;&nbsp;&nbsp;
            {taskProps.completed ? <CheckSVG /> : null}
          </span>
        </p>
        <div className="f-row-15 flex-wrap aic ml-auto">
          <TypeSmallButton
            title={isAbout ? 'Close' : 'About Task'}
            onClick={() => setIsAbout(!isAbout)}
          />
        </div>
      </div>
      {isAbout ? (
        <div className="mt-3 border-label rounded p-3">
          <p className="text-little m-0">{taskProps.description || '...'}</p>
        </div>
      ) : null}
    </div>
  )
}

export interface IAchievementsItem {
  index: number
  achievement: string
  status: boolean
  reward: string
  taskNumber: number
}

const AchievementItem: React.FC<IAchievementsItem> = (achievement) => {
  return (
    <div
      className={`border-bottom p-4 ${
        achievement.status ? 'card-success' : ''
      }`}
    >
      <div className="f-row jcsb w-100 mb-2">
        <p className="text-little color-label">
          Achievement #{achievement.index + 1}
        </p>
      </div>
      <div>
        <h4>{achievement.achievement}</h4>
      </div>
      <div className="f-row-20 aic flex-wrap pt-1">
        <p className="text-little m-0">
          <span className="color-label">Reward:</span>&nbsp;&nbsp;
          <span className="color-brand">{achievement.reward}</span>
        </p>
        <SeparatorComponent />
        <p className="text-little m-0">
          <span className="color-label">Status:</span>&nbsp;&nbsp;
          <span
            className={achievement.status ? 'text-success' : 'text-warning'}
          >
            {achievement.status ? 'Completed' : 'Not done'}&nbsp;&nbsp;
            {achievement.status ? <CheckSVG /> : null}
          </span>
        </p>
      </div>
    </div>
  )
}

export default AchievementsandRewards
