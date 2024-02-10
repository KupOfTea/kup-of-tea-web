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
    <div className="flex flex-col items-start w-full bg-white px-4 pt-3">
      <div className="flex flex-row w-full justify-between items-center">
        <button
          onClick={() => router.push('/')}
          className="text-xl text-secondaryForeground font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="text-center flex-grow text-[14px] font-extrabold text-grey-900">
          팀 선택
        </div>
        <div className="text-xl text-transparent font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="w-full px-2 pt-6 flex flex-row space-x-3">
        {SELECT_ITEMS.map((item) => {
          return (
            <button
              onClick={() => {
                setSelection(item)
              }}
              key={uuid()}
              className="flex flex-col items-center font-bold max-w-fit px-1"
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
