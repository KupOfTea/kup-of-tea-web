'use client'

import { useRouter } from 'next/navigation'

import RequestForm from '@/containers/form'

export default function RequestFormPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col w-full h-dvh items-center bg-white">
      <div className="flex flex-col justify-center w-full bg-white px-4 py-4">
        <div className="flex flex-row w-full justify-between items-center">
          <button
            onClick={() => router.push('/request')}
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
            팀 추가 요청
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
      <RequestForm />
    </div>
  )
}
