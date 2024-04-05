'use client'

import uuid from 'react-uuid'

import { useGroups } from '@/services/groups'

import GroupCard from './Card'

interface ListProps {
  type: string
  gender: string
}

export default function GroupList({ type, gender }: ListProps) {
  const { groups, isLoading, isError } = useGroups(type, gender)

  return (
    <div className="my-5 w-full grid grid-cols-4 gap-x-1 gap-y-6 px-5">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Loading failed</p>}
      {groups &&
        groups
          .sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
          )
          .map((group) => {
            return <GroupCard key={uuid()} group={group} />
          })}
    </div>
  )
}
