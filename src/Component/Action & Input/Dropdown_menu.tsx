import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Checkbox from './Checkbox'
import Radio from './Radio'

export type DropdownTriggerVariant = 'default' | 'icon'
export type DropdownMenuType = 'default' | 'checkbox' | 'radio'
export type DropdownAlign = 'start' | 'end' | 'auto'

export interface DropdownItem {
  id: string
  label: string
  icon?: ReactNode
}

export interface DropdownMenuProps {
  label?: string
  triggerVariant?: DropdownTriggerVariant
  menuType?: DropdownMenuType
  items: DropdownItem[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  className?: string
  disabled?: boolean
  align?: DropdownAlign
}

function getTriggerClasses(disabled: boolean, active: boolean, variant: DropdownTriggerVariant): string {
  const base = [
    'inline-flex gap-2 rounded-lg border transition-colors duration-150',
    'h-label',
  ]
  if (variant === 'icon') {
    base.push('p-2 w-9 h-9 justify-center items-center')
  } else {
    base.push('px-4 py-2 items-center')
  }
  if (disabled) return [...base, 'bg-natural/10 border-natural/20 text-natural/40 cursor-not-allowed'].join(' ')
  if (active) return [...base, 'bg-orange-100 border-primary text-primary'].join(' ')
  return [...base, 'bg-white border-natural/20 text-natural hover:border-natural/40'].join(' ')
}

function getMenuClasses(): string {
  return 'absolute mt-2 w-max bg-white border border-natural/20 rounded-md shadow-lg p-2 z-50'
}

function getItemClasses(selected: boolean, hovered: boolean): string {
  const base = 'flex items-center gap-1 w-full rounded-md p-2 b-md text-natural cursor-pointer'
  if (hovered && selected) return `${base} bg-orange-100`
  if (hovered) return `${base} bg-orange-10`
  if (selected) return `${base} bg-orange-100`
  return base
}

function DropdownMenu({
  label = 'Button',
  triggerVariant = 'default',
  menuType = 'default',
  items,
  value,
  onChange,
  className = '',
  disabled = false,
  align = 'auto',
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [resolvedAlign, setResolvedAlign] = useState<'start' | 'end'>('end')

  const isMultiple = menuType === 'checkbox'
  const selectedValues = Array.isArray(value) ? value : value ? [value] : []

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  useEffect(() => {
    if (!open) return
    // Resolve alignment when menu opens
    if (align === 'auto') {
      const width = triggerRef.current?.getBoundingClientRect().width ?? 0
      // If trigger is wide (>= 200px), align menu to the end; otherwise start
      setResolvedAlign(width >= 200 ? 'end' : 'start')
    } else {
      setResolvedAlign(align)
    }
  }, [open, align])

  const toggleValue = (id: string) => {
    if (disabled) return
    if (isMultiple) {
      const next = selectedValues.includes(id)
        ? selectedValues.filter(v => v !== id)
        : [...selectedValues, id]
      onChange?.(next)
    } else {
      onChange?.(id)
      setOpen(false)
    }
  }

  const clear = () => {
    if (disabled || !isMultiple) return
    onChange?.([])
  }

  const triggerContent = (
    <>
      {triggerVariant === 'default' && <span>{label}</span>}
      <svg className={`w-4 h-4 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </>
  )

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        ref={triggerRef}
        className={getTriggerClasses(disabled, open, triggerVariant)}
        onClick={() => !disabled && setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {triggerContent}
      </button>

      {open && !disabled && (
        <div
          role="menu"
          className={`${getMenuClasses()} ${resolvedAlign === 'end' ? 'right-0' : 'left-0'} top-full`}
        >
          {items.map(item => {
            const isSelected = selectedValues.includes(item.id)
            const isHovered = hovered === item.id
            return (
              <button
                key={item.id}
                type="button"
                className={getItemClasses(isSelected, isHovered)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => toggleValue(item.id)}
              >
                {menuType === 'checkbox' && (
                  <Checkbox checked={isSelected} onChange={() => toggleValue(item.id)} />
                )}
                {menuType === 'radio' && (
                  <Radio checked={isSelected} onChange={() => toggleValue(item.id)} />
                )}
                {item.icon ? <span className="text-natural/60">{item.icon}</span> : null}
                <span className="flex-1 text-left">{item.label}</span>
                {menuType === 'default' && isSelected && (
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )
          })}
          {menuType === 'checkbox' && (
            <div className="mt-2 px-2">
              <button type="button" className="b-sm text-natural/60 hover:text-red" onClick={clear}>Clear</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
