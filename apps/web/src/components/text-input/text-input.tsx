import clsx from 'clsx'
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { v4 as uuid } from 'uuid'

import css from './text-input.module.css'

interface TextInputProps {
  error?: string
  handleChange?: (value: string) => void
  helpText?: string
  label?: string
  variant?: 'small' | 'medium'
}

export default function TextInput({
  className,
  disabled,
  error,
  handleChange,
  helpText,
  id,
  label,
  readOnly,
  variant = 'medium',
  ...props
}: TextInputProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  const _id = id ?? uuid()
  const inputField = (
    <input
      className={clsx(
        'w-full font-poppins bg-gray-900 border-2 border-gray-600 rounded-lg placeholder-gray-400 text-gray-50 focus:outline-none focus:border-blue-400 focus:ring-white focus:text-white px-3 py-2',
        {
          [css.inputDisabled]: readOnly || disabled,
          [css.inputError]: error,
          ['border-gray-600']: !error,
          [css.inputMedium]: variant === 'medium',
          [css.inputSmall]: variant === 'small',
        },
        className
      )}
      disabled={disabled}
      id={_id}
      onChange={(event: ChangeEvent & { target: { value: string } }) => {
        event.preventDefault()
        if (event && event.target && handleChange) {
          handleChange(event.target.value)
        }
      }}
      readOnly={readOnly}
      {...props}
    />
  )
  return label ? (
    <label
      htmlFor={_id}
      className={clsx('block text-sm font-medium text-gray-50', {
        [css.small]: variant === 'small',
      })}
    >
      <div className={css.contentTop}>
        <span className={css.label}>{label}</span>
        {error && <span className={css.errorText}>{error}</span>}
        {!error && helpText && <span className={css.helpText}>{helpText}</span>}
      </div>
      {inputField}
    </label>
  ) : (
    inputField
  )
}
