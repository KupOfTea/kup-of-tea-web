'use client'

import { useParams, useRouter } from 'next/navigation'

import { useGroup } from '@/services/groups'
import GroupPage from '@/containers/group'

export default function GroupHomePage() {
  const { ticker } = useParams() as { ticker: string }
  const { group, isLoading, isError } = useGroup(ticker)
  const router = useRouter()

  return (
    <div className="grid w-full h-screen bg-white">
      <div className="px-3 py-4 flex flex-row w-full justify-between items-center h-fit">
        <button
          onClick={() => router.push('/select')}
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
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error...</p>}
        {group && <GroupPage group={group} />}
      </div>
    </div>
  )
}
