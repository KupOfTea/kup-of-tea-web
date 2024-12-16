import { Listbox, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { Icon } from '@iconify/react'

import { RequestTeamForm } from '@/types/requestForm'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  keyName: 'type' | 'gender'
  allOptions: SelectOption[]
  currentValue: SelectOption
  setCurrentValue: Dispatch<SetStateAction<SelectOption>>
  setFormValue: UseFormSetValue<RequestTeamForm>
}

export default function FormSelection({
  keyName,
  allOptions,
  currentValue,
  setCurrentValue,
  setFormValue,
}: SelectProps) {
  return (
    <div className="max-w-md">
      <Listbox
        value={currentValue}
        onChange={(val) => {
          if (val === null) return
          if (val === undefined) return
          if (Array.isArray(val)) return
          setFormValue(keyName, val.value)
          setCurrentValue(val)
        }}
      >
        <div className="my-4 mx-5 max-w-md">
          <Listbox.Button className="flex flex-row justify-between items-center bg-white w-full max-w-md border border-black border-opacity-10 rounded-sm px-[14px] py-[10px] tracking-[-2%] leading-[130%] text-base text-black text-opacity-80 font-semibold placeholder:text-base placeholder:font-normal placeholder-black placeholder-opacity-30 focus:outline-none focus:ring-black focus:border-black focus:border-opacity-10">
            <span className="truncate pl-1">{currentValue.label}</span>
            <Icon
              className="pointer-events-none rotate-90"
              icon="streamline:button-play-solid"
              width="10"
              height="10"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div>casdfasdf</div>
            {/* <Listbox.Options className="absolute max-w-sm m-auto py-4 left-0 right-0 z-10 mt-3 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {allOptions.map((type) => (
                <Listbox.Option
                  key={uuid()}
                  className={({ active }) =>
                    `flex flex-row cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={type}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {type.label}
                      </span>
                      {selected ? (
                        <span className="flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options> */}
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
