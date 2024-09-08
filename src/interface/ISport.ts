import { ISport } from './IOther'

export interface ISports {
  status: string
  data: {
    sports: ISport[]
  }
}
