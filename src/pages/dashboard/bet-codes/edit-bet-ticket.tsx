import { UseFormReturn } from 'react-hook-form'
import { IEditPredictGameSchema } from '../../onboarding/data'

interface ICBG {
  hookForm: UseFormReturn<IEditPredictGameSchema, any>
  // handleSubmit: (data: IEditPredictGameSchema) => void
  load?: boolean
}

const EditBetTicket: React.FC<ICBG> = ({ hookForm }) => {
  // const onCloseTag = (index: number) => {
  //   const tags = hookForm.watch().sports || []
  //   tags.splice(index, 1)
  //   hookForm.setValue('sports', tags)
  // }

  // const onEnterTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  // const value = hookForm.watch().sportsValue
  // if (!value) return
  // const tags = hookForm.watch().sports || []
  // tags.push(value)
  // hookForm.setValue('sports', tags)
  //   }
  // }

  // const betTags = () => {
  //   const bets = hookForm.watch().sports
  //   if (!bets) return []
  //   return bets
  // }

  // const betErrorTags = () => {
  //   const bets = hookForm.formState.errors.sports?.message
  //   if (!bets) return ''
  //   return bets
  // }

  // const getError = (key: IPredictionItemKey) => {
  //   const error = hookForm?.formState?.errors
  //   return error ? error[key]?.message : ''
  // }

  return (
    <div className="mx-auto w-100 bg-white rounded">
      <form onSubmit={(e) => e.preventDefault()} className="mx-auto w-100">
        {/* <Prediction
          betErrorTags={betErrorTags}
          betTags={betTags}
          getError={getError}
          onCloseTag={onCloseTag}
          onEnterTag={onEnterTag}
          hookForm={hookForm}
          betWebsites={betWebsites}
        /> */}
      </form>
    </div>
  )
}

export default EditBetTicket

// const TagItem = ({
//   text,
//   onClose,
//   index
// }: {
//   text: string
//   onClose: (index: number) => void
//   index: number
// }) => {
//   return (
//     <div
//       style={{ width: 'max-content', height: 'max-content', cursor: 'pointer' }}
//       className="rounded bg-dark text-light px-2 py-1 mr-1 my-1"
//       onClick={() => onClose(index)}
//     >
//       <p className="text-little m-0">
//         {text}
//         <span>
//         </span>
//       </p>
//     </div>
//   )
// }

// const TagComponent = ({
//   tags,
//   onClose,
//   children
// }: {
//   tags: string[]
//   onClose: (index: number) => void
//   children?: any
// }) => {
//   if (!tags)
//     return (
//       <div
//         className="w-100 f-row flex-wrap "
//         style={{ height: 'max-content' }}
//       >
//         {children}
//       </div>
//     )
//   return (
//     <div
//       className="w-100 f-row aic flex-wrap border-line px-1"
//       style={{ height: 'max-content' }}
//     >
//       {tags.map((i, index) => (
//         <TagItem index={index} onClose={onClose} text={i} key={index} />
//       ))}
//       {children}
//     </div>
//   )
// }

// const TagInputComponent = ({
//   onClose,
//   tags,
//   placeholder,
//   register,
//   betErrorTag,
//   onEnterTag,
//   label
// }: {
//   onClose: (index: number) => void
//   tags: string[]
//   placeholder: string | undefined
//   register: UseFormRegister<IEditPredictGameSchema>
//   betErrorTag: string
//   onEnterTag: (e: React.KeyboardEvent<HTMLInputElement>) => void
//   label: string
// }) => {
//   return (
//     <div className="w-100 py-1 px-2 text-left">
//       <InputLabelComponent htmlFor={'betTagValue'}>{label}</InputLabelComponent>
//       <p className="text-little" style={{ color: DISABLED_COLOR }}>
//         Type and press enter to add tag
//       </p>
//       <TagComponent onClose={onClose} tags={tags}>
//         {/* <input
//           placeholder={tags.length === 0 ? placeholder : ''}
//           {...register(`sportsValue`)}
//           className="border-0"
//           style={{ flex: 1, outline: 'none', height: '40px' }}
//           onKeyDown={onEnterTag}
//         /> */}
//       </TagComponent>

//       {(tags.length || 0) < 1 ? (
//         <>
//           <Separator customheight={0} />
//           <TextPrompt prompt={betErrorTag} />
//         </>
//       ) : null}
//     </div>
//   )
// }

// const Prediction = ({
//   getError,
//   betTags,
//   betErrorTags,
//   onCloseTag,
//   onEnterTag,
//   hookForm,
//   betWebsites
// }: {
//   getError: (key: IPredictionItemKey) => string | undefined
//   betTags: () => string[]
//   betErrorTags: () => string
//   onCloseTag: (index: number) => void
//   onEnterTag: (e: React.KeyboardEvent<HTMLInputElement>) => void
//   hookForm: UseFormReturn<IEditPredictGameSchema, any>
//   betWebsites: IBookie[]
// }) => {
//   const { register } = hookForm

//   return (
//     <div className="p-2 bg-white">
//       <GridWrapper minmax={'45%'} style={{ gap: '20px' }}>
//         <TypeInput
//           label="Bet Code"
//           placeholder="Enter Bet Code"
//           customwidth={'100%'}
//           {...register(`code`)}
//           error={getError('code')}
//         />
//         <TypeSelect
//           label="Bookie"
//           initoption={{ label: 'Select Bookie', value: '' }}
//           optionsdata={betWebsites.map((i) => ({
//             id: i.id,
//             label: i.title,
//             value: i.title
//           }))}
//           customwidth={'100%'}
//           {...register(`bookie`)}
//           error={getError('bookie')}
//         />
//         <TypeInput
//           label="Bet Odd"
//           placeholder="Eg: 12.54"
//           customwidth={'100%'}
//           {...register(`odds`)}
//           error={getError('odds')}
//         />
//         <TypeInput
//           label="End Date"
//           type="date"
//           customwidth={'100%'}
//           {...register(`endDate`)}
//           error={getError('endDate')}
//         />
//       </GridWrapper>
//       <Separator customheight={5} />
//       <div>
//         <TagInputComponent
//           betErrorTag={betErrorTags()}
//           label="Bet Tags (Eg: Tennis, Soccer, English Premiership, FA Cup, ATL Cup)"
//           onClose={onCloseTag}
//           onEnterTag={onEnterTag}
//           placeholder="Type and press enter to add tag"
//           register={register}
//           tags={betTags()}
//         />
//       </div>
//     </div>
//   )
// }
