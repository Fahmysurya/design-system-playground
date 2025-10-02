import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'stroke' | 'danger'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  iconOnly?: boolean
}

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

// Shared base styles
const BASE = 'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-[14px] leading-4 font-semibold transition-colors select-none'

// Variant specific styles using hover/active/disabled states
const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-orange-100)] active:bg-[var(--color-orange-10)]/80 disabled:bg-[var(--color-primary)]/40 disabled:text-white disabled:cursor-not-allowed',
  secondary:
    'bg-[var(--color-natural-40)] text-[var(--color-natural)] hover:bg-[var(--color-natural-60)] active:bg-[var(--color-orange-10)] disabled:bg-[var(--color-blue)]/40 disabled:text-white disabled:cursor-not-allowed',
  tertiary:
    'bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-natural-60)] active:bg-[var(--color-orange-10)]/90 disabled:text-[var(--color-primary)]/40 disabled:cursor-not-allowed',
  stroke:
    'border border-[var(--color-stroke)] bg-white text-[var(--color-natural)] hover:bg-[var(--color-natural-10)] active:bg-[var(--color-natural-20)] disabled:text-[var(--color-natural)]/40 disabled:cursor-not-allowed',
  danger:
    'bg-[var(--color-red)] text-white hover:bg-[var(--color-red-100)] active:bg-[var(--color-red-100)]/90 disabled:bg-[var(--color-red)]/40 disabled:text-white disabled:cursor-not-allowed',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  iconLeft,
  iconRight,
  iconOnly,
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cx(
        BASE,
        iconOnly ? 'p-2' : '',
        VARIANTS[variant],
        className,
      )}
    >
      {iconLeft && !iconOnly ? <span className="shrink-0">{iconLeft}</span> : null}
      {!iconOnly ? <span>{children}</span> : <span className="sr-only">{typeof children === 'string' ? children : 'button'}</span>}
      {iconRight && !iconOnly ? <span className="shrink-0">{iconRight}</span> : null}
    </button>
  )
}

export default Button

