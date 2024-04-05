import { NINE_ITEMS } from '@/constants/question'

import SelectButton from '../SelectButton'

export default function SingleCard() {
  return (
    <div className="w-full">
      <div
        id="card"
        className="w-full grid grid-cols-3 gap-x-2 gap-y-7 items-center justify-center"
      >
        {NINE_ITEMS.map((_, index) => (
          <SelectButton key={`select-button-${index + 1}`} index={index} />
        ))}
      </div>
    </div>
  )
}
