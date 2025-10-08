import type { InputHTMLAttributes } from 'react'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

function Radio({ label, className = '', ...rest }: RadioProps) {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="radio"
        className="appearance-none w-4 h-4 rounded-full border border-natural/40 checked:border-primary transition-colors grid place-items-center"
        {...rest}
      />
      {label ? <span className="b-sm text-natural">{label}</span> : null}
      <style>{`
        input[type="radio"].checked::after { display: block; }
      `}</style>
    </label>
  )
}

export default Radio
