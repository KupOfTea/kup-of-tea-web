// 'use client'

// import { downloadImage } from '@/utils/downloadImage'

// import CustomBackButtonAppBar from '@/components/CustomBackButtonAppBar'
// import CustomSelectionSingleCard from '@/components/CustomSelectionSingleCard'

// export default function SinglePage() {
//   return (
//     <div className="flex min-h-screen flex-col items-center bg-white">
//       <CustomBackButtonAppBar title="1인용 취향표" />
//       <CustomSelectionSingleCard />
//       <button
//         onClick={() => downloadImage('card', 'custom')}
//         className="mt-5 mb-10 bg-black hover:bg-black text-white py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-semibold focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-none"
//       >
//         다운로드
//       </button>
//     </div>
//   )
// }

'use client'

import { useParams } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import classNames from 'classnames'

import { downloadImage } from '@/utils/downloadImage'
import { allSingleAnswersSelector } from '@/states/answer'

import CustomSelectionSingleCard from '@/components/CustomSelectionSingleCard'
import CustomBackButtonAppBar from '@/components/CustomBackButtonAppBar'

export default function SinglePage() {
  const { ticker } = useParams()
  const answers = useRecoilValue(allSingleAnswersSelector)

  const completed = !answers.some((e) => e.artistMember === null)

  return (
    <div className="flex flex-col w-full h-screen bg-[#FAFAFA]">
      <CustomBackButtonAppBar title="개인용 취향표" />
      <CustomSelectionSingleCard />
      <div className="bg-white fixed max-w-lg flex left-0 right-0 mx-auto bottom-0 w-full justify-center items-center py-3 px-5">
        <button
          onClick={() => downloadImage('card', ticker as string)}
          className={classNames(
            'w-full py-4 bg-black text-white font-semibold text-center text-[16px] rounded-[8px] tracking-[-2%] leading-[130%]',
            completed ? '' : 'bg-opacity-20',
          )}
        >
          다운로드
        </button>
      </div>
    </div>
  )
}
