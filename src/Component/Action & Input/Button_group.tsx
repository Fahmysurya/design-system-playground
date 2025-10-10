import Button, { type ButtonProps } from './Button'

export interface ButtonGroupProps {
  /** The buttons to render in the group */
  buttons: Array<ButtonProps & { key?: string }>
  /** Additional CSS classes */
  className?: string
  /** The variant to apply to all buttons in the group */
  variant?: ButtonProps['variant']
}

function ButtonGroup({
  buttons,
  className = '',
  variant
}: ButtonGroupProps) {
  return (
    <div className={`flex gap-3 ${className}`} role="group">
      {buttons.map((button, index) => {
        const { key, ...buttonProps } = button
        
        return (
          <Button
            key={key || index}
            variant={variant || buttonProps.variant}
            {...buttonProps}
          />
        )
      })}
    </div>
  )
}

export default ButtonGroup
