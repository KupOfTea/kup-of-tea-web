'use client'

import { useRecoilCallback } from 'recoil'
import { usePathname, useRouter } from 'next/navigation'

import { NINE_ITEMS } from '@/constants/question'
import { USER_LENGTH } from '@/constants/user'
import { answerState } from '@/states/answer'
import { userState } from '@/states/user'

interface Props {
  title: string
}

export default function CustomBackButtonAppBar({ title }: Props) {
  const router = useRouter()
  const type = usePathname().split('/')[2]

  const resetAllAnswers = useRecoilCallback(
    ({ reset }) =>
      () => {
        if (type === 'single') {
          NINE_ITEMS.forEach((_, index) => {
            reset(answerState(`${type}-${index}`))
          })
        } else {
          Array.from({ length: USER_LENGTH }).forEach((_, userIndex) => {
            reset(userState(`u${userIndex}`))
            NINE_ITEMS.forEach((item, index) => {
              reset(answerState(`multi-u${userIndex}-${index}`))
            })
          })
        }
      },
    [type],
  ) // type이 변경될 때마다 이 콜백을 다시 생성

  const handleBack = () => {
    resetAllAnswers()
    router.push(`/custom`)
  }

  return (
    <div className="flex flex-col justify-center w-full bg-white py-4 px-4 border-b border-gray-100">
      <div className="flex flex-row w-full justify-between items-center">
        <button
          onClick={() => handleBack()}
          className="text-xl text-black font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="text-center flex-grow text-base font-semibold text-grey-900">
          {title}
        </div>
        <div className="text-xl text-transparent font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
