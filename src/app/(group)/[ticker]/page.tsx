'use client'

import { useParams } from 'next/navigation'

import GroupPage from '@/containers/group'
import { useGroup } from '@/services/groups'

import HomeButtonAppBar from '@/components/HomeButtonAppBar'

export default function GroupHomePage() {
  const { ticker } = useParams() as { ticker: string }
  const { group, isLoading, isError } = useGroup(ticker)

  return (
    <>
      <HomeButtonAppBar />
      <div className="flex flex-col items-center justify-start w-full px-5 py-10 min-h-screen bg-white">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Loading failed</p>}
        {group && <GroupPage group={group} />}
      </div>
    </>
  )
}
