import { NINE_ITEMS } from '@/constants/question'

import CustomSelectButton from '../CustomSelectButton'

export default function CustomSelectionSingleCard() {
  return (
    <div className="w-full p-1.5">
      <div
        id="card"
        className="w-full pt-5 pb-2 grid gap-4 grid-cols-3 items-center justify-center rounded-md bg-white border-[1px] border-gray-300"
      >
        {NINE_ITEMS.map((_, index) => (
          <CustomSelectButton
            key={`custom-select-button-${index + 1}`}
            index={index}
          />
        ))}
        <p className="mx-3 mt-3 text-[6px] text-gray-900 font-light whitespace-nowrap">
          개발자 타이가 @DevvTyga
        </p>
      </div>
    </div>
  )
}
