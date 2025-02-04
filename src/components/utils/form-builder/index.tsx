import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { TypeInput } from '../input'
import TypePhoneInput from '../phone-input'
import { TypeSelect } from '../select'
import { TypeTextArea } from '../text-area'
import { TypeCheckbox } from '../checkbox'
import { TypePassword } from '../password'
import Review from '../review'
import Rating from '../rating'
import WYSIWYG from '../wysiwyg'
import { TypeRadio } from '../radio'
import { HVC } from '../hvc'
import BoxCheck, { IBCItem } from '../box-check'
import { ICardListItem } from '../card-list/utils'
import CardList from '../card-list'
import TextPrompt from '../text-prompt'

export type typecomponent =
  | 'input'
  | 'phone'
  | 'select'
  | 'text-area'
  | 'radio'
  | 'check-box'
  | 'password'
  | 'review'
  | 'rating'
  | 'wysiwyg'
  | 'date'
  | 'box-check'
  | 'card-list'

interface ISelectOptions {
  id: number
  label: string
  value: string | number
}

export interface IFormComponent {
  id: string
  label?: string
  placeHolder?: string
  type?: string
  component: typecomponent
  initOptions?: ISelectOptions
  optionData?: ISelectOptions[]
  isonlyview?: boolean
  disabled?: boolean
  text?: string
  name?: string
  value?: string | number | readonly string[]
  cta?: {
    text: string
    link: string
    type: 'external' | 'internal'
  }
  min?: string | number
  max?: string | number
  hide?: boolean
  // box-check
  boxCheckOptions?: IBCItem[]
  onBokCheckSelect?: (value: string | number) => void
  moreOption?: {
    text: string
    action: () => void
  }
  cardLists?: ICardListItem[]
  autoresize?: boolean
  checkboxGroup?: string[]
}

interface IFormBuilder<T extends FieldValues> {
  formComponent: IFormComponent[]
  hookForm: UseFormReturn<T, any>
  size?: 'small' | 'normal'
}

