import { filterQueryType } from '../../constants/global'

export type IComponentStateKey = keyof typeof initComponentState

export interface IComponentState {
  tokenExpired: boolean
  menuOpen: boolean
  filters: {
    [key: string]: string
  } | null
  filterQuery: filterQueryType | null
  showConsentBanner: boolean
  joinWaitingList: boolean
  subscribe: boolean
}

const apigetObj = {
  currentPage: 0,
  hasNext: false,
  pages: 1,
  result: 0,
  status: ''
}

export const initComponentState = {
  // prediction: {

  // },
  tokenExpired: false,
  notification: {
    notice: '',
    status: false,
    dontClose: false
  },
  menuOpen: false,
  filters: {},
  filterQuery: null,
  showConsentBanner: false,
  joinWaitingList: false,
  subscribe: false,
  shareProps: null,
  paymentLink: null,
  confetti: false,
  orderSummaryProps: null,
  paymentDetails: null,
  paymentItemType: null,
  betCodeFilter: [],
  isBetCodeFilter: false,
  // state
  getCommunityForum: {
    ...apigetObj,
    data: {
      communityForums: []
    }
  },
  getCommunityForumByID: {
    ...apigetObj,
    data: {
      communityForums: []
    }
  },
  getUserTasks: {
    ...apigetObj,
    data: {
      userTasks: []
    }
  },
  getSellerMultiPredictionStats: {
    ...apigetObj,
    data: {
      stats: {
        totalBetSoldCurrentMonth: 0,
        totalBetSoldLastMonth: 0,
        totalFollowingCurrentMonth: 0,
        totalFollowingLastMonth: 0
      }
    }
  },
  getMyMultiPrediction: {
    ...apigetObj,
    data: {
      multiplePredictions: []
    }
  },
  getPublicMultiPrediction: {
    ...apigetObj,
    data: {
      multiplePredictions: []
    }
  },
  getMultiPrediction: {
    ...apigetObj,
    data: {
      multiplePredictions: []
    }
  },
  getMyChannels: {
    ...apigetObj,
    data: {
      channels: []
    }
  },
  getAllChannels: {
    ...apigetObj,
    data: {
      channels: []
    }
  },
  getPublicChannels: {
    ...apigetObj,
    data: {
      channels: []
    }
  },
  getSubscribedChannels: {
    ...apigetObj,
    data: {
      channels: []
    }
  },
  getUserAchievements: {
    ...apigetObj,
    data: {
      achievements: []
    }
  },
  getBookies: {
    data: {
      bookies: []
    },
    status: ''
  },
  getSports: {
    data: {
      sports: []
    },
    status: ''
  }
} as IComponentState

export const reducer = <T extends IComponentState, A extends keyof T>(
  state: T,
  action: { type: A; payload: T[A] } // Ensure payload matches the type of the state property
) => {
  if (action.type in state) {
    if (state[action.type] === action.payload) return state
    return { ...state, [action.type]: action.payload }
  }
  return state // Return the current state if action type does not match
}
