'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import classNames from 'classnames'

import { allAnswersSelector } from '@/states/answer'

export default function GenerateButton() {
  const router = useRouter()
  const { ticker } = useParams()
  const type = usePathname().split('/')[2]

  const answers = useRecoilValue(allAnswersSelector)

  return (
    <div className="bg-white fixed max-w-lg flex left-0 right-0 bottom-0 w-full justify-center items-center py-3 px-5">
      <button
        onClick={() => {
          router.push(`/${ticker}/${type}/download`)
        }}
        className={classNames(
          'w-full py-4 bg-black text-white font-semibold text-center text-[16px] rounded-[8px] tracking-[-2%] leading-[130%]',
        )}
      >
        다운로드
      </button>
    </div>
  )
}
