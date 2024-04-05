import { NINE_ITEMS } from '@/constants/question'

import SelectButton from '../SelectButton'

export default function SingleCard() {
  return (
    <div
      id="card"
      className="w-full px-5 py-9 grid grid-cols-3 gap-x-2 gap-y-7 items-center justify-center"
    >
      {NINE_ITEMS.map((_, index) => (
        <SelectButton key={`select-button-${index + 1}`} index={index} />
      ))}
    </div>
  )
}
