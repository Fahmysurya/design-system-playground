import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'stroke' | 'danger'
export type ButtonState = 'enable' | 'disable' | 'error' | 'active' | 'hover'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  variant?: ButtonVariant
  state?: ButtonState
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  iconOnly?: boolean
  children?: ReactNode
}

function getBaseClasses(iconOnly: boolean): string {
  const spacing = iconOnly ? 'px-2 py-2' : 'px-3 py-2'
  return [
    'inline-flex items-center justify-center gap-2 rounded-lg',
    'h-label select-none',
    'transition-colors duration-150',
    spacing,
  ].join(' ')
}

function getVariantClasses(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return 'bg-[var(--color-primary)] text-white hover:bg-primary/90 active:bg-primary/80'
    case 'secondary':
      return 'bg-secondary text-black hover:bg-secondary/90 active:bg-secondary/80'
    case 'tertiary':
      return 'bg-transparent text-primary hover:bg-primary/10 active:bg-primary/15'
    case 'stroke':
      return 'bg-transparent text-primary border border-primary hover:bg-primary/10 active:bg-primary/15'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-600/90 active:bg-red-600/80'
    default:
      return ''
  }
}

function getStateClasses(state: ButtonState, variant: ButtonVariant): string {
  if (state === 'disable') return 'opacity-50 cursor-not-allowed pointer-events-none'
  if (state === 'hover') return '' // hover handled by variant classes
  if (state === 'active') return '' // active handled by variant classes
  if (state === 'error') {
    if (variant === 'stroke') return 'border-red-600 text-red-600'
    if (variant === 'tertiary') return 'text-red-600'
    return 'bg-red-600 text-white'
  }
  return ''
}

export default function Button({
  variant = 'primary',
  state = 'enable',
  leftIcon,
  rightIcon,
  iconOnly = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base = getBaseClasses(iconOnly)
  const variantCls = getVariantClasses(variant)
  const stateCls = getStateClasses(state, variant)

  const classes = [base, variantCls, stateCls, className].filter(Boolean).join(' ')

  return (
    <button
      aria-disabled={state === 'disable'}
      disabled={state === 'disable'}
      className={classes}
      {...rest}
    >
      {iconOnly ? (
        <span className="shrink-0" aria-hidden>{leftIcon ?? rightIcon}</span>
      ) : (
        <>
          {leftIcon ? <span className="shrink-0" aria-hidden>{leftIcon}</span> : null}
          <span>{children}</span>
          {rightIcon ? <span className="shrink-0" aria-hidden>{rightIcon}</span> : null}
        </>
      )}
      {iconOnly ? <span className="sr-only">{typeof children === 'string' ? children : 'Button'}</span> : null}
    </button>
  )
}
