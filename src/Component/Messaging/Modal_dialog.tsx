import { useEffect, type ReactNode } from 'react'
import Button, { type ButtonProps } from '../Action & Input/Button'
import ButtonGroup from '../Action & Input/Button_group'
import CloseIcon from '../icons/Close'

export type ModalSize = 'small' | 'medium' | 'large' | 'x-large'
export type ModalHeaderVariant = 'default' | 'no-close' | 'with-back'
export type ModalFooterVariant = 'default' | 'left-right'

export interface ModalDialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: ReactNode
  size?: ModalSize
  headerVariant?: ModalHeaderVariant
  footerVariant?: ModalFooterVariant
  onBack?: () => void
  className?: string
  // Footer buttons
  leftButton?: ButtonProps
  rightButtons?: ButtonProps[]
  rightButton?: ButtonProps
}

// Back Arrow Icon Component
function BackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function getSizeClasses(size: ModalSize): string {
  switch (size) {
    case 'small':
      return 'max-w-sm'
    case 'large':
      return 'max-w-2xl'
    case 'x-large':
      return 'max-w-4xl'
    default: // medium
      return 'max-w-lg'
  }
}

function getBaseClasses(): string {
  return [
    'fixed inset-0 z-50 flex items-center justify-center',
    'bg-natural/50 p-4'
  ].join(' ')
}

function getModalClasses(size: ModalSize, className?: string): string {
  return [
    'bg-white rounded-lg shadow-xl w-full overflow-hidden',
    getSizeClasses(size),
    className || ''
  ].filter(Boolean).join(' ')
}

function ModalDialog({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  headerVariant = 'default',
  footerVariant = 'default',
  leftButton,
  rightButtons = [],
  rightButton,
  onBack,
  className = ''
}: ModalDialogProps) {
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={getBaseClasses()}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div className={getModalClasses(size, className)}>
        {/* Header */}
        {(title || headerVariant !== 'no-close') && (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {headerVariant === 'with-back' && (
                <Button
                  variant="tertiary"
                  iconOnly
                  leftIcon={<BackIcon />}
                  onClick={onBack}
                  aria-label="Go back"
                  className="p-1"
                />
              )}
              {title && (
                <h2 className="h-lg text-natural">
                  {title}
                </h2>
              )}
            </div>
            
            {headerVariant !== 'no-close' && (
              <Button
                variant="tertiary"
                iconOnly
                leftIcon={<CloseIcon />}
                onClick={onClose}
                aria-label="Close modal"
                className="p-1"
              />
            )}
          </div>
        )}
        
        {/* Content */}
        {children && (
          <div className="p-4">
            {children}
          </div>
        )}
        
        {/* Footer */}
        {(leftButton || rightButton || rightButtons.length > 0) && (
          <div className={`flex items-center p-4 ${
            footerVariant === 'left-right' 
              ? 'justify-between' 
              : 'justify-end gap-3'
          }`}>
            {footerVariant === 'left-right' ? (
              <>
                <div>
                  {leftButton && (
                    <Button {...leftButton} />
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  {rightButton && (
                    <Button {...rightButton} />
                  )}
                  {rightButtons.length > 0 && (
                    <ButtonGroup
                      buttons={rightButtons}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                {rightButton && (
                  <Button {...rightButton} />
                )}
                {rightButtons.length > 0 && (
                  <ButtonGroup
                    buttons={rightButtons}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalDialog
