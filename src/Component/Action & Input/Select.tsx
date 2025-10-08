import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'

export type SelectState = 'enable' | 'active' | 'disable' | 'invalid'
export type SelectVariant = 'default' | 'prefix' | 'multiple'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  state?: SelectState
  variant?: SelectVariant
  label?: string
  helperText?: string
  errorMessage?: string
  placeholder?: string
  options: SelectOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  prefixIcon?: ReactNode
  className?: string
}

function getSelectClasses(state: SelectState, variant: SelectVariant): string {
  const baseClasses = [
    'w-full px-3 py-1.5 rounded-md border transition-colors duration-150',
    'b-md cursor-pointer flex items-center justify-between',
    'placeholder:text-natural/60'
  ]

  switch (state) {
    case 'disable':
      return [
        ...baseClasses,
        'bg-natural/10 border-natural/20 text-natural/40',
        'cursor-not-allowed'
      ].join(' ')
    
    case 'active':
      return [
        ...baseClasses,
        'bg-white border-blue focus:outline-none focus:ring-2 focus:ring-blue/20',
        'text-natural'
      ].join(' ')
    
    case 'invalid':
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

function getLabelClasses(state: SelectState): string {
  const baseClasses = 'b-md text-natural block mb-1 text-left'
  
  if (state === 'disable') {
    return `${baseClasses} text-natural/40`
  }
  
  return baseClasses
}

function getHelperTextClasses(state: SelectState): string {
  const baseClasses = 'b-sm mt-1 text-left'
  
  if (state === 'invalid') {
    return `${baseClasses} text-red`
  }
  
  if (state === 'disable') {
    return `${baseClasses} text-natural/40`
  }
  
  return `${baseClasses} text-natural/60`
}

function getDropdownClasses(state: SelectState): string {
  const baseClasses = 'absolute top-full left-0 right-0 mt-1 bg-white border border-natural/20 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto'
  
  if (state === 'invalid') {
    return `${baseClasses} border-red/20`
  }
  
  return baseClasses
}

function getOptionClasses(isSelected: boolean, isHovered: boolean): string {
  const baseClasses = 'px-4 py-2 b-sm text-natural cursor-pointer flex items-center justify-between'
  
  if (isSelected || isHovered) {
    return `${baseClasses} bg-orange-100`
  }
  
  return `${baseClasses} hover:bg-natural/5`
}

function getTagClasses(): string {
  return 'inline-flex items-center gap-1 px-2 py-0.5 bg-natural/10 text-natural b-sm rounded'
}

function Select({
  state = 'enable',
  variant = 'default',
  label,
  helperText,
  errorMessage,
  placeholder = 'Select option',
  options,
  value,
  onChange,
  prefixIcon,
  className = ''
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const selectRef = useRef<HTMLDivElement>(null)
  
  const isMultiple = variant === 'multiple'
  const isDisabled = state === 'disable'
  const isActive = state === 'active' || isOpen
  
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setHoveredIndex(-1)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectClasses = getSelectClasses(isActive ? 'active' : state, variant)
  const labelClasses = getLabelClasses(state)
  const helperTextClasses = getHelperTextClasses(state)
  const dropdownClasses = getDropdownClasses(state)
  
  const displayText = state === 'invalid' && errorMessage ? errorMessage : helperText

  const handleSelect = (optionValue: string) => {
    if (isDisabled) return
    
    if (isMultiple) {
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue]
      onChange?.(newValues)
    } else {
      onChange?.(optionValue)
      setIsOpen(false)
    }
  }

  const removeTag = (tagValue: string) => {
    if (isMultiple && Array.isArray(value)) {
      const newValues = value.filter(v => v !== tagValue)
      onChange?.(newValues)
    }
  }

  const clearAll = () => {
    if (isMultiple) {
      onChange?.([])
    } else {
      onChange?.('')
    }
  }

  const getDisplayValue = () => {
    if (isMultiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder
      if (value.length === 1) {
        const option = options.find(opt => opt.value === value[0])
        return option?.label || value[0]
      }
      return `${value.length} selected`
    }
    
    if (typeof value === 'string') {
      const option = options.find(opt => opt.value === value)
      return option?.label || placeholder
    }
    
    return placeholder
  }

  const getSelectedTags = () => {
    if (!isMultiple || !Array.isArray(value)) return []
    return value.map(val => {
      const option = options.find(opt => opt.value === val)
      return { value: val, label: option?.label || val }
    })
  }

  return (
    <div className={`w-full relative ${className}`} ref={selectRef}>
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <div
          className={selectClasses}
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
        >
          {variant === 'prefix' && prefixIcon && (
            <div className="flex items-center gap-2">
              <span className="text-natural/60">{prefixIcon}</span>
            </div>
          )}
          
          {variant === 'multiple' ? (
            <div className="flex items-center gap-2 flex-wrap min-h-[20px]">
              {getSelectedTags().length > 0 ? (
                <div className="flex items-center gap-1 flex-wrap">
                  {getSelectedTags().map(tag => (
                    <span key={tag.value} className={getTagClasses()}>
                      {tag.label}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeTag(tag.value)
                        }}
                        className="ml-1 hover:text-red"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-natural/60">{placeholder}</span>
              )}
            </div>
          ) : (
            <span className={getSelectedTags().length > 0 || value ? 'text-natural' : 'text-natural/60'}>
              {getDisplayValue()}
            </span>
          )}
          
          <div className="flex items-center gap-2">
            {(value && (!Array.isArray(value) || value.length > 0)) && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  clearAll()
                }}
                className="text-natural/60 hover:text-red"
              >
                ×
              </button>
            )}
            <svg
              className={`w-4 h-4 text-natural/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {isOpen && !isDisabled && (
          <div className={dropdownClasses}>
            {options.map((option, index) => {
              const isSelected = isMultiple 
                ? Array.isArray(value) && value.includes(option.value)
                : value === option.value
              const isHovered = index === hoveredIndex
              
              return (
                <div
                  key={option.value}
                  className={getOptionClasses(isSelected, isHovered)}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
      
      {displayText && (
        <p className={helperTextClasses}>
          {displayText}
        </p>
      )}
    </div>
  )
}

export default Select
