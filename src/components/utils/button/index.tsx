import ButtonLoader from './button-loader'
import { CloseSVG, TrashSVG } from '../svgs'
import './index.scss'
import { forwardRef } from 'react'

export type buttonType = 'bold' | 'outlined' | 'disabled' | 'danger' | 'black'
export type buttonSize = 'small' | 'medium' | 'large' | 'table'

interface IButton extends React.ComponentPropsWithoutRef<'button'> {
  buttonType?: buttonType
  buttonSize?: buttonSize
  buttonShape?: 'square' | 'pill' | 'curve'
  title: string
  innerTitle?: string
  load?: boolean
  icon?: JSX.Element
  mobileOnlyIcon?: boolean
  onlyIcon?: boolean
  mtauto?: 'true' | 'false'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  iconColor?: string
  iconPosition?: 'left' | 'right'
  close?: boolean
  trash?: boolean
}

// eslint-disable-next-line react/display-name
export const TypeButton = forwardRef(
  (
    {
      buttonType,
      buttonSize,
      title,
      innerTitle,
      load,
      icon,
      mobileOnlyIcon,
      onlyIcon,
      iconColor,
      mtauto,
      onClick,
      iconPosition,
      buttonShape,
      close,
      trash,
      ...props
    }: IButton,
    ref
  ) => {
    return (
      // <FormControlContainer mtauto={mtauto}>
      <BtnWrapper
        ariaLabel={props['aria-label'] || title || 'mytipster button'}
        buttonType={buttonType}
        buttonSize={buttonSize}
        buttonShape={buttonShape}
        props={props}
        btnref={ref as React.LegacyRef<HTMLButtonElement> | undefined}
        onClick={load ? undefined : onClick}
      >
        {!load ? (
          <span>
            {icon && iconPosition !== 'right' && <span>{icon}</span>}
            {innerTitle ? (
              <div dangerouslySetInnerHTML={{ __html: innerTitle }} />
            ) : (
              <TitleComp
                close={close}
                iconPosition={iconPosition}
                mobileOnlyIcon={mobileOnlyIcon}
                onlyIcon={onlyIcon}
                title={title}
                trash={trash}
                icon={icon}
              />
            )}
            {icon && iconPosition === 'right' && <span>{icon}</span>}
          </span>
        ) : (
          <ButtonLoader
            className={buttonType === 'outlined' ? 'bg-dark' : ''}
          />
        )}
      </BtnWrapper>
      // </FormControlContainer>
    )
  }
)

const TitleComp = ({
  onlyIcon,
  mobileOnlyIcon,
  icon,
  iconPosition,
  trash,
  close,
  title
}: {
  onlyIcon: boolean | undefined
  mobileOnlyIcon: boolean | undefined
  icon?: JSX.Element | undefined
  iconPosition: 'left' | 'right' | undefined
  trash: boolean | undefined
  close: boolean | undefined
  title: string
}) => {
  return (
    <>
      {!onlyIcon && (
        <span
          className={
            icon && mobileOnlyIcon ? 'd-none d-md-inline' : icon ? '' : ''
          }
        >
          {icon && iconPosition !== 'right' && <span>&nbsp;&nbsp;&nbsp;</span>}
          {trash ? <TrashSVG /> : close ? <CloseSVG /> : title}
          {icon && iconPosition === 'right' && <span>&nbsp;&nbsp;&nbsp;</span>}
        </span>
      )}
    </>
  )
}

interface IBW {
  buttonType?: 'bold' | 'outlined' | 'disabled' | 'danger' | 'black'
  buttonSize?: 'small' | 'medium' | 'large' | 'table'
  buttonShape?: 'square' | 'pill' | 'curve'
  props: any & { className: string }
  btnref?: React.LegacyRef<HTMLButtonElement> | undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  children?: any
  ariaLabel: string
}

const BtnWrapper: React.FC<IBW> = ({
  buttonType,
  buttonSize,
  buttonShape,
  props,
  btnref,
  children,
  onClick,
  ariaLabel
}) => {
  return (
    <>
      <button
        {...props}
        aria-label={ariaLabel}
        // eslint-disable-next-line react/prop-types
        className={`type-button ${props.className || ''} ${buttonType || ''} ${
          buttonSize === 'table' ? 'table-btn' : buttonSize || ''
        } ${buttonShape || ''}`}
        onClick={buttonType === 'disabled' ? null : onClick}
        ref={btnref}
      >
        {children}
      </button>
    </>
  )
}

interface ISmallButton extends React.ComponentPropsWithoutRef<'button'> {
  buttonType?: 'bold' | 'outlined' | 'disabled' | 'danger' | 'active'
  buttonSize?: 'small' | 'medium' | 'large' | 'table'
  title: string
  load?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  close?: boolean
  status?: boolean
  active?: boolean
}

// eslint-disable-next-line react/display-name
export const TypeSmallButton = forwardRef(
  (
    {
      buttonType,
      buttonSize,
      title,
      load,
      onClick,
      close,
      status,
      active,
      ...props
    }: ISmallButton,
    ref
  ) => {
    return (
      <div className="type-small-button">
        <button
          {...props}
          className={`${buttonType || ''} ${buttonSize || ''} ${
            props.className
          } ${status ? 'status' : ''} ${active ? 'active' : ''}
          ${props.disabled ? 'disabled' : ''}`}
          ref={ref as React.LegacyRef<HTMLButtonElement> | undefined}
          onClick={load || status ? undefined : onClick}
          disabled={load || status || props.disabled}
        >
          {!load ? (
            <span>{close ? <CloseSVG /> : title}</span>
          ) : (
            <ButtonLoader
              className={buttonType === 'outlined' ? 'bg-dark' : ''}
            />
          )}
        </button>
      </div>
    )
  }
)
