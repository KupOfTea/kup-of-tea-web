'use client'

import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CustomLandingPage() {
  const router = useRouter()
  const [isSingleLoading, setIsSingleLoading] = useState(false)
  const [isMultipleLoading, setIsMultipleLoading] = useState(false)

  const delay = async (ms: number | undefined) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  const toRoute = async (route: string) => {
    if (isSingleLoading || isMultipleLoading) {
      return
    }
    if (route.includes('multiple')) {
      setIsMultipleLoading(true)
    } else {
      setIsSingleLoading(true)
    }
    await delay(500)
    await delay(500)
    if (route.includes('multiple')) {
      setIsMultipleLoading(false)
    } else {
      setIsSingleLoading(false)
    }
    router.push(route)
  }

  return (
    <div className="grid w-full h-screen bg-white">
      <div className="px-3 py-4 flex flex-row w-full justify-between items-center h-fit">
        <button
          onClick={() => router.push('/')}
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
      <div className="flex w-full px-5">
        <div className="flex flex-col w-full items-center h-full">
          <img
            className="object-contain aspect-square w-25 mb-5"
            src="/custom_main.png"
            alt=""
            width={100}
            height={100}
          />
          <div className="font-bold text-[24px] mb-16">여러 팀 선택하기</div>
          <div className="flex flex-col w-full">
            <button
              onClick={() => toRoute(`custom/single`)}
              className={classNames(
                'transition-all duration-100 flex flex-col w-full items-start justify-start px-7 pt-6 h-[112px] border border-gray-300 rounded-md mb-2',
                isSingleLoading ? 'bg-gray-200' : 'bg-gray-50',
              )}
            >
              <div className="font-semibold text-[18px] text-gray-800">
                개인용 취향표 생성하기
              </div>
              <div className="text-start font-medium text-[12px] text-gray-400 mb-2">
                혼자만의 취향표를 만들어 공유해요.
              </div>
            </button>
            <button
              onClick={() => toRoute(`custom/multiple`)}
              className={classNames(
                'transition-all duration-100 flex flex-col w-full items-start justify-start px-7 pt-6 h-[112px] border border-gray-300 rounded-md mb-2',
                isMultipleLoading ? 'bg-gray-200' : 'bg-gray-50',
              )}
            >
              <div className="font-semibold text-[18px] text-gray-800">
                다인용 취향표 생성하기
              </div>
              <div className="text-start font-medium text-[12px] text-gray-400 mb-4">
                여러 사람이 함께 취향표를 만들어 공유해요.
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
