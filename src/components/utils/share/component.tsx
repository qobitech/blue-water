import { XSVG } from '../svgs'
import {
  LinkedinSVG,
  TelegramSVG,
  ViberSVG,
  WhatsappSVG
} from '../svgs/f-awesome'

interface ISBCD {
  title: string
  baseUrl: string
  shareContent: string
}

export const ShareBlogComponentData = ({
  title,
  baseUrl,
  shareContent
}: ISBCD) => {
  // const desc = description
  return [
    {
      id: 1,
      href: encodeURI(`https://twitter.com/intent/tweet?text=${shareContent}`),
      title,
      dataAction: '',
      name: 'Twitter',
      icon: ''
    },
    {
      id: 2,
      href: encodeURI(
        `https://www.linkedin.com/sharing/share-offsite/?url=${baseUrl.replace(
          '&',
          '%26'
        )}`
      ),
      title,
      dataAction: '',
      name: 'Linkedin',
      icon: ''
    },
    {
      id: 3,
      href: encodeURI(`https://wa.me/?text=${shareContent}`),
      title: encodeURI(`${title}`),
      dataAction: 'share/whatsapp/share',
      name: 'Whatsapp',
      icon: ''
    },
    {
      id: 6,
      href: `viber://forward?text=${encodeURI(shareContent)}`,
      title,
      dataAction: '',
      name: 'Viber',
      icon: ''
    },
    {
      id: 7,
      href: encodeURI(
        `https://telegram.me/share/url?url=${baseUrl}&text=${shareContent}`
      ),
      title,
      dataAction: '',
      name: 'Telegram',
      icon: ''
    }
  ]
}

interface ISC {
  title: string
  dataAction: string
  href: string
  name: string
  icon: string
}

export const ShareComponent: React.FC<ISC> = ({
  href,
  title,
  dataAction,
  name,
  icon
}) => {
  return (
    <div className="border-label rounded d-block w-100 px-3 py-2">
      <a
        href={href}
        data-action={dataAction}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        className="w-100 bg-hover"
        style={{ textDecoration: 'none', fontSize: '14px', color: '#444' }}
      >
        <div className="separator-h-1" />
        <li className="border-0 f-row jcsb aic">
          &nbsp;{name}
          {name.toLowerCase() === 'twitter' && <XSVG />}
          {name.toLowerCase() === 'linkedin' && <LinkedinSVG />}
          {name.toLowerCase() === 'whatsapp' && <WhatsappSVG />}
          {name.toLowerCase() === 'viber' && <ViberSVG />}
          {name.toLowerCase() === 'telegram' && <TelegramSVG />}
        </li>
        <div className="separator-h-1" />
      </a>
    </div>
  )
}
