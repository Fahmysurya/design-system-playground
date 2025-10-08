import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

function Checkbox({ label, className = '', ...rest }: CheckboxProps) {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="appearance-none w-4 h-4 rounded border border-natural/40 checked:bg-primary checked:border-primary transition-colors"
        {...rest}
      />
      {label ? <span className="b-sm text-natural">{label}</span> : null}
    </label>
  )
}

export default Checkbox
