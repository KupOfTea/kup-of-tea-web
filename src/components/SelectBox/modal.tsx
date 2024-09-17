import { Dispatch, SetStateAction } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import uuid from 'react-uuid'
import classNames from 'classnames'
import { Icon } from '@iconify/react'

import { RequestTeamForm } from '@/types/requestForm'

interface SelectOption {
  value: string
  label: string
}

interface Props {
  isOpen: boolean
  close: () => void
  options: SelectOption[]
  keyName: 'type' | 'gender'
  currentValue: SelectOption
  setCurrentValue: Dispatch<SetStateAction<SelectOption>>
  setFormValue: UseFormSetValue<RequestTeamForm>
}

export default function FormModal({
  isOpen,
  close,
  options,
  keyName,
  currentValue,
  setCurrentValue,
  setFormValue,
}: Props) {
  const titleStyle = (value: string) =>
    classNames(
      'text-black  text-base font-semibold leading-tight pb-5',
      currentValue.value === value ? 'text-opacity-80' : 'text-opacity-40',
    )

  const handleSelect = (option: SelectOption) => {
    if (option === null) return
    if (option === undefined) return
    if (Array.isArray(option)) return
    setFormValue(keyName, option.value)
    setCurrentValue(option)
    close()
  }

  return (
    isOpen && (
      <div className="fixed inset-0 z-10 overflow-y-auto max-w-lg items-center justify-center">
        <button
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => close()}
        />
        <div className="fixed left-0 right-0 mx-auto bottom-0 flex-col w-full h-fit max-h-[80%] max-w-lg overflow-y-scroll bg-white rounded-t-[14px] shadow-lg pb-6">
          <div className="w-full flex flex-col items-center justify-center pt-2 pb-5">
            <div className="w-14 h-1 bg-black bg-opacity-10 rounded-full mb-4" />
          </div>
          <div className="flex flex-col px-5">
            {options.map((option) => {
              return (
                <button
                  onClick={() => handleSelect(option)}
                  className="flex flex-row w-full justify-between"
                  key={uuid()}
                >
                  <div className={titleStyle(option.value)}>{option.label}</div>
                  {currentValue.value === option.value && (
                    <Icon
                      icon="fluent:checkmark-16-filled"
                      width="20"
                      height="20"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  )
}
