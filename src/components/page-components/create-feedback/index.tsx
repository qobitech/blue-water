import { useEffect, useState } from 'react'
import {
  createFeedbackStage,
  basicInfoSchema,
  IBasicInformation,
  IDeveloperExperience,
  developerExperienceSchema,
  IProjectVision,
  projectVisionSchema,
  IComplianceCertification,
  complianceCertificationSchema,
  INextSteps,
  nextStepsSchema,
  stages
} from './utils'
import { useFormHook } from '../../utils/hooks'
import './style.scss'
import NotificationModal, { useModal } from '../../utils/modal'
import { HVC } from '../../utils/hvc'
import BasicInformationForm from './basic-info-form'
import { useGlobalContext } from '../../layout/context'
import { TypeButton } from '../../utils/button'
import { ProgressData } from './progress-data'
import DeveloperExperienceForm from './developer-experience-form'
import ProjectVisionForm from './project-vision-form'
import ComplianceCertificationForm from './compliance-certification-form'
import NextStepsForm from './next-steps-form.tsx'
import { ISendEmail, sendEmail } from '../../../api'
import TextPrompt from '../../utils/text-prompt'
import { Notice } from './notice'

const CreateFeedback = () => {
  const { rsProps } = useGlobalContext()
  const [tandc, setTandC] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [err, setErr] = useState<string>('')
  const [stage, setStage] = useState<createFeedbackStage>('Basic Information')

  const [basicInfoHookForm] = useFormHook<IBasicInformation>(basicInfoSchema)
  const [devExpHookForm] = useFormHook<IDeveloperExperience>(
    developerExperienceSchema
  )
  const [projectVisionHookForm] =
    useFormHook<IProjectVision>(projectVisionSchema)
  const [complianceCertificationHookForm] =
    useFormHook<IComplianceCertification>(complianceCertificationSchema)
  const [nextStepsHookForm] = useFormHook<INextSteps>(nextStepsSchema)

  const notificationProps = useModal()

  const handleNext = () => {
    const currentIndex = stages.indexOf(stage)
    if (currentIndex < stages.length - 1) {
      setStage(stages[currentIndex + 1])
    }
  }

  const handlePrev = () => {
    const currentIndex = stages.indexOf(stage)
    if (currentIndex > 0) {
      setStage(stages[currentIndex - 1])
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    setErr('')
    const basicInformation = basicInfoHookForm.watch()
    const { projectsDevelopedOthers, ...rest } = devExpHookForm.watch()
    const developmentExperience = {
      ...rest,
      projectsDeveloped: projectsDevelopedOthers
        ? [...rest.projectsDeveloped, projectsDevelopedOthers].filter(
            (i) => i.toLowerCase() !== 'others'
          )
        : rest.projectsDeveloped
    }
    const { proposedDevelopmentOther, ...pvrest } =
      projectVisionHookForm.watch()
    const projectVision = {
      ...pvrest,
      proposedDevelopment: !pvrest.proposedDevelopment
        ? proposedDevelopmentOther
        : pvrest.proposedDevelopment
    }
    const complianceCertification = complianceCertificationHookForm.watch()
    const nextSteps = nextStepsHookForm.watch()
    const data: ISendEmail = {
      basicInformation,
      developmentExperience,
      projectVision,
      complianceCertification: {
        ...complianceCertification,
        legalIssues: ''
      },
      nextSteps
    }
    sendEmail(
      data,
      () => {
        setSuccess(true)
        setLoading(false)
      },
      () => {
        setErr('Something went wrong')
        setLoading(false)
      }
    )
  }

  const handleValidation = () => {
    if (stage === 'Basic Information')
      basicInfoHookForm.handleSubmit(() => {
        handleNext()
      })()
    if (stage === 'Developer Experience')
      devExpHookForm.handleSubmit(() => {
        handleNext()
      })()
    if (stage === 'Project Vision')
      projectVisionHookForm.handleSubmit(() => {
        handleNext()
      })()
    if (stage === 'Compliance & Certification')
      complianceCertificationHookForm.handleSubmit(() => {
        handleNext()
      })()
    if (stage === 'Next Steps')
      nextStepsHookForm.handleSubmit(() => {
        handleSubmit()
      })()
  }

  const handleClose = () => {
    notificationProps.handleCloseModal(() => rsProps?.closeSection())
  }

  useEffect(() => {
    notificationProps.handleOpenModal(rsProps?.title as string)
  }, [])

  return (
    <div className="f-column-17 w-100">
      <NotificationModal
        useNotificationProps={notificationProps}
        size="medium"
        onClose={() => {
          rsProps?.closeSection()
        }}
        disableClose={loading}
      >
        <HVC view={!tandc}>
          <Notice
            proceed={() => {
              setTandC(true)
              notificationProps.handleOpenModal(
                `Partnership & Property Exploration Form`
              )
            }}
            cancel={handleClose}
            cta="explore property"
          />
        </HVC>
        <HVC view={tandc}>
          {!success && <ProgressData stage={stage} />}
          <div className="f-column-33 py-4">
            <HVC view={stage === 'Basic Information'} removeDOM>
              <BasicInformationForm hookForm={basicInfoHookForm} />
            </HVC>
            <HVC view={stage === 'Developer Experience'} removeDOM>
              <DeveloperExperienceForm hookForm={devExpHookForm} />
            </HVC>
            <HVC view={stage === 'Project Vision'} removeDOM>
              <ProjectVisionForm hookForm={projectVisionHookForm} />
            </HVC>
            <HVC view={stage === 'Compliance & Certification'} removeDOM>
              <ComplianceCertificationForm
                hookForm={complianceCertificationHookForm}
              />
            </HVC>
            <HVC view={stage === 'Next Steps'} removeDOM>
              {!success ? (
                <NextStepsForm hookForm={nextStepsHookForm} />
              ) : (
                <div className="text-center f-column-25 aic py-5">
                  <div className="text-center f-column-23 aic py-5">
                    <h3>Thank you for your interest!</h3>
                    <p>
                      We&apos;ll review your application and get back to you
                      shortly
                    </p>
                  </div>
                  <TypeButton
                    title="Close"
                    buttonShape="square"
                    buttonType="danger"
                    onClick={handleClose}
                  />
                </div>
              )}
            </HVC>
            {!success && (
              <div className="f-column-13">
                <TypeButton
                  title={stage === 'Next Steps' ? 'Submit' : 'Next'}
                  buttonSize="large"
                  buttonShape="square"
                  buttonType={
                    loading
                      ? 'disabled'
                      : stage === 'Next Steps'
                      ? 'black'
                      : 'bold'
                  }
                  load={loading}
                  onClick={
                    loading
                      ? undefined
                      : stage === 'Next Steps'
                      ? handleSubmit
                      : handleValidation
                  }
                />
                {stage !== 'Basic Information' && !loading && (
                  <TypeButton
                    title="Previous"
                    buttonSize="medium"
                    buttonShape="square"
                    buttonType="outlined"
                    className="border-0 p-0"
                    onClick={handlePrev}
                  />
                )}
              </div>
            )}
            {err && <TextPrompt prompt={err} status={false} />}
          </div>
        </HVC>
      </NotificationModal>
    </div>
  )
}

export default CreateFeedback
