import React from 'react'
import typography from '../tokens/typhography'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'stroke' | 'danger'
type ButtonState = 'enabled' | 'hover' | 'active' | 'disabled'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  state?: ButtonState
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  iconOnly?: boolean
}

const baseLabelStyle = typography.heading.label

function classNames(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

const variantClasses: Record<ButtonVariant, Record<ButtonState, string>> = {
  primary: {
    enabled: 'bg-[var(--color-primary)] text-white',
    hover: 'bg-[var(--color-primary)]/90 text-white',
    active: 'bg-[var(--color-primary)]/80 text-white',
    disabled: 'bg-[var(--color-primary)]/40 text-white cursor-not-allowed',
  },
  secondary: {
    enabled: 'bg-[var(--color-blue)] text-white',
    hover: 'bg-[var(--color-blue-100)] text-white',
    active: 'bg-[var(--color-blue-100)]/90 text-white',
    disabled: 'bg-[var(--color-blue)]/40 text-white cursor-not-allowed',
  },
  tertiary: {
    enabled: 'bg-transparent text-[var(--color-primary)]',
    hover: 'bg-[var(--color-orange-10)] text-[var(--color-primary)]',
    active: 'bg-[var(--color-orange-10)] text-[var(--color-primary)]/90',
    disabled: 'text-[var(--color-primary)]/40 cursor-not-allowed',
  },
  stroke: {
    enabled: 'border border-[var(--color-stroke)] bg-white text-[var(--color-natural)]',
    hover: 'border border-[var(--color-stroke)] bg-[var(--color-natural-10)] text-[var(--color-natural)]',
    active: 'border border-[var(--color-stroke)] bg-[var(--color-natural-20)] text-[var(--color-natural)]',
    disabled: 'border border-[var(--color-stroke)] text-[var(--color-natural)]/40 cursor-not-allowed',
  },
  danger: {
    enabled: 'bg-[var(--color-red)] text-white',
    hover: 'bg-[var(--color-red-100)] text-white',
    active: 'bg-[var(--color-red-100)]/90 text-white',
    disabled: 'bg-[var(--color-red)]/40 text-white cursor-not-allowed',
  },
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  state = 'enabled',
  iconLeft,
  iconRight,
  iconOnly,
  children,
  className,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || state === 'disabled'

  const paddingY = 'py-1'
  const paddingX = 'px-3'

  const content = (
    <span
      style={baseLabelStyle}
      className={classNames(
        'inline-flex items-center gap-2',
        iconOnly ? 'p-2' : '',
      )}
    >
      {iconLeft && !iconOnly ? <span className="shrink-0">{iconLeft}</span> : null}
      {!iconOnly ? <span>{children}</span> : null}
      {iconRight && !iconOnly ? <span className="shrink-0">{iconRight}</span> : null}
      {iconOnly ? <span className="sr-only">{typeof children === 'string' ? children : 'button'}</span> : null}
    </span>
  )

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={classNames(
        'rounded-md transition-colors select-none',
        iconOnly ? 'p-2' : `${paddingY} ${paddingX}`,
        variantClasses[variant][state],
        isDisabled && 'pointer-events-none',
        className,
      )}
    >
      {content}
    </button>
  )
}

export default Button

