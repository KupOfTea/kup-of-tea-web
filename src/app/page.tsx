'use client'

import { useRouter } from 'next/navigation'
import { Candal } from 'next/font/google'
import classNames from 'classnames'
import { useState } from 'react'

const candal = Candal({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isCustomLoading, setIsCustomLoading] = useState(false)

  const delay = async (ms: number | undefined) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  const toRoute = async (route: string) => {
    if (isLoading || isCustomLoading) {
      return
    }
    if (route === '/custom') {
      setIsCustomLoading(true)
    } else {
      setIsLoading(true)
    }
    await delay(500)
    await delay(500)
    if (route === '/custom') {
      setIsCustomLoading(false)
    } else {
      setIsLoading(false)
    }
    router.push(route)
  }

  return (
    <div className="flex flex-col w-full px-5 py-5 h-dvh justify-end items-center bg-white">
      <div className="w-full h-[75%] flex flex-col justify-evenly">
        <div className="flex flex-col items-center">
          <div
            className={classNames(
              candal.className,
              'font-semibold text-4xl text-base-600',
              'mb-2',
            )}
          >
            <span>My </span>
            <span className="text-rose-500 text-5xl font-extrabold">K</span>
            <span>up Of Tea</span>
          </div>
          <span className="text-base-400 text-sm font-medium tracking-[-2%] 'leading-[130%]',">
            Kpop 취향표 생성기
          </span>
        </div>
        <div className="flex-grow" />
        <div className="flex flex-col w-full">
          <button
            onClick={() => toRoute('/select')}
            className={classNames(
              'transition-all duration-100 flex flex-col w-full items-start justify-start px-7 pt-6 h-[124px] border border-gray-300 rounded-md mb-2',
              isLoading ? 'bg-gray-200' : 'bg-gray-50',
            )}
          >
            <div className="font-semibold text-[18px] text-gray-800">
              하나의 팀에서 선택하기
            </div>
            <div className="text-start font-medium text-[12px] text-gray-400 mb-2">
              한 그룹에서만 선택해서
              <br />
              취향표를 만들어요
            </div>
          </button>
          <button
            onClick={() => toRoute('/custom')}
            className={classNames(
              'transition-all duration-100 flex flex-col w-full items-start justify-start px-7 pt-6 h-[124px] border border-gray-300 rounded-md mb-2',
              isCustomLoading ? 'bg-gray-200' : 'bg-gray-50',
            )}
          >
            <div className="font-semibold text-[18px] text-gray-800">
              여러 팀에서 선택하기
            </div>
            <div className="text-start font-medium text-[12px] text-gray-400 mb-2">
              여러 그룹을 자유롭게 선택해서
              <br />
              취향표를 만들어요
            </div>
          </button>
        </div>
        <div className="flex-grow" />
        <div className="flex flex-col items-center mb-4 w-full">
          <a
            className="underline text-gray-400 font-medium text-[13px] mb-3"
            href="request"
          >
            추가요청이 있다면 알려주세요!
          </a>
        </div>
      </div>
    </div>
  )
}
