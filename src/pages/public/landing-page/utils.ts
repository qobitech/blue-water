export interface IJumbotron {
  createFeedback: (title: string) => void
  handleScrollRightSection: () => void
}

export interface IAbout {
  createFeedback: (title: string) => void
}

export interface IInvestmentOpportunity {
  createFeedback: (title: string) => void
  faqRef: React.RefObject<HTMLDivElement>
}

export interface IServices {
  createFeedback: (title: string) => void
}

export interface IFAQ {
  createFeedback: (title: string) => void
}

export interface IConclusion {
  createFeedback: (title: string) => void
}

export interface IUseLandingPageHooks {
  createFeedback: (title: string) => void
  handleScrollRightSection: () => void
  faqRef: React.RefObject<HTMLDivElement>
}
