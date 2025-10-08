import type { InputHTMLAttributes } from 'react'

export type InputState = 'enable' | 'disable' | 'focus' | 'error'
export type InputType = 'text' | 'number' | 'email'

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'type'> {
  state?: InputState
  type?: InputType
  label?: string
  helperText?: string
  errorMessage?: string
}

function getInputClasses(state: InputState): string {
  const baseClasses = [
    'w-full px-3 py-1.5 rounded-md border transition-colors duration-150',
    'b-md', // Using b-md font as specified
    'placeholder:text-natural/60'
  ]

  switch (state) {
    case 'disable':
      return [
        ...baseClasses,
        'bg-natural/10 border-natural/20 text-natural/40',
        'cursor-not-allowed'
      ].join(' ')
    
    case 'focus':
      return [
        ...baseClasses,
        'bg-white border-blue focus:outline-none focus:ring-2 focus:ring-blue/20',
        'text-natural'
      ].join(' ')
    
    case 'error':
      return [
        ...baseClasses,
        'bg-white border-red focus:outline-none focus:ring-2 focus:ring-red/20',
        'text-natural'
      ].join(' ')
    
    case 'enable':
    default:
      return [
        ...baseClasses,
        'bg-white border-natural/20 text-natural',
        'hover:border-natural/40 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20'
      ].join(' ')
  }
}

function getLabelClasses(state: InputState): string {
  const baseClasses = 'h-xs text-natural block mb-1 text-left'
  
  if (state === 'disable') {
    return `${baseClasses} text-natural/40`
  }
  
  return baseClasses
}

function getHelperTextClasses(state: InputState): string {
  const baseClasses = 'b-sm mt-1 text-left'
  
  if (state === 'error') {
    return `${baseClasses} text-red`
  }
  
  if (state === 'disable') {
    return `${baseClasses} text-natural/40`
  }
  
  return `${baseClasses} text-natural/60`
}

function TextInput({
  state = 'enable',
  type = 'text',
  label,
  helperText,
  errorMessage,
  className = '',
  placeholder = 'Placeholder',
  ...rest
}: TextInputProps) {
  const inputClasses = getInputClasses(state)
  const labelClasses = getLabelClasses(state)
  const helperTextClasses = getHelperTextClasses(state)
  
  // Use error message if provided, otherwise fall back to helper text
  const displayText = state === 'error' && errorMessage ? errorMessage : helperText
  const isDisabled = state === 'disable'

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      <input
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        disabled={isDisabled}
        {...rest}
      />
      
      {displayText && (
        <p className={helperTextClasses}>
          {displayText}
        </p>
      )}
    </div>
  )
}

export default TextInput
