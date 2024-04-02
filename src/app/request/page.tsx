'use client'

import { useRouter } from 'next/navigation'

import RequestRouteList from '@/components/GroupSelection/RequestRouteList'

export default function RequestPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <div className="flex flex-col justify-center w-full bg-white px-4 py-4">
        <div className="flex flex-row w-full justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-xl text-secondaryForeground font-medium"
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
            추가 요청
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
      <RequestRouteList />
    </div>
  )
}
