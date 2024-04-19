import { Dispatch, SetStateAction } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { Icon } from '@iconify/react'
import { useOverlay } from '@toss/use-overlay'

import { RequestTeamForm } from '@/types/requestForm'

import FormModal from './modal'

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

export default function SelectBox({
  keyName,
  allOptions,
  currentValue,
  setCurrentValue,
  setFormValue,
}: SelectProps) {
  const overlay = useOverlay()

  const openModal = () => {
    overlay.open(({ isOpen, close }) => (
      <FormModal
        isOpen={isOpen}
        close={close}
        options={allOptions ?? []}
        keyName="type"
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
        setFormValue={setFormValue}
      />
    ))
  }

  return (
    <button
      onClick={() => openModal()}
      className="w-full h-10 px-3.5 py-[11px] bg-white rounded-sm border border-black border-opacity-5 justify-between items-center inline-flex"
    >
      <div className="text-center text-black text-opacity-90 text-sm font-semibold leading-[18.20px]">
        {currentValue.label}
      </div>
      <Icon
        className="pointer-events-none rotate-90"
        icon="streamline:button-play-solid"
        width="10"
        height="10"
      />
    </button>
  )
}
