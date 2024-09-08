export interface INotification {
  notice: string
  status: boolean
  dontClose?: boolean
}

export interface IResponseType1 {
  _id: string
  title: string
  description: string
  status: 'Active' | 'Inactive'
}

export interface ISport extends IResponseType1 {}
export interface IMembership extends IResponseType1 {}
export interface IMemberSubscriptionService extends IResponseType1 {}
export interface IUserTier extends IResponseType1 {
  role: string
}
export interface IEarningEvent extends IResponseType1 {
  role: string
}
export interface IEarning {
  userId: string
  events: Array<{ event: string; points: number }>
  month: string
  year: string
}
export interface IChannelSubscriptionThreshold {
  _id: string
  maxAmount: string
  level: {
    description: string
    title: string
    _id: string
  }
  status: 'Active' | 'Inactive'
}

export interface ISports {
  status: string
  data: {
    sports: ISport[]
  }
}

export interface IMemberships {
  status: string
  data: {
    memberships: IMembership[]
  }
}

export interface IMemberSubscriptionServices {
  status: string
  data: {
    memberSubscriptionServices: IMemberSubscriptionService[]
  }
}

export interface IBookie {
  _id: string
  title: string
  url: string
  status: 'Active' | 'Inactive'
}

export interface IBookies {
  status: string
  data: {
    bookies: IBookie[]
  }
}

export interface INotificationPreference extends IResponseType1 {}

export interface INotificationPreferences {
  status: string
  data: {
    notificationPreference: INotificationPreference[]
  }
}

export interface IGetDatasType {
  status: string
  result: number
  currentPage: number
  pages: number
  hasNext: boolean
}

export interface IUserTiers extends IGetDatasType {
  data: {
    userTiers: IUserTier[]
  }
}
export interface IEarningEvents extends IGetDatasType {
  data: {
    earningEvents: IEarningEvent[]
  }
}

export interface IEarnings extends IGetDatasType {
  data: {
    earnings: IEarning[]
  }
}

export interface IChannelSubscriptionThresholds extends IGetDatasType {
  data: {
    channelSubscriptionThresholds: IChannelSubscriptionThreshold[]
  }
}

export interface IDrop {
  drop: []
  _id: string
  deadlineDate: string
}

export interface ISchedule {
  _id: string
  userId: string
  channelId: string
  scheduleType: string
  drops: IDrop[]
}

export interface ISchedules extends IGetDatasType {
  data: {
    schedules: ISchedule[]
  }
}

export interface ISubscriptionSchedule {
  week: number
  codeDropped: number
  codeExpected: number
  deadline: string
  startSchedule: string
  earnings: number
  status: {
    pending: number
    completed: number
    cancelled: number
  }
}

export interface ISubscriptionScheduleResponse {
  status: string
  data: {
    events: {
      channelSubscription: ISubscriptionSchedule[]
    }
  }
}

export interface IPayPerTipSchedule {
  week: number
  codeDropped: number
  purchaseCount: number
  deadline: string
  startSchedule: string
  earnings: number
  status: {
    pending: number
    completed: number
    cancelled: number
  }
}

export interface IPayPerTipScheduleResponse {
  status: string
  data: {
    events: {
      channelSubscription: IPayPerTipSchedule[]
    }
  }
}

export const SCHEDULETYPEENUM = {
  SUBSCRIPTION: 'subscription',
  PAYPERTIP: 'pay-per-tip'
} as const

export type typeScheduleType =
  (typeof SCHEDULETYPEENUM)[keyof typeof SCHEDULETYPEENUM]

export interface IUserTask {
  task: string
  reward: string
  level: string
  role: string
  description: string
  taskOrder: number
  completed: number
  subTasks: number
}
export interface IUserTasks extends IGetDatasType {
  data: {
    userTasks: IUserTask[]
  }
}

export interface IReward {
  title: string
  description: string
  status: 'Active' | 'Inactive'
}

export interface IRewards extends IGetDatasType {
  data: {
    rewards: IUserTier[]
  }
}

export interface IAchievement {
  achievement: string
  reward: string
  level: string
  role: string
  description: string
  achievementOrder: number
  completed: boolean
}
export interface IAchievements extends IGetDatasType {
  data: {
    achievements: IAchievement[]
  }
}