const FormBuilder = <T extends FieldValues>({
  formComponent,
  hookForm,
  size
}: IFormBuilder<T>) => {
  const err = (i: IFormComponent) =>
    hookForm.formState.errors?.[i.id as Path<T>]?.message as string
  return (
    <>
      {formComponent.map((i) => (
        <HVC removeDOM view={!i.hide} key={i.id}>
          {i.component === 'input' && (
            <TypeInput
              {...hookForm.register(i.id as Path<T>)}
              label={i.label}
              placeholder={i.placeHolder}
              type={i.type}
              error={err(i)}
              customwidth={'100%'}
              isonlyview={i.isonlyview}
              disabled={i.disabled || i.isonlyview}
              value={i.value}
              step="any"
              style={{
                height: size === 'small' ? '40px' : '',
                fontSize: size === 'small' ? '13px' : ''
              }}
            />
          )}
          {i.component === 'date' && (
            <TypeInput
              {...hookForm.register(i.id as Path<T>)}
              label={i.label}
              placeholder={i.placeHolder}
              type={i.type}
              min={i.min}
              max={i.max}
              error={err(i)}
              customwidth={'100%'}
              isonlyview={i.isonlyview}
              disabled={i.disabled || i.isonlyview}
              style={{
                height: size === 'small' ? '40px' : '',
                fontSize: size === 'small' ? '13px' : ''
              }}
            />
          )}
          {i.component === 'box-check' && (
            <BoxCheck
              label={i.label}
              onSelect={(value) => {
                hookForm.setValue(
                  i.id as Path<T>,
                  value as PathValue<T, Path<T>>
                )
                i?.onBokCheckSelect?.(value)
              }}
              options={i.boxCheckOptions}
              moreOption={i.moreOption}
              error={err(i)}
            />
          )}
          {i.component === 'password' && (
            <TypePassword
              {...hookForm.register(i.id as Path<T>)}
              label={i.label}
              placeholder={i.placeHolder}
              type={i.type}
              error={err(i)}
              customwidth={'100%'}
              style={{
                height: size === 'small' ? '40px' : '',
                fontSize: size === 'small' ? '13px' : ''
              }}
            />
          )}
          {i.component === 'phone' && (
            <TypePhoneInput
              {...hookForm.register(i.id as Path<T>)}
              label={i.label}
              placeholder={i.placeHolder}
              handleOnChange={(phone) => {
                hookForm.setValue(
                  i.id as Path<T>,
                  phone as PathValue<T, Path<T>>
                )
              }}
              type={i.type}
              error={err(i)}
              customwidth={'100%'}
              value={hookForm.watch(i.id as Path<T>) || i.value}
              style={{
                height: size === 'small' ? '40px' : '',
                fontSize: size === 'small' ? '13px' : ''
              }}
            />
          )}
          {i.component === 'select' && (
            <TypeSelect
              {...hookForm.register(i.id as Path<T>)}
              initoption={i.initOptions as ISelectOptions}
              optionsdata={i.optionData as ISelectOptions[]}
              customwidth={'100%'}
              label={i.label}
              error={err(i)}
              style={{
                height: size === 'small' ? '40px' : '',
                fontSize: size === 'small' ? '13px' : ''
              }}
            />
          )}
          {i.component === 'text-area' && (
            <TypeTextArea
              {...hookForm.register(i.id as Path<T>)}
              placeholder={i.placeHolder}
              label={i.label}
              error={err(i)}
              style={{
                fontSize: size === 'small' ? '13px' : ''
              }}
              autoresize={i.autoresize}
            />
          )}
          {i.component === 'wysiwyg' && (
            <WYSIWYG
              setEditorHtml={(html) => {
                hookForm.setValue(
                  i.id as Path<T>,
                  html as PathValue<T, Path<T>>
                )
              }}
              editorHtml={hookForm.watch(i.id as Path<T>)}
              label={i.label}
              error={err(i)}
              placeholder={i.placeHolder}
            />
          )}
          {i.component === 'check-box' && (
            <div className="f-column-13">
              <div className="f-row-11 align-items-center">
                <label htmlFor={i?.id} className="m-0 input-label-component">
                  {i?.label}
                </label>
              </div>
              <div className="border-label rounded p-3 f-column-17">
                {i.checkboxGroup?.map((checkBoxItem, jnx) => (
                  <div className="f-row-15 aic" key={jnx}>
                    <TypeCheckbox
                      onChange={(e) => {
                        const checks: string[] =
                          hookForm.watch(i?.id as Path<T>) || [] // Store initial value in a variable
                        const updatedChecks = e.currentTarget.checked
                          ? [
                              ...checks, // Remove existing entry with the same label
                              checkBoxItem // Add the new entry
                            ]
                          : checks.filter((p) => p !== checkBoxItem) // Remove the unchecked entry

                        hookForm.setValue(
                          i?.id as Path<T>,
                          updatedChecks as any
                        ) // Update the value
                      }}
                      checked={hookForm
                        ?.watch(i?.id as Path<T>)
                        ?.includes?.(checkBoxItem)}
                    />
                    <p className="m-0 text-small">{checkBoxItem}</p>
                  </div>
                ))}
              </div>
              {err(i) && <TextPrompt prompt={err(i)} status={false} />}
            </div>
          )}
          {i.component === 'radio' && (
            <div className="f-row-15 aic">
              <TypeRadio
                id={i.id}
                value={i.id}
                {...hookForm.register(i.name as Path<T>)}
                error={
                  hookForm.formState.errors?.[i.name as Path<T>]
                    ?.message as string
                }
              />
              <p className="m-0 text-small">{i.label}</p>
            </div>
          )}
          {i.component === 'review' && (
            <Review
              label={i.label}
              setRating={(rating) => {
                hookForm?.setValue?.(
                  i.id as Path<T>,
                  rating as PathValue<T, Path<T>>
                )
              }}
              error={
                hookForm.formState.errors?.[i.id as Path<T>]?.message as string
              }
              rating={hookForm.watch(i.id as Path<T>)}
            />
          )}
          {i.component === 'rating' && (
            <Rating rating={hookForm.getValues(i.id as Path<T>)} />
          )}
          {i.component === 'card-list' && (
            <CardList
              cardLists={i.cardLists}
              onAction={(card) => {
                hookForm?.setValue?.(
                  i.id as Path<T>,
                  card.value as PathValue<T, Path<T>>
                )
              }}
            />
          )}
        </HVC>
      ))}
    </>
  )
}

export default FormBuilder
