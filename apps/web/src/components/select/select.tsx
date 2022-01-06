import { Listbox } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react'

import css from './select.module.css'

export interface SelectOption {
  id: string
  label: string | ReactNode
}

export interface SelectProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  defaultOption?: SelectOption
  error?: string
  handleChange?(option: SelectOption): void
  helpText?: string
  label?: string
  options: SelectOption[]
  selectedValue?: SelectOption | null
  horizontal?: boolean
}

export default function Select({
  defaultOption,
  disabled,
  error,
  handleChange,
  helpText,
  id,
  label,
  options,
  selectedValue,
  horizontal,
}: SelectProps) {
  const [selected, setSelected] = useState(defaultOption || options[0])
  const value = selectedValue || selected

  const onChange = (option: SelectOption) => {
    if (handleChange) {
      handleChange(option)
    } else {
      setSelected(option)
    }
  }

  return (
    <label
      className={clsx(css.root, horizontal && css.horizontal)}
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
      <Listbox disabled={disabled} onChange={onChange} value={value}>
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
            <span className="font-bold text-blue-800">{value.label}</span>
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
                className={({ active, selected }) =>
                  clsx(css.selectOption, {
                    [css.selectOptionSelected]: selected,
                    [css.selectOptionActive]: active,
                  })
                }
                key={option.id}
                value={option}
              >
                <span>{option.label}</span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      {/* Used to capture value of select */}
      <input
        className="sr-only"
        id={id}
        name={id}
        readOnly
        value={selected.id}
      />
    </label>
  )
}
