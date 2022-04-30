import { Listbox } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useMemo,
  useState,
} from 'react'
import { v4 as uuid } from 'uuid'

import css from './select.module.css'

export interface SelectOption {
  value: string
  label: string | ReactNode
  disabled?: boolean
}

export interface SelectProps
  extends DetailedHTMLProps<
    Omit<InputHTMLAttributes<HTMLSelectElement>, 'onChange'>,
    HTMLSelectElement
  > {
  error?: string
  onChange?(value: string): void
  helpText?: string
  label?: string
  options: SelectOption[]
  horizontal?: boolean
  value?: string
  Icon?: ReactNode
}

export default function Select({
  className,
  defaultValue,
  disabled,
  error,
  onChange,
  helpText,
  id,
  name,
  label,
  options,
  horizontal,
  value,
  Icon,
}: SelectProps) {
  const _id = id ?? uuid()
  const [internalValue, setInternalValue] = useState(
    defaultValue || (options?.length ? options[0].value : '')
  )

  const actualValue = value ?? internalValue
  const selectedOption = useMemo(() => {
    return value
      ? options.find((option) => option.value === value)
      : options.find((option) => option.value === internalValue)
  }, [options, internalValue, value])

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value)
    } else {
      setInternalValue(value)
    }
  }

  return (
    <label
      className={clsx(css.root, horizontal && css.horizontal, className)}
      data-input="select"
      htmlFor={id}
    >
      <div className={css.labelContainer}>
        {label && (
          <span className={clsx(css.label, horizontal ? 'mb-0' : 'mb-1')}>
            {label}
          </span>
        )}
        {error && <span className={css.errorText}>{error}</span>}
        {!error && helpText && <span className={css.helpText}>{helpText}</span>}
      </div>
      <Listbox disabled={disabled} onChange={handleChange} value={actualValue}>
        <div className={css.selectContainer}>
          <Listbox.Button
            className={clsx(
              'block w-full pl-3 pr-10 py-2 font-poppins bg-gray-900 border-2 border-gray-600 rounded-lg placeholder-gray-400 text-gray-50 focus:outline-none focus:ring-white focus:text-gray-900 sm:text-sm rounded-md overflow-hidden',
              {
                [css.selectButtonDisabled]: disabled,
                [css.selectButtonError]: error,
              },
              horizontal ? 'mt-0' : 'mt-1'
            )}
          >
            <span className="font-bold text-blue-800">
              {Icon ? Icon : <svg viewBox={'0 0 24 24'} />}
              {label}
            </span>
            <span className={css.selectButtonIconContainer}>
              <SelectorIcon
                className={css.selectButtonIcon}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options className={css.selectOptions}>
            {options.map((option) => (
              <Listbox.Option
                disabled={option.disabled}
                className={({ active, selected }) =>
                  clsx(css.selectOption, {
                    [css.selectOptionSelected]: selected,
                    [css.selectOptionActive]: active,
                    [css.selectOptionDisabled]: option.disabled,
                  })
                }
                key={option.value}
                value={option.value}
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      {/* Used to capture value of select */}
      <input
        tabIndex={-1}
        className="sr-only"
        readOnly
        value={selectedOption.value}
        name={name}
        id={id}
      />
    </label>
  )
}
