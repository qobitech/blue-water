export interface ISendEmail {
  basicInformation: {
    name: string
    company: string
    email: string
    phone: string
    website: string
  }
  developmentExperience: {
    experience: string
    projects: string
    projectSize: string
    projectsDeveloped: string[]
  }
  projectVision: {
    estimatedBudget: string
    financingMethod: string
    proposedDevelopment: string
    waterfrontExperience: string
  }
  complianceCertification: {
    developerLicense: string
    legalIssues: string
  }
  nextSteps: {
    discoveryMeeting: string
    communicationMethod: string[]
  }
}

export const sendEmail = async (
  req: ISendEmail,
  onSuccess?: () => void,
  onFailure?: () => void
) => {
  fetch('https://api.bluewatershoresrealty.com/api/v1/send-mail', {
    // fetch('http://localhost:7100/api/v1/send-mail', {
    method: 'POST',
    body: JSON.stringify({
      ...req
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (res) => await res.json())
    .then(() => {
      onSuccess?.()
    })
    .catch(() => {
      onFailure?.()
    })
}
