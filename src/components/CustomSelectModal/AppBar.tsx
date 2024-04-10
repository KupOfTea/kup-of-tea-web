'use client'

import { useRouter } from 'next/navigation'
import uuid from 'react-uuid'
import { useRecoilState } from 'recoil'

import { SELECT_ITEMS } from '@/constants/select'
import { selectState } from '@/states/select'

export default function AppBar() {
  const [selection, setSelection] = useRecoilState(selectState)
  const router = useRouter()

  return (
    <div className="flex flex-col items-start w-full bg-white border-b border-gray-100 ">
      <div className="flex flex-col justify-center w-full bg-white px-3 py-4">
        <div className="flex flex-row w-full justify-between items-center">
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
          <div className="text-center flex-grow text-base font-semibold text-grey-900">
            팀 선택
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
      <div className="w-full pt-6 flex flex-row space-x-3">
        {SELECT_ITEMS.map((item) => {
          return (
            <button
              onClick={() => {
                setSelection(item)
              }}
              key={uuid()}
              className="flex flex-col items-center font-bold w-full"
            >
              <div
                className={
                  selection.title !== item.title ? 'text-gray-500' : ''
                }
              >
                {item.title}
              </div>
              <div
                className={
                  selection.title === item.title
                    ? 'mt-1.5 w-4/5 h-0.5 bg-black rounded-full'
                    : ''
                }
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
