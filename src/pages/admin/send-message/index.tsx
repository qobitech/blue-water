import { CardHeader } from '../reusable/card-table'
import '../page.scss'
import FormBuilder, {
  IFormComponent
} from '../../../components/utils/form-builder'
import { useFormHook } from '../../../components/utils/hooks'
import * as yup from 'yup'
import { TypeButton, TypeSmallButton } from '../../../components/utils/button'
import { MailSVG } from '../../../components/utils/svgs'
import { TypeInput } from '../../../components/utils/input'
import { useEffect } from 'react'
import {
  useSendCustomEmail,
  useSendCustomEmailWithTemplate
} from '../../../api/sendEmail'
import { TabSection, useTabSection } from '../../../components/utils/reusable'
import { HVC } from '../../../components/utils/hvc'
// import { _mutateHTMLPost } from '../../../components/utils/helper'

const tabs = {
  TEMPLATE: 'WITH TEMPLATE',
  BODY: 'WITH SUBJECT & BODY'
}

const SendMessage = () => {
  const { tabProps, isTab } = useTabSection(tabs.TEMPLATE, tabs)

  return (
    <div className="admin-page">
      <div className="admin-page-container f-column-33">
        <div className="admin-management">
          <CardHeader tag="" title="Send Message" />
        </div>
        <TabSection
          tabProps={tabProps}
          position="start"
          type="block"
          tabGap="10"
        />
        <HVC removeDOM view={isTab(tabs.TEMPLATE)}>
          <SendMessageWithTemplate />
        </HVC>
        <HVC removeDOM view={isTab(tabs.BODY)}>
          <SendMessageWithBody />
        </HVC>
      </div>
    </div>
  )
}

export default SendMessage

const SendMessageWithBody = () => {
  interface IHF {
    emails: string[]
    subject: string
    message: string
  }

  const schema = {
    emails: yup
      .array()
      .of(yup.string().email('Invalid email').required('Email is required'))
      .required('At least one email is required'),
    subject: yup.string().required('Subject is required'),
    message: yup.string().required('Message is required')
  }

  const fc: IFormComponent[] = [
    {
      component: 'input',
      id: 'subject',
      label: 'Subject',
      placeHolder: 'We have Launched!'
    },
    {
      component: 'text-area',
      id: 'message',
      label: 'Compose Message'
    }
  ]
  const [hookForm] = useFormHook<IHF>(schema)

  const onAddEmail = async () => {
    const emails = hookForm.watch('emails') || []
    const lastIndex = emails.length - 1

    try {
      await hookForm.trigger(`emails.${lastIndex}`)

      const lastError = hookForm.formState.errors.emails?.[lastIndex]?.message

      if (lastError) {
        return // Stop if the last email is invalid
      }

      emails.push('')
      hookForm.setValue('emails', emails)
    } catch (error) {
      console.error('Invalid email:', error)
    }
  }

  useEffect(() => {
    onAddEmail()
  }, [])

  const handleOnChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const emails = hookForm.watch('emails') || []
      emails[index] = e.target.value
      hookForm.setValue('emails', emails)
    }

  const emails = hookForm.watch('emails') || []

  const sendCustomEmailProps = useSendCustomEmail(() => {
    hookForm.reset()
  })

  const sendMail = (data: IHF) => {
    sendCustomEmailProps.mutate({
      body: {
        emails: data.emails.map((i) => ({
          email: i,
          name: 'New User'
        })),
        subject: data.subject,
        html: data.message
      }
    })
  }

  return (
    <div className="f-column-33 border-label p-4 rounded">
      <div className="f-column-33">
        <div className="grid-wrapper-40 gap-20">
          {emails.map((i, index) => (
            <TypeInput
              key={index}
              onChange={handleOnChange(index)}
              value={i}
              placeholder={`Enter email address`}
              customwidth={'100%'}
              label={`Email address ${index + 1}`}
              error={hookForm.formState.errors.emails?.[index]?.message}
            />
          ))}
        </div>
        <TypeSmallButton title="Add email" onClick={onAddEmail} />
      </div>
      <FormBuilder hookForm={hookForm} formComponent={fc} />
      <TypeButton
        title="Send Message"
        icon={<MailSVG color="#fff" />}
        onClick={hookForm.handleSubmit(sendMail)}
        load={sendCustomEmailProps.isLoading}
      />
    </div>
  )
}

const SendMessageWithTemplate = () => {
  interface IHF {
    emails: string[]
  }

  const schema = {
    emails: yup
      .array()
      .of(yup.string().email('Invalid email').required('Email is required'))
      .required('At least one email is required')
  }

  const [hookForm] = useFormHook<IHF>(schema)

  const onAddEmail = async () => {
    const emails = hookForm.watch('emails') || []
    const lastIndex = emails.length - 1

    try {
      await hookForm.trigger(`emails.${lastIndex}`)

      const lastError = hookForm.formState.errors.emails?.[lastIndex]?.message

      if (lastError) {
        return // Stop if the last email is invalid
      }

      emails.push('')
      hookForm.setValue('emails', emails)
    } catch (error) {
      console.error('Invalid email:', error)
    }
  }

  useEffect(() => {
    onAddEmail()
  }, [])

  const handleOnChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const emails = hookForm.watch('emails') || []
      emails[index] = e.target.value
      hookForm.setValue('emails', emails)
    }

  const emails = hookForm.watch('emails') || []

  const sendCustomEmailProps = useSendCustomEmailWithTemplate(() => {
    hookForm.reset()
  })

  const sendMail = (data: IHF) => {
    sendCustomEmailProps.mutate({
      body: {
        emails: data.emails.map((i) => ({
          email: i,
          name: 'New User'
        }))
      }
    })
  }

  return (
    <div className="f-column-33 border-label p-4 rounded">
      <div className="f-column-33">
        <div className="grid-wrapper-40 gap-20">
          {emails.map((i, index) => (
            <TypeInput
              key={index}
              onChange={handleOnChange(index)}
              value={i}
              placeholder={`Enter email address`}
              customwidth={'100%'}
              label={`Email address ${index + 1}`}
              error={hookForm.formState.errors.emails?.[index]?.message}
            />
          ))}
        </div>
        <TypeSmallButton title="Add email" onClick={onAddEmail} />
      </div>
      <TypeButton
        title="Send Message"
        icon={<MailSVG color="#fff" />}
        onClick={hookForm.handleSubmit(sendMail)}
        load={sendCustomEmailProps.isLoading}
      />
    </div>
  )
}
