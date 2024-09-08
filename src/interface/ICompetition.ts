import { IResponseType1 } from './IOther'

export interface ICompetition extends IResponseType1 {
  startDate: string
  endDate: string
  sportId: string
  numberOfGames: string
}

export interface ICompetitions {
  status: string
  data: {
    competitions: ICompetition[]
  }
}
