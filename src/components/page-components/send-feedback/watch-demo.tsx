import { FC } from 'react'
import { IWatchDemo } from './utils'

export const WatchDemo: FC<IWatchDemo> = ({ feedbackContent }) => {
  return (
    <>
      <video controls className="w-100">
        <source src="" />
      </video>
    </>
  )
}
